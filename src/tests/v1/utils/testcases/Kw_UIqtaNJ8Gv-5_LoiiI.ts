import { TSeed } from "../../types";
import { ObjectId } from "mongodb";

const seed: TSeed[] = [
  {
    collection: "users",
    documents: [
      {
        _id: new ObjectId("633295fd263d960e74ce5fc1"),
        firstName: "Delmer",
        lastName: "Medhurst",
        email: "Delmer.Medhurst@yahoo.com",
        password:
          "$2b$10$.GvbaW2Y17Qnr0As7RE6Cu2NkK69y4qqhBZEov7PSm3dyFtuPbqhW",
        createdAt: "2021-12-26T13:48:22.502Z",
        updatedAt: "2022-01-23T11:57:50.031Z",
        todos: [
          {
            _id: new ObjectId("6332869880a239ec6262caec"),
            title: "libero-accusantium-iusto-qui-fugit",
            description: "Praesentium ut quia voluptates ea rerum qui.",
            status: "done",
            level: "important",
            startAt: "2022-01-09T22:30:00.000Z",
            endAt: "2022-01-09T22:45:00.000Z",
            createdAt: "2021-04-28T14:59:41.566Z",
          },
          {
            _id: new ObjectId("6332869880a239ec6262caed"),
            title: "iure-hic-officiis-ut-dolorem",
            description: "Fugiat fugit sed et ut est eligendi.",
            status: "failed",
            level: "important",
            startAt: "2022-07-06T14:00:00.000Z",
            endAt: "2022-07-06T15:00:00.000Z",
            createdAt: "2021-11-21T07:13:11.154Z",
          },
          {
            _id: new ObjectId("6332869880a239ec6262caee"),
            title: "quae",
            description: "Maiores consequatur in dolore non aut enim.",
            status: "failed",
            level: "important",
            startAt: "2022-03-30T21:45:00.000Z",
            endAt: "2022-03-30T22:15:00.000Z",
            createdAt: "2022-03-07T18:37:48.152Z",
          },
        ],
      },
    ],
  },
];

export default seed;
