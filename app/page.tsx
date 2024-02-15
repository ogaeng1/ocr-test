import OCR from "@/components/ocr";

export default function Home() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <OCR />
      <p className="text-[2rem] font-bold">테스트 할 API를 선택하세요</p>
    </div>
  );
}
