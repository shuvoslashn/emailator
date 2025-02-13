type textTypes = {
    style: {};
    textarea: string;
};

export default function TextComponents({ style, textarea }: textTypes) {
    return (
        <p style={style} className="w-full">
            {textarea}
        </p>
    );
}
