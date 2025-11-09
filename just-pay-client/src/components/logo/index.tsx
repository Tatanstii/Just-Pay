import { useNavigate } from "@tanstack/react-router"

export default function Logo() {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate({ to: "/" });
    }

    return <h1 className="text-muted text-2xl font-bold hover:cursor-pointer" onClick={goToHome}>JustPay</h1>
}