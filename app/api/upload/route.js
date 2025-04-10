
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { mkdir, writeFile, unlink } from 'fs/promises';
const processImage = require('../../../lib/image');

export async function POST(request) {
  try {
    const formData = await request.formData();
    const fileField = formData.get("image");
    if (!fileField) {
      return NextResponse.json({ error: "No file was selected." }, { status: 400 });
    }
    const arrayBuffer = await fileField.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    //criar a pasta dos uploads(teste)
    const uploadsDir = path.join(process.cwd(), "uploads");
    if (!fs.existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    const tmpPath = path.join(uploadsDir, `${Date.now()}.png`);
    await writeFile(tmpPath, buffer);
    const processedBuffer = await processImage(tmpPath);
    await unlink(tmpPath);
    //retornar
    const base64 = processedBuffer.toString("base64");
    return NextResponse.json({ image: `data:image/png;base64,${base64}` });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
