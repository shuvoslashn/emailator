import { Button } from "@/components/ui/button";
import Link from "next/link";

type buttonTypes = {
    style: {};
    outerStyle: {};
    content: string;
    url: string;
};

export default function ButtonComponents({
    style,
    content,
    url,
    outerStyle,
}: buttonTypes) {
    return (
        <div style={outerStyle}>
            <Button style={style} asChild>
                <Link href={url}>{content}</Link>
            </Button>
        </div>
    );
}
