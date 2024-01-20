import React from "react";

interface Props {
    label: string;
    type: "button" | "submit" | "reset" | undefined;
    isLoading?: boolean;
    loadingLabel?: string;
}

const Button = ({ label, type, isLoading, loadingLabel }: Props) => {
    return (
        <button
            type={type}
            disabled={isLoading}
            className="bg-sky-600 p-3 font-semibold rounded-md text-white w-full disabled:opacity-40"
        >
            {isLoading ? loadingLabel : label}
        </button>
    );
};

export default Button;
