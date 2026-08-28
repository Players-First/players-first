export type Tone = "calm" | "firm" | "emotional";
export type Route = "email" | "discord" | "public" | "video" | "creator";
export type Platform = "Facebook" | "Instagram" | "TikTok" | "X" | "Reddit";

export type DraftContext = {
  route: Route; tone: Tone; issue: string; playerType: string; years: string;
  love: string; impact: string; platform: Platform; version: number;
};

const requests: Record<string,string[]> = {
  "Pay-to-win / cost":["make progression affordable enough that ordinary players can still compete","improve value and strengthen realistic non-paid progression","make spending optional acceleration rather than the only believable route forward"],
  "Armaments / Weapon Transcendence":["reconsider the cost and power gap created by Armaments and Weapon Transcendence","add stronger catch-up paths and accessible materials","slow this progression ceiling and protect earlier player investment"],
  "Matchmaking":["match alliances using active fighters, top strength, troop tiers and recent war performance","reduce extreme mismatches that feel decided before fighting begins","prioritise competitive wars instead of relying mainly on overall Might"],
  "Power creep":["make new systems add strategy instead of replacing previous investment","rework older heroes and systems so they retain value","slow power creep enough for players to enjoy what they build"],
  "Heroes and catch-up":["increase fragment availability and introduce stronger catch-up mechanics","make useful heroes more achievable for ordinary players","reduce the gap between established accounts and newer players"],
  "Event rewards":["make rewards reflect the troops, healing, speedups, resources and time players spend","reward meaningful team contribution and objectives","improve incentives for rallies, garrisons and sustained participation"],
  "Game complexity":["simplify overlapping systems, currencies and upgrade paths","make progression priorities clearer","reduce complexity that adds friction without meaningful strategy"],
  "Too many major updates":["slow the pace of major progression releases","give players time to develop and enjoy existing systems","space out large updates so progression feels sustainable"],
  "Bugs / performance":["prioritise stability, lag and crashes alongside monetisation updates","improve reliability during important events","invest more visibly in game quality and performance"]
};

const openings: Record<Tone,string[]> = {
  calm:["I am sharing this in good faith because I still care about Doomsday: Last Survivors.","I would like to raise a concern constructively because I want Doomsday to remain healthy long-term.","I know a live game needs monetisation and change, but I hope IGG will consider the player experience here."],
  firm:["The current direction of Doomsday: Last Survivors needs serious reconsideration.","I want to be clear: this issue is making continued time and spending increasingly difficult to justify.","Players can accept monetisation, but the current balance has gone too far."],
  emotional:["I am speaking up because I genuinely do not want to lose a game and community that mean a lot to me.","It is difficult watching something I have invested so much time in become harder to enjoy.","I am frustrated because I still love this game, but lately it feels harder to believe my time and effort matter."]
};

function hash(s:string){let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}return h>>>0;}
function pick<T>(a:T[],seed:number){return a[Math.abs(seed)%a.length];}

