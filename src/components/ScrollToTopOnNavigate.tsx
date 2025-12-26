import { useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ScrollToTopOnNavigate() {
    const lenis = useLenis();
    const pathname = usePathname();

    useEffect(() => {
        lenis?.scrollTo(0, { immediate: true });
    }, [pathname, lenis]);

    return null;
}