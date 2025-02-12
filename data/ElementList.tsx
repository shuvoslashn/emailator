import {
    Frame,
    Image,
    PanelTop,
    RectangleEllipsis,
    SquareSplitVertical,
    Text,
    Twitter,
} from "lucide-react";

export default [
    {
        icon: Text,
        type: "Text",
        label: "Text",
        content:
            "Lorem ipsum dolor sit amet consectetur adipiscing elit nisl maecenas sem tempus, non vestibulum facilisi dis volutpat montes phasellus condimentum tristique hendrerit",
        style: {
            padding: "10px",
            textAlign: "left",
            fontSize: "16px",
            fontWeight: "normal",
            textTransform: "default",
            color: "#888888",
            width: "100%",
        },
        outerStyle: {
            backgroundColor: "#fff",
            width: "100%",
        },
    },
    {
        icon: RectangleEllipsis,
        label: "Button",
        type: "Button",
        content: "Sample Button",
        url: "#",
        style: {
            backgroundColor: "#000000",
            color: "#ffffff",
            padding: "12px",
            width: "auto",
            fontSize: "14px",
            borderRadius: "0px",
            fontWeight: "normal",
            objectFit: "contain",
            textTransform: "default",
        },
        outerStyle: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
        },
    },

    {
        icon: Image,
        type: "Image",
        label: "Image",
        imageUrl: "/imageComp.webp",
        alt: "Image",
        url: "#",
        style: {
            padding: "10px",
            height: "auto",
            width: "70%",
            margin: "0px",
            borderRadius: "0px",
            backgroundColor: "#fff",
        },
        outerStyle: {
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
        },
    },
    {
        icon: Frame,
        type: "Logo",
        label: "Logo",
        imageUrl: "/logo.webp",
        alt: "logo",
        url: "#",
        style: {
            width: "120px",
        },
        outerStyle: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
        },
    },
    {
        icon: PanelTop,
        type: "LogoHeader",
        label: "Logo Header",
        imageUrl: "/logo.webp",
        alt: "logo",
        url: "#",
        style: {
            padding: "10px",
            height: "",
        },
        outerStyle: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            backgroundColor: "#ffffff11",
        },
    },
    {
        icon: SquareSplitVertical,
        type: "Divider",
        label: "Divider",
        content: "",
        style: {
            backgroundColor: "#777",
            width: "100%",
            height: "1px",
        },
    },
    {
        type: "SocialIcons",
        icon: Twitter,
        label: "Social Icons",
        socialIcons: [
            {
                icon: "https://cdn-icons-png.flaticon.com/128/2111/2111463.png",
                url: "",
            },
            {
                icon: "https://cdn-icons-png.flaticon.com/128/5968/5968852.png",
                url: "",
            },
            {
                icon: "https://cdn-icons-png.flaticon.com/128/5968/5968756.png",
                url: "",
            },
        ],
        options: [
            {
                icon: "https://cdn-icons-png.flaticon.com/128/2111/2111463.png",
                url: "",
            },
            {
                icon: "https://cdn-icons-png.flaticon.com/128/5968/5968852.png",
                url: "",
            },
            {
                icon: "https://cdn-icons-png.flaticon.com/128/5968/5968756.png",
                url: "",
            },
        ],
        style: {
            width: "20px",
            height: "20px",
        },
        outerStyle: {
            display: "flex",
            gap: "4px",
            justifyContent: "center",
            width: "100%",
        },
    },
];
