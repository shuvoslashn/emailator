import { Button } from "../ui/button";

export default function Hero() {
    return (
        <section className="w-full h-[93.5vh] py-12 flex justify-center items-center">
            <div className="container text-center max-w-6xl">
                <h1 className="text-5xl font-bold pb-6">
                    Ai Powered Email Templates
                </h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                    facilis sunt adipisci debitis possimus, nemo molestias
                    exercitationem, esse, distinctio ipsam unde enim. Minima
                    adipisci hic minus totam quod impedit blanditiis.
                </p>
                <div className="flex gap-3 justify-center mt-8">
                    <Button size={"lg"} variant={"outline"}>
                        Try Demo
                    </Button>
                    <Button size={"lg"}>Get Started</Button>
                </div>
            </div>
        </section>
    );
}
