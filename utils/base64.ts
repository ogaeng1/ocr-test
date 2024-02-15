import fs from "fs";

export default function imageToBase64(filePath: string) {
  const imageBuffer = fs.readFileSync(filePath);
  const base64Image = imageBuffer.toString("base64");
  return base64Image;
}
