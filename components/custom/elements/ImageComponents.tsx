import Image from "next/image";
import Link from "next/link";

type imageTypes = {
    imageUrl: string;
    alt: string;
    url: string;
    style: {};
    outerStyle: {};
};

export default function ImageComponents({
    imageUrl,
    alt,
    url,
    style,
    outerStyle,
}: imageTypes) {
    return url === "#" ? (
        <div style={outerStyle}>
            <Image
                style={style}
                width={600}
                height={600}
                alt={alt}
                src={imageUrl}
            />
        </div>
    ) : (
        <div style={outerStyle}>
            <Link href={url}>
                <Image
                    style={style}
                    width={600}
                    height={600}
                    alt={alt}
                    src={imageUrl}
                />
            </Link>
        </div>
    );
}
