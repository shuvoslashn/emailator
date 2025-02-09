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
            textTransform: "default", //lowercase , capitilized
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
            textAlign: "center",
            backgroundColor: "#007bff",
            color: "#ffffff",
            padding: "12px 15px",
            width: "auto",
            fontSize: "14px",
            borderRadius: "0px",
            fontWeight: "normal",
            objectFit: "contain",
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
            height: "50%",
            width: "70%",
            margin: "0px",
            borderRadius: "0px",
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
        imageUrl: "/logo.svg",
        alt: "logo",
        url: "#",
        style: {
            backgroundColor: "#ffffff",
            padding: "10px",
            height: "30%",
            width: "30%",
        },
        outerStyle: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
            width: "100%",
        },
    },
    {
        icon: PanelTop,
        type: "LogoHeader",
        label: "Logo Header",
        imageUrl: "/logo.svg",
        alt: "logo",
        url: "#",
        style: {
            backgroundColor: "#ffffff",
            padding: "10px",
            height: "40%",
            width: "40%",
        },
        outerStyle: {
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            backgroundColor: "#fff",
            width: "100%",
        },
    },
    {
        icon: SquareSplitVertical,
        type: "Divider",
        label: "Divider",
        content: "",
        style: {
            color: "#000000",
            padding: "10px",
            width: "100%",
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
            width: 40,
            height: 40,
        },
        outerStyle: {
            display: "flex",
            gap: 15,
        },
    },
];
