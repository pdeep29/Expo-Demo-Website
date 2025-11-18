// navigationHelpers.ts
let scrollToSection: ((section: 'about' | 'contact') => void) | null = null;
let pendingSection: 'about' | 'contact' | null = null;

export const setScrollHandler = (handler: typeof scrollToSection) => {
    scrollToSection = handler;
    if (pendingSection) {
        scrollToSection(pendingSection);
        pendingSection = null;
    }
};

export const triggerScrollToSection = (section: 'about', isHomeScreen: boolean) => {
    if (isHomeScreen && scrollToSection) {
        scrollToSection(section);
    } else {
        pendingSection = section;
    }
};
