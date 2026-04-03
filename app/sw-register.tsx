"use client";

import { useEffect } from "react";

export default function SwRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      const base = new URL(".", window.location.href).pathname;
      navigator.serviceWorker.register(`${base}sw.js`, { scope: base });
    }
  }, []);

  return null;
}
