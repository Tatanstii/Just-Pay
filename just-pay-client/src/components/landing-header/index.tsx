import { useNavigate } from "@tanstack/react-router";
import { Button } from "../ui/button";

export default function LandingHeader() {
    const navigate = useNavigate();

    const handleSIgnIn = () => {
        navigate({ to: "/login" });
    }

    return (
        <header className="shadow-md p-4 px-8 mb-6 bg-primary">
            <div className="flex flex-row justify-between items-center">
                <h1 className="text-muted text-2xl font-bold">JustPay</h1>
                <div className="flex flex-row items-center gap-4">
                    <Button variant="ghost" className="hover:cursor-pointer text-accent">Register</Button>
                    <Button variant="secondary" className="hover:cursor-pointer" onClick={handleSIgnIn}>Sign in</Button>
                </div>
            </div>
        </header>
    );
}
