import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity,Dimensions,Text, ActivityIndicator, Platform} from 'react-native';
import {MyStatusBar} from './MyStatusBar';
import { LoginButton,AccessToken,LoginManager } from 'react-native-fbsdk';
import RNAccountKit from 'react-native-facebook-account-kit';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import * as actions from '../actions';
import {URL} from '../config';
import LinearGradient from 'react-native-linear-gradient';
import {PermissionsAndroid} from 'react-native';

const {width}=Dimensions.get("window");

async function requeststatusPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE
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

class LoginScreen extends React.Component {
  constructor(props){
    super(props);
    this.state={
      token:'',
      type:'',
    }
     this.login_fb=this.login_fb.bind(this);
     this.login_phone=this.login_phone.bind(this);
     this.login_email=this.login_email.bind(this);
  };
  login_token='';
  login_avail=true;

  static navigationOptions = {
    header:null
  };
  logout_account_kit(){
    RNAccountKit.logout()
  .then(() => {
    console.log('Logged out')
  })
  }
  async login_fb(){
    LoginManager.logInWithReadPermissions(["public_profile"]).then(
      function(result) {
        if (result.isCancelled) {
          console.log("Login cancelled");
        } else {
          AccessToken.getCurrentAccessToken().then(
            ((data) => {
              this.login_token=data.accessToken.toString();
              let datam={
                token:this.login_token
              };
              const obj = {
                body: JSON.stringify(datam),
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                method: 'POST'
              }
              fetch(`${URL}/signupfb`, obj)
              .then((response) => response.json())
              .then(async (responseJson) => {
                if(responseJson.status==200){
                  console.log(responseJson)
                  await AsyncStorage.setItem('_id', responseJson._id);
                  await AsyncStorage.setItem('id', responseJson.id);
                  await AsyncStorage.setItem('coin', responseJson.coin.toString());
                  await AsyncStorage.setItem('type', 'fb');
                  await AsyncStorage.setItem('pwindex', responseJson.pwindex);
                  console.log('user_id:'+responseJson.user_id);
                  this.props.setall(responseJson._id,responseJson.id,responseJson.user_id,responseJson.coin.toString(),'fb','true',responseJson.pwindex);
                  this.props.navigation.goBack();
                  this.props.mgrefresh(parseInt(Date.now()));
                  
                }else if(responseJson.status==100){
                  await AsyncStorage.setItem('_id', responseJson._id);
                  await AsyncStorage.setItem('id', responseJson.id);
                  await AsyncStorage.setItem('coin', '0');
                  await AsyncStorage.setItem('type', 'fb');
                  await AsyncStorage.setItem('pwindex', 'false');
                  this.props.setall(responseJson._id,responseJson.id,responseJson.user_id,'0','fb','false');
                  console.log('login_token'+this.login_token);
                  this.props.navigation.navigate('SetName',{
                    token:this.login_token,
                    type:'fb',
                    from:this.props.navigation.getParam('from','Login')
                  });
                  //new user
                  this.props.mgrefresh(parseInt(Date.now()));
                }else{
                  //err
                }
              })
              .catch((error) => {
                console.error(error);
              });        
            })
          )
        }
      }.bind(this),
      function(error) {
        console.log("Login fail with error: " + error);
      }
    );
  }

  async login_phone(){
    let avail=await requeststatusPermission();
    RNAccountKit.loginWithPhone()
    .then((token) => {
      if (!token) {
        console.log('fdsjkhfasdkjhfdjakahjkfdshjkdfsadsafhkdsafhk');
        console.log('Login cancelled')
      } else {
        console.log(`Logged with phone. Token: ${token}`)
        this.login_token=token.token;
        let datam={
          token:token.token,
          type:1
        };
        const obj = {
          body: JSON.stringify(datam),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST'
        }
        fetch(`${URL}/signupkit`, obj)
        .then((response) => response.json())
        .then(async (responseJson) => {
          if(responseJson.status==200){
            console.log(responseJson);
            await AsyncStorage.setItem('_id', responseJson._id);
            await AsyncStorage.setItem('id', responseJson.id);
            await AsyncStorage.setItem('coin', responseJson.coin.toString());
            await AsyncStorage.setItem('type', 'ph');
            await AsyncStorage.setItem('pwindex', responseJson.pwindex);
            this.props.setall(responseJson._id,responseJson.id,responseJson.user_id,responseJson.coin.toString(),'ph',responseJson.pwindex);
            this.props.setkit(responseJson.ph,responseJson.email);
            this.props.navigation.goBack();
            this.props.mgrefresh(parseInt(Date.now()));
          }else if(responseJson.status==100){
            await AsyncStorage.setItem('_id', responseJson._id);
            await AsyncStorage.setItem('id', responseJson.id);
            await AsyncStorage.setItem('coin', '0');
            await AsyncStorage.setItem('type', 'ph');
            await AsyncStorage.setItem('pwindex', 'false');
            this.props.setall(responseJson._id,responseJson.id,responseJson.user_id,'0','ph','false');
            this.props.setkit(responseJson.ph,responseJson.email);
            this.props.navigation.navigate('SetName',{
              token:this.login_token,
              type:'ph',
              from:this.props.navigation.getParam('from','Login')
            });
            this.props.mgrefresh(parseInt(Date.now()));
            //new user
          }else{
            //err
          }
        })
        .catch((error) => {
          console.error(error);
        });        
      }
    })
  }

