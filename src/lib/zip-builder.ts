import JSZip from "jszip";

export async function createZipFromFiles(files: Record<string, string>) {
  const zip = new JSZip();

  Object.entries(files).forEach(([path, content]) => {
    zip.file(path, content);
  });

  const buffer = await zip.generateAsync({
    type: "base64"
  });

  return buffer;
}
