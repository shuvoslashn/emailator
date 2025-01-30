import Logo from "./Logo";
import SignInButton from "./SignInButton";
import { ThemeToggle } from "./ThemeToggle";

export default function Header() {
    return (
        <header className="py-3 shadow-2xl shadow-zinc-800/10">
            <div className="container flex justify-between items-center">
                <Logo />

                <nav className=" flex gap-4">
                    <ThemeToggle />
                    <SignInButton size={"default"} variant={"default"} />
                </nav>
            </div>
        </header>
    );
}
