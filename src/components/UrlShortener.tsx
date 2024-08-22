"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode, Suspense } from "react";
import { useFormState } from "react-dom";

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

  return (
    <>
      <Suspense fallback={<div>Loading</div>}>
        <p className="text-sm font-semibold text-orange-400">{state?.error}</p>
      </Suspense>
      {state?.data ? (
        <Link
          className="w-1/6 p-4  my-2 border border-green-400 bg-green-700 hover:bg-white text-white hover:text-black"
          rel="noopener"
          target="_blank"
          href={`/${state.data}`}
        >
          {`/${state.data}`}
        </Link>
      ) : (
        <form className={className} action={action}>
          {children}
        </form>
      )}
    </>
  );
}

export default UrlShortener;
