"use client";

import OCR from "@/components/ocr";
import { useState } from "react";
import Tesseract from "tesseract.js";

export default function TestTesseract() {
  const [img, setImg] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const imgTrans = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imgURL = URL.createObjectURL(file);
      setImg(imgURL);
    }
  };

  const textTrans = async () => {
    if (img) {
      setIsProcessing(true);
      const {
        data: { text },
      } = await Tesseract.recognize(img, "kor");
      setText(text);
      setIsProcessing(false);
    } else {
      alert("이미지부터 올리셈ㅋㅋ");
    }
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
            onChange={imgTrans}
          />
          <button
            className="border border-black px-10 py-3 hover:bg-blue-400 hover:text-white"
            onClick={textTrans}
          >
            텍스트 추출하기
          </button>
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
    </>
  );
}
