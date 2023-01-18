import React,{Component} from 'react';
import {View, StyleSheet,Dimensions,Image,Text} from 'react-native';


const {width}=Dimensions.get("window");
export class ImgContainer1 extends Component{
  render(){
    var imgarr=this.props.img;
    return(
      <Image source={{uri: imgarr[0]}}
      style={{width: width-20, height:width,marginTop:9,marginLeft:0}} />
    );
  }
}
export class ImgContainer0 extends Component{
  render(){
    var imgarr=this.props.img;
    return(
      <Image source={{uri: imgarr[0]}}
      style={{width: width-30, height:width-30,marginTop:9,marginLeft:7.5,borderRadius:10}} />
    );
  }
}