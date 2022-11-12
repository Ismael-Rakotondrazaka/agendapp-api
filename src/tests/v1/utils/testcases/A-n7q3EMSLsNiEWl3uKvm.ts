// import { faker } from "@faker-js/faker";
import { ObjectId } from "mongodb";
import { TSeed } from "../../types";
import { nanoid } from "nanoid";

const seed: TSeed[] = [
  {
    collection: "users",
    documents: [
      {
        _id: new ObjectId("6359b741efd58360a17628af"),
        firstName: "Maximillian",
        lastName: "Mayer",
        email: "Maximillian.Mayer@yahoo.com",
        password:
          "$2b$10$SGLwrxkZobqOE1Q69Wluh.LGM5DP.MhFuEWEvtchWLDmjtaiP2uAq",
        channelId: nanoid(),
        createdAt: "2022-10-19T22:35:36.829Z",
        updatedAt: "2022-10-20T11:18:21.677Z",
        events: [
          {
            _id: new ObjectId("6359b7dedc5c0e4e172913f0"),
            title: "autem-eum",
            description:
              "Try to quantify the ADP microchip, maybe it will transmit the primary protocol!",
            status: "pending",
            level: "important",
            startAt: new Date("2021-11-15T07:15:00.000Z"),
            endAt: new Date("2021-11-15T08:00:00.000Z"),
            createdAt: new Date("2021-02-21T21:46:19.610Z"),
            updatedAt: new Date("2022-10-20T11:18:21.677Z"),
          },
          {
            _id: new ObjectId("6359b7dedc5c0e4e172913f1"),
            title: "neque-non-et-voluptatem",
            description:
              "Try to index the HEX interface, maybe it will input the cross-platform program!",
            status: "pending",
            level: "normal",
            startAt: new Date("2022-10-17T22:45:00.000Z"),
            endAt: new Date("2022-10-17T23:30:00.000Z"),
            createdAt: new Date("2022-10-08T16:22:34.823Z"),
            updatedAt: new Date("2022-10-20T11:18:21.677Z"),
          },
          {
            _id: new ObjectId("6359b7dedc5c0e4e172913f2"),
            title: "eligendi-tempora-natus-dicta-quis",
            description: "Dolorum odit molestias praesentium fugiat et rerum.",
            status: "pending",
            level: "important",
            startAt: new Date("2022-03-06T21:30:00.000Z"),
            endAt: new Date("2022-03-06T22:30:00.000Z"),
            createdAt: new Date("2021-06-18T20:23:41.989Z"),
            updatedAt: new Date("2022-10-20T11:18:21.677Z"),
          },
        ],
      },
    ],
  },
];

export default seed;
