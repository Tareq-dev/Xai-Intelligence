"use client";

import { useEffect, useState } from "react";

import Background from "./Background";
import Loader from "./Loader";
import Cursor from "./Cursor";
import SmoothScroll from "./SmoothScroll";

export default function ClientEffects() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <Background />
      <Loader />
      <Cursor />
      <SmoothScroll />
    </>
  );
}