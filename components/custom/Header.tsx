import Image from "next/image";
import { Button } from "../ui/button";

export default function Header() {
    return (
        <header className="py-3 shadow-2xl shadow-zinc-800/10">
            <div className="container flex justify-between items-center">
                <Image
                    src={"/logo.svg"}
                    width={160}
                    height={50}
                    alt="Emailator Logo"
                />

                <nav>
                    <Button>Get Started</Button>
                </nav>
            </div>
        </header>
    );
}
