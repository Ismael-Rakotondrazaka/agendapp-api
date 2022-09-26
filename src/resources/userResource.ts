import { HydratedDocument, Types } from "mongoose";
import { IUser, TUserResource, TUserDocumentProps } from "../types/index";

export default function userResource(
  resource: HydratedDocument<unknown, any, IUser> &
    IUser & {
      _id: Types.ObjectId;
    } & TUserDocumentProps
): TUserResource {
  return {
    _id: resource.id,
    firstName: resource.firstName,
    lastName: resource.lastName,
    fullName: resource.fullName,
  };
}
