import React from "react";
import Image from "next/image";
import { Smartphone } from "lucide-react";

// Opens https://link.advisoralpha.in/JUfSaCf5k6b, the app download link
const DOWNLOAD_QR_SRC = "/assets/app/download-qr.png";

export default function QrDownloadCard() {
  return (
    <div className="bg-white rounded-3xl p-5 text-black flex flex-col items-center justify-center shadow-2xl border border-[#93C5FD] w-full sm:w-[260px] mx-auto lg:mx-0">
      <div className="w-full flex items-center justify-between pb-3 mb-3 border-b border-neutral-100">
        <span className="text-xs font-bold uppercase tracking-wider text-neutral-800 flex items-center gap-1.5">
          <Smartphone className="w-3.5 h-3.5 text-[#F5BA31]" />
          <span>Scan to Download</span>
        </span>
        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700">
          iOS & Android
        </span>
      </div>

      <div className="relative p-2 bg-white rounded-2xl border border-neutral-200 flex items-center justify-center">
        <Image
          src={DOWNLOAD_QR_SRC}
          alt="QR code to download the MyAdvisorAlpha app"
          width={160}
          height={160}
          unoptimized
          className="w-40 h-40"
        />
      </div>

      <p className="text-[11px] text-neutral-600 text-center font-medium mt-3 leading-tight">
        Scan with your phone camera to download MyAdvisorAlpha
      </p>
    </div>
  );
}
