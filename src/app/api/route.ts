import {
  fetchIdFromUrl,
  fetchUrlFromId,
  handleURLFromUser,
} from "@/lib/urlparser";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url ?? "");
  const shortCode = searchParams.get("shortCode");
  const url = searchParams.get("url");

  if (shortCode) {
    const item = await fetchUrlFromId(shortCode as string);
    if (item) {
      return new NextResponse(JSON.stringify(item), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      return new NextResponse(JSON.stringify({ message: "Item not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  } else if (url) {
    const item = await fetchIdFromUrl(url as string);
    if (item) {
      return new NextResponse(JSON.stringify(item), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      return new NextResponse(JSON.stringify({ message: "Item not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  }

  return new NextResponse(JSON.stringify({ message: "Bad Request" }), {
    status: 400,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function POST(request: NextRequest) {
  const { url } = await request.json();

  const newItem = await handleURLFromUser(new URL(url));
  return new NextResponse(JSON.stringify(newItem), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
