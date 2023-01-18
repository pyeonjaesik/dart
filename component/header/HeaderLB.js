import React from 'react';
import {StyleSheet, Text ,Image} from 'react-native';
import Ripple from 'react-native-material-ripple';

export default class Header extends React.Component{
  render(){
    let t_index=false;
    return(
      <Ripple style={styles.loginButton} onPress={() => {
        if(t_index==false){
          t_index=true;
          this.props.navigation.push('Login',{
          });
        }
        setTimeout(()=>{t_index=false
          console.log('t_index ==> false');
        },500); 
      }}
      rippleColor='rgb(255,255,255)' rippleDuration={300}>
        <Image source={require('../../assets/lock.png')} style={styles.lock}/>
        <Text style={styles.logintxt}>여기를 클릭하여 로그인을 완료해주세요!</Text>
        
      </Ripple>
    )
  }
}
const styles = StyleSheet.create({
  loginButton:{
    flex:1,
    flexDirection:'row',
    alignItems:'center'
  },
  lock:{
    marginLeft:10,
    marginRight:5,
    width:40,
    height:40,
  },
  logintxt:{
    color:'white',
    fontSize:15,
    lineHeight:20,
    height:20,
  }
});