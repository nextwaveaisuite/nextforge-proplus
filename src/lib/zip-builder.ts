import JSZip from "jszip";

export async function createZipFromFiles(files: Record<string, string>) {
  const zip = new JSZip();

  for (const [file, content] of Object.entries(files)) {
    zip.file(file, content || "");
  }

  const uint8 = await zip.generateAsync({ type: "uint8array" });
  return uint8;
}
