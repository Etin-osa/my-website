import { useTransitionRouter } from "next-view-transitions";

export default function useViewTransition() {
    const router = useTransitionRouter() 

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
        routeTo: (url: string) => router.push(url, { onTransitionReady: slideInOut }),
    };
}
