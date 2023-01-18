import React,{Component} from 'react';
import { StyleSheet, Text,Dimensions,View,TouchableOpacity,Image} from 'react-native';
import ClipSwipe from './ClipSwipe'
import { Animated, Easing } from 'react-native';
import LottieView from 'lottie-react-native';
import {URL} from '../../config';
import LinearGradient from 'react-native-linear-gradient';

const {width}=Dimensions.get("window");

export default class CardReply2 extends Component{
  constructor(props){
    super(props);
    this.state={
      progress:this.props.item.like===true?new Animated.Value(1):new Animated.Value(0),
      like:this.props.item.like,
      ln:this.props.item.ln
    }
    this._like=this._like.bind(this);
    this.love11=this.love11.bind(this);
    this.love22=this.love22.bind(this);
  }
  likeindex=0;
  love11(){
    let data={
      post_id:this.props.item.key,
      _id:this.props._id
    };
    const obj = {
      body: JSON.stringify(data),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST'
    }
    fetch(`${URL}/love11`, obj)
    .then((response) => response.json())
    .then(async (responseJson) => {
      if(responseJson.status===100||responseJson.status===403){
        if(this.likeindex===1){
          this.likeindex=0;
        }else if(this.likeindex===2){
          this.love22();
          console.log('love22 again');
        }
      }else{
        console.log('love 11 err')
        await this.setState(prev=>({
          like:false,
          ln:prev.ln-1
        }));
        await Animated.timing(this.state.progress, {
          toValue: 0,
          duration: 0,
          easing: Easing.linear,
        }).start();
        this.likeindex=0;
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }
  love22(){
    let data={
      post_id:this.props.item.key,
      _id:this.props._id
    };
    const obj = {
      body: JSON.stringify(data),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST'
    }
    fetch(`${URL}/love22`, obj)
    .then((response) => response.json())
    .then(async (responseJson) => {
      if(responseJson.status===100||responseJson.status===403){
        if(this.likeindex===2){
          this.likeindex=0;
        }else if(this.likeindex===1){
          this.love11();
          console.log('love11 again');
        }
      }else{
        console.log('love 22 err')
        await this.setState(prev=>({
          like:true,
          ln:prev.ln+1
        }))
        await Animated.timing(this.state.progress, {
          toValue: 1,
          duration: 0,
          easing: Easing.linear,
        }).start();
        this.likeindex=0;
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }
  async _like(){
    if(!this.props._id){
      this.props.onDialog();
      return;
    }
    if(this.state.like===false){
      await this.setState(prev=>({
        like:true,
        ln:prev.ln+1
      }))
      Animated.timing(this.state.progress, {
        toValue: 1,
        duration: 600,
        easing: Easing.linear,
      }).start();
      if(this.likeindex===0){
        this.love11();
      }
      this.likeindex=1;
    }else{
      await this.setState(prev=>({
        like:false,
        ln:prev.ln-1
      }))
      Animated.timing(this.state.progress, {
        toValue: 0,
        duration: 0,
        easing: Easing.linear,
      }).start();
      if(this.likeindex===0){
        this.love22();
      }
      this.likeindex=2;
    }
  }
  render(){
    return(
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{width:20,height:20,marginLeft:20,borderRadius:35,backgroundColor:'#34bf49'}}/>
          <Text style={styles.header_id}>{`${this.props.item.id}`}</Text>
        </View>
        <Text style={{...styles.main_txt}}>{this.props.item.txt}</Text>
        <ClipSwipe clip={this.props.item.clip} im={this.props.item.im}/>
        <View style={styles.bottom}>
          <TouchableOpacity style={styles.like} onPress={this._like}  activeOpacity={1}>
            <LottieView style={styles.like_lottie} source={require('../../assets/animation/like.json')} progress={this.state.progress} resizeMode="cover"/>
            <Text style={styles.like_txt}>{this.state.ln}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container:{
    backgroundColor:'white',
    width:width-30,
    overflow:'hidden',
    marginTop:13,
    marginBottom:13,
    borderRadius:27,
    marginLeft:15,
  },
  header:{
    width:'100%',
    height:50,
    flexDirection:'row',
    alignItems:'center',
    marginTop:5
  },
  header_id:{
    fontSize:19,
    marginLeft:14,
    paddingLeft:0,
    color:'#000000',
  },
  main_txt:{
    paddingLeft:27,
    paddingRight:27,
    paddingTop:0,
    paddingBottom:0,
    fontSize:17,
    marginTop:6,
    color:'rgb(22,23,27)',
    marginBottom:15
  }, 
  bottom:{
    width:'100%',
    height:55,
    flexDirection:'row',
    justifyContent:'flex-end'
  },
  like:{
    height:55,
    marginRight:17,
    flexDirection:'row',
    alignItems:'center',
  },
  like_lottie:{
    width:55,
    height:55,
    marginLeft:0,
    marginRight:0
  },
  like_txt:{
    marginRight:10,
    fontSize:14,
    color:'#f47721',
    borderRadius:20,
    fontWeight:'100',
  }
})