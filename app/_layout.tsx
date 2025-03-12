import { useEffect } from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import "./globals.css";


export default function Layout() {
  const [fontsLoaded] = useFonts({
    'Rubik-Bold': require('../assets/fonts/Rubik-Bold.ttf'),
    'Rubik-Black': require('../assets/fonts/Rubik-Black.ttf'),
    "Rubik-Medium": require('../assets/fonts/Rubik-Medium.ttf'),
    'Rubik-Light': require('../assets/fonts/Rubik-Light.ttf'),
    'Rubik-Regular': require('../assets/fonts/Rubik-Regular.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.preventAutoHideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (

      <Stack screenOptions={{ headerShown: false }} />
  );
}