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
    return (
        <div>
            {url === "#" ? (
                <div style={outerStyle}>
                    <Image
                        style={style}
                        width={1000}
                        height={600}
                        alt={alt}
                        src={imageUrl}
                        priority={true}
                        unoptimized
                        className="w-full"
                    />
                </div>
            ) : (
                <div style={outerStyle}>
                    <Link href={url}>
                        <Image
                            style={style}
                            width={1000}
                            height={600}
                            alt={alt}
                            src={imageUrl}
                            unoptimized
                            className="w-full"
                        />
                    </Link>
                </div>
            )}
        </div>
    );
}
