import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuthContext from "../../context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createTask } from "../../api/task";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import Loader from "../Loader";

function TaskCreate() {
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const mutation = useMutation(createTask, {
        onSuccess: () => {
            navigate("/");
            toast.success("Task was created !", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        },
        onError: (error) => {
            if (error.message) {
                const errorData = JSON.parse(error.message);
                setErrors(errorData);
            }
            toast.error("Something went wrong ! !", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        },
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { title, description } = event.target.elements;
        await mutation.mutateAsync({
            title: title.value,
            description: description.value,
            status: 1,
        });
    };

    if (mutation.isLoading) {
        return <Loader />;
    }

    return (
        <div className="container mx-auto max-w-3xl md:mt-12 bg-white border-solid border-1 border-gray-400 shadow-2xl rounded-lg">
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-5 md:py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-10">
                        <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
                            Create a new Task
                        </h1>
                        {mutation.isError && (
                            <div style={{ color: "red" }}>
                                {mutation.error.message.message}
                            </div>
                        )}
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
                                        autoComplete="title"
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Your task title..."
                                    />
                                    {errors.title &&
                                        errors.title.map((item, index) => {
                                            return (
                                                <p
                                                    className="mt-2 text-sm text-red-600 dark:text-red-500"
                                                    key={index}
                                                >
                                                    {item}
                                                </p>
                                            );
                                        })}
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
                                        rows="4"
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Your task description..."
                                    ></textarea>
                                    {errors.description &&
                                        errors.description.map(
                                            (item, index) => {
                                                return (
                                                    <p
                                                        className="mt-2 text-sm text-red-600 dark:text-red-500"
                                                        key={index}
                                                    >
                                                        {item}
                                                    </p>
                                                );
                                            }
                                        )}
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
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default TaskCreate;
