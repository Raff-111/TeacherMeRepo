import { useEffect, useState } from "react";
import { account } from "@/lib/appwrite";
import { useRouter } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { Stack } from 'expo-router';


export default function AppLayout() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    isLogin();
  }, []);

  const isLogin = async () => {
    try {
      const response = await account.get();
      console.log(response);
      setIsLoggedIn(true);
    } catch (error) {
      router.push('/GetStarted');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (isLoggedIn) {
    return (

        <Stack screenOptions={{headerShown:false}}/>

    );
  }

  // ...existing code...
}