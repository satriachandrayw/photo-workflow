# n8n HTTP Request cURL imports

Copy one cURL at a time into n8n HTTP Request node via: HTTP Request node -> three-dot menu -> Import from cURL.
Replace placeholder values like <...> with your values after import.

---

## 1) AILabTools — Face Analysis

curl -X POST 'https://api.ailabtools.com/v1/face/analyze' \
  -H 'X-API-KEY: <AILABTOOLS_API_KEY>' \
  -H 'Content-Type: application/json' \
  --data-raw '{
    "image_url": "<IMAGE_URL>"
  }'

Notes:
- Set X-API-KEY to your AILabTools API key.
- image_url should point to the subject image.

---

## 2) Together — Flux 1 Schnell (Image Generation)

curl -X POST 'https://api.together.xyz/v1/images/generate' \
  -H 'Authorization: Bearer <TOGETHER_API_KEY>' \
  -H 'Content-Type: application/json' \
  --data-raw '{
    "model": "black-forest-labs/flux-1-schnell",
    "prompt": "<PROMPT>",
    "width": 1536,
    "height": 2048,
    "steps": 20,
    "n": 1,
    "seed": 1337,
    "guidance": 3.5
  }'

Notes:
- Replace <PROMPT> with the constructed prompt from your mapping node.
- width/height/seed are example values; adjust as needed.

---

## 3) VModel — Face Swap

curl -X POST 'https://api.vmodel.ai/v1/face-swap' \
  -H 'Authorization: Bearer <VMODEL_API_KEY>' \
  -H 'Content-Type: application/json' \
  --data-raw '{
    "source_image_url": "<SOURCE_IMAGE_URL>",
    "target_image_url": "<TARGET_IMAGE_URL>",
    "output_format": "png"
  }'

Notes:
- source_image_url: the original person image (from the request input).
- target_image_url: the generated image URL from the Together step.

---

## 4) remove.bg — Background Removal and Fill Color

curl -X POST 'https://api.remove.bg/v1.0/removebg' \
  -H 'X-Api-Key: <REMOVEBG_API_KEY>' \
  -F "image_url=<PORTRAIT_URL>" \
  -F "bg_color=#014431"

Notes:
- bg_color is set to the theme color #014431. Replace as needed, e.g. with your environment value.
- You can also provide an uploaded file instead of image_url using: -F "image_file=@/path/to/file.png".

