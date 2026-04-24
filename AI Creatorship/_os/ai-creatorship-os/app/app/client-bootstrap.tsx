"use client";

import { useEffect } from "react";

let booted = false;

export function ClientBootstrap() {
  useEffect(() => {
    if (booted) return;
    booted = true;
    void import("../src/main");
  }, []);

  return null;
}
