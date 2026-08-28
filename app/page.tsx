"use client";

import { useMemo, useState } from "react";

type Route = "email" | "discord" | "public" | "video" | "creator";
type Tone = "calm" | "firm" | "emotional";
type PlayerType = "F2P" | "low spender" | "moderate spender" | "heavy spender";

const issues = [
  "Pay-to-win / cost",
  "Armaments / Weapon Transcendence",
  "Matchmaking",
  "Power creep",
  "Heroes and catch-up",
  "Event rewards",
  "Game complexity",
  "Too many major updates",
  "Bugs / performance"
];

const routeMeta: Record<Route, {title:string, time:string, desc:string}> = {
  email: { title: "Send feedback to IGG", time: "~2 min", desc: "Private and direct" },
  discord: { title: "Post in my community", time: "~2 min", desc: "Discord or alliance chat" },
  public: { title: "Post publicly", time: "~2–5 min", desc: "Social media or public forum" },
  video: { title: "Make a short video", time: "~5 min", desc: "Simple 30–60 sec player video" },
  creator: { title: "Creator mode", time: "~10+ min", desc: "Hook, script, B-roll and CTA" }
};

const openings = [
  "I am speaking up because I still care about Doomsday: Last Survivors.",
  "I do not expect a mobile game to be free, but I do expect spending and progression to feel worthwhile.",
  "The reason I am raising this is simple: I want Doomsday to remain a game people are excited to play.",
  "I have stayed with Doomsday because the community and competition still matter to me.",
  "This is not an anti-spending message. It is a request for a healthier balance."
];

const closings = [
  "Please listen to the players who are speaking up because they want the game to improve.",
  "I hope this feedback reaches the development and management teams, because I want to keep enjoying the game.",
  "Please give players a reason to trust that the time and money they invest today will still matter tomorrow.",
  "I am sharing this because I would rather see the game improve than watch more players quietly walk away.",
  "We want Doomsday to succeed. Please help make progression and competition feel sustainable again."
];

const issueRequests: Record<string, string[]> = {
  "Pay-to-win / cost": [
    "reduce the cost of major progression systems and provide stronger non-paid progression paths",
    "make spending feel like optional acceleration rather than the only realistic route to competitiveness",
    "improve value and give ordinary players a believable path forward"
  ],
  "Armaments / Weapon Transcendence": [
    "reconsider the cost and power gap created by Armaments and Weapon Transcendence",
    "add realistic catch-up mechanics and more accessible materials",
    "slow the progression ceiling and protect previous player investment"
  ],
  "Matchmaking": [
    "match alliances using active fighters, top-player strength, troop tiers and previous war performance",
    "reduce extreme mismatches that make wars feel decided before they begin",
    "prioritise competitive wars rather than matching mostly by overall Might"
  ],
  "Power creep": [
    "make new systems add strategic options instead of replacing previous investments",
    "buff and rework older heroes and systems so they remain useful",
    "slow power creep so players have time to benefit from what they build"
  ],
  "Heroes and catch-up": [
    "increase fragment availability and introduce stronger catch-up mechanics",
    "make older and newer heroes more achievable for ordinary players",
    "reduce the gap between established accounts and newer or lower-spending players"
  ],
  "Event rewards": [
    "make war rewards reflect the troops, healing, speedups, resources and time players invest",
    "reward meaningful team contribution, not only easy personal scoring",
    "improve incentives for rallies, garrisons, objectives and sustained participation"
  ],
  "Game complexity": [
    "simplify or consolidate overlapping systems, currencies and upgrade paths",
    "make it clearer what players should prioritise",
    "reduce complexity that adds friction without adding meaningful strategy"
  ],
  "Too many major updates": [
    "slow the pace of major progression releases",
    "give players time to understand, develop and enjoy existing systems",
    "space out large updates so progression feels sustainable"
  ],
  "Bugs / performance": [
    "prioritise stability, lag, crashes and interface performance alongside monetisation updates",
    "improve technical reliability during important events",
    "invest more visibly in game quality and performance"
  ]
};

function pick<T>(arr:T[], seed:number) {
  return arr[Math.abs(seed) % arr.length];
}

function hash(s:string) {
  let h = 2166136261;
  for (let i=0;i<s.length;i++){ h ^= s.charCodeAt(i); h = Math.imul(h,16777619); }
  return h >>> 0;
}

