import { useEffect, useState } from "react";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import useAuthContext from "../context/AuthContext";

import { getTasks } from "../api/task";
import Loader from "../components/Loader";

const Home = () => {
    const { user } = useAuthContext();
    const queryClient = useQueryClient();

    const {
        data: tasks,
        isLoading,
        error,
        isError,
    } = useQuery({
        queryKey: ["tasks"],
        queryFn: getTasks,
    });

    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <div>Error! {error.message}</div>;
    }

    return (
        <div className="container mx-auto mt-12">
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-20">
                        <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
                            Tasks
                        </h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                            Make the tasks come through
                        </p>
                    </div>
                    <div className="lg:w-2/3 w-full mx-auto overflow-auto">
                        <table className="table-auto w-full text-left whitespace-no-wrap">
                            <thead>
                                <tr>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                                        Name
                                    </th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                                        Description
                                    </th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                                        Status
                                    </th>
                                    <th className="w-10 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks.map((task) => (
                                    <tr key={task.id}>
                                        <td className="px-4 py-3">
                                            {task.title}
                                        </td>
                                        <td className="px-4 py-3">
                                            {task.description}
                                        </td>
                                        <td className="px-4 py-3">
                                            {task.status}
                                        </td>
                                        <td className="w-10 text-center">
                                            <input name="plan" type="radio" />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex pl-4 mt-4 lg:w-2/3 w-full mx-auto">
                        <button className="flex ml-auto text-white bg-sky-800 border-0 py-2 px-6 focus:outline-none hover:bg-sky-900 rounded">
                            Button
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
