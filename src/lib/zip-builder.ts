// src/lib/zip-builder.ts

import JSZip from "jszip";

export async function createZipFromFiles(files: Record<string, string>) {
  const zip = new JSZip();

  // Add each file into the ZIP
  Object.entries(files).forEach(([path, content]) => {
    zip.file(path, content);
  });

  // Return Base64 ZIP output
  const buffer = await zip.generateAsync({
    type: "base64"
  });

  return buffer;
}
