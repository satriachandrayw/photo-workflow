const it = $input.first().json;
// Prefer swapped image url if present, else generated url
let portrait_url = it?.output?.url || it?.result?.url || it?.gen?.url || null;
// Some providers return base64; if so, keep in json for downstream (remove.bg accepts URL or file).
let portrait_b64 = it?.output?.b64 || it?.result?.b64 || it?.gen?.b64 || null;
return [{ json: { ...it, portrait: { url: portrait_url, b64: portrait_b64 } } }];
