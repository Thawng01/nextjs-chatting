"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import Input from "../Input";
import Button from "../Button";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import AuthLogo from "../AuthLogo";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { login, loading, error } = useAuth();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await login(formData);
    };

    return (
        <div className="flex w-8/12 mx-auto h-screen items-center">
            <AuthLogo />
            <div className="w-full">
                <form onSubmit={handleSubmit} className="p-10 w-full">
                    {error && <p className="text-[red]">{error}</p>}
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
                        label="Login"
                        isLoading={loading}
                        loadingLabel="Logging..."
                    />
                </form>
                <div className="px-10">
                    <span>
                        {"Don't have an account yet?"}
                        <Link
                            href="/register"
                            className="text-sky-600 font-medium ml-2"
                        >
                            Register
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Login;
