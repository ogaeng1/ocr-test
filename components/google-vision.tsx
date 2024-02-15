"use client";

import { ChangeEvent, useEffect, useState } from "react";

export default function GoogleVision() {
  const api_key = "AIzaSyDO2dUGd8wYdlcS3e91P_LXI4NmCTklk2I";
  const [gapiLoaded, setGapiLoaded] = useState(false);
  const [img, setImg] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const imgUrl = URL.createObjectURL(file);
      setImg(imgUrl);

      try {
        setIsProcessing(true);
        const base64 = await getBase64(file);
        const extractedText = await callVisionAPI(base64);
        setText(extractedText);
      } catch (error) {
        console.error("이미지 텍스트 추출 실패:", error);
        alert("이미지 텍스트 추출에 실패했습니다.");
      } finally {
        setIsProcessing(false);
      }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("gapi-script").then(({ gapi }) => {
        gapi.load("client", () => {
          gapi.client.init({
            apiKey: api_key,
          });
          setGapiLoaded(true);
        });
      });
    }
  }, []);

  const callVisionAPI = async (base64: string) => {
    if (!gapiLoaded) {
      console.error("gapi is not loaded yet.");
      return;
    }

    const data = {
      requests: [
        {
          image: {
            content: base64,
          },
          features: [
            {
              type: "DOCUMENT_TEXT_DETECTION",
            },
          ],
        },
      ],
    };

    const response = await gapi.client.request({
      path: "https://vision.googleapis.com/v1/images:annotate",
      method: "POST",
      body: data,
    });

    const extractedText = response.result.responses[0].fullTextAnnotation.text;
    return extractedText;
  };

  const getBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result.split(",")[1]);
        } else {
          reject(new Error("Invalid image format"));
        }
      };
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div className="flex">
      <div className="w-[45%] h-[800px] flex flex-col items-center justify-center gap-4">
        {img ? (
          <img src={img} alt="" className="w-[400px] h-[500px] border" />
        ) : (
          <label
            htmlFor="inputfile"
            className="w-[400px] h-[500px] border flex justify-center items-center text-[30px] cursor-pointer"
          >
            이미지 업로드
          </label>
        )}
        <input
          className="hidden"
          id="inputfile"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        <p>이미지를 올리면 자동으로 텍스트 추출이 시작됩니다.</p>
      </div>
      <div className="w-[10%] h-[800px] flex items-center justify-center text-[22px]">
        <p>결과 ➡</p>
      </div>
      <div className="w-[45%] h-[800px] p-5 flex justify-center items-center px-10">
        {isProcessing ? (
          <p className="text-[24px]">텍스트를 추출하고 있습니다..</p>
        ) : text ? (
          <p>{text}</p>
        ) : null}
      </div>
    </div>
  );
}
