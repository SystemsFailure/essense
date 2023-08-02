import { create } from "../../mongoose_database/actions/commentActions";

export default defineEventHandler(async (handler) => {

    const payload = await readBody(handler);
    const result = await create(payload.data);
    return {response: result}
}) 