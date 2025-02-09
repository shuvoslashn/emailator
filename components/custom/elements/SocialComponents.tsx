import Image from "next/image";
import Link from "next/link";

type iconAndOptionType = {
    icon: string;
    url: string;
};

type socialIconTypes = {
    socialIcons: iconAndOptionType[];
    option: iconAndOptionType[];
    style: {};
    outerStyle: {};
};

export default function SocialComponents({
    socialIcons,
    style,
    outerStyle,
}: socialIconTypes) {
    return (
        <div style={outerStyle}>
            <div style={style} className="flex flex-grow gap-2">
                {socialIcons?.map((socialIcon) => (
                    <Link href={socialIcon?.url}>
                        <Image
                            src={socialIcon?.icon}
                            width={30}
                            height={30}
                            alt=""
                            className="w-8 h-8"
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
}
