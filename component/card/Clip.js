import React,{Component} from 'react';
import {View, StyleSheet,Dimensions,Image,Text} from 'react-native';
import FastImage from 'react-native-fast-image'


const {width}=Dimensions.get("window");
export default function Clip(item){
  let cll=item.clip.length;
  if(cll===0){
    return null;
  }else{
    if(item.clip[0].type=='image/jpeg'){
      if(cll>1){
        return(
          <View style={styles.container}>
    <FastImage
        style={{width:width-30,height:width-30}}
        source={{
            uri: item.clip[0].uri,
            // headers: { Authorization: 'someAuthToken' },
            priority: FastImage.priority.normal,
        }}
        // resizeMode={FastImage.resizeMode.contain}
    />
            <Text style={styles.info}>{`1/${cll}`}</Text>
          </View>
        )
      }else{
        return(
          <FastImage
          style={{width:width-30,height:width-30}}
          source={{
              uri: item.clip[0].uri,
              // headers: { Authorization: 'someAuthToken' },
              priority: FastImage.priority.normal,
          }}
          // resizeMode={FastImage.resizeMode.contain}
      />
        )
      }
    }else{
      if(cll>1){
        return(
          <Image 
            source={{uri: item.clip[0].uri}}
            style={{width:width-30,height:width-30}}
          />
        )
      }else{
        return(
          <Image 
            source={{uri: item.clip[0].uri}}
            style={{width:width-30,height:width-30}}
          />
        )
      }
    }
  }
}
const styles = StyleSheet.create({
  container:{
    width:width-30,
    height:(width-30),
  },
  info:{
    position:'absolute',
    top:10,
    right:10,
    height:23,
    fontSize:15,
    backgroundColor:'rgba(0,0,0,0.5)',
    color:'#ffffff',
    lineHeight:23,
    textAlign:'center',
    paddingHorizontal:12,
    borderRadius:23,
  }
})