import { useNavigate } from "@tanstack/react-router";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { useAuthStore } from "../../store/useAuthStore";
import { useToast } from "@/store/useToastStore";

type PropTypes = {
    name: string;
}

export default function User(props: PropTypes) {
    const navigate = useNavigate();
    const toast = useToast();
    const { logout } = useAuthStore();

    const goToUserPanel = () => {
        navigate({ to: "/user-panel" });
    }

    const handleLogout = async () => {
        try {
            await logout();
            navigate({ to: "/" });
        } catch (error) {
            toast.show((error as Error).message, "error");
        }

    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="hover:cursor-pointer">{props.name}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={goToUserPanel} className="hover:cursor-pointer">User panel</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="hover:cursor-pointer text-red-700 hover:text-red-600">Logout</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
