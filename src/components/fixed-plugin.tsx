"use client";
import Image from "next/image";
import { Button } from "@material-tailwind/react";
import WhatsappIcon from "../../public/image/ic-whatsapp.png";

export function FixedPlugin() {
  const sendMessage = () => {
    window.open(
      `https://api.whatsapp.com/send?phone=+628113667371&text=Permisi admin *BPS Sidoarjo* yang cantik, saya ada pertanyaan...`,
      "_blank"
    );
  };

  return (
      <Button
        color="white"
        size="sm"
        className="!fixed bottom-4 right-4 flex gap-1 pl-2 items-center border border-blue-gray-50"
        onClick={sendMessage}
      >
        <Image
          width={128}
          height={128}
          className="w-5 h-5"
          alt="Whatsapp icon"
          src="/image/ic-whatsapp.png"
        />{" "}
        Kontak kami
      </Button>
  );
}
