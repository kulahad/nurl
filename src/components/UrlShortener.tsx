"use client";

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
  const [state, action, isPending] = useFormState(updateItemAction, null);

  if (isPending) {
    return <div>Loading...</div>;
  } else if (state?.data) {
    return <NurlPreview url={`${window.location}${state.data}`} />;
  }

  return (
    <>
      <Suspense fallback={<div>Loading</div>}>
        <p className="text-sm font-semibold text-orange-400">{state?.error}</p>
      </Suspense>
      <form className={className} action={action}>
        {isPending}
        {children}
      </form>
    </>
  );
}

export default UrlShortener;
