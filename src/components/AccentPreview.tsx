"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

// Lets you preview the alternative palette with ?accent=silver or ?accent=gold
export function AccentPreview() {
  const params = useSearchParams();
  useEffect(() => {
    const a = params.get("accent");
    if (a === "silver" || a === "gold") {
      document.documentElement.setAttribute("data-accent", a);
    }
  }, [params]);
  return null;
}
