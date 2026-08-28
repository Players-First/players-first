// Light-touch cleanup for player-written personalization.
// Deliberately conservative: preserve meaning/voice and never invent details.
export function polishUserText(text:string, language:string){
  let s=text.trim().replace(/\s+/g," ").replace(/\s+([,.;!?])/g,"$1").replace(/([,.;!?])(?=[A-Za-z])/g,"$1 ");
  if(!s) return s;

  if(language==="English"){
    const fixes:[RegExp,string][]=[
      [/\btheres\b/gi,"there's"],
      [/\bdont\b/gi,"don't"],
      [/\bdoesnt\b/gi,"doesn't"],
      [/\bcant\b/gi,"can't"],
      [/\bwont\b/gi,"won't"],
      [/\bisnt\b/gi,"isn't"],
      [/\barent\b/gi,"aren't"],
      [/\bim\b/gi,"I'm"],
      [/\bive\b/gi,"I've"],
      [/\bid\b/gi,"I'd"],
      [/\btoo much paying elements\b/gi,"too many paid elements"],
      [/\bpaying elements\b/gi,"paid elements"],
      [/\btoo much paid elements\b/gi,"too many paid elements"],
      [/\btoo much elements\b/gi,"too many elements"],
      [/\bconsidering there(?:'|’)s\b/gi,"when there are"],
      [/\bto even catch up\b/gi,"just to catch up"],
      [/\bmore harder\b/gi,"harder"],
      [/\bmore easier\b/gi,"easier"],
      [/\balot\b/gi,"a lot"],
      [/\beverytime\b/gi,"every time"],
    ];
    for(const [pattern,replacement] of fixes) s=s.replace(pattern,replacement);
    s=s.charAt(0).toUpperCase()+s.slice(1);
    if(!/[.!?…]$/.test(s)) s+=".";
  }
  return s;
}
