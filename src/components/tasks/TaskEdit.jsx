import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuthContext from "../../context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import { getTask, updateTask } from "../../api/task";
import Loader from "../Loader";

function TaskEdit() {
    let { id } = useParams();
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {
        data: task,
        isLoading,
        error,
        isError,
        refetch,
    } = useQuery({
        queryKey: ["task", id],
        queryFn: () => getTask(id),
    });

    const mutation = useMutation(updateTask, {
        onSuccess: () => {
            // La mutation a réussi
            refetch();
            navigate("/");
        },
        onError: (error) => {
            // Une erreur s'est produite lors de la mutation
            console.error(
                "Une erreur s'est produite lors de la mise à jour de la tâche :",
                error
            );
        },
    });

    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <div>Error! {error.message}</div>;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const { title, description } = event.target.elements;
        // Appel de la mutation pour créer une nouvelle tâche
        mutation.mutate({
            id: task.data.id,
            title: title.value,
            description: description.value,
        });
    };
    return (
        <div className="container mx-auto max-w-3xl md:mt-12 bg-white border-solid border-1 border-gray-400 shadow-2xl rounded-lg">
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-5 md:py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-10">
                        <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
                            Edit Task
                        </h1>
                    </div>
                    <div className="lg:w-2/3 w-full mx-auto overflow-auto">
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label
                                    htmlFor="title"
                                    className="block text-sm font-medium leading-6 text-gray-900 mt-5"
                                >
                                    Title
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="title"
                                        name="title"
                                        type="text"
                                        defaultValue={task.data.title}
                                        autoComplete="title"
                                        required
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Your task title..."
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="description"
                                    className="block text-sm font-medium leading-6 text-gray-900 mt-2"
                                >
                                    Description
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="description"
                                        name="description"
                                        defaultValue={task.data.description}
                                        rows="4"
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Your task description..."
                                    ></textarea>
                                </div>
                            </div>
                            <div className="flex justify-end pl-4 mt-4 w-full mx-auto">
                                <Link
                                    to="/"
                                    className="flex mr-2 text-center text-sky-800 border-solid border-2 border-sky-800 py-2 px-4 focus:outline-none rounded"
                                    aria-current="page"
                                >
                                    <ArrowLeftCircleIcon className="h-6 w-6 mr-1 text-sky-800" />{" "}
                                    Back
                                </Link>
                                <button
                                    type="submit"
                                    className="text-center text-white bg-sky-800 border-0 py-2 px-6 focus:outline-none hover:bg-sky-900 rounded"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default TaskEdit;
