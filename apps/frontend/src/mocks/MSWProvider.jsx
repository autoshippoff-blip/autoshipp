"use client";

import { useEffect, useState } from "react";

export function MSWProvider({ children }) {
  const [mswReady, setMswReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      if (typeof window !== "undefined") {
        const { worker } = await import("./browser");
        await worker.start({
          onUnhandledRequest: "bypass",
        });
        setMswReady(true);
      }
    };

    if (process.env.NODE_ENV === "development") {
      init();
    } else {
      setTimeout(() => setMswReady(true), 0);
    }
  }, []);

  if (!mswReady) {
    return null; // Or a loading spinner if preferred
  }

  return children;
}
