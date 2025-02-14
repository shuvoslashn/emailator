type textTypes = {
    style: {};
    outerStyle: {};
    textarea: string;
};

export default function TextComponents({
    style,
    textarea,
    outerStyle,
}: textTypes) {
    return (
        <div style={outerStyle}>
            <p style={style} className="w-full">
                {textarea}
            </p>
        </div>
    );
}
