// src/components/MswInitializer.tsx
"use client"

import { use, Suspense } from "react";

const mswPromise = 
  typeof window !== "undefined"
    && process.env.NODE_ENV === "development" && false
    ? import("../mocks/browser").then(async ({ worker }) => { 
      await worker?.start({
            onUnhandledRequest: "bypass",
          })
    }) : Promise.resolve()

function MSWProvider({ children }: React.PropsWithChildren) {
  use(mswPromise)

  return children
}

export default function MSWStart({ children }: React.PropsWithChildren) {
  return <Suspense>
    <MSWProvider>{children}</MSWProvider>
  </Suspense>;
}
