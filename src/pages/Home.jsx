import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
    TrashIcon,
    EyeIcon,
    PlusCircleIcon,
    CheckCircleIcon,
    ArrowPathIcon,
} from "@heroicons/react/24/outline";

import useAuthContext from "../context/AuthContext";

import { getTasks, deleteTask, updateStatusTask } from "../api/task";
import Loader from "../components/Loader";
import PageButton from "../components/PageButton";

const Home = () => {
    const { user } = useAuthContext();
    const queryClient = useQueryClient();
    const [page, setPage] = useState(1);

    const {
        data: tasks,
        isLoading,
        error,
        isError,
        isPreviousData,
        refetch,
    } = useQuery({
        queryKey: ["tasks", page],
        queryFn: () => getTasks(page),
    });

    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <div>Error! {error.message}</div>;
    }

    const deleteSkill = async (id) => {
        if (!window.confirm("Are you sure")) {
            return;
        }
        await deleteTask(id);
    };

    const updateStatus = async (event, id) => {
        event.preventDefault();
        await updateStatusTask(id);
        refetch();
    };

    const lastPage = () => setPage(tasks.meta.last_page);

    const firstPage = () => setPage(1);

    const pagesArray = Array(tasks.meta.last_page)
        .fill()
        .map((_, index) => index + 1);

    return (
        <div className="container mx-auto max-w-3xl md:mt-12 bg-white border-solid border-1 border-gray-400 shadow-2xl rounded-lg">
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-5 md:py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-10">
                        <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
                            Tasks
                        </h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                            Make the tasks come through
                        </p>
                    </div>
                    <div className="flex justify-end lg:w-2/3 w-full mx-auto overflow-auto">
                        <Link
                            to="/tasks/create"
                            className="flex text-center text-white bg-sky-800 border-0 p-2 focus:outline-none hover:bg-sky-900 rounded mb-3"
                            aria-current="page"
                        >
                            <PlusCircleIcon className="h-6 w-6 mr-1 text-white" />
                            Create a new Task
                        </Link>
                    </div>
                    <div className="lg:w-2/3 w-full mx-auto overflow-auto">
                        <table className="table-auto w-full text-left whitespace-no-wrap mt-2">
                            <thead>
                                <tr>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                                        Name
                                    </th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                                        Status
                                    </th>
                                    <th className="w-10 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks.data.map((task) => (
                                    <tr key={task.id}>
                                        <td className="px-4 py-3">
                                            {task.title}
                                        </td>
                                        <td className="px-4 py-3">
                                            <button
                                                onClick={(e) =>
                                                    updateStatus(e, task.id)
                                                }
                                                className="px-4 py-2 text-white rounded-md"
                                            >
                                                {task.status ? (
                                                    <CheckCircleIcon className="h-5 w-5 text-green-500" />
                                                ) : (
                                                    <ArrowPathIcon className="h-5 w-5 text-purple-500" />
                                                )}
                                            </button>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-stretch ">
                                                <Link
                                                    to={`/tasks/${task.id}/edit`}
                                                    className="self-center px-4 py-2 text-white rounded-md"
                                                >
                                                    <EyeIcon className="h-5 w-5 text-blue-500" />
                                                </Link>
                                                <button
                                                    onClick={() =>
                                                        deleteSkill(task.id)
                                                    }
                                                    className="self-center px-4 py-2 text-white rounded-md"
                                                >
                                                    <TrashIcon className="h-5 w-5 text-red-500" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-end pl-4 mt-4 lg:w-2/3 w-full mx-auto">
                        <a
                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer"
                            onClick={firstPage}
                            disabled={isPreviousData || page === 1}
                        >
                            <span className="sr-only">Previous</span>
                            <svg
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </a>
                        {/* Removed isPreviousData from PageButton to keep button focus color instead */}
                        {pagesArray.map((pg) => (
                            <PageButton
                                key={pg}
                                pg={pg}
                                setPage={setPage}
                                current={page}
                            />
                        ))}
                        <a
                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer disabled:bg-gray-400"
                            onClick={lastPage}
                            disabled={
                                isPreviousData || page === tasks.meta.last_page
                            }
                        >
                            <span className="sr-only">Next</span>
                            <svg
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
