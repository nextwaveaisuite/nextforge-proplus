import JSZip from "jszip";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body || !body.files) {
      return new Response(
        JSON.stringify({ error: "No files provided." }),
       
