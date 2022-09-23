import { HydratedDocument } from "mongoose";
import { IUser, TUserResource } from "../types/index";

export default function userResource(
  resource: HydratedDocument<IUser>
): TUserResource {
  return {
    _id: resource.id,
    firstName: resource.firstName,
    lastName: resource.lastName,
    fullName: resource.fullName,
  };
}
