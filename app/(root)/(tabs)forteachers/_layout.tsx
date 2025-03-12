import { View, Text, Image} from 'react-native'
import React from 'react'
import {  Tabs} from 'expo-router'
import icons from '@/constants/icons'









const TabIcon = ({focused, icon, title}: {focused: boolean; icon: any; title: string}) => (
    <View className='flex-1 mt-3 flex flex-col items-center'>
        <Image source={icon}  tintColor={focused ? '#be2ed6': '#808080'} resizeMode='contain' className='size-7' />
        <Text className={`${focused ? 'text-primary-300 font-rubik-medium' : 'text-black-200 font-rubik'} text-xs w-full text-center mt-1`}> 
          {title}  
        </Text>
    </View>
)


const TabsLayout =()=> {

 
  return (

    <Tabs
    screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
            backgroundColor: '#f3f3f3',
            position: 'absolute',
            borderTopColor: ' black',
            minHeight: 65,
            marginBottom: 20,
            marginRight: 20,
            marginLeft: 20,
            borderRadius: 40,
            shadowOffset:{width: 50, height: 20},
            shadowRadius: 20,
            shadowOpacity: 0.5

        }
    }}>
    <Tabs.Screen 
        name='Thome'
        options={{
            title: 'Thome',
            headerShown: false,
            tabBarIcon: ({focused}) => (
                <TabIcon icon={icons.homeicon} focused={focused} title='Home'/>
            
            ),      
           
        
        }}
        />
        
 

    <Tabs.Screen 
        name='Tprofile'
        options={{
            title: 'Tprofile',
            headerShown: false,
            tabBarIcon: ({focused}) => (
                <TabIcon icon={icons.profileicon} focused={focused} title='Profile'/>

            )      
        }}
        />
    </Tabs>    
  )


}
export default TabsLayout

