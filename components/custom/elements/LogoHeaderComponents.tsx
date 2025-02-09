import Image from "next/image";
import Link from "next/link";

type logoTypes = {
    imageUrl: string;
    alt: string;
    url: string;
    style: {};
    outerStyle: {};
};

export default function LogoHeaderComponents({
    imageUrl,
    alt,
    url,
    style,
    outerStyle,
}: logoTypes) {
    return (
        <div style={outerStyle} className="shadow-md text-center">
            <Link href={url} className="">
                <Image
                    style={style}
                    width={300}
                    height={60}
                    alt={alt}
                    src={imageUrl}
                    className="mx-auto"
                />
            </Link>
        </div>
    );
}
