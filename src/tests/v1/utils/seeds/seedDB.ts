import path from "path";
import { MongoClient, Db, Collection, Document } from "mongodb";
import { TSeed } from "../../types/index";

export default async function seedDB(testCaseName?: string) {
  const databaseUri: string = process.env.TEST_DATABASE_URI || "";

  const client: MongoClient = new MongoClient(databaseUri);
  await client.connect();

  const db: Db = client.db("taskerTest");

  // clear the database
  await db.dropDatabase();

  if (testCaseName) {
    const seeds: TSeed[] = (
      await import(path.join(__dirname, "../testcases", testCaseName))
    ).default;

    await Promise.all(
      seeds.map(async (seed: TSeed) => {
        // ! Make sure test run synchronously to avoid interference between them
        await db.createCollection(seed.collection);

        const collection: Collection<Document> = db.collection(seed.collection);
        await collection.insertMany(seed.documents);
      })
    );
  }

  await client.close();
}
