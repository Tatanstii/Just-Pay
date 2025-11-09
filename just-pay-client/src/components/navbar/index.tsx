import { Link } from "@tanstack/react-router";

export default function NavBar() {
    return (
        <nav>
            <ul className="flex space-x-4">
                <li className="text-white hover:underline hover:cursor-pointer">
                    <Link to="/dashboard">Dashboard</Link>
                </li>
            </ul>
        </nav>
    )
}
