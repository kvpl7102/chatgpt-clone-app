import { connect, disconnect } from "mongoose";
async function connectToDatabase() {
    try {
        await connect(process.env.MONGODB_URL);
    }
    catch (error) {
        console.log(`Error connecting to the database: ${error}`);
        throw new Error(`Failed to connect to the database: ${error}`);
    }
}
async function disconnectFromDatabase() {
    try {
        await disconnect();
    }
    catch (error) {
        console.log(`Error disconnecting from the database: ${error}`);
        throw new Error(`Failed to disconnect from the database: ${error}`);
    }
}
export { connectToDatabase, disconnectFromDatabase };
//# sourceMappingURL=connection.js.map