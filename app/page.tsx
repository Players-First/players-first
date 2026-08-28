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
  email: { title: "Send feedback to IGG", time: "~2 min", desc: "Private, direct, constructive feedback." },
  discord: { title: "Post in your community", time: "~2 min", desc: "Share your view in Discord or alliance chat." },
  public: { title: "Post publicly", time: "~2–5 min", desc: "Post on your own social account or tag IGG / Doomsday." },
  video: { title: "Make a short player video", time: "~5 min", desc: "A simple 30–60 second personal video. No editing required." },
  creator: { title: "Creator mode", time: "~10+ min", desc: "Hooks, script, B-roll and CTA for creators." }
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
      return `HOOK:\n"I still play Doomsday because of ${love}. But I am worried about where the game is heading."\n\nSCRIPT:\n"I have played for around ${years} year${years === "1" ? "" : "s"}, and I am a ${playerType}.\n\nMy biggest concern right now is ${issue.toLowerCase()}. For me, ${impact}.\n\nI am not asking for everything to be free. I want IGG to ${request}.\n\nI am speaking up because I still care about the game, and I want players like me to have a reason to stay."\n\nRECORDING TIP:\nFilm vertically, one take, 30-60 seconds. Speak naturally - do not worry about perfect editing.`;
    }

    return `CREATOR PACK - ${issue.toUpperCase()}\n\nHOOK:\n"${pick([
  "The problem is not that Doomsday makes money. The problem is what players are getting for that money.",
  "Players are not asking IGG to make Doomsday free. They are asking for a game worth investing in.",
  "How long should an investment in a mobile game stay relevant before the next system replaces it?",
  "Doomsday players still care. That is exactly why they are getting louder."
], seed)}"\n\nCORE ANGLE:\n- Long-term player perspective\n- Main issue: ${issue}\n- Personal/community impact: ${impact}\n- Constructive request: IGG should ${request}\n\n30-60 SEC SCRIPT:\n"${opening} The issue I want to focus on is ${issue.toLowerCase()}. Players can accept monetisation, but they also need to believe that time, effort and spending have lasting value. Right now, ${impact}. IGG should ${request}. We are speaking up because we want Doomsday to succeed, not because we want it to fail."\n\nB-ROLL:\n- Relevant game system/menu\n- War or alliance footage\n- Older vs newer progression examples\n- Community screenshots\n\nON-SCREEN TEXT:\n"WE LOVE THE GAME. WE WANT IT BETTER."\n\nCTA:\n"Share your own experience. One community, many voices."`;
  }, [route,issue,tone,playerType,years,love,impact,platform,version]);

  async function copyOutput() {
    try { await navigator.clipboard.writeText(output); }
    catch { alert("Copy is unavailable here. Select the text manually."); }
  }

  return (
    <main className="wrap">
      <section className="hero">
        <div className="kicker">Players First</div>
        <h1>One community.<br/>Many voices.</h1>
        <p className="subtitle">
          Choose something you are comfortable doing. We will help you turn your own experience into a useful action.
          The goal is not identical copy-paste spam - it is many real players speaking in their own voices.
        </p>
      </section>

      <section className="panel">
        <h2>1. How do you want to help?</h2>
        <div className="grid actions">
          {(Object.keys(routeMeta) as Route[]).map(r => (
            <button key={r} className={`choice ${route===r ? "active":""}`} onClick={()=>setRoute(r)}>
              <strong>{routeMeta[r].title}</strong>
              <div className="small">{routeMeta[r].time}</div>
              <div className="small">{routeMeta[r].desc}</div>
            </button>
          ))}
        </div>
      </section>

      <section className="panel">
        <h2>2. Tell us just enough to make it yours</h2>
        <div className="controls">
          <label>Biggest issue
            <select value={issue} onChange={e=>setIssue(e.target.value)}>
              {issues.map(i=><option key={i}>{i}</option>)}
            </select>
          </label>
          <label>Tone
            <select value={tone} onChange={e=>setTone(e.target.value as Tone)}>
              <option value="calm">Calm</option>
              <option value="firm">Firm</option>
              <option value="emotional">Emotional</option>
            </select>
          </label>
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
        </div>
        <div className="grid" style={{marginTop:12}}>
          <label>What do you still love about the game?
            <textarea value={love} onChange={e=>setLove(e.target.value)} />
          </label>
          <label>How is this issue affecting you?
            <textarea value={impact} onChange={e=>setImpact(e.target.value)} />
          </label>
          {route === "public" && (
            <label>Where are you posting?
              <input value={platform} onChange={e=>setPlatform(e.target.value)} />
            </label>
          )}
        </div>
      </section>

      <section className="panel">
        <h2>3. Your draft</h2>
        <div className="badge">{routeMeta[route].time}</div>
        <div className="badge">{issue}</div>
        <div className="badge">{tone}</div>
        <div className="result">{output}</div>
        <div className="btnrow">
          <button className="btn" onClick={copyOutput}>Copy draft</button>
          <button className="btn secondary" onClick={()=>setVersion(v=>v+1)}>Give me another version</button>
        </div>
        <p className="note">
          Add or change at least one sentence in your own words before posting. The platform deliberately varies openings,
          requests and closings so people are not all sending the same message.
        </p>
      </section>

      <section className="panel">
        <h2>4. Done?</h2>
        <div className="grid actions">
          <div className="card"><strong>I did this</strong><div className="small">For V1 this is intentionally local-only. We can add anonymous aggregate counters later.</div></div>
          <div className="card"><strong>Give me another action</strong><div className="small">Choose a different route above and turn the same experience into another format.</div></div>
          <div className="card"><strong>I want to do more</strong><div className="small">Future route: stories, translations, evidence, graphics, alliance outreach and community projects.</div></div>
        </div>
      </section>

      <p className="footer">
        Community project. Participation is voluntary. Criticise decisions, not people. No harassment, fabricated claims or fake reviews.
        Clearly label estimates and personal experiences.
      </p>
    </main>
  );
}
