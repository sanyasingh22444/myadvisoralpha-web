import React from "react";
import { Smartphone } from "lucide-react";

export default function QrDownloadCard() {
  return (
    <div className="bg-white rounded-3xl p-5 text-black flex flex-col items-center justify-center shadow-2xl border border-neutral-200 w-full sm:w-[260px] mx-auto lg:mx-0">
      <div className="w-full flex items-center justify-between pb-3 mb-3 border-b border-neutral-100">
        <span className="text-xs font-bold uppercase tracking-wider text-neutral-800 flex items-center gap-1.5">
          <Smartphone className="w-3.5 h-3.5 text-[#1C6FE6]" />
          <span>Scan to Download</span>
        </span>
        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700">
          iOS & Android
        </span>
      </div>

      {/* Pure High-Fidelity SVG QR Matrix */}
      <div className="relative p-2 bg-neutral-50 rounded-2xl border border-neutral-200 shadow-inner flex items-center justify-center">
        <svg
          viewBox="0 0 160 160"
          className="w-36 h-36"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* QR Corner Square Top-Left */}
          <rect x="10" y="10" width="40" height="40" rx="6" fill="#081026" />
          <rect x="16" y="16" width="28" height="28" rx="3" fill="#FFFFFF" />
          <rect x="22" y="22" width="16" height="16" rx="2" fill="#081026" />

          {/* QR Corner Square Top-Right */}
          <rect x="110" y="10" width="40" height="40" rx="6" fill="#081026" />
          <rect x="116" y="16" width="28" height="28" rx="3" fill="#FFFFFF" />
          <rect x="122" y="22" width="16" height="16" rx="2" fill="#081026" />

          {/* QR Corner Square Bottom-Left */}
          <rect x="10" y="110" width="40" height="40" rx="6" fill="#081026" />
          <rect x="16" y="116" width="28" height="28" rx="3" fill="#FFFFFF" />
          <rect x="22" y="122" width="16" height="16" rx="2" fill="#081026" />

          {/* Data Pattern Modules */}
          <rect x="60" y="15" width="8" height="8" rx="1.5" fill="#081026" />
          <rect x="75" y="15" width="8" height="8" rx="1.5" fill="#081026" />
          <rect x="90" y="15" width="8" height="8" rx="1.5" fill="#081026" />
          <rect x="60" y="30" width="8" height="8" rx="1.5" fill="#081026" />
          <rect x="90" y="30" width="8" height="8" rx="1.5" fill="#081026" />

          <rect x="15" y="60" width="8" height="8" rx="1.5" fill="#081026" />
          <rect x="30" y="60" width="8" height="8" rx="1.5" fill="#081026" />
          <rect x="45" y="60" width="8" height="8" rx="1.5" fill="#081026" />
          <rect x="60" y="60" width="8" height="8" rx="1.5" fill="#081026" />
          <rect x="75" y="60" width="8" height="8" rx="1.5" fill="#081026" />
          <rect x="105" y="60" width="8" height="8" rx="1.5" fill="#081026" />
          <rect x="120" y="60" width="8" height="8" rx="1.5" fill="#081026" />
          <rect x="135" y="60" width="8" height="8" rx="1.5" fill="#081026" />

          <rect x="15" y="75" width="8" height="8" rx="1.5" fill="#081026" />
          <rect x="45" y="75" width="8" height="8" rx="1.5" fill="#081026" />
          <rect x="105" y="75" width="8" height="8" rx="1.5" fill="#081026" />
          <rect x="135" y="75" width="8" height="8" rx="1.5" fill="#081026" />

          <rect x="15" y="90" width="8" height="8" rx="1.5" fill="#081026" />
          <rect x="30" y="90" width="8" height="8" rx="1.5" fill="#081026" />
          <rect x="60" y="90" width="8" height="8" rx="1.5" fill="#081026" />
          <rect x="75" y="90" width="8" height="8" rx="1.5" fill="#081026" />
          <rect x="90" y="90" width="8" height="8" rx="1.5" fill="#081026" />
          <rect x="120" y="90" width="8" height="8" rx="1.5" fill="#081026" />

          <rect x="60" y="105" width="8" height="8" rx="1.5" fill="#081026" />
          <rect x="75" y="105" width="8" height="8" rx="1.5" fill="#081026" />
          <rect x="105" y="105" width="8" height="8" rx="1.5" fill="#081026" />
          <rect x="135" y="105" width="8" height="8" rx="1.5" fill="#081026" />

          <rect x="60" y="120" width="8" height="8" rx="1.5" fill="#081026" />
          <rect x="90" y="120" width="8" height="8" rx="1.5" fill="#081026" />
          <rect x="105" y="120" width="8" height="8" rx="1.5" fill="#081026" />
          <rect x="120" y="120" width="8" height="8" rx="1.5" fill="#081026" />

          <rect x="75" y="135" width="8" height="8" rx="1.5" fill="#081026" />
          <rect x="90" y="135" width="8" height="8" rx="1.5" fill="#081026" />
          <rect x="135" y="135" width="8" height="8" rx="1.5" fill="#081026" />

          {/* Center Brand Badge */}
          <circle cx="80" cy="80" r="16" fill="#1C6FE6" />
          <path
            d="M74 83L78 75L82 83M76 81H80M85 76L87 83M83 80H88"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <p className="text-[11px] text-neutral-600 text-center font-medium mt-3 leading-tight">
        Scan with your phone camera to download MyAdvisorAlpha
      </p>
    </div>
  );
}
