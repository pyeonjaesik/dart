import React from 'react';
import { StyleSheet, View, Dimensions, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';
import {MyStatusBar} from './MyStatusBar';
import Header from './header/Header';
import {URL} from '../config';
import Swiper from 'react-native-swiper';
import HomeSlide1 from './HomeSlide1';
import HomeSlide2 from './HomeSlide2';
import Dialog from './Dialog';

const {width}=Dimensions.get("window");

export default class HomeScreen extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      onLoaded:0,
      dialog:false
    };
    this._cancel=this._cancel.bind(this);
    this._ok=this._ok.bind(this);
    this._dialog=this._dialog.bind(this);
  }
  static navigationOptions = {
    header:null
  };
  t_index1=9999999999999;
  t_index2=9999999999999;

  getfetch =()=>{
    let data={
      id:'id'
    };
    const obj = {
      body: JSON.stringify(data),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST'
    }
    fetch(`${URL}/getunipost`, obj)
    .then((response) => response.json())
    .then((responseJson) => {
      let postlimit=responseJson.postlimit;
      let post_l1=responseJson.post.length;
      if(post_l1<postlimit){
        this.t_index1=0;
      }else{
        this.t_index1=responseJson.post[postlimit-1].ct;
      }
      let post_l2=responseJson.post2.length;
      if(post_l2<postlimit){
        this.t_index2=0;
      }else{
        this.t_index2=responseJson.post2[postlimit-1].ct;
      }
      this.setState(prevState=>(
        {
          post:responseJson.post,
          post2:responseJson.post2,
          onLoaded:prevState.onLoaded+1
        }
      ));
    })
    .catch((error) => {
      console.error(error);
    });
  } 
  _cancel(){
    this.setState({
      dialog:false
    })
  }
  _ok(){
    this.setState({
      dialog:false
    });
    this.props.navigation.navigate('Setting');
  }
  _dialog(){
    this.setState({
      dialog:true
    })
  }
  componentDidMount(){
    this.getfetch();
  }
  render(){
    return(
    <LinearGradient start={{x: 0, y: 0}} end={{x: 0, y: 1}} colors={['#4c7ef1','#871fd8']} 
    style={styles.container}>
      <MyStatusBar backgroundColor='rgba(255,255,255,0)' barStyle="light-content"/>
      <View style={styles.header}>
       <Header navigation={this.props.navigation} _dialog={this._dialog}/>
      </View>

      {
        this.state.onLoaded!==1 ? (
          <View
            style={{
              flex:1,
              justifyContent:'center'
            }}
          >
            <LottieView source={require('../assets/animation/lego_loader.json')} 
              autoPlay loop style={styles.lottie} resizeMode="cover"/>
          </View>
        ):(
          <Swiper showsPagination={false} showsButtons={false} loop={false} bounces={Platform.OS==='ios'?true:false}>
            <HomeSlide1 post={this.state.post} navigation={this.props.navigation} t_index={this.t_index1}/>
            <HomeSlide2 post={this.state.post2} navigation={this.props.navigation} t_index={this.t_index2}/>
          </Swiper>
        )
      }
      {
        this.state.dialog===true?(
          <Dialog subject='2차 비밀번호' main='먼저 2차 비밀번호를 생성하셔야 합니다. 지금 바로 2차 비밀번호를 생성하시겠습니까?' _cancel={this._cancel}
            _ok={this._ok}
          />
        ):(null)
      }
    </LinearGradient>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  lottie: {
    width:160,
    height:160,
    alignSelf:'center'
  },
  header:{
    height:55,
    width:width,
    backgroundColor:'rgba(100,100,100,0)'
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});