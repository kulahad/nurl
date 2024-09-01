"use server";

import { fetchUrlFromId } from "@/lib/urlparser";
import { ErrorPage } from "@/src/components";
import { redirect } from "next/navigation";
import React from "react";

async function page({ params }: { params: { Id: string } }) {
  const nurl = await fetchUrlFromId(params.Id);

  if (nurl) {
    redirect(nurl);
  }

  return <ErrorPage />;
}

export default page;
