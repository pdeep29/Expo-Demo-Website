import { fireEvent, render, screen } from "@testing-library/react-native";
import HomeScreen from "../index"; // adjust path if needed
import React = require("react");

// Mock expo-router
jest.mock("expo-router", () => ({
    useRouter: () => ({ push: jest.fn() }),
}));

// Mock context
jest.mock("@/components/context/AppbarHeightContext", () => ({
    useAppbarHeight: () => ({ height: 50 }),
}));

// Mock child components
jest.mock("@/components/HeroSection", () => ({
    HeroSection: () => <></>,
}));
jest.mock("@/components/HtmlMapView", () => () => <></>);
jest.mock("@/assets/svg/UserSvg", () => () => <></>);

// Mock expo-image to be a simple View
jest.mock("expo-image", () => ({
    Image: ({ source, ...rest }: any) => <></>,
}));

describe("HomeScreen", () => {
    test("renders main sections", () => {
        render(<HomeScreen />);
        expect(screen.getByText("Our Services")).toBeTruthy();
        expect(screen.getByText("Products")).toBeTruthy();
        expect(screen.getByText("What Our Customers Say")).toBeTruthy();
        expect(screen.getByText("About Us")).toBeTruthy();
    });

    test("opens and closes contact modal", () => {
        render(<HomeScreen />);

        // Open modal
        const contactButton = screen.getAllByText("Contact Us")[0];
        fireEvent.press(contactButton);

        // Modal text should appear
        expect(screen.getByText(/Call us at: 9876543210/)).toBeTruthy();

        // Close modal
        fireEvent.press(screen.getByText("Close"));

        // Modal should disappear
        expect(screen.queryByText(/Call us at: 9876543210/)).toBeNull();
    });
});
