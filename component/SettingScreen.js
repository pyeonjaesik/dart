import React,{Component} from 'react';
import {StyleSheet, View, TouchableOpacity, Image, Text,ScrollView,Dimensions} from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import {MyStatusBar} from './MyStatusBar';
import {URL} from '../config';
import Dialog from './Dialog';
import { AccessToken,LoginManager } from 'react-native-fbsdk';
import RNAccountKit from 'react-native-facebook-account-kit';

const {width}=Dimensions.get("window");
class SettingScreen extends Component{
  constructor(props){
    super(props);
    this.state={
      dialog1:false
    }
    this._cancel=this._cancel.bind(this);
    this._ok=this._ok.bind(this);
  }

  static navigationOptions = {
    header:null
  };
  _cancel(){
    this.setState({
      dialog1:false,
      dialog2:false
    })
  }
  _ok(setindex){
    this.setState({
      dialog1:false,
      dialog2:false
    })
    if(this.props.logintype =='fb'){
      LoginManager.logInWithReadPermissions(["public_profile"]).then(
        function(result) {
          if (result.isCancelled) {
            console.log("Login cancelled");
          } else {
            AccessToken.getCurrentAccessToken().then(
              ((data) => {
                let login_token=data.accessToken.toString();
                let datam={
                  token:login_token,
                  _id:this.props._id
                };
                const obj = {
                  body: JSON.stringify(datam),
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  method: 'POST'
                }
                fetch(`${URL}/verifyfb`, obj)
                .then((response) => response.json())
                .then(async (responseJson) => {
                  if(responseJson.status==100){
                    this.props.navigation.navigate(setindex==0?'SetName':'SetPass',{
                      token:login_token,
                      type:'fb',
                      from:'Setting'
                    });
                  }else if(responseJson.status==200){
                    alert('다트 계정과 연동되지 않은 페이스북 계정으로 로그인하셨습니다.')
                  }else{
                    alert('settingscreen verifyfb err');
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
    }else if(this.props.logintype =='em'){
      console.log('logintype:: em');
      console.log(this.props);
      RNAccountKit.configure({
        initialEmail: this.props.email,
      })
      RNAccountKit.loginWithEmail()
      .then((token) => {
        if (!token) {
          console.log('Login cancelled')
        } else {
          let datam={
            token:token.token,
            _id:this.props._id
          };
          const obj = {
            body: JSON.stringify(datam),
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            method: 'POST'
          }
          fetch(`${URL}/verifykit`, obj)
          .then((response) => response.json())
          .then(async (responseJson) => {
            if(responseJson.status==100){
              this.props.navigation.navigate(setindex==0?'SetName':'SetPass',{
                token:token.token,
                type:'em',
                from:'Setting'
              });
            }else if(responseJson.status==200){
              alert('다트 계정과 연동되지 않은 이메일로 로그인하셨습니다.')
            }else{
              alert('settingscreen verifyfb err');
            }
          })
          .catch((error) => {
            console.error(error);
          });
        }
      })
    }else if(this.props.logintype =='ph'){
      console.log('logintype:: ph');
      console.log(this.props);
      RNAccountKit.configure({
        initialPhoneCountryPrefix: '+82',
        initialPhoneNumber: '0'+this.props.ph.substring(3, 20)
      })
      RNAccountKit.loginWithPhone()
      .then((token) => {
        if (!token) {
          console.log('Login cancelled')
        } else {
          //
          let datam={
            token:token.token,
            _id:this.props._id
          };
          const obj = {
            body: JSON.stringify(datam),
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            method: 'POST'
          }
          fetch(`${URL}/verifykit`, obj)
          .then((response) => response.json())
          .then(async (responseJson) => {
            if(responseJson.status==100){
              this.props.navigation.navigate(setindex==0?'SetName':'SetPass',{
                token:token.token,
                type:'ph',
                from:'Setting'
              });
            }else if(responseJson.status==200){
              alert('다트 계정과 연동되지 않은 핸드폰 번호로 로그인하셨습니다.')
            }else{
              alert('settingscreen verifyfb err');
            }
          })
          .catch((error) => {
            console.error(error);
          });
        }
      })
      
    }
  }
  render(){
    console.log(this.props);
    return(
      <View style={styles.container}>
        <MyStatusBar backgroundColor='rgba(255,255,255,0)' barStyle='dark-content'/>
        <TouchableOpacity style={styles.leftbtn}
            onPress={() => this.props.navigation.goBack()}
        >
          <Image source={require('../assets/left_mint.png')} style={{width:40,height:40}}/>
        </TouchableOpacity>
        <ScrollView style={styles.main}>
          <Text style={styles.subject_info}>{this.props.id}</Text>
          <TouchableOpacity style={styles.setnick}
            onPress={()=>{
              this.setState({dialog1:true})
            }}
          >
              <Text style={styles.setnick_txt}>닉네임 변경하기</Text>
              <Image source={require('../assets/right-arrow.png')}
                style={styles.right}
              />
          </TouchableOpacity>
          <TouchableOpacity style={styles.setpw}
            onPress={()=>{
              this.setState({dialog2:true})
            }}
          >
            <Text style={styles.setpw_txt}>{this.props.pwindex=='true'?'2차 비밀번호 변경하기':'2차 비밀번호 생성하기'}</Text>
            <Image source={require('../assets/right-arrow.png')}
              style={styles.right}
            />
          </TouchableOpacity>
          <Text style={styles.subject_info2}>다트<Text style={{fontSize:17,color:'rgb(50,50,50)'}}>{`   ${this.props.coin} 개 보유`}</Text></Text>
          <TouchableOpacity style={styles.charge}
            onPress={()=>{
              this.props.navigation.navigate('Pay');
              console.log('hihihi');
            }}
          >
            <Text style={styles.charge_txt}>구매하기</Text>
            <Image source={require('../assets/right-arrow.png')}
                style={styles.right}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.exchange}
            onPress={()=>{
              this.props.navigation.navigate('Exchange');
              console.log('hihihi');
            }}
          >
            <Text style={styles.exchange_txt}>환전하기</Text>
            <Image source={require('../assets/right-arrow.png')}
                style={styles.right}
            />
          </TouchableOpacity>
        </ScrollView>
        {
          this.state.dialog1===true?(
            <Dialog subject='본인인증'
            main={'본인인증을 위해 \n 한번 더 로그인 합니다.'} _cancel={this._cancel}
            _ok={()=>{this._ok(0)}}
            />
          ):(null)
        }
        {
          this.state.dialog2===true?(
            <Dialog subject='본인인증'
            main={'본인인증을 위해 \n 한번 더 로그인 합니다.'} _cancel={this._cancel}
            _ok={()=>{this._ok(1)}}
            />
          ):(null)
        }
      </View>
    )
    
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white'
  },
  leftbtn:{
    marginTop:0,
    marginLeft:0,
    height:55,
    width:55,
    justifyContent:'center',
    alignItems:'center'
  },
  right:{
    position:'absolute',
    width:20,
    height:20,
    top:8,
    right:10
  },
  main:{
    flex:1,
  },
  subject_info:{
    marginTop:10,
    marginLeft:25,
    fontSize:27,
    color:'#000000',
    fontWeight:'500'
  },
  setnick:{
    marginTop:25,
    marginLeft:20,
    width:width-40,
    height:40,
    flexDirection:'row',
    alignItems:'center'
  },
  setnick_txt:{
    fontSize:16,
    marginLeft:10
  },
  setpw:{
    marginTop:15,
    marginLeft:20,
    width:width-40,
    height:40,
    flexDirection:'row',
    alignItems:'center'
  },
  setpw_txt:{
    fontSize:16,
    marginLeft:10
  },
  subject_info2:{
    marginTop:60,
    marginLeft:25,
    fontSize:27,
    color:'#000000',
    fontWeight:'500'
  },
  dart:{
    marginTop:10,
    height:130,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around'
  },
  charge:{
    marginTop:25,
    marginLeft:20,
    width:width-40,
    height:40,
    flexDirection:'row',
    alignItems:'center'
  },
  charge_txt:{
    fontSize:16,
    marginLeft:10
  },
  exchange:{
    marginTop:15,
    marginLeft:20,
    width:width-40,
    height:40,
    flexDirection:'row',
    alignItems:'center'
  },
  exchange_txt:{
    fontSize:16,
    marginLeft:10
  },
});
const mapStateToProps = (state) =>{
  return{
    _id:state.setinfo._id,
    id:state.setinfo.id,
    coin:state.setinfo.coin,
    logintype:state.setinfo.logintype,
    ph:state.setinfo.ph,
    email:state.setinfo.email,
    pwindex:state.setinfo.pwindex
  }
}
const mapDispatchToProps = (dispatch) =>{
  return{
      mgrefresh: (index)=>{
        dispatch(actions.mgrefresh(index));
      }
  }   
}

export default connect(mapStateToProps,mapDispatchToProps)(SettingScreen);