import client from "@/lib/mongodb";
import { processURLfromUser } from "@/lib/urlparser";

export default async function Home() {
  const isConnected = await getConnectionStatus();
  const test = await processURLfromUser(new URL("https://test12.org/"));
  console.log("🚀 ~ Home ~ test:", test);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className=" flex flex-col m-auto ">
        <p>Enter url to shorten</p>
        {isConnected && (
          <span className="bg-green-600 rounded-md p-2 text-black">
            Im connected to MongoDB
          </span>
        )}
      </div>
    </main>
  );
}

export const getConnectionStatus = async () => {
  try {
    await client.connect();
    return true;
  } catch (error) {
    return false;
  }
};
