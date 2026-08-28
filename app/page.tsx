"use client";

import { useEffect, useMemo, useState } from "react";
import { en } from "../content/en";
import { localizedDraft, type SupportedLanguage } from "../content/localized";
import { generateEnglish, localizedTone, type Route, type Tone, type Platform } from "../content/generator";
import { additionalDraft, additionalLanguages, type AdditionalLanguage } from "../content/additionalLanguages";
import { getUI, uiLanguages, type UILanguage } from "../content/uiTranslations";
import { personalization } from "../content/personalizationTranslations";

type PlayerType = "" | "F2P" | "low spender" | "moderate spender" | "heavy spender";
type SiteLanguage = UILanguage;

const IGG_EMAIL = "complaintsns@igg.com";
const SOCIALS = {Facebook:"https://www.facebook.com/DoomsdayLastSurvivors/",Instagram:"https://www.instagram.com/doomsdaylastsurvivorsofficial",TikTok:"https://www.tiktok.com/@doomsdaylastsurvivor?lang=en"};

export default function Home(){
  const [route,setRoute]=useState<Route>("email");
  const [issue,setIssue]=useState<string>(en.issues[0]);
  const [tone,setTone]=useState<Tone>("firm");
  const [playerType,setPlayerType]=useState<PlayerType>("");
  const [years,setYears]=useState("");
  const [love,setLove]=useState("");
  const [impact,setImpact]=useState("");
  const [platform,setPlatform]=useState<Platform>("Facebook");
  const [language,setLanguage]=useState<SiteLanguage>("English");
  const [version,setVersion]=useState(0);
  const [generated,setGenerated]=useState(false);
  const [copied,setCopied]=useState(false);
  const copy=getUI(language);
  const personal=personalization[language];

  useEffect(()=>{const lang=new URLSearchParams(window.location.search).get("lang") as SiteLanguage|null;if(lang&&(uiLanguages as readonly string[]).includes(lang))setLanguage(lang)},[]);

  const output=useMemo(()=>{
    const draftLove=love.trim()||personal.love;
    const draftImpact=impact.trim()||personal.impact;
    const draftYears=playerType?years:"";
    const english=generateEnglish({route,tone,issue,playerType:playerType||"player",years:draftYears,love:draftLove,impact:draftImpact,platform,version});
    if(language==="English") return english;
    const translatedCtx={issue,impact:draftImpact,love:draftLove,playerType,years:draftYears,platform};
    if((additionalLanguages as readonly string[]).includes(language)) return additionalDraft(language as AdditionalLanguage,route,tone,translatedCtx);
    const translated=localizedDraft(language as SupportedLanguage,route,translatedCtx);
    if(!translated) return english;
    const toneLine=localizedTone[language]?.[tone];
    if(!toneLine) return translated;
    return tone==="calm"?`${translated}\n\n${toneLine}`:`${toneLine}\n\n${translated}`;
  },[route,issue,tone,playerType,years,love,impact,platform,language,version,personal]);

  const mailto=`mailto:${IGG_EMAIL}?subject=${encodeURIComponent(`Player feedback: ${issue}`)}&body=${encodeURIComponent(output)}`;
  const setLang=(l:SiteLanguage)=>{setLanguage(l);setGenerated(false);window.history.replaceState(null,"",l==="English"?window.location.pathname:`${window.location.pathname}?lang=${encodeURIComponent(l)}`)};
  async function copyDraft(text=output){try{await navigator.clipboard.writeText(text);setCopied(true)}catch{const el=document.getElementById("draft-text");if(el){const range=document.createRange();range.selectNodeContents(el);const sel=window.getSelection();sel?.removeAllRanges();sel?.addRange(range)}}}

  return <main className="wrap" dir={language==="العربية"?"rtl":"ltr"}>
    <section className="hero"><div className="hero-top"><div><div className="kicker">Players First</div><h1>{copy.tagline}</h1></div><label className="lang">{copy.language}<select value={language} onChange={e=>setLang(e.target.value as SiteLanguage)}>{uiLanguages.map(l=><option key={l}>{l}</option>)}</select></label></div><p className="subtitle">{copy.subtitle}</p></section>

    <section className="panel primary-panel"><div className="stephead"><span className="stepnum">1</span><div><h2>{copy.actionTitle}</h2><p>{copy.actionHint}</p></div></div><div className="grid actions compact-actions">{(Object.keys(copy.actions) as Route[]).map(r=><button aria-pressed={route===r} key={r} className={`choice ${route===r?"active":""}`} onClick={()=>{setRoute(r);setGenerated(false)}}><strong>{copy.actions[r].title}</strong><div className="choice-meta"><span>{copy.actions[r].time}</span><span>{copy.actions[r].desc}</span></div></button>)}</div></section>

    <section className="panel"><div className="stephead"><span className="stepnum">2</span><div><h2>{copy.issueTitle}</h2><p>{copy.issueHint}</p></div></div><div className="quick-controls"><label>{copy.biggestIssue}<select value={issue} onChange={e=>setIssue(e.target.value)}>{en.issues.map(i=><option value={i} key={i}>{copy.issues[i]||i}</option>)}</select></label><label>{copy.tone}<select value={tone} onChange={e=>{setTone(e.target.value as Tone);setGenerated(false)}}><option value="calm">{copy.tones.calm}</option><option value="firm">{copy.tones.firm}</option><option value="emotional">{copy.tones.emotional}</option></select></label>{route==="public"&&<label>{copy.platform}<select value={platform} onChange={e=>setPlatform(e.target.value as Platform)}>{en.platforms.map(p=><option key={p}>{p}</option>)}</select></label>}</div>
      <details className="personalise"><summary>{copy.personalTitle} <span>{copy.personalOptional}</span></summary><div className="personal-grid"><label>{copy.playerType}<select value={playerType} onChange={e=>setPlayerType(e.target.value as PlayerType)}>{personal.types.map(x=><option key={x.value||"none"} value={x.value}>{x.label}</option>)}</select></label><label>{copy.yearsPlayed}<input value={years} placeholder={copy.yearsPlaceholder} onChange={e=>setYears(e.target.value)}/></label><label className="wide">{copy.keepsPlaying}<textarea value={love} placeholder={personal.love} onChange={e=>setLove(e.target.value)}/></label><label className="wide">{copy.impact}<textarea value={impact} placeholder={personal.impact} onChange={e=>setImpact(e.target.value)}/></label></div></details>
      <button className="btn generate" onClick={()=>{setGenerated(true);setCopied(false);setTimeout(()=>document.getElementById("draft")?.scrollIntoView({behavior:"smooth"}),50)}}>{copy.createDraft}</button></section>

    {generated&&<section className="panel draft-panel" id="draft"><div className="stephead"><span className="stepnum">3</span><div><h2>{copy.draftTitle}</h2><p>{copy.draftHint}</p></div></div><div className="draft-meta"><span className="badge">{copy.tones[tone]}</span>{language!=="English"&&<span className="badge">{language}</span>}</div><div className="result" id="draft-text" dir={language==="العربية"?"rtl":"ltr"}>{output}</div><div className="btnrow"><button className="btn" onClick={()=>copyDraft()}>{copied?copy.copied:copy.copyDraft}</button><button className="btn secondary" onClick={()=>{setVersion(v=>v+1);setCopied(false)}}>{copy.tryAnother}</button>{route==="email"&&<a className="btn linkbtn" href={mailto}>{copy.openEmail}</a>}</div><div className="sr-live" aria-live="polite">{copied?copy.copied:""}</div>{route==="discord"&&<p className="note">{copy.discordNote}</p>}{route==="public"&&<div className="social-row">{Object.entries(SOCIALS).map(([name,url])=><a target="_blank" rel="noreferrer" href={url} key={name}>{name}</a>)}</div>}<p className="note">{copy.draftNote}</p></section>}

    <section className="panel graphics-cta"><div className="stephead"><span className="stepnum">★</span><div><h2>{copy.noWriteTitle}</h2><p>{copy.noWriteHint}</p></div></div><a className="btn linkbtn" href={`/graphics?lang=${encodeURIComponent(language)}`}>{copy.openGraphics}</a></section>
    <section className="contact-strip"><div><strong>{copy.sendFeedback}</strong><a href={`mailto:${IGG_EMAIL}`}>{IGG_EMAIL}</a></div><div><strong>{copy.commentSocials}</strong><span>{Object.entries(SOCIALS).map(([name,url])=><a key={name} href={url} target="_blank" rel="noreferrer">{name}</a>)}</span></div></section>
    <p className="footer">{copy.footer}</p>
  </main>;
}
