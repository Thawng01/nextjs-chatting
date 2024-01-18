import Image from "next/image";
import React from "react";
import ImagePlaceholder from "../ImagePlaceholder";

interface Props {
    profile: string | undefined;
    username: string | undefined;
    height?: string;
    width?: string;
    textSize?: string;
}
const Avatar = ({
    profile,
    username,
    textSize,
    height = "h-14",
    width = "w-14",
}: Props) => {
    return (
        <div className={`${height} ${width}`}>
            {profile ? (
                <div className={`rounded-full relative ${height} ${width}`}>
                    <Image
                        src={profile}
                        alt="profile"
                        fill
                        priority
                        className="object-cover rounded-full"
                    />
                </div>
            ) : (
                <ImagePlaceholder
                    name={username}
                    height={height}
                    width={width}
                    textSize={textSize}
                />
            )}
        </div>
    );
};

export default Avatar;
