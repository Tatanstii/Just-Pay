import Logo from "../logo";
import NavBar from "../navbar";
import User from "../user";

export default function Header() {

    return (
        <header className="shadow-md p-4 px-8 mb-6 bg-primary">
            <div className="flex flex-row justify-between items-center">
                <Logo />
                <NavBar />
                <User name="John Doe" />
            </div>
        </header>
    );
}