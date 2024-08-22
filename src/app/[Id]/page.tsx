import { getURLFromId } from "@/lib/urlparser";
import { redirect } from "next/navigation";
import React from "react";

async function page({ params }: { params: { Id: string } }) {
  const nurl = await getURLFromId(params.Id);

  if (nurl) {
    redirect(nurl);
  }

  return <div>Not Found</div>;
}

export default page;