  async login_email(){
    RNAccountKit.loginWithEmail()
    .then((token) => {
      if (!token) {
        console.log('Login cancelled')
      } else {
        console.log(`Logged with email. Token: ${token}`);
        this.login_token=token.token;
        let datam={
          token:token.token,
          type:2
        };
        const obj = {
          body: JSON.stringify(datam),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST'
        }
        fetch(`${URL}/signupkit`, obj)
        .then((response) => response.json())
        .then(async (responseJson) => {
          if(responseJson.status==200){
            await AsyncStorage.setItem('_id', responseJson._id);
            await AsyncStorage.setItem('id', responseJson.id);
            await AsyncStorage.setItem('coin', responseJson.coin.toString());
            await AsyncStorage.setItem('type', 'em');
            await AsyncStorage.setItem('pwindex', responseJson.pwindex);
            this.props.setall(responseJson._id,responseJson.id,responseJson.user_id,responseJson.coin.toString(),'em',responseJson.pwindex);
            this.props.setkit(responseJson.ph,responseJson.email);
            this.props.navigation.goBack();
            this.props.mgrefresh(parseInt(Date.now()));
          }else if(responseJson.status==100){
            await AsyncStorage.setItem('_id', responseJson._id);
            await AsyncStorage.setItem('id', responseJson.id);
            await AsyncStorage.setItem('coin', '0');
            await AsyncStorage.setItem('type', 'em');
            await AsyncStorage.setItem('pwindex', 'false');
            this.props.setall(responseJson._id,responseJson.id,responseJson.user_id,'0','em','false');
            this.props.setkit(responseJson.ph,responseJson.email);
            this.props.navigation.navigate('SetName',{
              token:this.login_token,
              type:'em',
              from:this.props.navigation.getParam('from','Login')
            });
            this.props.mgrefresh(parseInt(Date.now()));
            //new user
          }else{
            //err
          }
        })
        .catch((error) => {
          console.error(error);
        });
      }
    });
  }

  getToken(){
    RNAccountKit.getCurrentAccessToken()
  .then((token) => {
    console.log(`Current access token: ${JSON.stringify(token)}`)
  })
  }

  render() {
    return (
      <View style={styles.container}>
      <MyStatusBar backgroundColor='rgba(255,255,255,0)' barStyle='light-content'/>
      <TouchableOpacity style={styles.leftbtn}
        onPress={() => {
          this.props.navigation.goBack()
        }}
      >
        <Image source={require('../assets/left_white.png')} style={{width:40,height:40}}/>
      </TouchableOpacity>


      <Text style={styles.subject}>
        {'로그인 후\n미션을 수행하여\n다트를 획득합니다.'}
      </Text>
      <TouchableOpacity style={styles.login_phone} onPress={this.login_phone} >
        <LinearGradient style={styles.login_gradient} start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgb(0,0,255)','rgb(255,0,0)']} >
           <Text style={styles.login_phone_txt}>핸드폰 번호로 계속하기</Text>
        </LinearGradient>
        
      </TouchableOpacity>
      <TouchableOpacity style={styles.login_fb} rippleColor='#3b5998' rippleDuration={300} onPress={this.login_fb} >
        <Text style={styles.login_fb_txt}>facebook 으로 계속하기</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.login_email} rippleColor='#ff4c4c' rippleDuration={300} onPress={this.login_email}>
        <Text style={styles.login_email_txt}>이메일로 계속하기</Text>
      </TouchableOpacity>
    </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#000000',
  },
  subject:{
    fontSize:33,
    fontWeight:'600',
    color:'white',
    width:'100%',
    textAlign:'center',
    marginTop:30,
    lineHeight:50
  },
  leftbtn:{
    marginTop:0,
    marginLeft:0,
    height:55,
    width:55,
    justifyContent:'center',
    alignItems:'center'
  },
  login_phone:{
    position:'absolute',
    width:width-40,
    height:45,
    backgroundColor:'#000000',
    left:20,
    bottom:150,
    justifyContent:'center',
    alignItems:'center',
    // borderRadius:45,
  },
  login_gradient:{
    width:'100%',
    height:'100%',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:45,
    borderWidth:1,
    borderColor:'#000000'
  },
  login_phone_txt:{
    fontSize:17,
    color:'#ffffff',
  },
  login_fb:{
    position:'absolute',
    width:width-40,
    height:45,
    // backgroundColor:'#3b5998',
    left:20,
    bottom:90,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:45,
    // borderWidth:1,
    // borderColor:'rgb(140,140,140)'
  },
  login_fb_txt:{
    fontSize:17,
    color:'white',
  },
  login_email:{
    position:'absolute',
    width:width-40,
    height:45,
    // backgroundColor:'#ff4c4c',
    left:20,
    bottom:30,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:45,
    // borderWidth:1,
    // borderColor:'rgb(140,140,140)'
  },
  login_email_txt:{
    fontSize:17,
    color:'white',
  }
});
RNAccountKit.configure({
  initialPhoneCountryPrefix: '+82', // autodetected if none is provided
})
const mapStateToProps = (state) =>{
  return{
      
  }
}
const mapDispatchToProps = (dispatch) =>{
  return{
      set_id: (_id)=>{
        dispatch(actions.set_id(_id));
      },
      setall: (_id,id,user_id,coin,logintype,pwindex)=>{
        dispatch(actions.setall(_id,id,user_id,coin,logintype,pwindex));
      },
      setkit:(ph,email)=>{
        dispatch(actions.setkit(ph,email))
      },
      mgrefresh: (index)=>{
        dispatch(actions.mgrefresh(index));
      }
  }   
}
export default connect(null,mapDispatchToProps)(LoginScreen);