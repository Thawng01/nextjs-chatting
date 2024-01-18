import React from "react";

interface PropsType {
    label: string;
    position?: string;
}

const Tooltip = ({ label, position = "top-full" }: PropsType): JSX.Element => {
    return (
        <div
            className={`absolute left-1/2 -translate-x-1/2 text-center
             py-1 px-2 text-sm rounded-md invisible group-hover:visible ${position}`}
        >
            <span className="text-white">{label.split(" ")[0]} </span>
        </div>
    );
};

export default Tooltip;
