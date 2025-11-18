import { AppbarHeightProvider } from "@/components/context/AppbarHeightContext";
import { Stack, useSegments } from 'expo-router';

import { useEffect, useState } from "react";
import { ActivityIndicator, Platform, View } from 'react-native';
import { Appbar } from "../components/Appbar";
import React = require("react");

// Enable react-native-screens (only for native)
if (Platform.OS !== 'web') {
  require('react-native-screens').enableScreens();
}

export default function Layout() {
  const [isAppReady, setAppReady] = useState(false); // Web only loading
  const segments = useSegments();
  useEffect(() => {
    // if (Platform.OS === 'web') {
    const timeout = setTimeout(() => {
      setAppReady(true); // Simulate loading completion
    }, 1500); // Simulate a 1.5s loading delay
    return () => clearTimeout(timeout);
    // }
  }, []);
  //  testID="ActivityIndicator"
  // if (!isAppReady) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', position: 'absolute' }}>
  //       <ActivityIndicator testID="ActivityIndicator" size="large" color="#2563eb" />
  //     </View>
  //   );
  // }
  const isAdminRoute = segments[0] === "admin";
  return (
    <View style={{ flex: 1 }}>
      <AppbarHeightProvider >
        <Stack
          screenOptions={{
            header: isAdminRoute ? undefined : () => <Appbar />, // Hide Appbar for admin
            headerShown: isAdminRoute ? false : true,
          }}
        />
      </AppbarHeightProvider>
      {!isAppReady && <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', position: 'absolute', backgroundColor: 'white', height: '100%', width: '100%' }}>
        <ActivityIndicator testID="ActivityIndicator" size="large" color="#2563eb" />
      </View>}
    </View>

  );
}
