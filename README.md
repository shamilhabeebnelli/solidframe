# SolidFrame

![N inside an image frame](logo.svg)

A small Svelte app for manually covering details in a screenshot and downloading a flattened PNG copy. Local processing, no uploads, no OCR and no account.

## Open it without installing anything

Download `solidframe.html` from this repository, then open the downloaded file in a modern browser. GitHub's file viewer shows the source; it does not run the app. The HTML file bundles the UI and runtime, so it needs no server, external fonts, analytics, remote models or network connection. No live website or custom subdomain is configured.

Desktop Chromium was tested. The responsive layout was tested at a 390px mobile viewport, but not on a physical Android or iPhone. Some mobile document viewers do not execute local HTML. On those devices, open it in a browser that supports local HTML, or run the source locally on a computer. This is not an APK.

## Use it

1. Open a PNG or JPEG screenshot. Or try the built-in fictional support-ticket demo.
2. Drag across every detail to cover it with an opaque rectangle. For keyboard use or precision, enter X/Y/width/height in original-image pixels and choose **Add solid cover**.
3. Use **Actual pixel size** to inspect small text. The image scrolls inside the editor on a narrow screen. Switch back to **Fit image** when needed.
4. Undo a mistaken cover if needed. Covers expand outward by two source pixels, clipped at the image edge. Still leave a generous margin yourself.
5. Choose **Build review PNG**. Inspect the actual encoded PNG, including edges, surrounding text, tabs and avatars. The same actual-size toggle is available in the review.
6. Confirm inspection, then download `solidframe-covered.png`. Only this flattened copy should be shared. Do not share the original by mistake.

Editing a cover discards the prior export and confirmation. **Clear image** removes this page's image state; it does not delete downloads, erase the original on disk or promise secure memory erasure. Source data remains in the tab during editing. No browser storage is used.

## What it does and does not do

Covers are full-opacity RGB(17,17,17) replacements painted into a new canvas before PNG encoding. They are not movable layers in the exported file. Original image metadata is not intentionally copied; the tested export contained no EXIF or text metadata chunks. Do not interpret that one test as a guarantee about every browser's PNG encoder. Reopen your output before sharing.

This is manual image editing, not an automatic privacy detector or a certification tool. It cannot find details you missed, stop guesses from visible context or box size, revoke leaked credentials, remove originals from other places or make a file anonymous. It does not inspect text, face content or correctness of your cover choices. The inspection checkbox records your review only; it is not a security scan.

Input limits: PNG/JPEG only, at most 16 MiB, 12 million decoded pixels and 8192 pixels on either side. No SVG, PDFs, GIF, animated or layered-document editing. Only the browser-decoded image is processed, not extra frames or layers. Large images may still exceed a device's memory; use smaller screenshots if decoding or encoding fails. EXIF orientation follows the browser decoder. There is no crop, freehand, blur, auto-detection or batch mode.

## Why this project

Real screenshot-tool discussions describe the risks of pixelation and the use of solid boxes. SolidFrame is an original small implementation of a known workflow, not a world-first or a patch to those tools. It deliberately avoids OCR/model downloads and emphasizes review of the actual export. See [RESEARCH.md](RESEARCH.md) for inspected sources and existing alternatives, including Flameshot and image-pii-redactor.

## Build and test

Development requires a recent Node.js and npm. Dependencies are free software; installing them uses the network. The built app does not.

```sh
npm ci
npm run build
npm test
```

The build compiles `App.svelte` with Svelte, bundles it with esbuild, and writes the self-contained `solidframe.html`. The bundled runtime is covered by the Svelte MIT notice in `THIRD_PARTY.md`; project code is MIT licensed too. The output includes a restrictive content policy that disallows network connections and external resources.

For the optional browser checks:

```sh
npm run test:browser
```

`browser-test.mjs` uses Playwright with `/usr/bin/google-chrome` and writes test images to `/downloads/`. Adjust these two environment-specific paths for your machine. It uses only the fictional demo and generated images, not real personal data.

Verified 22 November 2026: 11 unit tests and 23 Chromium browser checks. Tests cover coordinate conversion, clipping, opaque export pixels, unchanged outside pixels, the actual encoded PNG, generic download naming, export-review gating, undo invalidation, error handling, real PNG import, actual-size mobile inspection, no horizontal page overflow, no runtime external requests and no browser errors. Tests are not proof that a user will cover every detail. No third-party outreach or live hosting is part of this project.

Copyright 2026 Shamil Habeeb Nelli. MIT licensed.
