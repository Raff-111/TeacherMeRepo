import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, FlatList, ScrollView } from 'react-native'
import React, { useState } from 'react'
import data from '@/constants/Videos'
import YoutubeIframe from 'react-native-youtube-iframe'
export default function Video () {
  const[playing,setPlaying] = useState(false);
    return (
         <SafeAreaView className='h-full' style={{backgroundColor: '#EFE6D9'}}  >
            <View style={ styles.header}> 
              < Text className='font-rubik-black text-white text-6xl  mt-1.5  ' > TeacherMe</Text>  
            </View>

            <FlatList data={data} 
            keyExtractor={(item,index)=> `${index}`}
            renderItem={({item,index})=> {
              return(
                <ScrollView style={{marginTop: 2}} contentContainerStyle={{justifyContent:'space-between'}} >
                
                  <View style={styles.videocontainer}>
                  <Text className='font-rubik-medium text-lg mb-1 mt-2' style={{alignSelf: 'center'}}>{item.title}</Text>
                    <YoutubeIframe
                      height={300}
                      play={false}
                      videoId= {item.url}/>
                    <Text className='font-rubik-light text-s'>{item.time}</Text>
                  </View>
                                               
                </ScrollView>
               
              )
            }} />

          </SafeAreaView>
                        
    )
}
const styles= StyleSheet.create({
    Container:{ 
      backgroundColor: '#d3d3d3',
      alignContent: 'center',
      padding: 20,
      height: 250,
      borderRadius: 25,
      flex: 1
    },
    
    header:{
      height: 60,
      backgroundColor:"#ca5cdd",
      marginBottom: 10,
      borderBottomWidth: 5,
      borderBottomColor: '#aaa7ad',
    },
    videoheader:{
      width: '100%',
      height: 35,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',

    },
    videofooter:{
      width: 200,
      height: 30,
      backgroundColor: 'white',
      justifyContent:'center',
      marginBottom: 10,
     
    },
    videocontainer: {
      width:'100%',
      height: 270,
      backgroundColor: 'white',
      marginBottom: 20
    }
})