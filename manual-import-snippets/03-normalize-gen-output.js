// Normalize provider response to {gen_image_url or gen_image_b64}
const r = $input.first().json;
// Try common shapes:
let url = r?.data?.[0]?.url || r?.output?.[0] || r?.image_url || null;
let b64 = r?.data?.[0]?.b64_json || r?.image_base64 || null;
return [{
  json: {
    ...$node["Map + Build Prompt"].json, // carry forward subject/meta/etc from Map node
    gen: { url, b64, provider: 'together/flux-schnell' }
  }
}];
