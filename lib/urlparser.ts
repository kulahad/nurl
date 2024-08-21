//check if url exists in mongodb
//if it does, give existing id, if not, create new one

import { Collection } from "mongodb";
import client from "./mongodb";

export const processURLfromUser = async (url: URL) => {
  var nurl;

  var urlsCollection: Collection = await client.db("nurl").collection("urls");

  nurl = await urlsCollection.findOne({ url: url.toString() });

  if (!nurl) {
    nurl = await urlsCollection.insertOne({
      url: url.toString(),
      miniId: new Date().valueOf(),
    });
  }

  return nurl;
};
