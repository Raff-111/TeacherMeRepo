import { View, Text, Image} from 'react-native'
import React from 'react'
import { Redirect, Tabs, useRouter, Stack} from 'expo-router'
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
        name='index'
        options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({focused}) => (
                <TabIcon icon={icons.homeicon} focused={focused} title='Home'/>
            
            ),      
           
        
        }}
        />
        
    <Tabs.Screen 
    name='Video'
    options={{
        title: 'Video',
        headerShown: false,
        tabBarIcon: ({focused}) => (
            <TabIcon icon={icons.Video} focused={focused} title='Learn'/>
        )      
    }}
    />


<Tabs.Screen 
    name='Dictionary'
    options={{
        title: 'Dictionary',
        headerShown: false,
        tabBarIcon: ({focused}) => (
            <TabIcon icon={icons.Book} focused={focused} title='Dictionary'/>
        )      
    }}
    />

    <Tabs.Screen 
        name='profile'
        options={{
            title: 'Home',
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

