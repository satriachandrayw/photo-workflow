const inItem = $input.first();
const r = inItem.json; // HTTP node response from Describe
const prev = $node["Preprocess"].json || {};
const meta = prev.meta || {};

// Parse possible LLM-style JSON payload inside code block
function parseSubjectFromLLM(resp) {
  try {
    let text = null;
    if (Array.isArray(resp) && resp[0]?.content?.parts?.[0]?.text) {
      text = resp[0].content.parts[0].text;
    } else if (resp?.content?.parts?.[0]?.text) {
      text = resp.content.parts[0].text;
    }
    if (!text || typeof text !== 'string') return null;
    const match = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
    const jsonStr = match && match[1] ? match[1] : text;
    return JSON.parse(jsonStr);
  } catch (_) {
    return null;
  }
}

const parsed = parseSubjectFromLLM(r);
const norm = (x) => {
  if (x === undefined || x === null) return null;
  if (typeof x === 'string') {
    const t = x.trim();
    if (t === '' || t.toLowerCase() === 'null') return null;
    return t;
  }
  return x;
};

// Best-effort parsing (prefer new JSON shape, fallback to prior schema)
const subject = {
  hair: {
    length:  norm(parsed?.hair?.length)   ?? r?.data?.hair?.length   ?? r?.hair?.length   ?? null,
    color:   norm(parsed?.hair?.color)    ?? r?.data?.hair?.color    ?? r?.hair?.color    ?? null,
    texture: norm(parsed?.hair?.texture)  ?? r?.data?.hair?.texture  ?? r?.hair?.texture  ?? null,
  },
  eyes: {
    color: norm(parsed?.eyes?.color) ?? r?.data?.eye?.color ?? r?.eye?.color ?? null,
    shape: norm(parsed?.eyes?.shape) ?? r?.data?.eye?.shape ?? r?.eye?.shape ?? null,
  },
  eyebrows: {
    thickness: norm(parsed?.eyebrows?.thickness) ?? r?.data?.eyebrow?.thickness ?? r?.eyebrow?.thickness ?? null,
    shape:     norm(parsed?.eyebrows?.shape)     ?? r?.data?.eyebrow?.shape     ?? r?.eyebrow?.shape     ?? null,
  },
  skin: {
    tone:    norm(parsed?.skin?.tone)    ?? r?.data?.skin?.tone    ?? r?.skin?.tone    ?? null,
    texture: norm(parsed?.skin?.texture) ?? r?.data?.skin?.texture ?? r?.skin?.texture ?? null,
  },
  facial_hair: norm(parsed?.facial_hair) ?? r?.data?.beard?.type ?? r?.beard?.type ?? 'clean-shaven',
  marks: (Array.isArray(parsed?.marks) ? parsed.marks : (r?.data?.marks || r?.marks || [])).slice(0, 3),
  accessories: (() => {
    const pacc = parsed?.accessories || {};
    return {
      glasses:       norm(pacc.glasses)       ?? r?.data?.eye?.glass ?? r?.eye?.glass ?? 'none', // none|regular|sunglasses
      mask:          norm(pacc.mask)          ?? r?.data?.mask       ?? r?.mask       ?? 'none',
      headwear:      norm(pacc.headwear)      ?? ((r?.data?.hat?.style || r?.hat?.style) ? 'headwear' : 'none'),
      headwearColor: norm(pacc.headwearColor) ?? r?.data?.hat?.color ?? r?.hat?.color ?? null,
    };
  })(),
};

// Hijab/Headscarf fallback (very naive keyword match if description exists)
if (typeof r?.description === 'string') {
  const d = r.description.toLowerCase();
  if (/(hijab|headscarf|head scarf|shayla|khimar)/.test(d)) {
    subject.accessories.headwear = 'headscarf';
  }
}

const pose = meta.pose === 'NO_LOOK'
  ? 'loose close-up, 3/4 profile, gaze off-camera, shoulders gently angled'
  : 'loose close-up, front-facing, direct eye contact, neutral professional expression';

const acc = subject.accessories || {};
const accText = [
  acc.headwear === 'headscarf' ? 'wearing a headscarf that covers the hair' :
  (acc.headwear !== 'none' ? 'wearing headwear' : null),
  acc.glasses === 'regular' ? 'wearing thin rectangular eyeglasses' :
  (acc.glasses === 'sunglasses' ? 'wearing sunglasses' : null),
  acc.mask !== 'none' ? 'wearing a face mask' : null
].filter(Boolean).join(', ');

const subjectStr = [
  `${subject.hair.length||''} ${subject.hair.color||''} ${subject.hair.texture||''} hair`.trim(),
  `${subject.eyebrows.thickness||''} ${subject.eyebrows.shape||''} eyebrows`.trim(),
  `${subject.eyes.color||''} ${subject.eyes.shape||''} eyes`.trim(),
  `${subject.skin.tone||''} ${subject.skin.texture||''} skin`.trim(),
  subject.facial_hair || 'clean-shaven',
  accText
].filter(Boolean).join(', ');

const prompt = `Single-person portrait, ${pose}. Subject exactly matches: ${subjectStr}. ` +
               `Studio lighting: soft key at 45°, gentle fill; realistic skin texture; chest-up framing; 4:3; natural color. ` +
               `Background: plain neutral temporary background (will be replaced).`;


return [{
  json: {
    subject,
    meta,
    generation: {
      prompt,
      seed: meta.seed,
      width: meta.outWidth,
      height: meta.outHeight
    },
    // pass through source info carried from Preprocess
    sourceType: prev.sourceType,
    image_url:  prev.image_url,
    binaryProperty: prev.binaryProperty
  }
}];
