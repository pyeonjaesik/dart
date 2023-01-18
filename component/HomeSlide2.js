import React from 'react';
import { FlatList, RefreshControl, View, ActivityIndicator, Platform } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import {URL} from '../config';
import CardMain2 from './card/CardMain2';

class HomeSide2 extends React.Component {
  t_index=this.props.t_index;
  
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      post:this.props.post,
      footloader:false
    };
  }
  onEndReachedCalledDuringMomentum=true;
  fetchindex=true;

  static navigationOptions = {
     header:null
  };
  _onRefresh = () => {
    this.fetchindex=true;
    this.t_index=999999999999999;
    this.setState({
      refreshing: true,
    });
    this.getfetch();
  }
  getfetch =async ()=>{
    await this.setState({
      footloader: true
    });
    if(this.t_index===0){
      this.setState({
        footloader:false
      })
      return;
    }
    let data={
      t_index:this.t_index,
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
    fetch(`${URL}/getmainpost2`, obj)
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.status==100||responseJson.status==101){
        let temp_t=this.t_index;
        let post_l=responseJson.post.length;
        let postlimit=responseJson.postlimit;
        if(post_l<postlimit){
          this.t_index=0;
          this.setState(prevState=>({
            footloader:false,
            post:
            temp_t === 999999999999999
              ? responseJson.post
              : [...prevState.post, ...responseJson.post],
            refreshing:false
          }))
        }else{
          this.t_index=responseJson.post[postlimit-1].ct;
          this.setState(prevState=>({
            post:
            temp_t === 999999999999999
              ? responseJson.post
              : [...prevState.post, ...responseJson.post],
            refreshing:false
          }))
        }
        if(responseJson.status==101){
          this.props.setcoin(responseJson.coin)
        }
      }else{
        alert('알 수 없는 오류 발생. HomeSlide1 getmainpost');
      }
      this.fetchindex=true;
    })
    .catch((error) => {
      console.error(error);
    });
  }
  _renderFooter = () => {
    return this.state.footloader === true ? (
      <View
        style={{
          position: 'relative',
          height: 50,
          paddingVertical: 5,
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        <ActivityIndicator size={Platform.OS === 'ios'? 0 : 40} color="rgba(255,255,255,0.9)" />
      </View>
    ) : null;
  };
  _renderHeader = () => {
    return this.props.home_hloader===true ? (
      <View
        style={{
          position: 'relative',
          height: 50,
          paddingVertical: 5,
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        <ActivityIndicator size={Platform.OS === 'ios'? 0 : 40} color="rgba(255,255,255,0.9)" />
      </View>
    ) : null;
  };
  render() {
    return (
      <FlatList maxToRenderPerBatch={20} style={{backgroundColor:'rgba(255,255,255,0)',flex:1}}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
            tintColor='#ffffff'
          />
        }
        data={this.state.post}
        renderItem={({item}) => <CardMain2 item={item} navigation={this.props.navigation}/>}
        onEndReached={()=>{
          if (!this.onEndReachedCalledDuringMomentum) {
            if(this.fetchindex===true){
              this.fetchindex=false;
              this.getfetch();
            }else{
              this.fetchindex=false;
            }
            this.onEndReachedCalledDuringMomentum = true;
          }
        }}
        onMomentumScrollBegin={() => {
          this.onEndReachedCalledDuringMomentum = false; }}
        onEndReachedThreshold={0.3}
        ListFooterComponent={this._renderFooter}
        ListHeaderComponent={this._renderHeader}
      />
    );
  }
}
const mapStateToProps = (state) =>{
  return{
    _id:state.setinfo._id,
    home_hloader:state.sidefunc.home_hloader
  }
}
const mapDispatchToProps = (dispatch) =>{
  return{
      setcoin: (coin)=>{
        dispatch(actions.setcoin(coin))
      }
  }   
}
export default connect(mapStateToProps,mapDispatchToProps)(HomeSide2);