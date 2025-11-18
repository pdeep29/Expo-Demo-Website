import { HeroSection } from "@/components/HeroSection";
import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import * as RN from "react-native";

// Mock the AppbarHeightContext dependency
jest.mock("@/components/context/AppbarHeightContext", () => ({
    useAppbarHeight: () => ({ height: 50 }),
}));

beforeEach(() => {
    // Default mock: mobile screen
    jest.spyOn(RN, "useWindowDimensions").mockReturnValue({
        width: 400,
        height: 800,
        scale: 1,
        fontScale: 1,
    });

    // Default mock: iOS
    Object.defineProperty(RN.Platform, "OS", {
        configurable: true,
        get: () => "ios",
    });
});

afterEach(() => {
    jest.restoreAllMocks();
});

test("renders without crashing", () => {
    render(<HeroSection onPressLeft={function (): void {

    }} onPressRight={function (): void {

    }} />);
});

test("renders all content correctly", () => {
    const { getByText, getByTestId } = render(<HeroSection onPressLeft={function (): void {

    }} onPressRight={function (): void {

    }} />);

    expect(getByText("Left Content")).toBeTruthy();
    expect(getByText("This is the left side content.")).toBeTruthy();
    expect(getByText("Right Content")).toBeTruthy();
    expect(getByText("This is the right side content.")).toBeTruthy();

    expect(getByTestId("hero-left")).toBeTruthy();
    expect(getByTestId("hero-right")).toBeTruthy();
});

// test("ImageBackground has correct dimensions", () => {
//     const { getByTestId } = render(<HeroSection />);
//     const imageBackground = getByTestId("hero-image");

//     // Flatten style array before checking
//     const style = Array.isArray(imageBackground.props.style)
//         ? Object.assign({}, ...imageBackground.props.style)
//         : imageBackground.props.style;

//     expect(style.width).toBe(400);
//     expect(style.height).toBe(750); // 800 - 50
// });

describe("layout behavior", () => {
    test("column layout on mobile", () => {
        const { getByTestId } = render(<HeroSection onPressLeft={function (): void {

        }} onPressRight={function (): void {

        }} />);
        const container = getByTestId("hero-container");

        const style = Array.isArray(container.props.style)
            ? Object.assign({}, ...container.props.style)
            : container.props.style;

        expect(style.flexDirection).toBe("column");
    });

    // test("row layout on desktop/web", () => {
    //     jest.spyOn(RN, "useWindowDimensions").mockReturnValue({
    //         width: 400, // small width, but Platform 'web' will still force row
    //         height: 800,
    //         scale: 1,
    //         fontScale: 1,
    //     });

    //     Object.defineProperty(RN.Platform, "OS", {
    //         configurable: true,
    //         get: () => "web",
    //     });

    //     const { getByTestId } = render(<HeroSection />);
    //     const container = getByTestId("hero-container");
    //     const style = Array.isArray(container.props.style)
    //         ? Object.assign({}, ...container.props.style)
    //         : container.props.style;

    //     expect(style.flexDirection).toBe("row");
    // });
});

test("buttons are pressable without crashing", () => {
    const { getByTestId } = render(<HeroSection onPressLeft={function (): void {

    }} onPressRight={function (): void {

    }} />);
    fireEvent.press(getByTestId("btn-learn-more"));
    fireEvent.press(getByTestId("btn-contact"));
    // No crash expected
});
