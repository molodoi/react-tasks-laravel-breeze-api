import axios from "./axios";

export const getTasks = async (page) => {
    // await sleep(5000);
    return await axios
        .get(`/api/v1/tasks?page=${page}`)
        .then((res) => res.data);
};

export const getTask = async (id) => {
    return await axios.get("/api/v1/tasks/" + id).then((res) => res.data);
};

export const createTask = async (taskData) => {
    try {
        const response = await axios.post("/api/v1/tasks", taskData);
        return response.data; // Retourne les données de la tâche créée
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(JSON.stringify(error.response.data.errors));
        } else {
            throw new Error(
                "Une erreur s'est produite lors de la création de la tâche."
            );
        }
    }
};

export const updateTask = async (taskData) => {
    const { id, title, description } = taskData;
    try {
        const response = await axios.put("/api/v1/tasks/" + id, {
            title,
            description,
        });
        return response.data; // Retourne les données de la tâche créée
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(JSON.stringify(error.response.data.errors));
        } else {
            throw new Error(
                "Une erreur s'est produite lors de la création de la tâche."
            );
        }
    }
};

export const deleteTask = async (id) => {
    return await axios.delete("/api/v1/tasks/" + id).then((res) => res.data);
};

export const updateStatusTask = async (id) => {
    return await axios
        .put("/api/v1/tasks/status/" + id)
        .then((res) => res.data);
};
