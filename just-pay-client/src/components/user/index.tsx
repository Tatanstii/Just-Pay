import { useNavigate } from "@tanstack/react-router";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";



type PropTypes = {
    name: string;
}

export default function User(props: PropTypes) {
    const navigate = useNavigate();

    const goToUserPanel = () => {
        navigate({ to: "/user-panel" });
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button variant="outline" className="hover:cursor-pointer">{props.name}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={goToUserPanel} className="hover:cursor-pointer">User panel</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
