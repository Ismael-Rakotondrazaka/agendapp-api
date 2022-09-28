import { ObjectId } from "mongodb";
import { TSeed } from "../../types";

const seed: TSeed[] = [
  {
    collection: "users",
    documents: [
      {
        _id: new ObjectId("6332aafc5ba34e20f34787cf"),
        firstName: "Emmanuelle",
        lastName: "Borer",
        email: "Emmanuelle_Borer@hotmail.com",
        password:
          "$2b$10$tKkDLJBEog8juJdB.onsi.zrJUnHx1QwdAUt95sKfNfKUA4jUAMYu",
        createdAt: "2022-01-30T19:29:08.944Z",
        updatedAt: "2022-04-06T17:09:49.937Z",
        todos: [
          {
            _id: new ObjectId("6332aaf69a2562484d41e227"),
            title: "quo-ad-neque",
            description:
              "You can't override the port without compressing the optical GB microchip!",
            status: "done",
            level: "normal",
            startAt: "2022-03-28T10:00:00.000Z",
            endAt: "2022-03-28T11:00:00.000Z",
            createdAt: "2021-11-09T02:08:11.172Z",
          },
          {
            _id: new ObjectId("6332aaf69a2562484d41e228"),
            title: "molestias-accusantium-quidem",
            description:
              "Try to program the IP panel, maybe it will compress the primary array!",
            status: "failed",
            level: "normal",
            startAt: "2022-06-12T16:45:00.000Z",
            endAt: "2022-06-12T17:00:00.000Z",
            createdAt: "2021-12-07T09:37:19.650Z",
          },
          {
            _id: new ObjectId("6332aaf69a2562484d41e229"),
            title: "praesentium-nam-est",
            description:
              "I'll generate the redundant USB transmitter, that should bus the COM sensor!",
            status: "failed",
            level: "normal",
            startAt: "2021-11-24T14:30:00.000Z",
            endAt: "2021-11-24T15:15:00.000Z",
            createdAt: "2021-06-26T19:13:29.451Z",
          },
        ],
      },
    ],
  },
];

export default seed;
