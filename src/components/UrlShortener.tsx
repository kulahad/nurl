"use client";

import { usePathname } from "next/navigation";
import React, { ReactNode, Suspense } from "react";
import { useFormState } from "react-dom";
import NurlPreview from "./NurlPreview";

export function UrlShortener({
  updateItemAction,
  children,
  className,
}: {
  updateItemAction: (
    prevstate: any,
    formdata: FormData
  ) => Promise<{ message: string; data: string; error: string }>;
  children: ReactNode;
  className: string;
}) {
  const [state, action] = useFormState(updateItemAction, null);
  const GetPath = () => {
    const router = usePathname();
    console.log(router);
    return null;
  };

  return (
    <>
      <Suspense fallback={<div>Loading</div>}>
        <p className="text-sm font-semibold text-orange-400">{state?.error}</p>
      </Suspense>
      {state?.data ? (
        <NurlPreview url={`${window.location}${state.data}`} />
      ) : (
        <form className={className} action={action}>
          {children}
        </form>
      )}
    </>
  );
}

export default UrlShortener;
