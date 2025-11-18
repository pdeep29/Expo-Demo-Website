// context/AppbarHeightContext.tsx

import { createContext, useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import React = require("react");

const AppbarHeightContext = createContext<{
    height: number;
    setHeight: (height: number) => void;
}>({
    height: 0,
    setHeight: () => { },
});

export const AppbarHeightProvider = ({ children }: { children: React.ReactNode }) => {
    const [height, setHeight] = useState(0);

    return (
        // <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
            {/* <StatusBar translucent backgroundColor="transparent" barStyle={'dark-content'} /> */}

            <AppbarHeightContext.Provider value={{ height, setHeight }}>
                {children}
            </AppbarHeightContext.Provider>
        </SafeAreaView>
        // </SafeAreaProvider>
    );
};

export const useAppbarHeight = () => useContext(AppbarHeightContext);
