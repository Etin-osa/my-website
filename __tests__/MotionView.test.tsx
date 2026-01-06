import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import MotionView from '@/components/MotionView'

// Mocks for framer motion if needed, but vitest usually handles imports ok.
// However, JSDOM doesn't do layout, so Viewport functionality is hard to test without mocks.
// For now we test logic paths.

describe('MotionView', () => {
    it('renders nothing when isDesktop is null', () => {
        const { container } = render(
            <MotionView isDesktop={null} htmlTag="div">
                Test Content
            </MotionView>
        )
        expect(container).toBeEmptyDOMElement()
    })

    it('renders standard HTML element when isDesktop is false (mobile)', () => {
        render(
            <MotionView isDesktop={false} htmlTag="div" htmlProps={{ "data-testid": "mobile-view" }}>
                Mobile Content
            </MotionView>
        )
        const element = screen.getByTestId('mobile-view')
        expect(element).toBeInTheDocument()
        expect(element).toHaveTextContent('Mobile Content')
        // Should typically not have motion styles (opacity) applied by JS immediately if it's standard tag,
        // but framer motion logic is complex. 
        // The main point is it renders.
    })

    it('renders standard HTML element when isDesktop is true but normal is true', () => {
        render(
            <MotionView isDesktop={true} normal={true} htmlTag="span" htmlProps={{ "data-testid": "desktop-normal" }}>
                Desktop Normal
            </MotionView>
        )
        const element = screen.getByTestId('desktop-normal')
        expect(element).toBeInTheDocument()
        expect(element.tagName).toBe('SPAN')
    })

    it('renders motion element when isDesktop is true', () => {
        // We can't easily distinguish motion vs normal DOM just by query in JSDOM, 
        // but we can check if it renders successfully.
        // Ideally we would check for the presence of motion-specific attributes or styles 
        // typically motion adds style="opacity: 0; transform: translateY(80px)..." initially
        render(
            <MotionView isDesktop={true} htmlTag="section" htmlProps={{ "data-testid": "desktop-motion" }}>
                Desktop Motion
            </MotionView>
        )
        const element = screen.getByTestId('desktop-motion')
        expect(element).toBeInTheDocument()
        expect(element.tagName).toBe('SECTION')
        
        // Check if style attribute exists (framer motion adds styles inline)
        // Note: This relies on implementation detail of framer-motion in JSDOM
        expect(element).toHaveAttribute('style')
    })

    it('passes htmlProps correctly', () => {
        render(
            <MotionView isDesktop={false} htmlTag="p" htmlProps={{ className: "test-class", id: "test-id" }}>
                Props Test
            </MotionView>
        )
        const element = screen.getByText('Props Test')
        expect(element).toHaveClass('test-class')
        expect(element).toHaveAttribute('id', 'test-id')
    })
})
