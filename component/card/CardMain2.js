import React,{Component} from 'react';
import { StyleSheet, Text,Dimensions,View,Image} from 'react-native';
import Ripple from 'react-native-material-ripple';
import Clip from './Clip'
import LinearGradient from 'react-native-linear-gradient';

const {width}=Dimensions.get("window");

export default class CardMain2 extends Component{
  shouldComponentUpdate(nextProps) {
    return nextProps.item.cn!==this.props.item.cn? true:false;
  }
  _renderCoin(coin){
    if(coin<10){
      return(
        <LinearGradient style={styles.header_coin} start={{x: 0, y: 0}} end={{x: 0.5, y: 0.5}} colors={['#279b37','#0abf53']}>
          <Text style={styles.header_coin_txt}>{coin}</Text>
        </LinearGradient>
      )
    }else if(coin<100){
      return(
        <LinearGradient style={styles.header_coin} start={{x: 0, y: 0}} end={{x: 0.5, y: 0.5}} colors={['#d6006e','#ea4335']}>
          <Text
            style={{
              fontSize:15,
              color:'#ffffff',
              fontWeight:'700'
            }}
          >{coin}</Text>
        </LinearGradient>
      )
    }else if(coin<1000){
      return(
        <LinearGradient style={{...styles.header_coin,...{width:45,height:45,borderRadius:20}}} start={{x: 1, y: 1}} end={{x: 0, y: 0}} colors={['#fbb034','#f48924']}>
          <Text style={styles.header_coin_txt}>{coin}</Text>
        </LinearGradient>
      )
    }else if(coin<10000){
      return(
        <View style={{...styles.header_coin,...{width:50,height:50,borderRadius:22,backgroundColor:'#000000'}}}>
          <Text style={styles.header_coin_txt}>{coin}</Text>
        </View>
      )
    }else{
      return(
        <View style={{...styles.header_coin,...{width:57,height:57,borderRadius:26,backgroundColor:'#000000'}}}>
          <Text style={styles.header_coin_txt}>{coin}</Text>
        </View>
      )
    }
  }
  render(){
    var coin=this.props.item.coin;
    if(coin<10){
      var themecolor='#279b37';
    }else if(coin<100){
      var themecolor='#d6006e';
    }else if(coin<1000){
      var themecolor='#ff6908';
    }else{
      var themecolor='#000000';
    }
    let txt_l=this.props.item.txt.length;
    if(txt_l<20){
      txt_l=24;
    }else if(txt_l<50){
      txt_l=22;
    }else if(txt_l<70){
      txt_l=20;
    }else if(txt_l<100){
      txt_l=18;
    }else{
      txt_l=17;
    }   
    let t_index=false;
    return(
      <Ripple style={styles.div} activeOpacity={0.7} onPress={() => {
          if(t_index==false){
            t_index=true;
            this.props.navigation.push('Mg',{
              post_id:this.props.item.key,
              coin:this.props.item.coin
            });
          }
          setTimeout(()=>{t_index=false
            console.log('t_index ==> false');
          },500); 
        }}
        rippleColor={themecolor} rippleDuration={500}>
        <View style={styles.header}>
        {
          this._renderCoin(coin)
        }
        </View>
        <Text style={{...styles.header_id}}>{`• ${this.props.item.id}`}<Text style={{...styles.header_time}}>{`   ${this.props.item.ci}님이 다트를 획득하였습니다.`}</Text></Text> 
        {
          this.props.item.txt.length>0?(
            <Text style={{...styles.main_txt,fontSize:txt_l}}>{this.props.item.txt}</Text>
          ):(<View style={{height:10}}/>)
        }
        <Clip clip={this.props.item.clip} im={this.props.item.im}/>
        <View style={styles.bottom}>
          <Image source={require('../../assets/square.png')}
            style={{width:28,height:28}}
          />
          <Text style={styles.bottom_txt}>{this.props.item.cn}</Text>
        </View>
      </Ripple>
    )
  }
}
const styles = StyleSheet.create({
  div:{
    marginTop:20,
    marginBottom:15,
    backgroundColor:'white',
    width:width-30,
    borderRadius:27,
    // borderTopLeftRadius:23,
    marginLeft:15,
  },
  header:{
    height:30,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-end'
  },
  header_info:{
    marginLeft:0
  },
  header_id:{
    fontSize:12,
    color:'#000000',
    marginLeft:10,
    fontWeight:'600',
    paddingLeft:13,
    marginBottom:5
  },
  header_time:{
    fontSize:10,
    color:'#000000',
    marginLeft:10,
    fontWeight:'300',
    // fontFamily: 'open-sans-bold',
  },
  header_coin:{
    width:41,
    height:41,
    borderRadius:18,
    justifyContent:'center',
    alignItems:'center',
    marginRight:25,
    marginBottom:7,
  },
  header_coin_txt:{
    fontSize:15,
    color:'#ffffff',
    fontWeight:'700'
  },
  main_txt:{
    paddingLeft:20,
    paddingRight:20,
    paddingTop:0,
    paddingBottom:0,
    fontSize:13,
    marginTop:0,
    color:'rgb(22,23,27)',
    marginBottom:15
  },
  bottom:{
    height:40,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-end'
  },
  bottom_txt:{
    fontSize:13,
    fontWeight:'600',
    color:'#666666',
    marginRight:60,
    marginLeft:5
  }
})