import { Outlet } from "@tanstack/react-router";
import Header from "../components/header";

export default function ProtectedLayout() {

    return <div>
        <Header />
        <Outlet />
    </div>
}