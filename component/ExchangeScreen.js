import React,{Component} from 'react';
import {StyleSheet, View, TouchableOpacity, Image,Dimensions,Keyboard} from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import {MyStatusBar} from './MyStatusBar';
import {URL} from '../config';
import ExchangeB from './ExchangeB';
import ExchangeC from './ExchangeC';
import ExchangeP from './ExchangeP';
import DialogE from './DialogE';
import Toast from 'react-native-simple-toast';

const {width}=Dimensions.get("window");

class ExchangeScreen extends Component{
  constructor(props){
    super(props);
    this.state={
      status:0,
      bank:'',
      name:'',
      number:'',
      coin:0,
      PW:'',
      Dialog:false
    }
    this._setStatus=this._setStatus.bind(this);
    this._setBank=this._setBank.bind(this);
    this._setName=this._setName.bind(this);
    this._setNumber=this._setNumber.bind(this);
    this._renderComponent=this._renderComponent.bind(this);
    this._setCoin=this._setCoin.bind(this);
    this.setPW=this.setPW.bind(this);
    this._back=this._back.bind(this);
    this._cancel=this._cancel.bind(this);
    this._ok=this._ok.bind(this);
    this._Dialog=this._Dialog.bind(this);
  }
  static navigationOptions = {
    header:null
  };
  _setStatus(status){
    console.log(status);
    this.setState({status});
  }
  _setBank(bank){
    this.setState({bank});
  }
  _setName(name){
    this.setState({name});
  }
  _setNumber(number){
    this.setState({number});
  }
  _setCoin(coin){
    this.setState({coin});
  }
  setPW(PW){
    this.setState({PW});
  }
  _back(){
    switch(this.state.status){
      case 0:
        this.props.navigation.goBack();
      case 1:
        this.props.navigation.goBack();
      case 2:
        this._setStatus(1);  
    }
  }
  btn_index=true
  _ok(){
    if(this.btn_index===false){
      return;
    }
    this.btn_index=false;
    this.setState({Dialog:false});
    let data={
      _id:this.props._id,
      pw:this.state.PW,
      bank:this.state.bank,
      name:this.state.name,
      number:this.state.number,
      coin:this.state.coin
    };
    const obj = {
      body: JSON.stringify(data),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST'
    }
    fetch(`${URL}/exchange`, obj)
    .then((response) => response.json())
    .then(async (responseJson) => {
      if(responseJson.status===100){
        this.props.setcoin(responseJson.coin);
        this.props.navigation.goBack();
        Toast.show('환전신청을 성공적으로 하였습니다.');
      }else{
        alert('Exchange errorCode:'+responseJson.status);
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }
  _cancel(){
    this.setState({Dialog:false})
  }
  _Dialog(){
    Keyboard.dismiss();
    this.setState({Dialog:true})
  }
  _renderComponent(status){
    switch(status){
      case 0:
        return(
          <ExchangeP 
            _id={this.props._id}
            _setStatus={this._setStatus}
            setPW={this.setPW}
          />
        )
      case 1:
        return(
          <ExchangeB 
            _setBank={this._setBank} 
            _setName={this._setName} 
            _setNumber={this._setNumber} 
            btn_status={this.state.bank.length>0 && this.state.name.length>0 && this.state.number.length>0?true:false}
            _setStatus={this._setStatus}
            info={{
              bank:this.state.bank,
              name:this.state.name,
              number:this.state.number
            }}
          />
        )
      case 2:
        return(
          <ExchangeC
            coin={this.props.coin}
            _setCoin={this._setCoin}
            btn_status={parseInt(this.state.coin)>=30 && parseInt(this.props.coin)>=parseInt(this.state.coin)?true:false}
            _setStatus={this._setStatus}
            _Dialog={this._Dialog}
          />
        )
    }
  }
  render(){
    return(
      <View style={styles.container}>
        <MyStatusBar backgroundColor='rgba(255,255,255,0)' barStyle='dark-content'/>
        <View style={styles.header}>
          <TouchableOpacity style={styles.leftbtn}
              onPress={this._back}
          >
            <Image source={require('../assets/left_mint.png')} style={{width:40,height:40}}/>
          </TouchableOpacity>
        </View>
        {
          this._renderComponent(this.state.status)
        }
        {
          this.state.Dialog===true?(
            <DialogE 
              subject='환전' 
              bank={this.state.bank}
              name={this.state.name}
              number={this.state.number}
              coin={this.state.coin}
              _cancel={this._cancel}
              _ok={this._ok}
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
});
const mapStateToProps = (state) =>{
  return{
    _id:state.setinfo._id,
    id:state.setinfo.id,
    user_id:state.setinfo.user_id,
    coin:state.setinfo.coin
  }
}
const mapDispatchToProps = (dispatch) =>{
  return{
    setcoin: (coin)=>{
      dispatch(actions.setcoin(coin));
    }
  }   
}

export default connect(mapStateToProps,mapDispatchToProps)(ExchangeScreen);