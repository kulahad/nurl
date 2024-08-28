import { ObjectId } from "mongodb";

declare namespace Models {
  declare interface nurl {
    _id: ObjectId;
    name: string;
    shortCode: string;
  }
}
