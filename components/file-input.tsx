"use client";

import { ChangeEvent, useState } from "react";

export default function FileName() {
  const [fileName, setFileName] = useState("");
  const [fileExtension, setFileExtension] = useState("");

  const getFileName = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const extension = file.name.split(".")[1] || "";
      setFileExtension(extension);

      const reader = new FileReader();
      reader.onloadend = function () {
        if (typeof reader.result === "string") {
          setFileName(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  return <input type="file" accept="image/*" onChange={getFileName} />;
}
