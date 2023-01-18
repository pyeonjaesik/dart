import React,{Component} from 'react';
import {StyleSheet, View, TouchableOpacity,Dimensions,Text,Platform,TextInput} from 'react-native';
import {KeyboardAvoidingView} from 'react-native';

const {width}=Dimensions.get("window");

export default class ExchangeC extends Component{
  constructor(props){
    super(props);
    this.state={
      info:'다트 갯수를 입력해 주세요.',
      infoColor:'#000000'
    }
  }
  static navigationOptions = {
    header:null
  };
  render(){
    return(
      <View style={styles.container}>
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS==='ios'?"height":""} enabled>
          <Text style={styles.subinfo}>현금화할 다트의 갯수를 입력해 주세요.</Text>
          <TextInput
            style={styles.txtinput}
            keyboardType="numeric"
            placeholder={`${this.props.coin} 다트 보유`}
            autoFocus={true}
            clearButtonMode='always'
            onChangeText={(coin) => {
              var coin=parseInt(coin);
              this.props._setCoin(coin);
              if(coin<30){
                this.setState({
                  info:'30개 이상부터 환전하실 수 있습니다.',
                  infoColor:'#fb8a2e'
                });
              }else if(coin>=30){
                if(coin<=this.props.coin){
                  this.setState({
                    info:'환전 가능한 다트 갯수 입니다.',
                    infoColor:'#279b37'
                  });
                }else{
                  this.setState({
                    info:'보유한 다트 갯수를 초과하였습니다.',
                    infoColor:'#ff0000'
                  });
                }
              }else{
                this.setState({
                  info:'다트 갯수를 입력해 주세요.',
                  infoColor:'#000000'
                });
              }
            }}
          />
          <Text style={{...styles.info,color:this.state.infoColor}}>{this.state.info}</Text>
          {
            this.props.btn_status===false ? (
              <Text style={styles.readybutton}>완료</Text>
            ):(
              <TouchableOpacity style={styles.nextbutton} onPress={this.props._Dialog} >
                <Text style={styles.nextbutton_txt}>완료</Text>
              </TouchableOpacity>
            )
          }
        </KeyboardAvoidingView>
      </View>
    )
    
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white'
  },
  header:{
    height:55,
    flexDirection:'row',
    alignItems:'center'
  },
  leftbtn:{
    marginTop:0,
    marginLeft:0,
    height:55,
    width:55,
    justifyContent:'center',
    alignItems:'center'
  },
  subject:{
    fontSize:19,
    fontWeight:'600',
    marginLeft:5,
    color:'#000000'
  },
  txtinput:{
    width:width*0.8,
    height:60,
    borderRadius:5,
    borderColor:'rgba(100,100,100,0.3)',
    backgroundColor:'rgba(150,150,150,0.1)',
    marginLeft:width*0.1,
    paddingLeft:15,
    fontSize:16,
    borderWidth:1,
    marginTop:15,
    fontSize:23,
    paddingLeft:25
  },
  subinfo:{
    fontSize:16,
    height:20,
    lineHeight:20,
    paddingLeft:'10%',
    marginTop:10,
    fontWeight:'600',
    color:'#000000',
    marginBottom:10
  },
  info:{
    fontSize:13,
    height:16,
    lineHeight:16,
    paddingLeft:'10%',
    marginTop:15,
    color:'#000000'
  },
  nextbutton:{
    position:'absolute',
    bottom:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#000000',
    width:'80%',
    marginLeft:'10%',
    height:50,
    borderRadius:3,
  },
  nextbutton_txt:{
    color:'white',
    fontSize:18,
  },
  readybutton:{
    position:'absolute',
    bottom:30,
    backgroundColor:'rgb(160,160,160)',
    width:'80%',
    marginLeft:'10%',
    height:50,
    borderRadius:3,
    color:'white',
    fontSize:18,
    lineHeight:50,
    textAlign:'center'
  }
});
