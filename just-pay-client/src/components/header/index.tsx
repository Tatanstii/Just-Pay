import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "../../store/useAuthStore";
import Logo from "../logo";
import NavBar from "../navbar";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import User from "../user";

export default function Header() {
    const navigate = useNavigate();

    const { user } = useAuthStore();

    const handleSignIn = () => {
        navigate({ to: "/login" });
    }

    const handleRegister = () => {
        navigate({ to: "/register" });
    }

    return (
        <header className="shadow-md p-4 px-8 mb-6 bg-primary">
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row gap-8 min-h-full">
                    <Logo />
                    {
                        user && (
                            <>
                                <span>
                                    <Separator orientation="vertical" className="border-white border-px" />
                                </span>
                                <NavBar />
                            </>
                        )
                    }
                </div>
                <div className="flex flex-row items-center gap-4">
                    {
                        user ? (
                            <User name={user.name} />
                        ) : (
                            <>
                                <Button variant="ghost" className="hover:cursor-pointer text-accent" onClick={handleRegister}>Register</Button>
                                <Button variant="secondary" className="hover:cursor-pointer" onClick={handleSignIn}>Sign in</Button>
                            </>
                        )
                    }
                </div>
            </div>
        </header>
    );
}