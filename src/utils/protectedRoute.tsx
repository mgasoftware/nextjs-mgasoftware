/* eslint-disable @typescript-eslint/no-floating-promises */
import { useEffect } from "react";
import { useRouter } from "next/router";

type Props = {
    children?: JSX.Element
}

const ProtectedRoute = ({ children }: Props) => {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            router.push('../dashboard')
        }
        else {
            router.push('/')
        }
    }, [router]);

    return children;
};

export default ProtectedRoute;