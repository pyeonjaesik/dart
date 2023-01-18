import React from 'react';
import { StyleSheet, View , CameraRoll,Image} from 'react-native';
import {MyStatusBar} from './MyStatusBar';
import PostPass from './PostPass';
import PostCoin from './PostCoin';
import PostMain from './PostMain';
import { connect } from 'react-redux';
import * as actions from '../actions';
import {URL} from '../config';
import Toast from 'react-native-simple-toast';
import ImageResizer from 'react-native-image-resizer';

class PostScreen extends React.Component {
  constructor(props){
    super(props);
    this.state={
      status:0,
      setpw:'',
      setcoin:0,
      // roll:[],
      roll_result:[],
      text:''
    }
    this.setStatus_1=this.setStatus_1.bind(this);
    this.setStatus_2=this.setStatus_2.bind(this);
    this.setPW=this.setPW.bind(this);
    this.setCOIN=this.setCOIN.bind(this);
    this.setRollResult=this.setRollResult.bind(this);
    this.setText=this.setText.bind(this);
    this._post=this._post.bind(this);
    this.removeRollResult=this.removeRollResult.bind(this);
    this.imagemodeRollResult=this.imagemodeRollResult.bind(this);
  };
  static navigationOptions = {
    header:null
  };
  setStatus_1(){
    this.setState({status:1});
  }
  setStatus_2(){
    this.setState({status:2});
  }
  setPW(n){
    this.setState({setpw:n});
  }
  setCOIN(n){
    this.setState({setcoin:parseInt(n)});
  }
  setRollResult(roll_result){
    this.setState({
      roll_result:roll_result
    })
  }
  setText(text){
    this.setState({
      text:text
    });
  }
  removeRollResult(uri){
    let roll_result=this.state.roll_result;
    let roll_index=roll_result.findIndex(em=>em.uri==uri);
    roll_result.splice(roll_index,1);
    this.setState({
      roll_result:roll_result
    });
  }
  imagemodeRollResult(uri,type){
    let roll_result=this.state.roll_result;
    let roll_index=roll_result.findIndex(em=>em.uri==uri);
    let roll_temp=roll_result[roll_index];
    roll_temp={...roll_temp,mode:type};
    roll_result.splice(roll_index,1,roll_temp);
    this.setState({
      roll_result:roll_result
    });
  }
  async _post(){
    this.props.home_hloader(true);
    this.props.setcoin(this.props.coin-this.state.setcoin);
    let result_txt=this.state.text;
    let roll_result = this.state.roll_result;
    let formData = new FormData();
    if(roll_result.length>1){
      for(var i=0;i<roll_result.length;i++){
        await ImageResizer.createResizedImage(roll_result[i].uri, 1000, 1000, 'JPEG', 50, rotation=0, null).then((response) => {
          roll_result[i].uri=response.uri;
        }).catch((err) => {
          console.log('resizing err');
          alert('imageresizing err');
          return;
        });
      }
      let imagemode='';
      roll_result.forEach((elm,index)=>{
        formData.append("file", {
          uri: roll_result[index].uri,
          type: roll_result[index].type,
          name: 'coooolname',
        });
        imagemode+=elm.mode;
      });
      formData.append('imagemode',imagemode);
    }else if(roll_result.length==1){
      if(roll_result[0].dur>0){
        formData.append("file", {
          uri: roll_result[0].uri,
          type: roll_result[0].type,
          name: 'coooolname',
        });
        formData.append('dur',roll_result[0].dur);
        let ratio=roll_result[0].ratio.toString();
        formData.append('imagemode',ratio);
      }else{
        await ImageResizer.createResizedImage(roll_result[0].uri, 1000, 1000, 'JPEG', 50, rotation=0, null).then((response) => {
          roll_result[0].uri=response.uri;
        }).catch((err) => {
          console.log('resizing err');
          alert('imageresizing err');
          return;
        });
        formData.append("file", {
          uri: roll_result[0].uri,
          type: roll_result[0].type,
          name: 'coooolname',
        });
        Image.getSize(roll_result[0].uri,(width,height)=>{
          console.log('getSize:'+width+'/'+height);
          let ratio=(height/width).toString();
          formData.append('imagemode',ratio);
          formData.append('text',result_txt);
          formData.append('coin',this.state.setcoin);
          formData.append('pw',this.state.setpw);
          formData.append('_id',this.props._id);
          formData.append('id',this.props.id);
      
          const options = {
            method: 'POST',
            body: formData
          };
          fetch(`${URL}/uploadpost`, options)
          .then((response) => response.json())
          .then((responseJson) => {
            this.props.home_hloader(false);
            if(responseJson.status===100){
              Toast.show('미션을 성공적으로 업로드 하였습니다.');
              this.props.setcoin(responseJson.coin);
              this.props.home1refresh(parseInt(Date.now()));
            }else{
              Toast.show('미션 업로드중 문제가 발생하였습니다.');
            }
      
          })
          .catch((error) => {
            console.error(error);
          });
        });
        return;
      }
    }
    formData.append('text',result_txt);
    formData.append('coin',this.state.setcoin);
    formData.append('pw',this.state.setpw);
    formData.append('_id',this.props._id);
    formData.append('id',this.props.id);

    const options = {
      method: 'POST',
      body: formData
    };
    fetch(`${URL}/uploadpost`, options)
    .then((response) => response.json())
    .then((responseJson) => {
      this.props.home_hloader(false);
      if(responseJson.status===100){
        Toast.show('미션을 성공적으로 업로드 하였습니다.');
        this.props.setcoin(responseJson.coin);
        this.props.home1refresh(parseInt(Date.now()));
      }else{
        Toast.show('미션 업로드중 문제가 발생하였습니다.');
      }

    })
    .catch((error) => {
      console.error(error);
    });
  }
  _renderComponent(status){
    switch(status){
      case 0:
        return (
          <PostPass 
            navigation={this.props.navigation} 
            to={this.setStatus_1} 
            _id={this.props._id} 
            setPW={this.setPW} 
          />
        )
      case 1:
        return (
          <PostCoin 
            navigation={this.props.navigation}
            to={this.setStatus_2} 
            coin={this.props.coin} 
            setCOIN={this.setCOIN} 
          />
        )
      case 2:
        return (
          <PostMain 
            navigation={this.props.navigation}
            back={this.setStatus_1} 
            coin={this.state.setcoin}
            // roll={this.state.roll}
            setRollResult={this.setRollResult}
            setText={this.setText}
            roll_result={this.state.roll_result}
            _post={this._post}
            text={this.state.text}
            removeRollResult={this.removeRollResult}
            imagemodeRollResult={this.imagemodeRollResult}
          />
        )
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <MyStatusBar backgroundColor='rgba(255,255,255,0)' barStyle="dark-content"/>
        {this._renderComponent(this.state.status)}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'white',
  },
  leftbtn:{
    marginTop:0,
    marginLeft:0,
    height:55,
    width:55,
    justifyContent:'center',
    alignItems:'center',
  }
});
const mapStateToProps = (state) =>{
  return{
    _id:state.setinfo._id,
    id:state.setinfo.id,
    coin:state.setinfo.coin,
  }
}
const mapDispatchToProps = (dispatch) =>{
  return{
      setcoin: (coin)=>{
        dispatch(actions.setcoin(coin));
      },
      home1refresh: (index)=>{
        dispatch(actions.home1refresh(index));
      },
      home_hloader: (index)=>{
        dispatch(actions.home_hloader(index));
      }
  }   
}
export default connect(mapStateToProps,mapDispatchToProps)(PostScreen);