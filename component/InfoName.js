import React,{Component} from 'react';
import {StyleSheet, View, TouchableOpacity, Image, Text, TextInput} from 'react-native';
import {URL} from '../config';

import { connect } from 'react-redux';
import * as actions from '../actions';
import {MyStatusBar} from './MyStatusBar';

class InfoName extends Component{
  constructor(props){
    super(props);
    this.state={
      btn_status:false,
      nickname:'',
      nickname_info:`닉네임을 입력해 주세요.`,
      nickname_info_style:{},
    }
    this._finishName=this._finishName.bind(this);
  }

  checkindex=true;
  finalnickname='';

  checkname(){
    if(this.state.nickname.length<13 && this.state.nickname.length>=2){
      var txt_check = /^[가-힣|a-z|A-Z|0-9|\*]+$/
      if(txt_check.test(this.state.nickname)){
        let data={
          id:this.state.nickname
        };
        const obj = {
          body: JSON.stringify(data),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST'
        }
        fetch(`${URL}/cert`, obj)
        .then((response) => response.json())
        .then((responseJson) => {
          if(responseJson.status==1){
            this.setState({
              nickname_info:`사용 가능한 닉네임 입니다.`,
              nickname_info_style:{color:'green'},
              btn_status:true
            })
          }else if(responseJson.status==2){
            this.setState({
              nickname_info:`이미 사용중인 닉네임 입니다.`,
              nickname_info_style:{color:'red'}
            });
          }else{
            this.setState({
              nickname_info:`제대로 입력해 주세요.`,
              nickname_info_style:{color:'red'}
            });
          }      
          setTimeout(function(){
            if(this.checkindex===true){
              this.checkname();
            }
          }.bind(this),600);
        })
        .catch((error) => {
          console.error(error);
        });
      }else{
        console.log('11111111');
        setTimeout(function(){
          if(this.checkindex===true){
            this.checkname();
          }
        }.bind(this),600);
      }
    }else{
      setTimeout(function(){
        if(this.checkindex===true){
          this.checkname();
        }
      }.bind(this),600);
    }
  }

  async componentDidMount(){
    await this.props._setLoadingFalse();
    this.checkname();
  }

  componentWillUnmount(){
    this.checkindex=false;
  }

  _handleChange(nickname){
    if(nickname.length==0){
      this.setState({
        nickname:nickname,
        btn_status:false,
        nickname_info:'닉네임을 입력해 주세요.',
        nickname_info_style:{color:'rgba(100,100,100,0.8)'}
      })
    }else if(nickname.length<2){
      this.setState({
        nickname:nickname,
        btn_status:false,
        nickname_info:`닉네임이 너무 짧아요.`,
        nickname_info_style:{color:'rgba(100,100,100,0.8)'}
      });
      
    }else if(nickname.length<13){
      var txt_check = /^[가-힣|a-z|A-Z|0-9|\*]+$/
      if(txt_check.test(nickname)){
        this.setState({
          nickname:nickname,
          btn_status:false,
          nickname_info:``
        })
      }else{
        this.setState({
          nickname:nickname,
          btn_status:false,
          nickname_info:`영문, 숫자 그리고 한글만 가능합니다.`,
          nickname_info_style:{color:'red'}
        })
      }
    }else{
      this.setState({
        nickname:nickname,
        btn_status:false,
        nickname_info:`닉네임이 너무 길어요.`,
        nickname_info_style:{color:'red'}
      });
    }
  }

  async _finishName(){
    this.finalnickname=this.state.nickname;
    this.props.to();
    this.props.setid(this.finalnickname);
    let data={
      token:this.props.token,
      nick:this.state.nickname
    };
    const obj = {
      body: JSON.stringify(data),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST'
    }
    if(this.props.type==='fb'){
      var seturl=`/setnickfb`;
    }else{
      var seturl=`/setnickkit`
    }
    fetch(`${URL}${seturl}`, obj)
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.status===100){
        // this.props.to();
        // this.props.setid(this.finalnickname);
      }else if(responseJson.status===1003){
        // this.setState({
        //   btn_status:false,
        //   nickname:'',
        //   nickname_info:`앗! 고세 다른 사람이 이 닉네임을 사용하네요...
        //   다른 닉네임을 입력해 주세요.`,
        //   nickname_info_style:{},
        // });
      }else{
        // alert('변경 가능 시간을 초과하였습니다.\n다시 시도해 주세요.');
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render(){
    return(
      <View style={styles.container}>
        <MyStatusBar backgroundColor='rgba(255,255,255,0)' barStyle='dark-content'/>
        <TouchableOpacity style={styles.leftbtn}
          onPress={this.props.back}
        >
          <Image source={require('../assets/left_mint.png')} style={{width:40,height:40}}/>
        </TouchableOpacity>
        <Text style={styles.subject}>닉네임을 입력해주세요.</Text>
        <TextInput
          style={styles.txtinput}
          placeholder="닉네임"
          autoFocus={true}
          clearButtonMode='always'
          onChangeText={(nickname) => this._handleChange(nickname)}
        />
        <Text style={{...styles.nickname_info, ...this.state.nickname_info_style}}>{this.state.nickname_info}</Text>
        {
          this.state.btn_status===false ? (
            <Text style={styles.readybutton}>다음</Text>
          ):(
            <TouchableOpacity style={styles.nextbutton} onPress={this._finishName} >
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
    paddingLeft:40
  },
  txtinput:{
    marginTop:30,
    width:'80%',
    height:50,
    borderRadius:5,
    borderWidth:1,
    borderColor:'rgba(100,100,100,0.3)',
    backgroundColor:'rgba(100,100,100,0.1)',
    marginLeft:'10%',
    paddingLeft:15,
    fontSize:16
  },
  nickname_info:{
    marginTop:10,
    fontSize:13,
    color:'rgba(100,100,100,0.8)',
    paddingLeft:'12%'
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

const mapDispatchToProps = (dispatch) =>{
  return{
      setid: (id)=>{
        dispatch(actions.setid(id));
      }
  }   
}
export default connect(null,mapDispatchToProps)(InfoName);