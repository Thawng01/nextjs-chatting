import React from "react";

interface Props {
    name: string | undefined;
    style?: string;
    height?: string;
    width?: string;
    textSize?: string;
}

const ImagePlaceholder = ({
    name,
    style = "mx-auto",
    width = "w-14",
    height = "h-14",
    textSize = "text-4xl",
}: Props) => {
    return (
        <div
            className={`flex flex-none items-center justify-center rounded-full
                     bg-blue-800 ${style} ${height} ${width}`}
        >
            <p className={`capitalize text-white ${textSize}`}>
                {name?.slice(0, 1).toString()}
            </p>
        </div>
    );
};

export default ImagePlaceholder;
