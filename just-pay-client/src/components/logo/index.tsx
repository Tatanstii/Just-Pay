import { useNavigate } from "@tanstack/react-router"

type PropTypes = {
    className?: string;
}

export default function Logo(props: PropTypes) {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate({ to: "/" });
    }

    return <h1 className={`text-muted text-2xl font-bold hover:cursor-pointer ${props.className}`} onClick={goToHome}>JustPay</h1>
}