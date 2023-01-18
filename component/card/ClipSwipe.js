import React,{Component} from 'react';
import { StyleSheet,Dimensions,Text,View,Platform} from 'react-native';
import FastImage from 'react-native-fast-image'
import Swiper from 'react-native-swiper';

const {width}=Dimensions.get("window");
const renderPagination = (index, total, context) => {
  return (
    <View style={styles.paginationStyle}>
      <Text style={{ 
         color: 'rgb(220,220,220)',
         paddingHorizontal:10,
         borderRadius:20,
         fontSize:15        
        }}>
        <Text style={{
          color: 'white',
          fontSize: 15
        }}>{index + 1}</Text>/{total}
      </Text>
    </View>
  )
}
export default function ClipSwipe(item){
  let cll=item.clip.length;
  if(cll===0){
    return null;
  }else if(cll===1){
    if(item.clip[0].type=='image/jpeg'){
      let ratio=parseFloat(item.im);
      return(
        <FastImage
          style={{width:width-30,height:ratio>1.8?(width-30)*1.8:(width-30)*ratio}}
          source={{
              uri: item.clip[0].uri,
              priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
      )
    }else{
      return(
        <FastImage
          style={{width:width-30,height:width-30}}
          source={{
              uri: item.clip[0].uri,
              priority: FastImage.priority.normal,
          }}
        />
      )
    }
  }else{
    let ClipArr=item.clip.map((x,index)=>{
      return(
        <FastImage
          key={index}
          style={{width:width-30,height:width-30}}
          source={{
              uri: x.uri,
              priority: FastImage.priority.normal,
          }}
          resizeMode={item.im[index]=='0'?FastImage.resizeMode.cover:FastImage.resizeMode.contain}
        />
      )
    });
    return(
      <Swiper 
        style={Platform.OS==='ios'?{...styles.swiper,width:(width-30)*cll}:{...styles.swiper}} 
        showsPagination={true} 
        showsButtons={false} 
        loop={false} 
        renderPagination={renderPagination} 
        paginationStyle={{
          bottom: 0, left: null, right: 10
        }}
      >
        {
          ClipArr
        }
      </Swiper>
    )
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
  },
  swiper:{
    width:width-30,
    height:width-30,
  },
  paginationStyle:{
    position:'absolute',
    top:10,
    right:10,
    backgroundColor:'rgba(0,0,0,0.4)',
    height:23,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:23
  }
})