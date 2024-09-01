"use server";

import { Collection } from "mongodb";
import client from "./mongodb";
import { z } from "zod";
import { Models } from "@/global";

const DBNAME = process.env.MONGODB_DBNAME;
const COLLECTIONNAME = process.env.MONGODB_COLLECTION
  ? process.env.MONGODB_COLLECTION
  : "urls";

const schema = z
  .string()
  .url("Must be a valid url as such: https://example.org/");

export const handleURLFromUser = async (url: URL) => {
  var nurl: Models.nurl;
  var urlsCollection: Collection = await client
    .db(DBNAME)
    .collection(COLLECTIONNAME);

  nurl = (await urlsCollection.findOne({ url: url.toString() })) as Models.nurl;

  if (!nurl) {
    await urlsCollection.insertOne({
      url: url.toString(),
      shortCode: generateUniqueString(),
    });

    nurl = (await urlsCollection.findOne({
      url: url.toString(),
    })) as Models.nurl;
  }

  return nurl;
};

function generateUniqueString(): string {
  const timestamp = Date.now().toString(36); // Convert timestamp to base-36
  const randomPart = Math.random().toString(36).substring(2, 7); // Generate a random string
  return (timestamp + randomPart).slice(-5); // Combine and take the last 5 characters
}

export const fetchUrlFromId = async (shortCode: string) => {
  if (!shortCode) {
    return null;
  }

  var nurl = await client
    .db("nurl")
    .collection("urls")
    .findOne({ shortCode: shortCode });

  if (!nurl) {
    return null;
  }

  return nurl.url;
};

export const fetchIdFromUrl = async (url: string) => {
  if (!url) {
    return null;
  }

  var nurl = await client.db("nurl").collection("urls").findOne({ url: url });

  if (!nurl) {
    return null;
  }

  return nurl.shortCode;
};

export async function getDataFromForm(
  prevstate: any,
  formdata: FormData
): Promise<{ message: string; data: string; error: string }> {
  try {
    const parsedURL = schema.parse(formdata.get("url"));
    const nurl = await handleURLFromUser(new URL(parsedURL));
    return { message: "", data: nurl?.shortCode || "", error: "" };
  } catch (error) {
    return handleFormError(error);
  }
}

function handleFormError(error: any): {
  message: string;
  data: string;
  error: string;
} {
  if (error instanceof z.ZodError) {
    const issue = error.issues[0];
    return {
      error: `Validation failed: ${issue.message}`,
      data: "",
      message: "",
    };
  } else {
    return { error: `Unexpected error: ${error}`, data: "", message: "" };
  }
}
