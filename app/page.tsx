"use client";

import { useMemo, useState } from "react";
import { en } from "../content/en";

type Route = "email" | "discord" | "public" | "video" | "creator";
type Tone = "calm" | "firm" | "emotional";
type PlayerType = "F2P" | "low spender" | "moderate spender" | "heavy spender";
type Platform = "Facebook" | "Instagram" | "TikTok" | "X" | "Reddit";

type Lang = "English" | "Español" | "Português" | "Français" | "Deutsch";

const IGG_EMAIL = "complaintsns@igg.com";
const SOCIALS = {
  Facebook: "https://www.facebook.com/DoomsdayLastSurvivors/",
  Instagram: "https://www.instagram.com/doomsdaylastsurvivorsofficial",
  TikTok: "https://www.tiktok.com/@doomsdaylastsurvivor?lang=en"
};

const issueRequests: Record<string, string[]> = {
  "Pay-to-win / cost": ["make progression affordable enough that ordinary players can still compete", "improve value and strengthen realistic non-paid progression", "make spending optional acceleration rather than the only believable route forward"],
  "Armaments / Weapon Transcendence": ["reconsider the cost and power gap created by Armaments and Weapon Transcendence", "add stronger catch-up paths and accessible materials", "slow this progression ceiling and protect earlier player investment"],
  "Matchmaking": ["match alliances using active fighters, top strength, troop tiers and recent war performance", "reduce extreme mismatches that feel decided before fighting begins", "prioritise competitive wars instead of relying mainly on overall Might"],
  "Power creep": ["make new systems add strategy instead of replacing previous investment", "rework older heroes and systems so they retain value", "slow power creep enough for players to enjoy what they build"],
  "Heroes and catch-up": ["increase fragment availability and introduce stronger catch-up mechanics", "make useful heroes more achievable for ordinary players", "reduce the gap between established accounts and newer players"],
  "Event rewards": ["make rewards reflect the troops, healing, speedups, resources and time players spend", "reward meaningful team contribution and objectives", "improve incentives for rallies, garrisons and sustained participation"],
  "Game complexity": ["simplify overlapping systems, currencies and upgrade paths", "make progression priorities clearer", "reduce complexity that adds friction without meaningful strategy"],
  "Too many major updates": ["slow the pace of major progression releases", "give players time to develop and enjoy existing systems", "space out large updates so progression feels sustainable"],
  "Bugs / performance": ["prioritise stability, lag and crashes alongside monetisation updates", "improve reliability during important events", "invest more visibly in game quality and performance"]
};

const openings = [
  "I am writing because I still care about Doomsday: Last Survivors.",
  "I want to raise a concern as someone who genuinely wants Doomsday to stay healthy.",
  "The reason I am speaking up is simple: I want to keep enjoying this game.",
  "Doomsday has given me a community I value, which is why I do not want to stay quiet about this.",
  "This is not an anti-spending message. It is feedback from a player who wants better balance.",
  "I would rather give constructive feedback now than quietly lose interest later.",
  "I am one of the players who still wants Doomsday to succeed long-term.",
  "I do not expect a mobile game to be free, but I do expect progression to feel worthwhile."
];
const closings = [
  "Please listen to players who are speaking up because they want the game to improve.",
  "I hope this reaches the team responsible for the game's long-term direction.",
  "Please give players confidence that what they build today will still matter tomorrow.",
  "I am sharing this because I would rather see the game improve than watch players quietly leave.",
  "We want Doomsday to succeed. Please make progression and competition sustainable.",
  "Thank you for reading this as player feedback rather than simply another complaint.",
  "A healthier balance would give more of us a reason to stay, compete and support the game.",
  "I hope IGG treats this as a chance to rebuild player confidence."
];

const structures = [0,1,2,3,4,5,6,7];
function hash(s:string){let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}return h>>>0;}
function pick<T>(a:T[],s:number){return a[Math.abs(s)%a.length];}

function compactPlayer(years:string, playerType:PlayerType, love:string){
  const y = years.trim() ? `I have played for about ${years.trim()} year${years.trim()==="1"?"":"s"}` : "I have been playing for a while";
  return `${y} as a ${playerType}, and what still keeps me here is ${love}.`;
}

