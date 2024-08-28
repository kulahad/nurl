import { Input, Badge, Button, RetroGrid, Form } from "@/src/components";

import { getDataFromForm, processURLfromUser } from "@/lib/urlparser";
import Image from "next/image";
import client from "@/lib/mongodb";
import Link from "next/link";

export default async function Home() {
  const isConnected = await getConnectionStatus();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Image
        src="/cropped-logo.png"
        alt="Logo"
        className="absolute top-2 left-2 m-2"
        width={70}
        height={50}
      />
      <RetroGrid className="text-green" />

      <Badge
        className=" m-2 bg-green-700 absolute top-2 right-2 border-green-400"
        variant="outline"
      >
        {isConnected ? "Online" : "Offline"}
      </Badge>

      <div className=" flex flex-col m-auto w-3/4">
        <Form
          className=" flex md:grid md:grid-cols-4"
          updateItemAction={getDataFromForm}
        >
          <Input
            className="col-span-3 text-black my-2 "
            name="url"
            placeholder="Enter url to shorten - https://example.org/"
          />
          <Button
            className="my-auto mx-2 hover:bg-slate-200 hover:text-black"
            variant="outline"
          >
            Get Nano URL
          </Button>
        </Form>
      </div>
      <div className="text-center text-white font-thin m-2">
        <p>Welcome to NanoURL - The URL Shortener</p>
        <p className="text-sm">
          Made by{" "}
          <Link
            className="underline text-green-400"
            target="_blank"
            rel="noopener"
            href={"https//:kulahad.github.io"}
          >
            Mohammed Ahad
          </Link>{" "}
          with love 💖 and Next.js ofcourse!
        </p>
      </div>
    </main>
  );
}

const getConnectionStatus = async () => {
  try {
    await client.connect();
    return true;
  } catch (error) {
    return false;
  }
};
