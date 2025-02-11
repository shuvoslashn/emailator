type textTypes = {
    style: {};
    content: string;
};

export default function TextComponents({ style, content }: textTypes) {
    return (
        <p style={style} className="w-full">
            {content}
        </p>
    );
}
