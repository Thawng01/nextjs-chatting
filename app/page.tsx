import { redirect } from "next/navigation";
import { getCookie } from "@/lib/cookie";

export default async function Home() {
    const { cookie } = await getCookie();
    if (!cookie) redirect("/login");

    redirect("/chats");
}
