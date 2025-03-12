import {
  Alert,
  Image,
  ImageSourcePropType,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import icons from "@/constants/icons";
import { account, avatar} from "@/lib/appwrite";


interface SettingsItemProp {
  icon: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  textStyle?: string;
  showArrow?: boolean;
}

const SettingsItem = ({
  icon,
  title,
  onPress,
  textStyle,
  showArrow = true,
}: SettingsItemProp) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex flex-row items-center justify-between py-3"
  >
    <View className="flex flex-row items-center gap-3">
      <Image source={icon} className="size-6" />
      <Text className={`text-lg font-rubik-medium text-black-300 ${textStyle}`}>
        {title}
      </Text>
    </View>
  </TouchableOpacity>
);

const Profile = () => {
const router = useRouter();
const [user, setUser] = useState<any>('');
const [newpass, SetnewPass] =useState('');
const [oldpass, SetoldPass] =useState ('')
const [ModalVisible, SetModalVisible] = useState (false)
const [oldpass1, SetOldPass1] = useState('')


const ChangePass = async () => {
try {
  const change= await account.updatePassword(newpass, oldpass)
  Alert.alert('Password Changed!')
  console.log(change)
} catch (error) {
  Alert.alert(' Password Change Failed' )
  console.log(error)
}
}


 const getCurrentUser = async ()=>{
    try {
      const result = await account.get();
      if (result.$id) {
        const userAvatar = avatar.getInitials(result.name);
  
        return {
          ...result,
          avatar: userAvatar.toString(),
        };
      }
      SetOldPass1(result.password ?? '')
  
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }


  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
      Logout();
    }
  


  const Logout = async ()=> {
    try {
      const response= await account.deleteSession('current');
      console.log(response)
      router.replace('/GetStarted')
      Alert.alert ('Logout Successful')
    } catch (error) {
      
    }
  }

  const Submit = () => {
    if (oldpass===oldpass1) {
      Alert.alert('Old Password Matched', 'Password not changed')
      SetModalVisible(false)
    } else {
      ChangePass();
      Alert.alert ('Password Changed!')
      SetModalVisible(false)
    }
  }

 

  return (
  
    <SafeAreaView className="h-full " style={{backgroundColor: 'white'}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 px-7"
      >
        <Text className=" flex flex-col font-rubik-black text-m mt-5">Profile </Text>
    
        <View className="flex flex-row justify-center mt-5">
          <View className="flex flex-col items-center relative mt-5">
            <Image
              source={{ uri: user?.avatar }}
              className="size-44 relative rounded-full"
            />
        

            <Text className="text-2xl font-rubik-bold mt-2">{user.name}</Text>
          </View>
        </View>


        
        <View className="flex flex-col  mt-3 pt-5 border-primary-200">
          <SettingsItem
            icon={icons.profileicon}
            title="Change Password"
            textStyle="text-black"
            showArrow={true}
            onPress={() => SetModalVisible(true)}
          />
        </View>

        <Modal transparent={true} visible={ModalVisible} animationType='slide' >
          <View style ={style.ModalView}>
            <TextInput
            value={oldpass}
            onChangeText={SetoldPass}
            placeholder="Enter Old Password"
            style ={style.Input}
            />

          <TextInput
            value={newpass}
            onChangeText={SetnewPass}
            placeholder="Enter New Password"
            style ={style.Input}
            />

          <TouchableOpacity onPress={Submit}>
            <Text> Submit</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={()=> SetModalVisible(false)}>
            <Text> Close</Text>
          </TouchableOpacity>
          </View>
        </Modal>

        
      

        <View className="flex flex-col  mt-3 pt-5 border-primary-200">
          <SettingsItem
            icon={icons.logout}
            title="Logout"
            textStyle="text-danger"
            showArrow={false}
            onPress={handleLogout}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const style = StyleSheet.create({
  ModalView: {
    backgroundColor: '#be2ed6',
    height: 300,
    width: 300,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 250,
    borderRadius: 20,
    padding: 20,
  },
  Input: {
    borderWidth: 1,
    borderColor: '#000000',
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  Button: {
    backgroundColor: '#f3f3f3',
    alignSelf: 'center',
    height: 30,
    alignItems: 'center'

  }
})

