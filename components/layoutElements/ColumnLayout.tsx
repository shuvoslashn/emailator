import { useId } from "react";

export default function ColumnLayout({ layout }: any) {
    return (
        <div key={useId()}>
            <div
                key={useId()}
                style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${layout?.numOfCol}, 1fr)`,
                    gap: "20px",
                }}
            >
                {Array.from({ length: layout?.numOfCol }).map((_, index) => (
                    <div className="p-4 bg-primary/10 mb-4">{index + 1}</div>
                ))}
            </div>
        </div>
    );
}
