"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function HomePage() {
  const fileInputRef = useRef(null);
  const dropzoneRef = useRef(null);

  const [imageData, setImageData] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const readFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageData(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) readFile(file);
  };

  useEffect(() => {
    const handlePaste = (e) => {
      const items = e.clipboardData?.items;
      if (items) {
        for (const item of items) {
          if (item.type.indexOf("image") === 0) {
            const file = item.getAsFile();
            readFile(file);
          }
        }
      }
    };
    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, []);

  const dataURLtoBlob = (dataurl) => {
    const arr = dataurl.split(",");
    const mimeMatch = arr[0].match(/:(.*?);/);
    if (!mimeMatch) throw new Error("Invalid mime type");
    const mime = mimeMatch[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };


  const autoCopyImage = async (dataUrl) => {
    try {
      const imageBlob = dataURLtoBlob(dataUrl);
      await navigator.clipboard.write([
        new ClipboardItem({
          "image/png": imageBlob,
        }),
      ]);
      console.log("Imagem copiada automaticamente.");
    } catch (error) {
      console.error("Erro ao copiar automaticamente:", error);
    }
  };

  const handleGenerate = () => {
    if (!imageData) {
      alert("Please paste or select an image first.");
      return;
    }

    const blob = dataURLtoBlob(imageData);
    const formData = new FormData();
    formData.append("image", blob, "upload.png");

    fetch("/api/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.image) {
          setProcessedImage(data.image);
          setModalOpen(true);
          autoCopyImage(data.image);
        } else if (data.error) {
          alert(data.error);
        }
      })
      .catch((err) => {
        console.error(err);
        alert("An error occurred.");
      });
  };

  const handleDownload = () => {
    if (processedImage) {
      const a = document.createElement("a");
      a.href = processedImage;
      a.download = "generated.png";
      a.click();
    }
  };

  return (
    <div className="bg-gray-900 text-white flex flex-col min-h-screen">
      {/* Main content */}
      <main className="flex-grow flex items-center justify-center">
        <div className="bg-gray-800 glass p-10 rounded-2xl shadow-2xl w-full max-w-xl escuro">
          <h1 className="text-3xl mb-6 text-center font-extrabold">
            Upload your image! 🔥
          </h1>
          <div
            ref={dropzoneRef}
            id="dropzone"
            className="border border-dashed border-gray-600 p-6 mb-6 text-center cursor-pointer rounded-xl"
            onClick={() => fileInputRef.current.click()}
          >
            {imageData ? (
              <img
                src={imageData}
                alt="Preview"
                className="max-w-full h-auto rounded"
              />
            ) : (
              <p className="mb-2">
                Paste your image (CTRL+V) or click to upload
              </p>
            )}
            <input
              ref={fileInputRef}
              type="file"
              id="fileInput"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
          <button
            id="generateBtn"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-200"
            onClick={handleGenerate}
          >
            Generate 😎
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 glass p-4 text-center escuro">
        <p className="text-sm text-gray-400">
          &copy; 2025 OMG Black Guy Generator by{" "}
          <a
            href="https://github.com/Sintzy"
            target="_blank"
            className="text-blue-500 hover:underline"
          >
            menezes
          </a>
          . All rights reserved. Check{" "}
          <Link href="/privacy" className="underline hover:underline">
            how do we use your data
          </Link>
        </p>
      </footer>

      {/* Popup Modal */}
      {modalOpen && (
        <div
          id="popupModal"
          className="fixed inset-0 flex items-center justify-center"
        >
          <div className="relative">
            <button
              id="closePopup"
              className="absolute top-2 right-2 text-gray-400 hover:text-white text-2xl z-10"
              onClick={() => setModalOpen(false)}
            >
              &times;
            </button>
            <div className="flex flex-col rounded-2xl w-[800px] bg-gray-800 glass shadow-xl">
              <figure className="flex justify-center items-center rounded-t-2xl overflow-hidden">
                <img
                  id="generatedImage"
                  src={processedImage}
                  alt="Generated"
                  className="rounded-t-2xl object-cover w-full h-auto"
                />
              </figure>
              <div className="flex flex-col p-8">
                <div className="text-base text-gray-200 text-center mb-6">
                  The image was successfully generated and copied to the clipboard.
                </div>
                <div className="flex justify-around pt-7">
                  <button
                    id="downloadBtn"
                    className="bg-[#326b2a] hover:bg-green-800 text-white w-full font-bold text-base p-3 rounded-lg active:scale-95 transition-transform"
                    onClick={handleDownload}
                  >
                    📜 Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS Glass - conforme o HTML original */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
        div {
          font-family: 'Outfit', sans-serif;
        }
        .glass {
          background: rgba(255, 255, 255, 0.01);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        :global(.dark) .glass {
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .escuro {
        background: rgba(0, 0, 0, 0.3);
        }  
      `}</style>
    </div>
  );
}
