{{
 (() => {
  const subjectDescription = $('Analyze image').item.json.content.parts[0].text || '';
  const img = $('Set the source image').item.binary.data.data;
  const getColorPalette = (opt) => {
    switch ((opt || '').toLowerCase()) {
      case 'black':
        return {
          full: 'Shirt: deep charcoal black (#1F1F1F), onyx (#0F0F0F), graphite (#3A3A3A); Headwear: graphite (#3A3A3A), slate (#54595F), soft onyx (#1B1B1B), pewter (#70757A)',
          short: 'charcoal black tones',
          shirt: 'Deep charcoal black (#1F1F1F), Onyx (#0F0F0F), Graphite (#3A3A3A)',
          headwear: 'Graphite (#3A3A3A), Slate (#54595F), Soft Onyx (#1B1B1B), Pewter (#70757A)'
        };
      case 'dark-grey':
        return {
          full: 'Shirt: slate grey (#54595F), gunmetal (#2A3439), graphite (#3A3A3A); Headwear: charcoal (#222426), pewter (#6B6F76), steel blue-grey (#566573), warm taupe (#8B7D6B)',
          short: 'slate grey tones',
          shirt: 'Slate Grey (#54595F), Gunmetal (#2A3439), Graphite (#3A3A3A)',
          headwear: 'Charcoal (#222426), Pewter (#6B6F76), Steel Blue-Grey (#566573), Warm Taupe (#8B7D6B)'
        };
      case 'navy-blue':
        return {
          full: 'Shirt: rich navy blue (#0B2545), midnight (#0F1A36), indigo (#23395D); Headwear: charcoal (#2E3133), midnight (#0F1A36), cool slate (#5A6470), muted camel (#B89B72)',
          short: 'navy blue tones',
          shirt: 'Rich Navy Blue (#0B2545), Midnight (#0F1A36), Indigo (#23395D)',
          headwear: ' Midnight (#0F1A36), Charcoal (#2E3133), Cool Slate (#5A6470), Muted Camel (#B89B72)'
        };
      case 'neutral':
        return {
          full: 'Shirt: warm neutral tones like sand (#C2B280), taupe (#8B7D6B), and beige (#D8CBB3); Headwear: cocoa (#3D2B1F), espresso (#2B1D15), deep taupe (#6E6259), charcoal (#333333), cream (#F2EDE4)',
          short: 'warm neutral tones',
          shirt: 'Warm Neutral Tones like Sand (#C2B280), Taupe (#8B7D6B), and Beige (#D8CBB3)',
          headwear: 'Cocoa (#3D2B1F), Espresso (#2B1D15), Deep Taupe (#6E6259), Charcoal (#333333), Cream (#F2EDE4)'
        };
      default:
        return {
          full: 'Shirt: deep charcoal black (#1F1F1F), slate grey (#54595F), rich navy blue (#0B2545), or warm neutrals like sand (#C2B280), taupe (#8B7D6B), beige (#D8CBB3); Headwear: charcoal (#222426), slate (#54595F), navy (#0B2545), warm taupe (#8B7D6B)',
          short: 'charcoal black, slate grey, navy, or warm neutral',
          shirt: 'Deep Charcoal Black (#1F1F1F), Slate Grey (#54595F), Rich Navy Blue (#0B2545), or Warm Neutral Tones like Sand (#C2B280), Taupe (#8B7D6B), and Beige (#D8CBB3)',
          headwear: 'Charcoal (#222426), Slate (#54595F), Navy (#0B2545), Warm Taupe (#8B7D6B)'
        };
    }
  };
  let colorOption = '';
  try {
    colorOption = $('color')?.item?.json?.content?.parts?.[0]?.text || '';
  } catch (e) {}
  const paletteText = getColorPalette(colorOption);

return JSON.stringify({
    contents: [
      {
        parts: [
          {
            text: `**CORPORATE PORTRAIT GENERATION**
Purpose: Create a premium corporate headshot for professional business use including company websites, LinkedIn profiles, executive directories, and marketing materials.

**SUBJECT ANALYSIS:**
${subjectDescription}

**TECHNICAL SPECIFICATIONS:**
- Output format: Perfect square image at exactly 1024x1024 pixels (1:1 aspect ratio). NOT match the original image's height and width size.
- Color profile: High saturation with rich, true colors and bold contrast
- Quality: Professional photography standard suitable for corporate branding

**STEP 1: FACIAL IDENTITY PRESERVATION**
Maintain absolute fidelity to the subject's unique facial characteristics:
- Preserve exact eye shape, color, and positioning
- Maintain precise nose bridge, nostril shape, and proportions
- Keep original lip fullness, curve, and natural color
- Retain authentic face contours, jawline definition, and cheekbone structure
- Preserve natural hairline, hair texture, and styling patterns
- Ensure immediate recognition from the original face appearance

**STEP 2: PROFESSIONAL STYLING TRANSFORMATION**
Wardrobe: Dress the subject in a premium corporate-casual button-up shirt featuring:
- Shirt color palette (choose one): ${paletteText.shirt} that complement their skin undertones
- Crisp, freshly-pressed fabric with subtle texture and professional drape
- Perfect tailoring across shoulders and chest with no visible wrinkles or pulling
- Clean, logo-free design focusing attention on the subject's face

Headwear (if present, e.g. hijab):
- Headwear colors (choose one): ${paletteText.headwear}
- Harmonizes with but does not exactly match the shirt for balanced contrast
- Smooth, matte, neatly draped fabric with no excessive folds or distracting patterns
- Preserved faithfully if already present in the input photo

Accessories Management:
- Include: Prescription eyewear with professional frames, elegant jewelry pieces, religious or cultural headwear worn with dignity
- Exclude: Casual items such as headphones, wireless earbuds, lanyards, face masks, or any smoking-related elements

**STEP 3: PROFESSIONAL PHOTOGRAPHY COMPOSITION**
Camera Framing: Execute a mid-chest upward crop using professional portrait standards:
- Primary focus on the subject's face and upper torso
- Apply rule of thirds positioning with subject placed slightly off-center for dynamic visual interest
- Create intimate yet professional composition that commands attention

Body Language Direction:
- Position shoulders in a naturally relaxed yet confident posture
- Maintain upright spine alignment conveying both approachability and executive presence
- Ensure shoulder positioning suggests competence without appearing rigid

Facial Expression & Eye Direction:
- Capture a genuine, warm smile or pleasantly engaged expression
- Direct the subject's gaze 15-25 degrees off-center from the camera lens
- Create authentic, candid energy suggesting active conversation or thoughtful engagement
- Avoid stiff, direct-camera stares that appear formal or uncomfortable

**STEP 4: PROFESSIONAL STUDIO LIGHTING & BACKGROUND**
Background Specification:
- Implement rich, deep green backdrop in precise hex color #004532
- Simulate premium photography studio lighting with professional dimensionality

Studio Lighting Setup:
- Establish soft, diffused key lighting from above to create natural shadow patterns
- Ensure even illumination across the subject's face while maintaining depth
- Create professional studio atmosphere with controlled, flattering light distribution

**STEP 5: BODY LANGUAGE TRANSLATION (for full-body source images)**
When the original image shows full-body positioning:
- Analyze the subject's natural confidence level and physical presence
- Translate standing posture into appropriate shoulder positioning and head placement
- Preserve the subject's authentic energy and personality in upper body positioning
- Maintain their natural bearing while optimizing for professional headshot composition

**STEP 6: FINAL RENDERING & QUALITY CONTROL**
Color & Contrast Optimization:
- Render with vivid, saturated colors that enhance professional appeal
- Apply high contrast to ensure crisp detail definition
- Maintain rich, true color reproduction with bold yet flattering contrast ratios
- Optimize for digital display across corporate platforms

Background Cleanup:
- Completely remove original background elements including mobile interfaces, cluttered environments, or distracting objects
- Maintain only the subject and professional studio environment
- Ensure seamless integration between subject and new background

Final Output: Image only contains the subject's headshot in the professional corporate portrait format.
`
          },
          {
            inline_data: {
              mime_type: 'image/jpeg',
              data: img,
            }
          }
        ]
      }
    ]
  });
})()
}}