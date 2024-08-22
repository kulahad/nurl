"use client";

import React, { ReactNode, Suspense } from "react";
import { useFormState } from "react-dom";

export function Form({
  updateItemAction,
  children,
  className,
}: {
  updateItemAction: (
    prevstate: any,
    formdata: FormData
  ) => Promise<{ message: string }>;
  children: ReactNode;
  className: string;
}) {
  const [state, action] = useFormState(updateItemAction, null);

  return (
    <>
      <Suspense fallback={<div>Loading</div>}>
        <p className="font-thin text-red-400">{state?.message}</p>
      </Suspense>
      <form className={className} action={action}>
        {children}
      </form>
    </>
  );
}

export default Form;
