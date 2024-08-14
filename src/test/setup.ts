import { MongoMemoryServer } from "mongodb-memory-server"
import mongoose from "mongoose"



// declare global {
//     namespace NodeJS {
//         interface Global {
//             signInManager(): Promise<string>;
//             signInTablet(): Promise<string>;
//             signInManager(): Promise<string>;
//         }
//     }
// }


jest.setTimeout(60000);

let mongo: any
beforeAll(async () => {
    mongo = await MongoMemoryServer.create();
    const uri = mongo.getUri();

    await mongoose.connect(uri, {
    });
})

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
})

beforeEach(async () => {

    const collections = await mongoose.connection.db.collections();

    for (const collection of collections) {
        await collection.deleteMany({});
    }

});



