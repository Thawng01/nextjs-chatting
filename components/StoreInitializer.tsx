"use client";
import { socket } from "@/lib/socket";
import { useChattingStore } from "@/store";
import { User } from "@/types/index-d";
import { useEffect, useRef } from "react";

interface Props {
    data: any;
    type: string;
}

const StoreInitializer = ({ data, type }: Props) => {
    const initialized = useRef<boolean>(false);
    if (!initialized.current) {
        useChattingStore.setState((state) => ({ ...state, [type]: data }));
        // const setUser = useChattingStore((store) => store.setUser);
        // setUser(user);
        initialized.current = true;
    }

    return null;
};

export default StoreInitializer;
