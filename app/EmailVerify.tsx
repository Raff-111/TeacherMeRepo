import { account } from "@/lib/appwrite";
import { useRouter } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks"
import { View, Text, StyleSheet, Alert} from "react-native";
import { useEffect } from 'react';
import * as Linking from 'expo-linking';

const EmailVerify = () => {
const router = useRouter();
const params = useSearchParams();
const secret = params.get('secret');
const id = params.get('userId');
console.log(secret,id)


useEffect(() => {
  updateVerify();
}, []);

async function updateVerify(){
try {
  const verify = await account.updateVerification( id,secret)
  Alert.alert('Email Verified')
  router.push ('./')
} catch (error) {
  console.log (error)
}
}
  return (
    <View style={{ alignSelf: 'center', justifyContent: 'center', flex: 1}}>
      <Text> Check your Email for Verification</Text>
    </View>
  )
}

export default EmailVerify