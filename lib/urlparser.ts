"use server";

import { Collection } from "mongodb";
import client from "./mongodb";
import { z } from "zod";

const schema = z
  .string()
  .url("Must be a valid url as such: https://example.org/");

export const processURLfromUser = async (url: URL) => {
  var nurl;

  var urlsCollection: Collection = await client.db("nurl").collection("urls");

  nurl = await urlsCollection.findOne({ url: url.toString() });

  if (!nurl) {
    await urlsCollection.insertOne({
      url: url.toString(),
      miniId: String(new Date().valueOf()),
    });

    nurl = await urlsCollection.findOne({ url: url.toString() });
  }

  return nurl;
};

export const getURLFromId = async (id: string) => {
  if (!id) {
    return null;
  }

  var nurl = await client.db("nurl").collection("urls").findOne({ miniId: id });

  if (!nurl) {
    return null;
  }

  return nurl.url;
};

export async function getDataFromForm(
  prevstate: any,
  formdata: FormData
): Promise<{ message: string }> {
  try {
    const parsedURL = schema.parse(formdata.get("url"));
    const id = await processURLfromUser(new URL(parsedURL));

    return { message: "" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      for (const issue of error.issues) {
        return { message: `Validation failed: ${issue.message}` };
      }
    } else {
      return { message: `Unexpected error: ${error}` };
    }
  }

  return { message: "" };
}
