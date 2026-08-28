"use client";

import { useState } from "react";

type Lang = "English" | "Español" | "Português" | "Français" | "Deutsch";

const captions: Record<Lang,string> = {
  English: "We love the game. We want it better. Players first. #PlayersFirst #DoomsdayLastSurvivors",
  Español: "Amamos el juego. Queremos que sea mejor. Los jugadores primero. #PlayersFirst #DoomsdayLastSurvivors",
  Português: "Amamos o jogo. Queremos que ele melhore. Jogadores em primeiro lugar. #PlayersFirst #DoomsdayLastSurvivors",
  Français: "Nous aimons ce jeu. Nous voulons qu'il s'améliore. Les joueurs d'abord. #PlayersFirst #DoomsdayLastSurvivors",
  Deutsch: "Wir lieben das Spiel. Wir wollen, dass es besser wird. Spieler zuerst. #PlayersFirst #DoomsdayLastSurvivors"
};

const graphics = [
  {src:"/graphics/players-first-pink-original.png", title:"Pink community poster", desc:"Your original pink Players First / boycott poster."},
  {src:"/graphics/players-first-purple-original.png", title:"Purple community poster", desc:"Your original purple version for community sharing."},
  {src:"/graphics/players-first-medieval-original.png", title:"Full boycott poster", desc:"Your original detailed medieval-style campaign poster."}
];

export default function GraphicsPage(){
  const [language,setLanguage]=useState<Lang>("English");
  const [copied,setCopied]=useState(false);
  async function copy(){try{await navigator.clipboard.writeText(captions[language]);setCopied(true)}catch{setCopied(false)}}
  return <main className="wrap graphics-page">
    <a className="back-link" href="/">← Back to action generator</a>
    <section className="hero"><div className="kicker">Players First</div><h1>Grab it.<br/>Post it.</h1><p className="subtitle">No writing required. Pick one of the original community posters, save it, copy a caption and share it.</p></section>
    <section className="panel"><div className="graphic-toolbar"><label>Caption language<select value={language} onChange={e=>{setLanguage(e.target.value as Lang);setCopied(false)}}>{Object.keys(captions).map(l=><option key={l}>{l}</option>)}</select></label><div className="caption-box"><span>{captions[language]}</span><button className="btn secondary" onClick={copy}>{copied?"Copied ✓":"Copy caption"}</button></div></div></section>
    <section className="graphic-download-grid">{graphics.map((g,i)=><article className="download-card" key={g.src}><img src={g.src} alt={`${g.title} Players First graphic`}/><div className="download-card-body"><strong>{g.title}</strong><p>{g.desc}</p><a className="btn linkbtn" href={g.src} download={`players-first-original-${i+1}.png`}>Download original PNG</a></div></article>)}</section>
    <p className="footer">These are the original community-uploaded posters. Please share responsibly: do not harass individuals, fabricate claims or encourage fake reviews.</p>
  </main>
}
