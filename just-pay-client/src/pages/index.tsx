
import { Button } from "../components/ui/button";
import { Link, useNavigate } from "@tanstack/react-router";
import LandingHeader from "../components/landing-header";
import { useAuthStore } from "../store/useAuthStore";

export default function Index() {
    const navigate = useNavigate();
    const { user } = useAuthStore();

    const handleSignIn = () => {
        navigate({ to: "/login" });
    }

    return (
        <>
            <LandingHeader />
            <main className="py-4 px-10 grid place-items-center min-h-[80vh]">
                <div className="flex flex-col gap-2 justify-center items-center mb-8 text-primary">
                    <h2 className="text-4xl">Welcome to Just Pay</h2>
                    <p className="text-2xl">Here you can test stripe integration.</p>
                    <div className="mt-4 flex flex-row gap-4 items-center">
                        {
                            user ? (
                                <p>Already logged in</p>
                            ) : (
                                <>
                                    <Button className="hover:cursor-pointer" onClick={handleSignIn}>Sign In</Button>
                                    <Link to="/register">Register</Link>
                                </>
                            )
                        }
                    </div>
                </div>
            </main>
        </>
    )
}