export function generateEnglish(c:DraftContext){
  const seed=hash([c.route,c.issue,c.tone,c.playerType,c.years,c.love,c.impact,c.platform,c.version].join("|"));
  const req=pick(requests[c.issue],seed>>2);
  const open=pick(openings[c.tone],seed);
  const ask=c.tone==="calm"?`I hope IGG will consider steps to ${req}.`:c.tone==="firm"?`IGG needs to ${req}.`:`Please ${req}. I would much rather see the game improve than watch more people lose heart.`;
  const stance=c.tone==="calm"?"I understand the game needs to evolve and monetise, but long-term player confidence matters too.":c.tone==="firm"?"This is no longer a minor frustration. The current direction is undermining the value of time, effort and spending.":"That is hard to accept after building friendships, routines and progress around this game. I do not want to feel pushed toward walking away.";

  if(c.route==="email"){
    const player=c.years.trim()?`I have played for about ${c.years.trim()} year${c.years.trim()==="1"?"":"s"} as a ${c.playerType}. What keeps me here is ${c.love}.`:`I have been playing for a while as a ${c.playerType}. What keeps me here is ${c.love}.`;
    const concern=`My biggest concern right now is ${c.issue.toLowerCase()}. For me, ${c.impact}.`;
    const close=c.tone==="calm"?"Thank you for considering this feedback. I hope IGG can find a healthier balance for both the game and its players.":c.tone==="firm"?"Please treat this as serious player feedback. A healthier balance would give more of us a reason to stay, compete and support the game.":"I am saying this because I still want Doomsday to succeed. Please give players a reason to feel hopeful about where the game is going.";
    const variants=[[open,player,concern,stance,ask,close],[concern,open,player,stance,ask,close],[player,open,concern,ask,stance,close],[open,concern,stance,player,ask,close]];
    return variants[(seed>>>6)%variants.length].join("\n\n");
  }

  if(c.route==="discord"){
    if(c.tone==="calm") return `Wanted to get everyone’s thoughts on ${c.issue.toLowerCase()}. For me, ${c.impact}. I still enjoy the game because of ${c.love}, and I think a constructive improvement would be for IGG to ${req}. How are you all experiencing it?`;
    if(c.tone==="firm") return `I think we need to talk seriously about ${c.issue.toLowerCase()}. ${c.impact}. This is getting harder to dismiss as “just another update.” IGG needs to ${req}. Do you agree, or see it differently?`;
    return `I’m getting pretty discouraged by ${c.issue.toLowerCase()}. I’m still here because of ${c.love}, but ${c.impact}. It sucks seeing people lose motivation over this. I really want IGG to ${req}. How is everyone else feeling?`;
  }

  if(c.route==="public"){
    const lead=c.tone==="calm"?"Constructive player feedback:":c.tone==="firm"?"IGG, this needs attention:":"I really don’t want to feel this way about a game I still love:";
    if(c.platform==="X") return `${lead} ${c.issue} is making it harder to stay invested. ${c.tone==="firm"?"Please act":"Please listen"}: ${req}. ${c.tone==="emotional"?"I want a reason to stay.":"We want a healthier game, not a free one."} #PlayersFirst`;
    if(c.platform==="TikTok") return `${lead} ${c.issue}. ${c.impact}. IGG, please ${req}. ${c.tone==="emotional"?"We care enough to speak up.":"Players first."} #PlayersFirst #DoomsdayLastSurvivors`;
    if(c.platform==="Reddit") return `${lead}\n\nI still play because of ${c.love}, but ${c.impact}. My concern is ${c.issue.toLowerCase()}. ${c.tone==="calm"?"A reasonable change would be":"IGG now needs"} to ${req}. ${c.tone==="emotional"?"I really don’t want to watch more people drift away from the game.":"How are other players experiencing this?"}`;
    return `${lead}\n\nI still care about Doomsday because of ${c.love}, but ${c.issue.toLowerCase()} is becoming difficult to ignore. ${c.impact}.\n\n${ask}\n\n${c.tone==="emotional"?"I am speaking up because I still want this game to be worth caring about.":c.tone==="calm"?"I hope this can be taken as constructive feedback from players who want the game to improve.":"We are not asking for a free game. We are asking for a healthier one."}\n\n#PlayersFirst #DoomsdayLastSurvivors`;
  }

  if(c.route==="video"){
    const hook=c.tone==="calm"?`I want to give some constructive feedback about ${c.issue.toLowerCase()}.`:c.tone==="firm"?`${c.issue} has reached a point where IGG needs to act.`:`I still love Doomsday — and that’s exactly why ${c.issue.toLowerCase()} is so frustrating.`;
    const body=c.tone==="calm"?`I still play because of ${c.love}. For me, ${c.impact}. I understand the game needs monetisation, but I hope IGG will ${req}. A healthier balance would help players stay confident in the game.`:c.tone==="firm"?`For me, ${c.impact}. This is not just another minor complaint. IGG needs to ${req}. Players can accept spending, but they need to believe their investment will retain value.`:`I’m still here because of ${c.love}, but ${c.impact}. That honestly makes it harder to stay excited about a game I’ve invested myself in. Please ${req}. I’m speaking up because I don’t want to walk away.`;
    return `HOOK\n${hook}\n\n30–60 SEC SCRIPT\n${body}\n\nRECORDING TIP\nFilm vertically, speak naturally, and show one relevant game screen if you can.`;
  }

  const framing=c.tone==="calm"?"Balanced / constructive":c.tone==="firm"?"Direct / accountability":"Personal / emotional";
  const thesis=c.tone==="calm"?`IGG can monetise Doomsday while still protecting long-term player confidence. ${c.issue} is where the balance currently feels off.`:c.tone==="firm"?`${c.issue} is undermining the perceived value of time, effort and spending. IGG needs to address it before disengagement becomes harder to reverse.`:`Players are emotionally invested in Doomsday through alliances, friendships and years of progress. ${c.issue} is making some question whether that investment still matters.`;
  const hooks=c.tone==="calm"?[`Can Doomsday monetise aggressively without making players feel left behind?`,`Here’s a constructive look at ${c.issue}.`,`Players aren’t asking for a free game — they’re asking for confidence.`]:c.tone==="firm"?[`${c.issue}: this is where IGG needs to draw the line.`,`How much power creep is too much?`,`Players are not infinite wallets — and retention has a limit.`]:[`I still love Doomsday. I’m just not sure Doomsday still loves its players back.`,`The hardest part isn’t spending — it’s watching your investment lose meaning.`,`Why are long-term players starting to sound tired instead of excited?`];
  return `CREATOR BRIEF — ${c.issue.toUpperCase()}\n\nTONE / FRAMING\n${framing}\n\nTHESIS\n${thesis}\n\nHOOK OPTIONS\n1. ${hooks[0]}\n2. ${hooks[1]}\n3. ${hooks[2]}\n\nKEY ARGUMENTS\n• What players still value: ${c.love}.\n• Personal/community impact: ${c.impact}.\n• Constructive request: IGG should ${req}.\n• Fair framing: F2P, spenders and whales all need a healthy ecosystem.\n\nEVIDENCE TO GATHER\n• Relevant in-game screenshots and upgrade requirements.\n• Before/after examples if discussing power creep.\n• Match screenshots and active-fighter context if discussing matchmaking.\n• Event reward and resource-cost screenshots if discussing rewards.\n• Player comments only with permission or identifying details removed.\n\nDO NOT OVERCLAIM\nSeparate personal experience, community estimates and verified facts.\n\nCOUNTERPOINT TO ADDRESS\nIGG needs monetisation to operate the game. Sustainable monetisation still depends on players believing their investment has lasting value.\n\nON-SCREEN TEXT\n${c.tone==="calm"?"A HEALTHIER BALANCE BENEFITS EVERYONE.":c.tone==="firm"?"SPENDING SHOULD FEEL LIKE PROGRESS — NOT RENTING RELEVANCE.":"WE CARE. THAT'S WHY WE'RE SPEAKING UP."}\n\nCTA\nShare your own experience in your own words. One community. Many voices.`;
}

