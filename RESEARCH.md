# Source notes, 22 November 2026

These pages were read to ground the problem and implementation. Their authors do not endorse SolidFrame. No implementation was copied from the listed projects.

- Flameshot issue2439, historical community request about pixelation and a reply suggesting a solid box. Closed issue, not a claim of a current unmet Flameshot feature: https://github.com/flameshot-org/flameshot/issues/2439
- Flameshot pull request3765, merged change to pseudo-pixelation with a stated concern that the fringe may still reveal information. SolidFrame uses solid replacement pixels instead, and does not claim the current Flameshot algorithm is equivalent to old pixelation: https://github.com/flameshot-org/flameshot/pull/3765
- Screenshot.rocks guide, practical recommendation to use a fully opaque solid box and flatten the output rather than leave an editable overlay. Secondary how-to source, not a formal security proof: https://screenshot.rocks/guides/redact-screenshots/
- Existing alternative, image-pii-redactor: browser OCR/NER identification and canvas export. Useful when automatic suggestions are wanted. SolidFrame is deliberately manual and downloads no models: https://github.com/athal7/image-pii-redactor
- MDN Canvas toBlob documentation: canvas can produce a PNG Blob for a newly encoded file. This does not by itself prove every sensitive detail was removed: https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob
- Svelte documentation: compiler-based UI framework used for this app. No server framework is required for the bundled local file: https://svelte.dev/docs/svelte/overview

## Scope judgment

The problem is real, but screenshot redaction tools already exist. The useful small-project boundary is a single local Svelte file, manual opaque covers, original-pixel coordinates, actual-size inspection, a review gate for the flattened export and tests of the encoded pixels. No claim of novelty, full anonymity, automatic detection, professional document redaction or guaranteed metadata removal is made.