function emailDraft(seed:number, issue:string, tone:Tone, years:string, playerType:PlayerType, love:string, impact:string){
  const request=pick(issueRequests[issue],seed>>2), opening=pick(openings,seed), closing=pick(closings,seed>>4), s=pick(structures,seed>>6);
  const player=compactPlayer(years,playerType,love);
  const concern=`My biggest concern right now is ${issue.toLowerCase()}. For me, ${impact}.`;
  const toneLine=tone==="emotional"?"It is frustrating to feel that long-term players are being asked to chase another moving target.":tone==="firm"?"The current direction is making continued time and spending increasingly difficult to justify.":"I hope IGG can consider how this affects long-term player confidence.";
  const ask=`I would like IGG to ${request}.`;
  const balance="I am not asking for everything to be free. I am asking for progression, competition and spending to feel sustainable.";
  const variants=[
    [opening,player,concern+" "+toneLine,ask,balance,closing],
    [concern,player,opening,ask+" "+balance,closing],
    [player,opening,concern,ask,toneLine,closing],
    [ask,opening,player,concern,balance,closing],
    [opening,concern,`What matters to me is this: ${request.charAt(0).toLowerCase()+request.slice(1)}`,player,closing],
    [`I am contacting IGG specifically about ${issue.toLowerCase()}.`,player,concern,toneLine,ask,closing],
    [opening,player,`I do not want to simply complain. A practical improvement would be to ${request.replace(/^I would like IGG to /,"")}`,concern,closing],
    [player,concern,balance,ask,opening,closing]
  ];
  return variants[s].join("\n\n");
}

function publicDraft(platform:Platform, seed:number, issue:string, request:string, impact:string, love:string){
  if(platform==="X") return `I still care about #DoomsdayLastSurvivors, but ${issue.toLowerCase()} is making it harder to stay invested. IGG: please ${request}. We want a healthier game, not a free one. #PlayersFirst`;
  if(platform==="Instagram") return `${pick(openings,seed)}\n\n${issue} is becoming harder to ignore. ${impact}.\n\nIGG, please ${request}.\n\nWe love the game. We want it better.\n\n#PlayersFirst #DoomsdayLastSurvivors`;
  if(platform==="TikTok") return `Still here because of ${love}. Still speaking up because ${issue.toLowerCase()} needs attention. IGG, please ${request}. #PlayersFirst #DoomsdayLastSurvivors`;
  if(platform==="Reddit") return `I wanted to start a discussion about ${issue.toLowerCase()}. I still enjoy Doomsday because of ${love}, but ${impact}. I think a constructive change would be for IGG to ${request}. How are other players experiencing this?`;
  return `${pick(openings,seed)}\n\nI still enjoy Doomsday because of ${love}, but ${issue.toLowerCase()} is becoming difficult to ignore. ${impact}.\n\nIGG, please ${request}. We are not asking for a free game. We are asking for a healthier one.\n\n#PlayersFirst #DoomsdayLastSurvivors`;
}

const translatedCaptions:Record<Lang,string>={
  English:"We love the game. We want it better. Players first.",
  Español:"Amamos el juego. Queremos que sea mejor. Los jugadores primero.",
  Português:"Amamos o jogo. Queremos que ele melhore. Jogadores em primeiro lugar.",
  Français:"Nous aimons ce jeu. Nous voulons qu'il s'améliore. Les joueurs d'abord.",
  Deutsch:"Wir lieben das Spiel. Wir wollen, dass es besser wird. Spieler zuerst."
};

