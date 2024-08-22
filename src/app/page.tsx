import { Input, Badge, Button, RetroGrid, Form } from "@/src/components";

import { getDataFromForm, processURLfromUser } from "@/lib/urlparser";
import client from "@/lib/mongodb";

export default async function Home() {
  const isConnected = await getConnectionStatus();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <RetroGrid className="text-green" />

      <Badge
        className=" bg-green-700 absolute top-2 right-2 border-green-400"
        variant="outline"
      >
        {isConnected ? "Online" : "Offline"}
      </Badge>

      <div className=" flex flex-col m-auto w-3/4">
        <p className="text-xl font-bold">Enter url to shorten</p>
        <Form
          className=" flex md:grid md:grid-cols-4"
          updateItemAction={getDataFromForm}
        >
          <Input
            className="col-span-3 text-black my-2 "
            name="url"
            placeholder="https://example.org/"
          />
          <Button
            className="my-auto mx-2 hover:bg-slate-200 hover:text-black"
            variant="outline"
          >
            Get Nano URL
          </Button>
        </Form>
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
