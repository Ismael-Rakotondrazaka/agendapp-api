import { HydratedDocument, Types } from "mongoose";
import { IEvent, TEventResource } from "../types/index";

export default function eventResource(
  resource: HydratedDocument<unknown, any, IEvent> &
    Types.Subdocument<Types.ObjectId> &
    IEvent
): TEventResource {
  return {
    _id: resource.id,
    title: resource.title,
    description: resource.description,
    level: resource.level,
    status: resource.status,
    startAt: resource.startAt,
    endAt: resource.endAt,
    createdAt: resource.createdAt,
    updatedAt: resource.updatedAt,
  };
}
