import React from 'react';
import {StyleSheet,View, Text ,Image,TouchableOpacity,Platform} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {PermissionsAndroid} from 'react-native';

async function requestCameraPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return 0;
    } else {
      return 1;
    }
  } catch (err) {
    return 2;
  }
}
export default class Header extends React.Component{
  render(){
    return(
      <View style={styles.container}>
        <TouchableOpacity style={styles.infoCoin}
          onPress={()=>{
            this.props.navigation.navigate('Setting');
          }}
        >
          <Image 
            source={require('../../assets/profile.png')}
            style={{width:16,height:16,marginRight:8}}
          />
          <Text style={styles.infoCoin_txt}>{`${this.props.info.coin} 다트`}</Text>
        </TouchableOpacity>   
        <TouchableOpacity style={{...styles.touchbox,right:0}} onPress={()=>{
          this.props.navigation.navigate('Setting');
        }}>
          <Image source={require('../../assets/3dot.png')} style={{width:35,height:35}}/>
        </TouchableOpacity>
        <TouchableOpacity style={{...styles.touchbox,right:45}} onPress={()=>{
          this.props.navigation.navigate('Alarm');
        }}>
          <Image source={require('../../assets/bell.png')} style={{width:60,height:60}}/>
        </TouchableOpacity>
        <TouchableOpacity style={{...styles.touchbox,right:90}} onPress={async ()=>{
          console.log('post clicked');
          let pwindex=await AsyncStorage.getItem('pwindex');
          console.log(pwindex);
          if(pwindex==='false'){
            console.log(this.props);
            this.props._dialog();
            return;
          }
          if(Platform.OS!=='ios'){
            let avail=await requestCameraPermission();
            if(avail ===0){
              this.props.navigation.navigate('Post');
            }else if(avail ===1){
              alert('그냥 허용해라...')
            }else{
              alert('오류 발생한 듯 싶다... 미안하다. 나도 해결책을 모르겠다...')
            }
          }else{
            this.props.navigation.navigate('Post');
          }
          }}>
          <Image source={require('../../assets/pen.png')} style={{width:32,height:32}}/>
        </TouchableOpacity>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'row',
    alignItems:'center'
  },
  infoCoin:{
    paddingHorizontal:15,
    paddingVertical:5,
    backgroundColor:'rgba(255,255,255,0.1)',
    borderRadius:14,
    marginLeft:15,
    flexDirection:'row',
    alignItems:'center'
  },
  infoCoin_txt:{
    fontSize:15,
    color:'rgba(255,255,255,0.9)',
    fontWeight:'500'
  },
  touchbox:{
    position:'absolute',
    top:2.5,
    width:45,
    height:50,
      // backgroundColor:'rgba(1,65,22,0.2)',
    justifyContent:'center',
    alignItems:'center'
  }
});