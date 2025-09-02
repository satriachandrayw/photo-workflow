const it = $input.first().json;
// Basic heuristic: honor meta.forceSwap flag; otherwise, swap if accessories suggest headwear or glasses (to better lock identity).
const headwear = it.subject?.accessories?.headwear || 'none';
const glasses = it.subject?.accessories?.glasses || 'none';
const should = it.meta.forceSwap || headwear !== 'none' || glasses !== 'none';
return [{ json: { ...it, shouldSwap: should } }];
