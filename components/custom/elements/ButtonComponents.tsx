import { Button } from "@/components/ui/button";
import Link from "next/link";

type buttonTypes = {
    style: {};
    content: string;
    url: string;
};

export default function ButtonComponents({ style, content, url }: buttonTypes) {
    return (
        <Button style={style} asChild>
            <Link href={url}>{content}</Link>
        </Button>
    );
}
