import { Button } from "../ui/button";
import Logo from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

export default function Header() {
    return (
        <header className="py-3 shadow-2xl shadow-zinc-800/10">
            <div className="container flex justify-between items-center">
                <Logo />

                <nav className=" flex gap-4">
                    <ThemeToggle />
                    <Button>Get Started</Button>
                </nav>
            </div>
        </header>
    );
}
