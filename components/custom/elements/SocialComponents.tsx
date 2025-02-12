import Image from "next/image";
import Link from "next/link";
import { useId } from "react";

type iconAndOptionType = {
    icon: string;
    url: string;
};

type socialIconTypes = {
    socialIcons: iconAndOptionType[];
    option: iconAndOptionType[];
    style: {
        width?: string;
        height?: string;
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
                <Link href={socialIcon?.url} key={useId()}>
                    <Image
                        src={socialIcon?.icon}
                        width={25}
                        height={25}
                        alt=""
                        unoptimized
                    />
                </Link>
            ))}
        </div>
    );
}
