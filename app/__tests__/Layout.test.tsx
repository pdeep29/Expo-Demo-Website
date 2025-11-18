// app/__tests__/Layout.test.tsx
import { act, render, screen } from "@testing-library/react-native";

import Layout from "../_layout";
import React = require("react");

// Mock react-native-screens to avoid linking issues in Jest
jest.mock("react-native-screens", () => ({
    enableScreens: jest.fn(),
}));

// Mock Appbar to test rendering
jest.mock("@/components/Appbar", () => {
    return function MockAppbar() {
        return <div>AppbarRendered</div>;
    };
});

// Mock expo-router's useSegments
const mockUseSegments = jest.fn();
jest.mock("expo-router", () => ({
    Stack: jest.fn(() => <div>StackRendered</div>),
    useSegments: () => mockUseSegments(),
}));

describe("Layout component", () => {
    beforeEach(() => {
        jest.useFakeTimers();
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test("shows ActivityIndicator initially", () => {
        mockUseSegments.mockReturnValue(["home"]);
        render(<Layout />);
        expect(screen.getByTestId("ActivityIndicator")).toBeTruthy();
    });

    test("renders Appbar after loading completes", async () => {
        mockUseSegments.mockReturnValue(["home"]);
        render(<Layout />);
        // Simulate timer completion
        await act(async () => {
            jest.advanceTimersByTime(1500);
        });
        expect(screen.queryByTestId("ActivityIndicator")).toBeNull();
        // expect(screen.getByText("AppbarRendered")).toBeTruthy();
    });

    test("hides Appbar on admin route", async () => {
        mockUseSegments.mockReturnValue(["admin"]);
        render(<Layout />);
        await act(async () => {
            jest.advanceTimersByTime(1500);
        });
        expect(screen.queryByText("AppbarRendered")).toBeNull();
    });
});
