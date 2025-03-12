import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import images from "@/constants/images";
import { useRouter } from "expo-router";

const GetStarted = () => {
 const router = useRouter();

 const GoToRegister = ()=>{
  router.push('/Register')
 }
  return (
    < SafeAreaView style={{
      backgroundColor: '#d6cbeb',
      flex: 1,
    }}>
      <ScrollView>
     
        <Image source={images.LOGO} style={{
          height: 550,
          width: '100%'
        }}  />
          <View style={{
            padding: 25,
            backgroundColor:'white',
            height: '100%',
            borderTopLeftRadius: 35,
            borderTopRightRadius: 35,
            
          }}>
            <Text className=' text-3xl text-center
             font-rubik-bold ' style={{color:'gray'}}> WELCOME TO
           </Text>
           <Text className=' text-5xl text-center
             font-rubik-black ' style={{color:'#ca5cdd'}}>  TEACHERME
           </Text>
            <Text className=' text-center mt-5 mb-5 font-rubik-medium text-s' style={{fontStyle: 'italic'}}> 
             "Comprehend with Confidence"
            </Text>
            
        


           <TouchableOpacity  className=' shadow-full py-5 
           shadow-zinc-300 rounded-full border-opacity-20 mt-5' 
           style={{backgroundColor : '#be2ed6'}}> 
            
            <Text className={'text-center font-rubik-bold text-xl text-white'} onPress={GoToRegister}> GET STARTED</Text>


          </TouchableOpacity>
          
         </View>
    
      
         </ScrollView>
    </SafeAreaView>
  )
}
export default GetStarted;

