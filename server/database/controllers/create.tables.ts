import { TableCreate } from "..";

export default async () => {
    try {
        await TableCreate();
        console.log("Table created successfully");
    }
    catch(err) {
        console.log(err);
    }
}