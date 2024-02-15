"use client";

import OCR from "@/components/ocr";
import { ChangeEvent, useState } from "react";
import { requestWithBase64 } from "./actions";

export default function NaverClovaOCR() {
  const [img, setImg] = useState<string | null>(null);
  const [text, setText] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const imgUrl = URL.createObjectURL(file);
      setImg(imgUrl);

      const ex = file.name.split(".")[1];

      try {
        setIsProcessing(true);
        const base64 = await getBase64(file);
        const extractedText = await requestWithBase64(base64, ex);
        setText(extractedText);
      } catch (error) {
        console.error("이미지 텍스트 추출 실패:", error);
        alert("이미지 텍스트 추출에 실패했습니다.");
      } finally {
        setIsProcessing(false);
      }
    }
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
    <>
      <OCR />
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
        <div className="w-[45%] h-[800px] p-5 px-10">
          {isProcessing ? (
            <p className="text-[40px]">텍스트 추출중...</p>
          ) : (
            text.map((v: any, idx: any) => (
              <span key={idx}>&nbsp;{v.inferText}&nbsp;</span>
            ))
          )}
        </div>
      </div>
    </>
  );
}
