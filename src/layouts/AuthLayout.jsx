import { Navigate, Outlet, Link } from "react-router-dom";
import useAuthContext from "../context/AuthContext";

const AuthLayout = () => {
    const { user, logout } = useAuthContext();

    return user ? (
        <>
            <nav className="bg-sky-800 text-white px-2 py-2.5 sm:px-4">
                <div className="container mx-auto flex flex-wrap items-center justify-between">
                    <span className="p-2 text-white">
                        <Link
                            to="/"
                            className="p-2 text-white"
                            aria-current="page"
                        >
                            Welcome
                        </Link>
                    </span>

                    <ul className="flex md:mt-0">
                        {user ? (
                            <li>
                                <button
                                    onClick={logout}
                                    className="p-2 text-white"
                                >
                                    Logout
                                </button>
                            </li>
                        ) : (
                            <>
                                <li>
                                    <Link
                                        to="/login"
                                        className="p-2 text-white"
                                        aria-current="page"
                                    >
                                        Login
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/register"
                                        className="p-2 text-white"
                                        aria-current="page"
                                    >
                                        Register
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </nav>
            <Outlet />
        </>
    ) : (
        <Navigate to="/login" />
    );
};

export default AuthLayout;
