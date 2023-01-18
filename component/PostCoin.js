import React,{Component} from 'react';
import {StyleSheet, View, TouchableOpacity, Image, Text, TextInput, Dimensions,Platform} from 'react-native';
import {KeyboardAvoidingView} from 'react-native';

const {width}=Dimensions.get("window");
export default class PostCoin extends Component{
  constructor(props){
    super(props);
    this.state={
      btn_status:false,
      subject_v:'포상으로 걸 다트 갯수를 입력해주세요.'
    }
    console.log(this.props)
  }
  resultcoin=0;

  render(){
    return(
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS==='ios'?"height":"padding"} enabled>
        <TouchableOpacity style={styles.leftbtn}
          onPress={() => {this.props.navigation.goBack()}}
        >
          <Image source={require('../assets/left_mint.png')} style={{width:40,height:40}}/>
        </TouchableOpacity>
        <Text style={styles.subject}>다트</Text>
        <Text style={styles.subject_v}>{this.state.subject_v}</Text>
        <View style={styles.passcodeContainer}>
          <TextInput
            autoFocus={true}
            style={styles.inputStyle}
            keyboardType="numeric"
            placeholder={this.props.coin+'개 보유'}
            onChangeText={async (n)=>{
              await this.setState({btn_status:false});
              let nt= parseInt(n);
              this.resultcoin=nt;
              if(nt>0 && nt<=this.props.coin){
                this.setState({
                  btn_status:true,
                  subject_v:'포상으로 걸 다트 갯수를 입력해주세요.'
                })
              }else if(nt===0){
                this.setState({
                  subject_v:'다트 갯수는 1개 이상이여야 합니다.'
                });
              }else if(nt>=this.props.coin){
                this.setState({
                  subject_v:'보유 갯수를 초과하였습니다.'
                });
              }else{
                this.setState({
                  subject_v:'포상으로 걸 다트 갯수를 입력해주세요.'
                })
              }              
            }}
          />      
        </View>
        {
          this.state.btn_status===false ? (
            <Text style={styles.readybutton}>다음</Text>
          ):(
            <TouchableOpacity style={styles.nextbutton} onPress={()=>{{
                this.props.to();
                this.props.setCOIN(this.resultcoin);
              }}} >
              <Text style={styles.nextbutton_txt}>다음</Text>
            </TouchableOpacity>
          )
        }
      </KeyboardAvoidingView>
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
  subject:{
    fontSize:25,
    fontWeight:'500',
    color:'rgb(22,23,27)',
    textAlign:'center',
    alignSelf:'center',
    marginTop:-30,
  },
  subject_v:{
    fontSize:16,
    color:'rgba(100,100,100,0.8)',
    textAlign:'center',
    marginTop:15,
    lineHeight:25
  },
  passcodeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop:30
  },
  inputStyle: {
    marginTop:0,
    height: 65,
    width: '100%',
    fontSize: 40,
    color: '#212121',
    textAlign:'center',
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
    fontSize:18
  },
  readybutton:{
    position:'absolute',
    bottom:30,
    backgroundColor:'rgb(150,150,150)',
    width:'80%',
    marginLeft:'10%',
    height:50,
    borderRadius:3,
    color:'white',
    fontSize:18,
    lineHeight:50,
    textAlign:'center',
  }
});