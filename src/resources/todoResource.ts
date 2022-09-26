import { Types } from "mongoose";
import { ITodo, TTodoResource } from "../types/index";

export default function todoResource(
  resource: Types.Subdocument<Types.ObjectId> & ITodo
): TTodoResource {
  return {
    _id: resource.id,
    title: resource.title,
    description: resource.description,
    level: resource.level,
    status: resource.status,
    startAt: resource.startAt,
    endAt: resource.endAt,
    createdAt: resource.createdAt,
  };
}
