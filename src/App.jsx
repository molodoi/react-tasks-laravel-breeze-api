import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import AuthLayout from "./layouts/AuthLayout";
import GuestLayout from "./layouts/GuestLayout";
import TaskCreate from "./components/tasks/TaskCreate";
import TaskEdit from "./components/tasks/TaskEdit";

// Create a client
const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="bg-slate-100 min-h-screen">
                <Routes>
                    <Route element={<AuthLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/tasks/create" element={<TaskCreate />} />
                        <Route path="/tasks/:id/edit" element={<TaskEdit />} />
                    </Route>
                    <Route element={<GuestLayout />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route
                            path="/forgot-password"
                            element={<ForgotPassword />}
                        />
                        <Route
                            path="/password-reset/:token"
                            element={<ResetPassword />}
                        />
                    </Route>
                </Routes>
            </div>
        </QueryClientProvider>
    );
}

export default App;
