// Normalize inputs, set defaults, compute output size and bg hex
const item = $input.first();
const body = item.json || {};
const pose = (body.pose || 'LOOK_CAMERA').toUpperCase();
const orientation = (body.orientation || 'landscape').toLowerCase();
const seed = Number.isInteger(body.seed) ? body.seed : 1337;
const outWidth = orientation === 'portrait' ? 1536 : 2048;
const outHeight = orientation === 'portrait' ? 2048 : 1536;
const forceSwap = !!body.forceSwap; // allow manual override

item.json.meta = {
  pose,
  orientation,
  seed,
  outWidth,
  outHeight,
  forceSwap,
  bgHex: $env.APP_BG_HEX || '#014431',
};

// Support both image_url and uploaded binary. If uploaded, store property name.
// n8n's Webhook binary property name defaults to 'data' if 'binaryData: true'.
if (item.binary && item.binary.data) {
  item.json.sourceType = 'binary';
  item.json.binaryProperty = 'data';
} else if (body.image_url) {
  item.json.sourceType = 'url';
  item.json.image_url = body.image_url;
} else {
  // Expect a URL; you can also add a prior node to fetch remote file into binary.
  throw new Error('Provide image_url in JSON body or upload a file in form-data "data".');
}

return [item];
