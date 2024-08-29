"use client";
import { motion } from "framer-motion";
import React from "react";
import Image from "next/image";
import RetroGrid from "./RetroGrid";

export function ErrorPage() {
  return (
    <div className="flex items-center flex-col justify-center h-screen">
      <Image
        src="/cropped-logo.png"
        alt="Logo"
        className="absolute top-2 left-2 m-2"
        width={70}
        height={50}
      />
      <RetroGrid className="text-green" />

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
      >
        <div className="my-auto flex flex-col items-center justify-center">
          <motion.h1
            className="text-9xl font-bold text-green-700"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            404
          </motion.h1>

          <motion.p
            className="text-lg text-wrap text-center m-4 font-light text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            This page has gone to grab a coffee ☕. It might be a while.
          </motion.p>
          <motion.button
            className="m-2"
            animate={{ rotate: 360 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <a
              href="/"
              className="text-green-500 p-2 border border-green-400 rounded-sm hover:bg-green-700 hover:text-black"
            >
              Go back home
            </a>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

export default ErrorPage;
