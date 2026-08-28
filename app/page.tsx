"use client";

import { useMemo, useState } from "react";
import { en } from "../content/en";
import { localizedDraft, type SupportedLanguage } from "../content/localized";
import { generateEnglish, localizedTone, type Route, type Tone, type Platform } from "../content/generator";

type PlayerType = "F2P" | "low spender" | "moderate spender" | "heavy spender";

const IGG_EMAIL = "complaintsns@igg.com";
const SOCIALS = {
  Facebook: "https://www.facebook.com/DoomsdayLastSurvivors/",
  Instagram: "https://www.instagram.com/doomsdaylastsurvivorsofficial",
  TikTok: "https://www.tiktok.com/@doomsdaylastsurvivor?lang=en"
};

export default function Home(){
  const [route,setRoute]=useState<Route>("email");
  const [issue,setIssue]=useState<string>(en.issues[0]);
  const [tone,setTone]=useState<Tone>("firm");
  const [playerType,setPlayerType]=useState<PlayerType>("low spender");
  const [years,setYears]=useState("");
  const [love,setLove]=useState("my alliance and the people I play with");
  const [impact,setImpact]=useState("it is becoming harder to keep up and harder to justify spending");
  const [platform,setPlatform]=useState<Platform>("Facebook");
  const [language,setLanguage]=useState<SupportedLanguage>("English");
  const [version,setVersion]=useState(0);
  const [generated,setGenerated]=useState(false);
  const [copied,setCopied]=useState(false);

  const output=useMemo(()=>{
    const ctx={route,tone,issue,playerType,years,love,impact,platform,version};
    const english=generateEnglish(ctx);
    const translated=localizedDraft(language,route,{issue,impact,love,playerType,years,platform});
    if(!translated || language==="English") return english;
    const toneLine=localizedTone[language]?.[tone];
    if(!toneLine) return translated;
    if(tone==="firm") return `${toneLine}\n\n${translated}`;
    if(tone==="emotional") return `${toneLine}\n\n${translated}`;
    return `${translated}\n\n${toneLine}`;
  },[route,issue,tone,playerType,years,love,impact,platform,language,version]);

  const mailto=`mailto:${IGG_EMAIL}?subject=${encodeURIComponent(`Player feedback: ${issue}`)}&body=${encodeURIComponent(output)}`;

  async function copy(text=output){
    try{await navigator.clipboard.writeText(text);setCopied(true)}
    catch{
      const el=document.getElementById("draft-text");
      if(el){const range=document.createRange();range.selectNodeContents(el);const sel=window.getSelection();sel?.removeAllRanges();sel?.addRange(range)}
    }
  }

  return <main className="wrap">
    <section className="hero">
      <div className="hero-top">
        <div><div className="kicker">{en.brand}</div><h1>One community.<br/>Many voices.</h1></div>
        <label className="lang">Language
          <select value={language} onChange={e=>{setLanguage(e.target.value as SupportedLanguage);setGenerated(false)}}>
            {(["English","Español","Português","Français","Deutsch"] as SupportedLanguage[]).map(l=><option key={l}>{l}</option>)}
          </select>
        </label>
      </div>
      <p className="subtitle">Pick one small action. We will help you say it in your own voice.</p>
    </section>

    <section className="panel primary-panel">
      <div className="stephead"><span className="stepnum">1</span><div><h2>{en.steps.actionTitle}</h2><p>{en.steps.actionHint}</p></div></div>
      <div className="grid actions compact-actions">
        {(Object.keys(en.actions) as Route[]).map(r=><button aria-pressed={route===r} key={r} className={`choice ${route===r?"active":""}`} onClick={()=>{setRoute(r);setGenerated(false)}}>
          <strong>{en.actions[r].title}</strong><div className="choice-meta"><span>{en.actions[r].time}</span><span>{en.actions[r].desc}</span></div>
        </button>)}
      </div>
    </section>

    <section className="panel">
      <div className="stephead"><span className="stepnum">2</span><div><h2>{en.steps.issueTitle}</h2><p>{en.steps.issueHint}</p></div></div>
      <div className="quick-controls">
        <label>Biggest issue<select value={issue} onChange={e=>setIssue(e.target.value)}>{en.issues.map(i=><option key={i}>{i}</option>)}</select></label>
        <label>Tone<select value={tone} onChange={e=>{setTone(e.target.value as Tone);setGenerated(false)}}><option value="calm">Calm / constructive</option><option value="firm">Firm / direct</option><option value="emotional">Personal / emotional</option></select></label>
        {route==="public"&&<label>Platform<select value={platform} onChange={e=>setPlatform(e.target.value as Platform)}>{en.platforms.map(p=><option key={p}>{p}</option>)}</select></label>}
      </div>
      <details className="personalise"><summary>Make it more personal <span>optional but recommended</span></summary>
        <div className="personal-grid">
          <label>Player type<select value={playerType} onChange={e=>setPlayerType(e.target.value as PlayerType)}><option>F2P</option><option>low spender</option><option>moderate spender</option><option>heavy spender</option></select></label>
          <label>Years played<input value={years} placeholder="e.g. 3" onChange={e=>setYears(e.target.value)}/></label>
          <label className="wide">What keeps you playing?<textarea value={love} onChange={e=>setLove(e.target.value)}/></label>
          <label className="wide">How is this affecting you?<textarea value={impact} onChange={e=>setImpact(e.target.value)}/></label>
        </div>
      </details>
      <button className="btn generate" onClick={()=>{setGenerated(true);setCopied(false);setTimeout(()=>document.getElementById("draft")?.scrollIntoView({behavior:"smooth"}),50)}}>Create my draft</button>
    </section>

    {generated&&<section className="panel draft-panel" id="draft">
      <div className="stephead"><span className="stepnum">3</span><div><h2>Your draft</h2><p>Edit anything you like. It should sound like you.</p></div></div>
      <div className="draft-meta"><span className="badge">{tone==="calm"?"Calm / constructive":tone==="firm"?"Firm / direct":"Personal / emotional"}</span>{language!=="English"&&<span className="badge">{language}</span>}</div>
      <div className="result" id="draft-text">{output}</div>
      <div className="btnrow">
        <button className="btn" onClick={()=>copy()}>{copied?"Copied ✓":"Copy draft"}</button>
        <button className="btn secondary" onClick={()=>{setVersion(v=>v+1);setCopied(false)}}>Try another version</button>
        {route==="email"&&<a className="btn linkbtn" href={mailto}>Open email to IGG</a>}
      </div>
      <div className="sr-live" aria-live="polite">{copied?"Draft copied to clipboard":""}</div>
      {route==="discord"&&<p className="note">Paste this into your own alliance chat, Discord server or community. There is no single official destination for this route.</p>}
      {route==="public"&&<div className="social-row">{Object.entries(SOCIALS).map(([name,url])=><a target="_blank" rel="noreferrer" href={url} key={name}>{name}</a>)}</div>}
      <p className="note">Tone now changes the framing and language of the draft, not just a single sentence. Change one line yourself for the most personal result.</p>
    </section>}

    <section className="panel graphics-cta"><div className="stephead"><span className="stepnum">★</span><div><h2>Don’t want to write?</h2><p>Grab a ready-to-post graphic and a translated caption instead.</p></div></div><a className="btn linkbtn" href="/graphics">Open ready-to-post graphics</a></section>

    <section className="contact-strip"><div><strong>Contact IGG</strong><a href={`mailto:${IGG_EMAIL}`}>{IGG_EMAIL}</a></div><div><strong>Official socials</strong><span>{Object.entries(SOCIALS).map(([name,url])=><a key={name} href={url} target="_blank" rel="noreferrer">{name}</a>)}</span></div></section>
    <p className="footer">Community project. Participation is voluntary. Criticise decisions, not people. No harassment, fake reviews or fabricated claims. Clearly label estimates and personal experiences.</p>
  </main>;
}