export default function Home(){
  const [route,setRoute]=useState<Route>("email"), [issue,setIssue]=useState(en.issues[0]), [tone,setTone]=useState<Tone>("firm");
  const [playerType,setPlayerType]=useState<PlayerType>("low spender"),[years,setYears]=useState(""),[love,setLove]=useState("my alliance and the people I play with"),[impact,setImpact]=useState("it is becoming harder to keep up and harder to justify spending");
  const [platform,setPlatform]=useState<Platform>("Facebook"),[language,setLanguage]=useState<Lang>("English"),[version,setVersion]=useState(0),[generated,setGenerated]=useState(false),[copied,setCopied]=useState(false);
  const seed=hash([route,issue,tone,playerType,years,love,impact,platform,version].join("|"));
  const request=pick(issueRequests[issue],seed>>2);
  const output=useMemo(()=>{
    if(route==="email") return emailDraft(seed,issue,tone,years,playerType,love,impact);
    if(route==="discord") return pick([
      `I wanted to raise something about ${issue.toLowerCase()}. ${impact}. I think IGG should ${request}. Curious how others here feel about it.`,
      `Question for everyone: how are you feeling about ${issue.toLowerCase()} lately? For me, ${impact}. I would rather see IGG ${request} than watch more players lose interest.`,
      `I still play because of ${love}, but I am getting increasingly concerned about ${issue.toLowerCase()}. A practical change would be to ${request}. What would you change?`,
      `Not trying to start drama, but I think ${issue.toLowerCase()} deserves a proper discussion. ${impact}. IGG could help by choosing to ${request}.`
    ],seed);
    if(route==="public") return publicDraft(platform,seed,issue,request,impact,love);
    if(route==="video") return `HOOK\n${pick([`I still play Doomsday because of ${love}. But I am worried about where the game is heading.`,`Here is the one thing I want IGG to understand about ${issue.toLowerCase()}.`,`I am not asking for a free game. I am asking for a game worth staying invested in.`],seed)}\n\n30–60 SEC SCRIPT\nI have been playing Doomsday for a while, and ${impact}. My biggest concern is ${issue.toLowerCase()}. I want IGG to ${request}. I am speaking up because I still care about the game and want players like me to have a reason to stay.\n\nRECORDING TIP\nFilm vertically, speak naturally, and show one relevant game screen if you can.`;
    return `CREATOR BRIEF — ${issue.toUpperCase()}\n\nFORMAT\nUse this as a 3–5 minute commentary, or trim the sections for a Short.\n\nTHESIS\nPlayers can accept monetisation, but they need confidence that time, effort and spending retain value. The concern here is ${issue.toLowerCase()}.\n\nHOOK OPTIONS\n1. ${pick(openings,seed)}\n2. How long should a player's investment stay relevant before the next system moves the goalposts?\n3. Hard competition is fun. Feeling priced out or structurally outmatched is not.\n\nKEY ARGUMENTS\n• What players still value: ${love}.\n• Personal/community impact: ${impact}.\n• Constructive request: IGG should ${request}.\n• Fair framing: the goal is not to remove spending; it is to keep the ecosystem healthy for F2P, spenders and whales alike.\n\nEVIDENCE TO GATHER\n• Relevant in-game screenshots and upgrade requirements.\n• Before/after examples if discussing power creep.\n• Match screenshots and active-fighter context if discussing matchmaking.\n• Event reward and resource-cost screenshots if discussing rewards.\n• Player comments only with permission or identifying details removed.\n\nDO NOT OVERCLAIM\nLabel personal experience as personal experience. Label community estimates as estimates. Do not present unverified spending totals as facts.\n\nCOUNTERPOINT TO ADDRESS\nIGG needs monetisation to operate the game. The response is that sustainable monetisation depends on players believing their investment has lasting value.\n\nB-ROLL\nGame menu → relevant progression screen → alliance/war footage → evidence screenshot → calm direct-to-camera close.\n\nON-SCREEN TEXT\n“SPENDING SHOULD FEEL LIKE PROGRESS — NOT RENTING RELEVANCE.”\n\nTITLE IDEAS\n• Doomsday Players Are Reaching Their Limit\n• The Real Problem With ${issue}\n• We Love Doomsday — But This Needs To Change\n\nTHUMBNAIL TEXT\n“PLAYERS FIRST” / “TOO MUCH?” / “PLEASE LISTEN”\n\nCTA\nShare your own experience in your own words. One community. Many voices.`;
  },[route,issue,tone,playerType,years,love,impact,platform,version,seed,request]);

  const mailto=`mailto:${IGG_EMAIL}?subject=${encodeURIComponent(`Player feedback: ${issue}`)}&body=${encodeURIComponent(output)}`;
  async function copy(text=output){try{await navigator.clipboard.writeText(text);setCopied(true);}catch{const el=document.getElementById("draft-text");if(el){const r=document.createRange();r.selectNodeContents(el);const s=window.getSelection();s?.removeAllRanges();s?.addRange(r);} }}

  return <main className="wrap">
    <section className="hero"><div className="hero-top"><div><div className="kicker">{en.brand}</div><h1>{en.tagline.split(" ").slice(0,2).join(" ")}<br/>{en.tagline.split(" ").slice(2).join(" ")}</h1></div><label className="lang">{en.languageLabel}<select value={language} onChange={e=>setLanguage(e.target.value as Lang)}>{(["English","Español","Português","Français","Deutsch"] as Lang[]).map(l=><option key={l}>{l}</option>)}</select></label></div><p className="subtitle">{en.subtitle}</p>{language!=="English"&&<p className="translation-note">UI translation is being prepared. Ready-to-post captions below already support {language}.</p>}</section>

    <section className="panel primary-panel"><div className="stephead"><span className="stepnum">1</span><div><h2>{en.steps.actionTitle}</h2><p>{en.steps.actionHint}</p></div></div><div className="grid actions compact-actions">{(Object.keys(en.actions) as Route[]).map(r=><button aria-pressed={route===r} key={r} className={`choice ${route===r?"active":""}`} onClick={()=>{setRoute(r);setGenerated(false)}}><strong>{en.actions[r].title}</strong><div className="choice-meta"><span>{en.actions[r].time}</span><span>{en.actions[r].desc}</span></div></button>)}</div></section>

    <section className="panel"><div className="stephead"><span className="stepnum">2</span><div><h2>{en.steps.issueTitle}</h2><p>{en.steps.issueHint}</p></div></div><div className="quick-controls"><label>Biggest issue<select value={issue} onChange={e=>setIssue(e.target.value)}>{en.issues.map(i=><option key={i}>{i}</option>)}</select></label><label>Tone<select value={tone} onChange={e=>setTone(e.target.value as Tone)}><option value="calm">Calm</option><option value="firm">Firm</option><option value="emotional">Personal / emotional</option></select></label>{route==="public"&&<label>Platform<select value={platform} onChange={e=>setPlatform(e.target.value as Platform)}>{en.platforms.map(p=><option key={p}>{p}</option>)}</select></label>}</div><details className="personalise"><summary>Make it more personal <span>optional but recommended</span></summary><div className="personal-grid"><label>Player type<select value={playerType} onChange={e=>setPlayerType(e.target.value as PlayerType)}><option>F2P</option><option>low spender</option><option>moderate spender</option><option>heavy spender</option></select></label><label>Years played<input value={years} placeholder="e.g. 3" onChange={e=>setYears(e.target.value)}/></label><label className="wide">What keeps you playing?<textarea value={love} onChange={e=>setLove(e.target.value)}/></label><label className="wide">How is this affecting you?<textarea value={impact} onChange={e=>setImpact(e.target.value)}/></label></div></details><button className="btn generate" onClick={()=>{setGenerated(true);setCopied(false);setTimeout(()=>document.getElementById("draft")?.scrollIntoView({behavior:"smooth"}),50)}}>Create my draft</button></section>

    {generated&&<section className="panel draft-panel" id="draft"><div className="stephead"><span className="stepnum">3</span><div><h2>{en.steps.draftTitle}</h2><p>{en.steps.draftHint}</p></div></div><div className="result" id="draft-text">{output}</div><div className="btnrow"><button className="btn" onClick={()=>copy()}>{copied?"Copied ✓":"Copy draft"}</button><button className="btn secondary" onClick={()=>{setVersion(v=>v+1);setCopied(false)}}>Try another version</button>{route==="email"&&<a className="btn linkbtn" href={mailto}>Open email to IGG</a>}</div><div className="sr-live" aria-live="polite">{copied?"Draft copied to clipboard":""}</div>{route==="discord"&&<p className="note">Paste this into your own alliance chat, Discord server or community. There is no single official destination for this route.</p>}{route==="public"&&<div className="social-row">{Object.entries(SOCIALS).map(([name,url])=><a target="_blank" rel="noreferrer" href={url} key={name}>{name}</a>)}</div>}<p className="note">Best result: change one line so it sounds unmistakably like you. The generator changes structure as well as wording to reduce identical messages.</p></section>}

    <section className="panel graphics"><div className="stephead"><span className="stepnum">★</span><div><h2>Prefer to share a graphic?</h2><p>Grab a ready-to-post image, copy a caption, and share it in your community.</p></div></div><div className="poster-grid">{[1,2,3].map((n,i)=><article className={`poster poster-${n}`} key={n}><div className="poster-art"><span>{i===2?"STOP":"BOYCOTT"}</span><strong>P2W</strong><small>{i===0?"PLAYERS FIRST":i===1?"WE LOVE THE GAME. NOT THE GREED.":"LISTEN TO PLAYERS"}</small></div><div className="poster-body"><strong>{i===0?"Friendly protest":i===1?"Community share":"Strong protest"}</strong><p>{translatedCaptions[language]}</p><button className="btn secondary" onClick={()=>copy(translatedCaptions[language])}>Copy caption</button></div></article>)}</div></section>

    <section className="contact-strip"><div><strong>Contact IGG</strong><a href={`mailto:${IGG_EMAIL}`}>{IGG_EMAIL}</a></div><div><strong>Official socials</strong><span>{Object.entries(SOCIALS).map(([n,u])=><a key={n} href={u} target="_blank" rel="noreferrer">{n}</a>)}</span></div></section>
    <p className="footer">Community project. Participation is voluntary. Criticise decisions, not people. No harassment, fake reviews or fabricated claims. Clearly label estimates and personal experiences.</p>
  </main>;
}
