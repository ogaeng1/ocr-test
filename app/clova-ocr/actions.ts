"use server";

import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export async function requestWithBase64(base64: any, ex: string) {
  const apiUrl =
    "https://zazwj68mkz.apigw.ntruss.com/custom/v1/28249/f4a4ba37b2e383f43ddc7d668482e2c639aa464fe7f91f1029b4b00acf75e82a/general"; // APIGW Invoke URL
  const secretKey = "b1luUHZ0UE1JWWhWdkFOa1RlR0x2b0NNUElkeGF1cUE=";
  try {
    const response = await axios.post(
      apiUrl,
      {
        images: [
          {
            format: ex,
            name: "test",
            data: base64,
          },
        ],
        enableTableDetection: true,
        requestId: uuidv4(),
        timestamp: new Date().getTime(),
        version: "V2",
      },
      {
        headers: {
          "X-OCR-SECRET": secretKey,
        },
      }
    );
    return response.data.images[0].tables;
  } catch (error) {
    console.error("OCR API call failed:", error);
    return undefined;
  }
}
