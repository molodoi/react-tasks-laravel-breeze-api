import axios from "./axios";

export const getTasks = async () => {
    // await sleep(5000);
    return await axios.get("/api/v1/tasks").then((res) => res.data.data);
};
