"use server";

import { Collection } from "mongodb";
import client from "./mongodb";
import { z } from "zod";
import { revalidatePath } from "next/cache";

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

export const getIdFromURL = async (url: string) => {
  if (!url) {
    return null;
  }

  var nurl = await client.db("nurl").collection("urls").findOne({ url: url });

  if (!nurl) {
    return null;
  }

  return nurl.miniId;
};

export async function getDataFromForm(
  prevstate: any,
  formdata: FormData
): Promise<{ message: string; data: string; error: string }> {
  try {
    const parsedURL = schema.parse(formdata.get("url"));
    const id = await processURLfromUser(new URL(parsedURL));
    return { message: "", data: id?.miniId, error: "" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      for (const issue of error.issues) {
        return {
          error: `Validation failed: ${issue.message}`,
          data: "",
          message: "",
        };
      }
    } else {
      return { error: `Unexpected error: ${error}`, data: "", message: "" };
    }
  }

  return { message: "", data: "", error: "" };
}
