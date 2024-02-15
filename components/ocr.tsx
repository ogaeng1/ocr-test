"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function OCR() {
  const pathname = usePathname();
  return (
    <div>
      <div className="flex gap-3 justify-center my-5">
        <Link
          href="/tesseract"
          className={`w-30 h-10 flex justify-center items-center border rounded-[10px] px-5 hover:bg-blue-500 hover:text-white ${
            pathname === "/tesseract" ? "bg-blue-500 text-white" : ""
          }`}
        >
          Tesseract
        </Link>
        <Link
          href="/clova-ocr"
          className={`w-30 h-10 flex justify-center items-center border rounded-[10px] px-5 hover:bg-blue-500 hover:text-white ${
            pathname === "/clova-ocr" ? "bg-blue-500 text-white" : ""
          }`}
        >
          Naver Clova OCR
        </Link>
        <Link
          href="/google-vision"
          className={`w-30 h-10 flex justify-center items-center border rounded-[10px] px-5 hover:bg-blue-500 hover:text-white ${
            pathname === "/google-vision" ? "bg-blue-500 text-white" : ""
          }`}
        >
          Google Vision API
        </Link>
      </div>
    </div>
  );
}
