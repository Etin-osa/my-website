import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import NavSection from '@/components/NavSection'
import * as navigation from 'next/navigation'
import * as lenis from 'lenis/react'

// Mocks
const mockRouteTo = vi.fn()
const mockPrefetch = vi.fn()
const mockIsPathnameCurrent = vi.fn()
const mockScrollTo = vi.fn()

vi.mock('next/navigation', () => ({
    usePathname: vi.fn(),
}))

vi.mock('lenis/react', () => ({
    useLenis: vi.fn(),
}))

vi.mock('@/hooks/useViewTransition', () => ({
    default: () => ({
        routeTo: mockRouteTo,
        prefetch: mockPrefetch,
        isPathnameCurrent: mockIsPathnameCurrent
    })
}))

// Mock ResizeObserver for Framer Motion
global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
}))

describe('NavSection Component', () => {
    const setLangKeyMock = vi.fn()

    beforeEach(() => {
        vi.clearAllMocks()
        vi.spyOn(navigation, 'usePathname').mockReturnValue('/')
        vi.spyOn(lenis, 'useLenis').mockReturnValue({ scrollTo: mockScrollTo } as any)
        
        // Default sessionStorage mock if needed, but JSDOM handles it.
        sessionStorage.clear()
        
        // Set default isPathnameCurrent behavior
        mockIsPathnameCurrent.mockReturnValue(false)
    })

    it('renders navigation links correctly in English', () => {
        render(<NavSection setLangKey={setLangKeyMock} langKey="EN" />)
        
        expect(screen.getAllByText('About')).toHaveLength(2)
        expect(screen.getAllByText('Services')).toHaveLength(2)
        expect(screen.getAllByText('Skills')).toHaveLength(2)
        expect(screen.getAllByText('Contact')).toHaveLength(2)
        expect(screen.getByText('ETIN')).toBeInTheDocument()
    })

    it('renders navigation links correctly in Spanish', () => {
        render(<NavSection setLangKey={setLangKeyMock} langKey="ES" />)

        expect(screen.getAllByText('Sobre mí')).toHaveLength(2)
        expect(screen.getAllByText('Servicios')).toHaveLength(2)
        expect(screen.getAllByText('Habilidades')).toHaveLength(2)
        expect(screen.getAllByText('Contacto')).toHaveLength(2)
        expect(screen.getByText('ETIN')).toBeInTheDocument()
    })

    it('opens language dropdown and switches language', async () => {
        render(<NavSection setLangKey={setLangKeyMock} langKey="EN" />)
        
        const langTrigger = screen.getByText('EN')
        fireEvent.click(langTrigger)
        
        const esOption = await screen.findByText('ES')
        fireEvent.click(esOption)
        
        expect(setLangKeyMock).toHaveBeenCalledWith('ES')
        expect(sessionStorage.getItem('lang')).toBe('ES')
    })

    it('calls routeTo when a nav link is clicked', () => {
        render(<NavSection setLangKey={setLangKeyMock} langKey="EN" />)
        
        // Click the first one (desktop usually first in DOM order or we can be specific)
        const aboutLinks = screen.getAllByText('About')
        fireEvent.click(aboutLinks[0])
        
        expect(mockRouteTo).toHaveBeenCalledWith('/', expect.objectContaining({ scrollTo: 'about' }))
    })

    it('calls scrollTo (lenis) when link is clicked on current page', () => {
        mockIsPathnameCurrent.mockReturnValue(true) 
        render(<NavSection setLangKey={setLangKeyMock} langKey="EN" />)
        
        const servicesLinks = screen.getAllByText('Services')
        fireEvent.click(servicesLinks[0])
        
        expect(mockRouteTo).not.toHaveBeenCalled()
        expect(mockScrollTo).toHaveBeenCalledWith('#services', expect.anything())
    })
    
    it('sets default language from sessionStorage on mount', () => {
        sessionStorage.setItem('lang', 'ES')
        render(<NavSection setLangKey={setLangKeyMock} langKey="EN" />) // render asks for EN but useEffect should switch it?
        
        // Initial render uses prop passed 'EN'.
        // useEffect runs -> checks session -> calls setLangKey('ES')
        expect(setLangKeyMock).toHaveBeenCalledWith('ES')
    })
})
