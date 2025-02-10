import Image from "next/image";
import Link from "next/link";

type iconAndOptionType = {
    icon: string;
    url: string;
};

type socialIconTypes = {
    socialIcons: iconAndOptionType[];
    option: iconAndOptionType[];
    style: {
        width?: number;
        height?: number;
    };
    outerStyle: {};
};

export default function SocialComponents({
    socialIcons,
    style,
    outerStyle,
}: socialIconTypes) {
    return (
        <div style={outerStyle}>
            {socialIcons?.map((socialIcon) => (
                <Link
                    href={socialIcon?.url}
                    key={crypto.randomUUID()}
                    style={style}
                >
                    <Image
                        src={socialIcon?.icon}
                        width={style?.width}
                        height={style?.width}
                        alt=""
                        className=""
                    />
                </Link>
            ))}
        </div>
    );
}
