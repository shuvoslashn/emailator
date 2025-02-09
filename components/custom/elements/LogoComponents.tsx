import Image from "next/image";
import Link from "next/link";

type logoTypes = {
    imageUrl: string;
    alt: string;
    url: string;
    style: {};
    outerStyle: {};
};

export default function LogoComponents({
    imageUrl,
    alt,
    url,
    style,
    outerStyle,
}: logoTypes) {
    return url === "#" ? (
        <div style={outerStyle}>
            <Image
                style={style}
                width={300}
                height={60}
                alt={alt}
                src={imageUrl}
            />
        </div>
    ) : (
        <div style={outerStyle}>
            <Link href={url}>
                <Image
                    style={style}
                    width={300}
                    height={60}
                    alt={alt}
                    src={imageUrl}
                />
            </Link>
        </div>
    );
}
