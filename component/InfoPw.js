import React,{Component} from 'react';
import {StyleSheet, View, TouchableOpacity, Image, Text, TextInput, Dimensions} from 'react-native';

const {width}=Dimensions.get("window");
export default class InfoPw extends Component{
  constructor(props){
    super(props);
    this.state={
      btn_status:false
    }
  }
  passcode=['','','','','',''];
  resultPass=0;

  render(){
    return(
      <View style={styles.container}>
        <TouchableOpacity style={styles.leftbtn}
          onPress={() => {this.props.back()}}
        >
          <Image source={require('../assets/left_mint.png')} style={{width:40,height:40}}/>
        </TouchableOpacity>
        <Text style={styles.subject}>2차 비밀번호를 입력해주세요.</Text>
        <View style={styles.passcodeContainer}>
          <TextInput
            ref='passcode1'
            autoFocus={true}
            style={styles.inputStyle}
            maxLength={1}
            keyboardType="numeric"
            secureTextEntry={true}
            onKeyPress={({ nativeEvent }) => {
              console.log(nativeEvent.key);
              if (nativeEvent.key === 'Backspace') {

              }else{
                this.refs.passcode2.focus()
              }
            }}
            value={this.state.setValue}
            onChangeText={(n)=>{
              this.passcode[0]=n; 
              console.log(this.passcode);
              var nul=false;
              this.passcode.map(function (x) { 
                if(x==''){nul=true}
              });
              console.log(`nul: ${nul}`)
              if(nul==false){
                this.resultPass='';
                this.passcode.map((x)=>{this.resultPass+=x})
                console.log(this.resultPass);
                this.setState({btn_status:true});
              }else{
                this.setState({btn_status:false});
              }
            }}
          />
          <TextInput
            ref='passcode2'
            style={styles.inputStyle}
            maxLength={1}
            keyboardType="numeric"
            secureTextEntry={true}
            onKeyPress={({ nativeEvent }) => {
              console.log(nativeEvent.key);
              if (nativeEvent.key === 'Backspace') {
                this.refs.passcode1.focus()
              }else{
                this.refs.passcode3.focus()
              }
            }}
            onChangeText={(n)=>{
              this.passcode[1]=n; 
              console.log(this.passcode);
              var nul=false;
              this.passcode.map(function (x) { 
                if(x==''){nul=true}
              });
              console.log(`nul: ${nul}`)
              if(nul==false){
                this.resultPass='';
                this.passcode.map((x)=>{this.resultPass+=x})
                console.log(this.resultPass);
                this.setState({btn_status:true});
              }else{
                this.setState({btn_status:false});
              }
            }}/>
          <TextInput
            ref='passcode3'
            style={styles.inputStyle}
            maxLength={1}
            keyboardType="numeric"
            secureTextEntry={true}
            onKeyPress={({ nativeEvent }) => {
              console.log(nativeEvent.key);
              if (nativeEvent.key === 'Backspace') {
                this.refs.passcode2.focus()
              }else{
                this.refs.passcode4.focus()
              }
            }}
            onChangeText={(n)=>{
              this.passcode[2]=n; 
              console.log(this.passcode);
              var nul=false;
              this.passcode.map(function (x) { 
                if(x==''){nul=true}
              });
              console.log(`nul: ${nul}`)
              if(nul==false){
                this.resultPass='';
                this.passcode.map((x)=>{this.resultPass+=x})
                console.log(this.resultPass);
                this.setState({btn_status:true});
              }else{
                this.setState({btn_status:false});
              }
            }}/>
          <TextInput
            ref='passcode4'
            style={styles.inputStyle}
            maxLength={1}
            keyboardType="numeric"
            secureTextEntry={true}
            onKeyPress={({ nativeEvent }) => {
              console.log(nativeEvent.key);
              if (nativeEvent.key === 'Backspace') {
                this.refs.passcode3.focus()
              }else{
                this.refs.passcode5.focus()
              }
            }}
            onChangeText={(n)=>{
              this.passcode[3]=n; 
              console.log(this.passcode);
              var nul=false;
              this.passcode.map(function (x) { 
                if(x==''){nul=true}
              });
              console.log(`nul: ${nul}`)
              if(nul==false){
                this.resultPass='';
                this.passcode.map((x)=>{this.resultPass+=x})
                console.log(this.resultPass);
                this.setState({btn_status:true});
              }else{
                this.setState({btn_status:false});
              }
            }}/>
          <TextInput
            ref='passcode5'
            style={styles.inputStyle}
            maxLength={1}
            keyboardType="numeric"
            secureTextEntry={true}
            onKeyPress={({ nativeEvent }) => {
              console.log(nativeEvent.key);
              if (nativeEvent.key === 'Backspace') {
                this.refs.passcode4.focus()
              }else{
                this.refs.passcode6.focus()
              }
            }}
            onChangeText={(n)=>{
              this.passcode[4]=n; 
              console.log(this.passcode);
              var nul=false;
              this.passcode.map(function (x) { 
                if(x==''){nul=true}
              });
              console.log(`nul: ${nul}`)
              if(nul==false){
                this.resultPass='';
                this.passcode.map((x)=>{this.resultPass+=x})
                console.log(this.resultPass);
                this.setState({btn_status:true});
              }else{
                this.setState({btn_status:false});
              }
            }}/>
          <TextInput
            ref='passcode6'
            style={styles.inputStyle}
            maxLength={1}
            keyboardType="numeric"
            secureTextEntry={true}
            onKeyPress={({ nativeEvent }) => {
              console.log(nativeEvent.key);
              if (nativeEvent.key === 'Backspace') {
                this.refs.passcode5.focus()
              }
            }}
            onChangeText={(n)=>{
              this.passcode[5]=n; 
              console.log(this.passcode);
              var nul=false;
              this.passcode.map(function (x) { 
                if(x==''){nul=true}
              });
              console.log(`nul: ${nul}`)
              if(nul==false){
                this.resultPass='';
                this.passcode.map((x)=>{this.resultPass+=x})
                console.log(this.resultPass);
                this.setState({btn_status:true});
              }else{
                this.setState({btn_status:false});
              }
            }}
          />       
        </View>
        {
          this.state.btn_status===false ? (
            <Text style={styles.readybutton}>다음</Text>
          ):(
            <TouchableOpacity style={styles.nextbutton} onPress={this.props.to} >
              <Text style={styles.nextbutton_txt}>다음</Text>
            </TouchableOpacity>
          )
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
  subject:{
    fontSize:21,
    fontWeight:'500',
    color:'rgb(22,23,27)',
    textAlign:'center'
  },
  passcodeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop:30
  },
  inputStyle: {
    height: width/8,
    width: width/8,
    fontSize: width/17,
    color: '#212121',
    borderWidth:1,
    borderColor:'rgba(100,100,100,0.3)',
    textAlign:'center',
    lineHeight:width/7,
    backgroundColor:'rgba(140,140,140,0.1)',
    borderRadius:10,
  },
  nextbutton:{
    position:'absolute',
    bottom:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#008374',
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
    backgroundColor:'rgba(100,100,100,0.6)',
    width:'80%',
    marginLeft:'10%',
    height:50,
    borderRadius:3,
    color:'white',
    fontSize:18,
    lineHeight:50,
    textAlign:'center'
  }
})