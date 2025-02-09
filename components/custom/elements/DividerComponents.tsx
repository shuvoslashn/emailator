type dividerTypes = {
    style: {};
    outerStyle: {};
};

export default function DividerComponents({ style, outerStyle }: dividerTypes) {
    return (
        <div style={outerStyle}>
            <div style={style}></div>
        </div>
    );
}