export default function Home() {
  const [route,setRoute] = useState<Route>("email");
  const [issue,setIssue] = useState(issues[0]);
  const [tone,setTone] = useState<Tone>("firm");
  const [playerType,setPlayerType] = useState<PlayerType>("low spender");
  const [years,setYears] = useState("2");
  const [love,setLove] = useState("the friends and alliance I have built");
  const [impact,setImpact] = useState("it is becoming harder to keep up and harder to justify spending");
  const [platform,setPlatform] = useState("X / Facebook / Reddit");
  const [version,setVersion] = useState(0);
  const [generated,setGenerated] = useState(false);
  const [copied,setCopied] = useState(false);

  const output = useMemo(() => {
    const seed = hash([route,issue,tone,playerType,years,love,impact,platform,version].join("|"));
    const opening = pick(openings, seed);
    const request = pick(issueRequests[issue], seed >> 2);
    const closing = pick(closings, seed >> 4);
    const toneLine = tone === "emotional"
      ? "What worries me most is that players who have invested years into the game are starting to feel pushed away."
      : tone === "firm"
      ? "The current direction is making it increasingly difficult to justify continued time and spending."
      : "I hope IGG can consider how these changes are affecting long-term player confidence.";

    if (route === "email") {
      return `${opening}\n\nI have played for about ${years} year${years === "1" ? "" : "s"} and I am a ${playerType}. I still enjoy the game because of ${love}.\n\nMy biggest concern right now is ${issue.toLowerCase()}. For me, ${impact}. ${toneLine}\n\nI would like IGG to ${request}.\n\nI am not asking for everything to be free. I am asking for progression, competition and spending to feel sustainable and worth investing in.\n\n${closing}`;
    }

    if (route === "discord") {
      return `I wanted to raise something about ${issue.toLowerCase()}.\n\nI have been playing for around ${years} year${years === "1" ? "" : "s"}, and what still keeps me here is ${love}. But lately, ${impact}.\n\nFor me, this is not about wanting everything for free. I think IGG needs to ${request}.\n\nCurious how others feel about this too. If you disagree, say so - I would rather we have a real discussion than everyone stay quiet.`;
    }

    if (route === "public") {
      return `${opening}\n\nI have played Doomsday for around ${years} year${years === "1" ? "" : "s"}, and I am still here because of ${love}. But ${issue.toLowerCase()} is becoming difficult to ignore: ${impact}.\n\nIGG, please ${request}.\n\nWe are not asking for a free game. We are asking for a healthier one.\n\n#PlayersFirst #DoomsdayLastSurvivors`;
    }

    if (route === "video") {
      return `HOOK:\n"I still play Doomsday because of ${love}. But I am worried about where the game is heading."\n\nSCRIPT:\n"I have played for around ${years} year${years === "1" ? "" : "s"}, and I am a ${playerType}.\n\nMy biggest concern right now is ${issue.toLowerCase()}. For me, ${impact}.\n\nI am not asking for everything to be free. I want IGG to ${request}.\n\nI am speaking up because I still care about the game, and I want players like me to have a reason to stay."\n\nTIP:\nFilm vertically, one take, 30–60 seconds. Speak naturally. No fancy editing needed.`;
    }

    return `CREATOR PACK - ${issue.toUpperCase()}\n\nHOOK:\n"${pick([
      "The problem is not that Doomsday makes money. The problem is what players are getting for that money.",
      "Players are not asking IGG to make Doomsday free. They are asking for a game worth investing in.",
      "How long should an investment in a mobile game stay relevant before the next system replaces it?",
      "Doomsday players still care. That is exactly why they are getting louder."
    ], seed)}"\n\nCORE ANGLE:\n- Main issue: ${issue}\n- Personal/community impact: ${impact}\n- Constructive request: IGG should ${request}\n\n30–60 SEC SCRIPT:\n"${opening} The issue I want to focus on is ${issue.toLowerCase()}. Players can accept monetisation, but they also need to believe that time, effort and spending have lasting value. Right now, ${impact}. IGG should ${request}. We are speaking up because we want Doomsday to succeed, not because we want it to fail."\n\nB-ROLL:\n- Relevant game system/menu\n- War or alliance footage\n- Older vs newer progression examples\n\nON-SCREEN TEXT:\n"WE LOVE THE GAME. WE WANT IT BETTER."\n\nCTA:\n"Share your own experience. One community, many voices."`;
  }, [route,issue,tone,playerType,years,love,impact,platform,version]);

  function generateDraft() {
    setGenerated(true);
    setCopied(false);
    window.setTimeout(() => document.getElementById("draft")?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  }

  async function copyOutput() {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
    } catch {
      alert("Copy is unavailable here. Select the text manually.");
    }
  }

  function anotherVersion() {
    setVersion(v=>v+1);
    setCopied(false);
  }

  function chooseAnotherAction() {
    setGenerated(false);
    setCopied(false);
    window.scrollTo({top: 0, behavior: "smooth"});
  }

  return (
    <main className="wrap">
      <section className="hero">
        <div className="kicker">Players First</div>
        <h1>One community.<br/>Many voices.</h1>
        <p className="subtitle">Pick one small action. We will help you say it in your own voice.</p>
      </section>

      <section className="panel primary-panel">
        <div className="stephead">
          <span className="stepnum">1</span>
          <div>
            <h2>How do you want to help?</h2>
            <p>Choose whatever feels comfortable today.</p>
          </div>
        </div>

        <div className="grid actions compact-actions">
          {(Object.keys(routeMeta) as Route[]).map(r => (
            <button key={r} className={`choice ${route===r ? "active":""}`} onClick={()=>{setRoute(r); setGenerated(false);}}>
              <strong>{routeMeta[r].title}</strong>
              <div className="choice-meta"><span>{routeMeta[r].time}</span><span>{routeMeta[r].desc}</span></div>
            </button>
          ))}
        </div>

        <button className="easy-link" onClick={()=>{setRoute("email"); setGenerated(false);}}>
          Not sure? Start with private feedback to IGG →
        </button>
      </section>

      <section className="panel">
        <div className="stephead">
          <span className="stepnum">2</span>
          <div>
            <h2>What matters most to you?</h2>
            <p>Two quick choices are enough. Everything else is optional.</p>
          </div>
        </div>

        <div className="quick-controls">
          <label>Biggest issue
            <select value={issue} onChange={e=>setIssue(e.target.value)}>
              {issues.map(i=><option key={i}>{i}</option>)}
            </select>
          </label>
          <label>Tone
            <select value={tone} onChange={e=>setTone(e.target.value as Tone)}>
              <option value="calm">Calm</option>
              <option value="firm">Firm</option>
              <option value="emotional">Personal / emotional</option>
            </select>
          </label>
        </div>

        <details className="personalise">
          <summary>Make it more personal <span>optional</span></summary>
          <div className="personal-grid">
            <label>Player type
              <select value={playerType} onChange={e=>setPlayerType(e.target.value as PlayerType)}>
                <option>F2P</option>
                <option>low spender</option>
                <option>moderate spender</option>
                <option>heavy spender</option>
              </select>
            </label>
            <label>Years played
              <input value={years} onChange={e=>setYears(e.target.value)} inputMode="decimal" />
            </label>
            <label className="wide">What keeps you playing?
              <textarea value={love} onChange={e=>setLove(e.target.value)} />
            </label>
            <label className="wide">How is this issue affecting you?
              <textarea value={impact} onChange={e=>setImpact(e.target.value)} />
            </label>
            {route === "public" && (
              <label className="wide">Where are you posting?
                <input value={platform} onChange={e=>setPlatform(e.target.value)} />
              </label>
            )}
          </div>
        </details>

        <button className="btn generate" onClick={generateDraft}>Create my draft</button>
      </section>

      {generated && (
        <section className="panel draft-panel" id="draft">
          <div className="stephead">
            <span className="stepnum">3</span>
            <div>
              <h2>Your draft</h2>
              <p>Edit anything you like. It should sound like you.</p>
            </div>
          </div>

          <div className="draft-meta">
            <span className="badge">{routeMeta[route].title}</span>
            <span className="badge">{issue}</span>
          </div>
          <div className="result">{output}</div>
          <div className="btnrow">
            <button className="btn" onClick={copyOutput}>{copied ? "Copied ✓" : "Copy draft"}</button>
            <button className="btn secondary" onClick={anotherVersion}>Try another version</button>
          </div>
          <p className="note">Best result: change one line so it sounds unmistakably like you. Different players should send different messages.</p>

          {copied && (
            <div className="done-strip">
              <strong>Nice — you took action.</strong>
              <button className="text-button" onClick={chooseAnotherAction}>Give me another action →</button>
            </div>
          )}
        </section>
      )}

      <p className="footer">Community project. Participation is voluntary. Criticise decisions, not people. No harassment, fake reviews or fabricated claims.</p>
    </main>
  );
}