export const localizedTone: Record<string,Record<Tone,string>> = {
  Español:{calm:"Comparto esto de forma constructiva y espero que IGG considere cómo afecta esta situación a la confianza de los jugadores.",firm:"La situación actual necesita un cambio real; cada vez es más difícil justificar seguir invirtiendo tiempo y dinero en estas condiciones.",emotional:"Me frustra decirlo porque todavía me importa mucho el juego, pero empieza a sentirse como si el tiempo y el esfuerzo de los jugadores valieran cada vez menos."},
  Português:{calm:"Compartilho isso de forma construtiva e espero que a IGG considere como essa situação afeta a confiança dos jogadores.",firm:"A situação atual precisa de uma mudança real; está cada vez mais difícil justificar continuar investindo tempo e dinheiro nessas condições.",emotional:"É frustrante dizer isso porque ainda me importo muito com o jogo, mas começa a parecer que o tempo e o esforço dos jogadores valem cada vez menos."},
  Français:{calm:"Je partage cela de manière constructive et j'espère qu'IGG prendra en compte l'effet de cette situation sur la confiance des joueurs.",firm:"La situation actuelle exige un vrai changement ; il devient de plus en plus difficile de justifier davantage de temps et d'argent dans ces conditions.",emotional:"C'est frustrant à dire parce que ce jeu compte encore beaucoup pour moi, mais j'ai de plus en plus l'impression que le temps et les efforts des joueurs perdent leur valeur."},
  Deutsch:{calm:"Ich teile dieses Feedback konstruktiv und hoffe, dass IGG berücksichtigt, wie sich diese Situation auf das Vertrauen der Spieler auswirkt.",firm:"Die aktuelle Situation braucht eine echte Veränderung; unter diesen Bedingungen wird es immer schwieriger, weitere Zeit und Geld zu rechtfertigen.",emotional:"Es ist frustrierend, das zu sagen, weil mir das Spiel noch immer viel bedeutet, aber es fühlt sich zunehmend so an, als würden Zeit und Einsatz der Spieler weniger zählen."}
};