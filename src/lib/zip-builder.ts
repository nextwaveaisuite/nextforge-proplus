// src/lib/zip-builder.ts

import JSZip from "jszip";

export async function createZipFromBlueprint(blueprint: any, formats: any) {
  const zip = new JSZip();

  // Add metadata
  zip.file("blueprint.json", JSON.stringify(blueprint, null, 2));

  // Add placeholder structures for each selected format
  if (formats.nextjs) {
    zip.file("nextjs/README.txt", "This contains the full Next.js SaaS app structure.");
  }

  if (formats.microapp) {
    zip.file("microapp/index.html", "<!-- micro app will be generated here -->");
  }

  if (formats.backend) {
    zip.file("backend/server.js", "// backend placeholder");
  }

  if (formats.flutter) {
    zip.file("flutter/pubspec.yaml", "# Flutter placeholder");
  }

  const content = await zip.generateAsync({ type: "base64" });

  return [
    {
      filename: "app.zip",
      content
    }
  ];
}
