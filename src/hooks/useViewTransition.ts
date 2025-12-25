import { useTransitionRouter } from "next-view-transitions";
import { useRouter } from "next/navigation";

export default function useViewTransition() {
    const transitionRouter = useTransitionRouter() 
    const router = useRouter()

    function slideInOut() {
        document.documentElement.animate(
            [
                { transform: 'translateY(0vh)' },
                { transform: 'translateY(-100vh)' },
            ],
            {
                duration: 500,
                easing: 'ease',
                pseudoElement: '::view-transition-old(root)',
            }
        )

        document.documentElement.animate(
            [
                { transform: 'translateY(100vh)' },
                { transform: 'translateY(0vh)', },
            ],
            {
                duration: 500,
                easing: 'ease',
                pseudoElement: '::view-transition-new(root)',
            }
        )
    }

    return { 
        routeTo: (url: string) => transitionRouter.push(url, { onTransitionReady: slideInOut }),
        prefetch: (url: string) => router.prefetch(url)
    };
}
