"use client";
import React, { ChangeEvent } from "react";

interface Props {
    id: string;
    label: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    name: string;
    type: string;
    placeholder: string;
}

const Input = ({ id, label, value, onChange, name, ...otherProps }: Props) => {
    return (
        <div className="relative w-full h-12 rounded-lg my-6">
            <input
                className="absolute border border-[gray] w-full h-full peer placeholder-transparent
                 focus:outline-none px-3 rounded-md"
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                {...otherProps}
            />
            <label
                htmlFor={id}
                className="absolute left-2 px-1 -top-[1px] -translate-y-1/2 bg-white z-10 text-black
                transition-all duration-300 peer-placeholder-shown:top-[1.5rem] 
                peer-focus:-top-[1px] peer-focus:text-black peer-placeholder-shown:text-[gray]"
            >
                {label}
            </label>
        </div>
    );
};

export default Input;
