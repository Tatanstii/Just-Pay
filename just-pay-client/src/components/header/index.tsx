import { useAuthStore } from "../../store/useAuthStore";
import Logo from "../logo";
import NavBar from "../navbar";
import User from "../user";

export default function Header() {
    const { user } = useAuthStore();

    return (
        <header className="shadow-md p-4 px-8 mb-6 bg-primary">
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row gap-10 items-center">
                    <Logo />
                    <NavBar />
                </div>
                {
                    user && (
                        <User name={user.name} />
                    )
                }
            </div>
        </header>
    );
}