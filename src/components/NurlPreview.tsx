"use client";

import React from "react";
import { useRouter } from "next/router";
import { QRCode } from "react-qrcode-logo";
import { Button } from "./Button";
import Link from "next/link";

interface NurlPreviewProps {
  url: string;
}

const NurlPreview: React.FC<NurlPreviewProps> = ({ url }) => {
  const downloadQRCode = () => {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = url;
      link.download = "nurl-qrcode.png";
      link.click();
    }
  };

  return (
    <div className="flex flex-col m-auto">
      <div className="flex mb-2 justify-evenly">
        <h1 className="my-auto">Nurl Preview</h1>
        <Button
          className="my-auto p-2 border border-green-500 rounded-md hover:bg-green-400"
          onClick={() => window.location.reload()}
        >
          Go Back
        </Button>
      </div>

      <div className="m-auto">
        <QRCode
          value={url}
          logoImage="/nurl-transbg.png"
          logoWidth={150}
          logoHeight={150}
        />
      </div>
      <div className="flex flex-col">
        <Button
          className="mx-auto my-2 w-2/5 p-2 border border-blue-500 rounded-md hover:bg-blue-400"
          onClick={downloadQRCode}
        >
          Download QR Code
        </Button>
        <p className="font-thin m-1">
          Scan the QR Code or click the link below to visit the nurl:
          <a
            className="ml-1"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <u className="font-medium">{url}</u>
          </a>
        </p>
      </div>
    </div>
  );
};

export default NurlPreview;
