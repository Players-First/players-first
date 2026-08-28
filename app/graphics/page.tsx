"use client";

import { useEffect, useState } from "react";
import { getUI, uiLanguages, type UILanguage } from "../../content/uiTranslations";

const captions:Record<UILanguage,string>={
  English:"We love the game. We want it better. Players first. #PlayersFirst #DoomsdayLastSurvivors",
  Español:"Amamos el juego. Queremos que sea mejor. Los jugadores primero. #PlayersFirst #DoomsdayLastSurvivors",
  Português:"Amamos o jogo. Queremos que ele melhore. Jogadores em primeiro lugar. #PlayersFirst #DoomsdayLastSurvivors",
  Français:"Nous aimons ce jeu. Nous voulons qu'il s'améliore. Les joueurs d'abord. #PlayersFirst #DoomsdayLastSurvivors",
  Deutsch:"Wir lieben das Spiel. Wir wollen, dass es besser wird. Spieler zuerst. #PlayersFirst #DoomsdayLastSurvivors",
  Русский:"Мы любим эту игру и хотим, чтобы она стала лучше. Игроки — прежде всего. #PlayersFirst #DoomsdayLastSurvivors",
  "中文（简体）":"我们热爱这款游戏，也希望它变得更好。玩家优先。#PlayersFirst #DoomsdayLastSurvivors",
  "Bahasa Indonesia":"Kami menyukai game ini dan ingin game ini menjadi lebih baik. Pemain harus diutamakan. #PlayersFirst #DoomsdayLastSurvivors",
  日本語:"このゲームが好きだから、もっと良くなってほしい。プレイヤーを第一に。#PlayersFirst #DoomsdayLastSurvivors",
  한국어:"우리는 이 게임을 좋아하고 더 나아지길 바랍니다. 플레이어를 먼저 생각해 주세요. #PlayersFirst #DoomsdayLastSurvivors",
  ไทย:"เรารักเกมนี้ และอยากให้เกมดีขึ้น ผู้เล่นต้องมาก่อน #PlayersFirst #DoomsdayLastSurvivors",
  "Tiếng Việt":"Chúng tôi yêu game này và muốn nó tốt hơn. Người chơi phải được đặt lên hàng đầu. #PlayersFirst #DoomsdayLastSurvivors",
  "Bahasa Melayu":"Kami sayangkan permainan ini dan mahu ia menjadi lebih baik. Utamakan pemain. #PlayersFirst #DoomsdayLastSurvivors",
  العربية:"نحن نحب اللعبة ونريدها أن تصبح أفضل. اللاعبون أولاً. #PlayersFirst #DoomsdayLastSurvivors"
};

const graphics=["/graphics/players-first-pink-original.png","/graphics/players-first-purple-original.png","/graphics/players-first-medieval-original.png"];

export default function GraphicsPage(){
  const [language,setLanguage]=useState<UILanguage>("English");
  const [copied,setCopied]=useState(false);
  const t=getUI(language);

  useEffect(()=>{const lang=new URLSearchParams(window.location.search).get("lang") as UILanguage|null;if(lang&&(uiLanguages as readonly string[]).includes(lang))setLanguage(lang)},[]);
  const setLang=(l:UILanguage)=>{setLanguage(l);setCopied(false);window.history.replaceState(null,"",`/graphics?lang=${encodeURIComponent(l)}`)};
  async function copyCaption(){try{await navigator.clipboard.writeText(captions[language]);setCopied(true)}catch{setCopied(false)}}

  return <main className="wrap graphics-page" dir={language==="العربية"?"rtl":"ltr"}>
    <a className="back-link" href={`/?lang=${encodeURIComponent(language)}`}>{t.graphics.back}</a>
    <section className="hero"><div className="hero-top"><div><div className="kicker">Players First</div><h1>{t.graphics.title1}<br/>{t.graphics.title2}</h1></div><label className="lang">{t.language}<select value={language} onChange={e=>setLang(e.target.value as UILanguage)}>{uiLanguages.map(l=><option key={l}>{l}</option>)}</select></label></div><p className="subtitle">{t.graphics.subtitle}</p></section>
    <section className="panel"><div className="graphic-toolbar"><label>{t.graphics.captionLanguage}<select value={language} onChange={e=>setLang(e.target.value as UILanguage)}>{uiLanguages.map(l=><option key={l}>{l}</option>)}</select></label><div className="caption-box"><span dir={language==="العربية"?"rtl":"ltr"}>{captions[language]}</span><button className="btn secondary" onClick={copyCaption}>{copied?t.copied:t.graphics.copyCaption}</button></div></div></section>
    <section className="graphic-download-grid">{graphics.map((src,i)=><article className="download-card" key={src}><img src={src} alt={`Players First ${i+1}`}/><div className="download-card-body"><strong>{t.graphics.original} #{i+1}</strong><p>Players First</p><a className="btn linkbtn" href={src} download={`players-first-original-${i+1}.png`}>{t.graphics.download}</a></div></article>)}</section>
    <p className="footer">{t.graphics.footer}</p>
  </main>
}
