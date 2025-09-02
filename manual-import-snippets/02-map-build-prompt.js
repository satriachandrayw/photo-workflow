const inItem = $input.first();
const r = inItem.json; // HTTP node response from Describe
const prev = $node["Preprocess"].json || {};
const meta = prev.meta || {};

// Best-effort parsing (adjust to match AILabTools schema)
const subject = {
  hair: { length: r?.data?.hair?.length || r?.hair?.length || null,
          color:  r?.data?.hair?.color  || r?.hair?.color  || null,
          texture:r?.data?.hair?.texture|| r?.hair?.texture|| null },
  eyes: { color: r?.data?.eye?.color || r?.eye?.color || null,
          shape: r?.data?.eye?.shape || r?.eye?.shape || null },
  eyebrows: { thickness: r?.data?.eyebrow?.thickness || r?.eyebrow?.thickness || null,
              shape:     r?.data?.eyebrow?.shape     || r?.eyebrow?.shape     || null },
  skin: { tone: r?.data?.skin?.tone || r?.skin?.tone || null,
          texture: r?.data?.skin?.texture || r?.skin?.texture || null },
  facial_hair: r?.data?.beard?.type || r?.beard?.type || 'clean-shaven',
  marks: (r?.data?.marks || r?.marks || []).slice(0,3),
  accessories: {
    glasses: r?.data?.eye?.glass || r?.eye?.glass || 'none', // none|regular|sunglasses
    mask: r?.data?.mask || r?.mask || 'none',
    headwear: (r?.data?.hat?.style || r?.hat?.style) ? 'headwear' : 'none',
    headwearColor: r?.data?.hat?.color || r?.hat?.color || null,
  }
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
