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
  {src:"/graphics/boycott-1.svg", title:"Friendly protest", desc:"Bright, simple and easy to share in alliance chat or social posts."},
  {src:"/graphics/boycott-2.svg", title:"Community share", desc:"A softer purple version built around the player-first message."},
  {src:"/graphics/boycott-3.svg", title:"Strong protest", desc:"A more direct visual for players who want a firmer message."}
];

export default function GraphicsPage(){
  const [language,setLanguage]=useState<Lang>("English");
  const [copied,setCopied]=useState(false);
  async function copy(){try{await navigator.clipboard.writeText(captions[language]);setCopied(true)}catch{setCopied(false)}}
  return <main className="wrap graphics-page">
    <a className="back-link" href="/">← Back to action generator</a>
    <section className="hero"><div className="kicker">Players First</div><h1>Grab it.<br/>Post it.</h1><p className="subtitle">No writing required. Pick a graphic, save it, copy a caption and share it in your community.</p></section>
    <section className="panel"><div className="graphic-toolbar"><label>Caption language<select value={language} onChange={e=>{setLanguage(e.target.value as Lang);setCopied(false)}}>{Object.keys(captions).map(l=><option key={l}>{l}</option>)}</select></label><div className="caption-box"><span>{captions[language]}</span><button className="btn secondary" onClick={copy}>{copied?"Copied ✓":"Copy caption"}</button></div></div></section>
    <section className="graphic-download-grid">{graphics.map((g,i)=><article className="download-card" key={g.src}><img src={g.src} alt={`${g.title} Players First graphic`}/><div className="download-card-body"><strong>{g.title}</strong><p>{g.desc}</p><a className="btn linkbtn" href={g.src} download={`players-first-${i+1}.svg`}>Download graphic</a></div></article>)}</section>
    <p className="footer">Please share in your own voice. Do not harass individuals, fabricate claims or encourage fake reviews.</p>
  </main>
}
