import { useNavigate } from "@tanstack/react-router";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { useAuthStore } from "../../store/useAuthStore";

type PropTypes = {
    name: string;
}

export default function User(props: PropTypes) {
    const navigate = useNavigate();
    const { logout } = useAuthStore();

    const goToDashboard = () => {
        navigate({ to: "/dashboard" });
    }

    const handleLogout = () => {
        logout();
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="hover:cursor-pointer">{props.name}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={goToDashboard} className="hover:cursor-pointer">Dashboard</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="hover:cursor-pointer text-red-700 hover:text-red-600">Logout</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
