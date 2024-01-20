import React, { Dispatch, SetStateAction } from "react";

interface Props {
    onClose: Dispatch<SetStateAction<boolean>>;
}
const Overlay = ({ onClose }: Props) => {
    return (
        <div
            className="fixed top-0 left-0  w-full h-full bg-transparent z-10"
            onClick={() => onClose(false)}
        />
    );
};

export default Overlay;
