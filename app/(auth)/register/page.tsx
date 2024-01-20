"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import Input from "../Input";
import Button from "../Button";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import AuthLogo from "../AuthLogo";

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const { loading, register, error } = useAuth();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await register(formData);
    };

    return (
        <div className="w-full">
            {error && <p className="text-[red]">{error}</p>}
            <form onSubmit={handleSubmit} className="p-3 md:p-10 w-full">
                <Input
                    type="username"
                    label="Username"
                    placeholder="username"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                />
                <Input
                    type="email"
                    label="Email"
                    placeholder="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <Input
                    type="password"
                    label="Password"
                    id="password"
                    placeholder="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />

                <Button
                    type="submit"
                    label="Register"
                    isLoading={loading}
                    loadingLabel="Logging..."
                />
            </form>
            <div className="px-10">
                <span>
                    Already have an account?
                    <Link
                        href="/login"
                        className="text-sky-600 font-medium ml-2"
                    >
                        Login
                    </Link>
                </span>
            </div>
        </div>
    );
};

export default Register;
