import React,{Component} from 'react';
import {View,StyleSheet,TouchableOpacity,Image,Text,FlatList,RefreshControl,ActivityIndicator,Platform,Dimensions} from 'react-native';
import {URL} from '../config';
import { connect } from 'react-redux';
import * as actions from '../actions';
import {MyStatusBar} from './MyStatusBar';
import Alarm2 from './alarm/Alarm2';
import Alarm3 from './alarm/Alarm3';
import Alarm4 from './alarm/Alarm4';
import Dialog from './Dialog';

const {width,height}=Dimensions.get("window");

class AlarmScreen extends Component{
  constructor(props){
    super(props);
    this.state={
      post:[],
      refreshing: false,
      alarmrefresh:0,
      loading:true,
      dialog:false,
    }
    this._ok=this._ok.bind(this);
    this._cancel=this._cancel.bind(this);
  }
  static navigationOptions = {
    header:null
  };
  componentDidMount(){
    this.getfetch();
  }
  _onRefresh =async ()=>{
    await this.setState({
      post:[],
      refreshing: true,
    });
    this.getfetch();
  }
  getfetch =()=>{
    let data={
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
    fetch(`${URL}/alarm`, obj)
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.status===100){
        this.setState({
          post:responseJson.post.length>0?responseJson.post:[{type:0}],
          refreshing:false,
          loading:false
        });
      }else{
        alert('err 발생');
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }
  async _ok(){
    await this.setState({
      dialog:false,
      post:[{type:0}]
    });
    let data={
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
    fetch(`${URL}/alarmflush`, obj)
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.status===100){
        
      }else{
        alert('err 발생');
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }
  _cancel(){
    this.setState({
      dialog:false
    })
  }
  _renderComponent(item){
    switch(item.type){
      case 2:
        return (
          <Alarm2 item={item} navigation={this.props.navigation}/>
        )
      case 3:
        return (
          <Alarm3 item={item} navigation={this.props.navigation}/>
        )
      case 4:
        return (
          <Alarm4 item={item} navigation={this.props.navigation}/>
        )
      case 0:
        return (
          <View style={{width:width,height:height-130,justifyContent:'center',alignItems:'center'}}>
            <Image source={require('../assets/bell2.png')} style={{width:160,height:160,marginBottom:50}}/>
            <Text style={{fontSize:20,color:'#000000',marginBottom:60}}>새로운 알림이 없습니다.</Text>
          </View>
        )      
    }
  }
  render(){
    return(
      <View style={styles.container}>
        <MyStatusBar backgroundColor='rgba(255,255,255,0)' barStyle='dark-content'/>
        <View style={styles.header}>
          <TouchableOpacity style={styles.leftbtn}
            onPress={() => this.props.navigation.goBack()}
          >
            <Image source={require('../assets/left_mint.png')} style={{width:40,height:40}}/>
          </TouchableOpacity>
          <Text style={styles.subject}>알림</Text>
          <TouchableOpacity style={styles.flush} onPress={()=>{this.setState({dialog:true})}}>
            <Image source={require('../assets/trash.png')} style={{width:40,height:40}}/>
          </TouchableOpacity>
        </View>
        {
          this.state.loading===true?(
            <View
            style={{
              flex:1,
              justifyContent:'center',
              alignItems:'center'
            }}
             >
              <ActivityIndicator size={Platform.OS === 'ios'? 0 : 40} color="#000000" />
            </View>
          ):(
            <FlatList maxToRenderPerBatch={20} style={{backgroundColor:'rgba(255,255,255,0)',flex:1}}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh}
                />
              }
              data={this.state.post}
              keyExtractor={(item,index)=>`a${index}`}
              renderItem={({item,index}) => {
                return this._renderComponent(item,index)
              }}
            />
          )
        }
        {
          this.state.dialog===true?(
            <Dialog subject='지우기' main='수신받은 알림을 모두 삭제하시겠습니까?' _cancel={this._cancel} _ok={this._ok}/>
          ):(null)
        }
      </View>
    )
  }
}

const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white'
  },
  header:{
    width:'100%',
    height:55,
    backgroundColor:'rgba(255,255,255,0)',
    flexDirection:'row',
    alignItems:'center',
  },
  leftbtn:{
    marginTop:0,
    marginLeft:0,
    height:55,
    width:55,
    justifyContent:'center',
    alignItems:'center'
  },
  flush:{
    position:'absolute',
    right:15,
    height:40,
    width:40,
    justifyContent:'center',
    alignItems:'center'
  },
  flush_txt:{
    fontSize:14,
    color:'rgb(120,120,120)'
  },
  subject:{
    fontSize:19,
    marginLeft:5,
    color:'#000000',
    fontWeight:'600'
  }
});
const mapStateToProps = (state) =>{
  return{
    _id:state.setinfo._id
  }
}
// const mapDispatchToProps = (dispatch) =>{
//   return{

//   }   
// }
export default connect(mapStateToProps)(AlarmScreen);