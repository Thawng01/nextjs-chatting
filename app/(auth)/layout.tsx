import React from "react";
import AuthLogo from "./AuthLogo";
import LogoText from "./LogoText";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col md:flex-row w-11/12 lg:w-8/12 mx-auto h-screen items-center">
            <AuthLogo />
            {children}
            <div className="block md:hidden mt-5 mb-3 text-center">
                <LogoText />
            </div>
        </div>
    );
};

export default AuthLayout;
