import React,{Component} from 'react';
import {StyleSheet, View, TouchableOpacity, Image,Dimensions,Text,Platform,TextInput} from 'react-native';
import {KeyboardAvoidingView} from 'react-native';

const {width}=Dimensions.get("window");

export default class ExchangeB extends Component{
  constructor(props){
    super(props);
    this.state={
      btn_status:false,
    }
  }
  static navigationOptions = {
    header:null
  };

  render(){
    console.log(this.props);
    return(
      <View style={styles.container}>
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS==='ios'?"height":""} enabled>
          <Text style={styles.subinfo}>현금이 입금될 계좌정보를 입력해 주세요.</Text>
          <View style={styles.infocontain1}>
            <TextInput
              style={styles.txtinput_s}
              autoFocus={true}
              placeholder="은행명"
              autoFocus={true}
              clearButtonMode='always'
              onChangeText={(bank) =>{
                this.props._setBank(bank);
              }}
              value={this.props.info.bank}
            />
            <TextInput
              style={styles.txtinput_s2}
              placeholder="예금주"
              autoFocus={false}
              clearButtonMode='always'
              onChangeText={(name) =>{
                this.props._setName(name);
              }}
              value={this.props.info.name}
            />
          </View>
          <TextInput
            style={styles.txtinput}
            placeholder="계좌번호(- 없이 입력해 주세요.)"
            autoFocus={false}
            clearButtonMode='always'
            onChangeText={(number) =>{
              this.props._setNumber(number);
            }}
            value={this.props.info.number}    
          />
          <Text style={styles.info}>{'※ 다트(사)는 잘못된 계좌정보로 인해 발생되는 모든 피해에 대해 어떠한 책임도 지지 않습니다. 다음 버튼을 누르면 이에 동의하는 것으로 간주합니다.'}</Text>
          {
            this.props.btn_status===false ? (
              <Text style={styles.readybutton}>다음</Text>
            ):(
              <TouchableOpacity style={styles.nextbutton} onPress={()=>{this.props._setStatus(2)}} >
                <Text style={styles.nextbutton_txt}>다음</Text>
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
  txtinput_s:{
    width:width*0.39,
    height:45,
    borderRadius:5,
    borderColor:'rgba(100,100,100,0.3)',
    backgroundColor:'rgba(150,150,150,0.1)',
    marginLeft:width*0.1,
    paddingLeft:15,
    fontSize:16,
    borderWidth:1
  },
  txtinput_s2:{
    width:width*0.39,
    height:45,
    borderRadius:5,
    borderColor:'rgba(100,100,100,0.3)',
    backgroundColor:'rgba(150,150,150,0.1)',
    marginLeft:width*0.02,
    paddingLeft:15,
    fontSize:16,
    borderWidth:1
  },
  txtinput:{
    width:width*0.8,
    height:45,
    borderRadius:5,
    borderColor:'rgba(100,100,100,0.3)',
    backgroundColor:'rgba(150,150,150,0.1)',
    marginLeft:width*0.1,
    paddingLeft:15,
    fontSize:16,
    borderWidth:1
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
    fontSize:12,
    lineHeight:16,
    paddingLeft:'10%',
    paddingRight:'10%',
    marginTop:15,
    color:'rgb(100,100,100)',
  },
  infocontain1:{
    width:width,
    height:60,
    flexDirection:'row',
    alignItems:'center',
    marginTop:5
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