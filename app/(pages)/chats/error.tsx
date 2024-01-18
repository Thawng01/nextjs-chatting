"use client";
import React from "react";

interface Props {
    error: Error;
    reset: () => void;
}
const Error = ({ error, reset }: Props) => {
    return (
        <div>
            <h1>{error.message}</h1>
        </div>
    );
};

export default Error;
