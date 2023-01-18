import React from 'react';
import { FlatList, StyleSheet, View,RefreshControl,TouchableOpacity,Image,Platform,ActivityIndicator,Text} from 'react-native';
import {URL} from '../config';
import CardMission from './card/CardMission';
import CardReply from './card/CardReply';
import CardReply2 from './card/CardReply2';
import CardReply3 from './card/CardReply3';
import {MyStatusBar} from './MyStatusBar';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Dialog from './Dialog';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';

class MgScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      post:[],
      dialog:false,
      dialog2:false,
      select:false,
      mine:false,
      loading:true,
      footloader:false,
      selectId:'',
      id2:'',
      ms_id:'',
      mgrefresh:0
    };
    this._cancel=this._cancel.bind(this);
    this._cancel2=this._cancel2.bind(this);
    this._ok=this._ok.bind(this);
    this._ok2=this._ok2.bind(this);
    this.onDialog=this.onDialog.bind(this);
    this.onDialog2=this.onDialog2.bind(this);
    this.setIDMS=this.setIDMS.bind(this);
    this.props.mg_hloader_f(false);
  }
  onEndReachedCalledDuringMomentum=true;
  p_index=1;
  ln=0;
  fetchindex=true;
  post_arr=[];
  static navigationOptions = {
    header:null
  };
  async componentWillReceiveProps(nextProps) {
    console.log('#componentWillReceiveProps');
    console.log(nextProps);
    console.log('bbb');
    if(nextProps.mgrefresh !== this.state.mgrefresh) {
      await this.setState({ mgrefresh: nextProps.mgrefresh });
      this._onRefresh();
    }
  }
  _onRefresh = async () => {
    console.log('_onRefresh');
    this.fetchindex=true;
    this.p_index=1;
    await this.setState({
      post:[],
      refreshing: true,
    });
    this.getfetch();
  }
  ///
  _scroll =async ()=>{
    console.log('_scroll');
    await this.setState({
      footloader: true
    })
    if(this.p_index===0){
      console.log('Scroll: p_index===0');
      this.setState({
        footloader:false
      })
      return;
    }
    let post_tmp=[];
    let l1=this.p_index*20;
    let l2=(this.p_index+1)*20;
    let post_l=this.post_arr.length;
    if(post_l<l2){
      for(var i=l1;i<post_l;i++){
        post_tmp.push(this.post_arr[i]);
      }
      this.p_index=0;
    }else{
      for(var i=l1;i<l2;i++){
        post_tmp.push(this.post_arr[i]);
      }
      this.p_index++;
    }
    await this.setState(prevState=>({
      post:[...prevState.post, ...post_tmp],
    }))
    this.fetchindex=true;
  } 
  getfetch =()=>{
    let data={
      _id:this.props.navigation.getParam('post_id'),
      user_id:this.props._id
    };
    const obj = {
      body: JSON.stringify(data),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST'
    }
    fetch(`${URL}/onepost`, obj)
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.status===100){
        console.log(responseJson.post);
        let post_l=responseJson.post.length;
        this.post_arr=responseJson.post;
        if(post_l<=20){
          this.p_index=0;
          this.setState({
            post:responseJson.post,
            refreshing:false,
            mine:responseJson.mine,
            select:responseJson.select,
            loading:false,
          });
        }else{
          this.post_arr=responseJson.post;
          var post_tmp=[]
          for(var i=0;i<20;i++){
            post_tmp.push(responseJson.post[i]);
          }
          console.log(this.post_arr);
          this.setState({
            post:post_tmp,
            refreshing:false,
            mine:responseJson.mine,
            select:responseJson.select,
            loading:false
          });
        }
      }else{
        alert('err 발생');
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }
  setIDMS(id2,ms_id){
    this.setState({
      id2,
      ms_id
    })
  } 
  async _ok(){
    await this.props.navigation.navigate('Login',{from:'Mg'});
    this.setState({
      dialog:false
    })
  }
  async _ok2(){
    await this.props.navigation.navigate('Mscp',{
      _id:this.props._id,
      post_id:this.props.navigation.getParam('post_id'),
      id2:this.state.id2,
      ms_id:this.state.ms_id
    });
    this.setState({
      dialog2:false
    })
  }
  _cancel(){
    this.setState({
      dialog:false
    })
  }
  _cancel2(){
    this.setState({
      dialog2:false
    })
  }
  onDialog(){
    this.setState({
      dialog:true
    })
  }
  onDialog2(id){
    this.setState({
      dialog2:true,
      selectID:id
    })
  }
  componentDidMount(){
    this.getfetch();
  }
  _renderComponent(item,index){
    switch(item.type){
      case 0:
        return (
          <CardMission 
            _id={this.props._id} 
            item={item} 
            navigation={this.props.navigation} 
            onDialog={this.onDialog} 
            post_id={this.props.navigation.getParam('post_id')}
            select={this.state.select}
          />
        )
      case 1:
        return (
          <CardReply 
            _id={this.props._id} 
            index={index} 
            item={item} 
            onDialog={this.onDialog}
            onDialog2={this.onDialog2}
            mine={this.state.mine} 
            select={this.state.select}
            setIDMS={this.setIDMS}
          />
        )
      case 2:
        return (
          <CardReply2 
            _id={this.props._id} 
            index={index} 
            item={item} 
            onDialog={this.onDialog}
          />
        ) 
      case 3:
        return (
          <CardReply3 
            _id={this.props._id} 
            index={index} 
            item={item} 
            onDialog={this.onDialog}
          />
        )    
    }
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
    return this.props.mg_hloader===true ? (
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
    console.log(this.props.mg_hloader);
    return (
      <LinearGradient start={{x: 0, y: 0}} end={{x: 0, y: 2}} colors={['#871fd8','#4c7ef1']} 
        style={styles.container}>
        <MyStatusBar backgroundColor='rgba(255,255,255,0)' barStyle='light-content'/>
        <View style={styles.header}>
          <TouchableOpacity style={styles.leftbtn}
            onPress={() => this.props.navigation.goBack()}
          >
            <Image source={require('../assets/left_white.png')} style={{width:40,height:40}}/>
          </TouchableOpacity>
        </View>
        {
          this.state.loading===true?(
            <View
            style={{
              flex:1,
              justifyContent:'center'
            }}
          >
            <LottieView source={require('../assets/animation/lego_loader.json')} 
              autoPlay loop style={styles.lottie} resizeMode="cover"/>
          </View>
          ):(
            <FlatList style={{flex:1}}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh}
                  tintColor='#ffffff'
                /> 
              }  
              data={this.state.post}
              renderItem={({item,index}) => {
                return this._renderComponent(item,index)
              }}
              onEndReached={()=>{
                console.log('onEndReached');
                if (!this.onEndReachedCalledDuringMomentum) {
                  if(this.fetchindex===true){
                    this.fetchindex=false;
                    this._scroll();
                  }else{
                    this.fetchindex=false;
                  }
                  console.log('reached fired');
                  this.onEndReachedCalledDuringMomentum = true;
                }
              }}
              ListHeaderComponent={this._renderHeader}
              onMomentumScrollBegin={() => {
                console.log('scroll begin');
                this.onEndReachedCalledDuringMomentum = false; }}
              onEndReachedThreshold={0.5}
              ListFooterComponent={this._renderFooter}
           />
          )
        }
        {
          this.state.dialog===true?(
            <Dialog subject='로그인' main='해당 서비스를 이용하기 위해서는 먼저 로그인 하셔야 합니다. 로그인 페이지로 이동하시겠습니까?' _cancel={this._cancel} _ok={this._ok}/>
          ):(null)
        }
        {
          this.state.dialog2===true?(
            <Dialog subject='채택' main={`${this.state.selectID}님에게 미션에 대한 포상으로 ${this.state.post[0].coin}다트를 지급하시겠습니까?`} _cancel={this._cancel2} _ok={this._ok2}/>
          ):(null)
        }
      </LinearGradient>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'rgba(100,100,100,0.2)'
  },
  header:{
    width:'100%',
    height:55,
    backgroundColor:'rgba(255,255,255,0)',
    borderColor:'rgba(100,100,100,0.1)',
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
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  lottie: {
    width:160,
    height:160,
    alignSelf:'center'
  }
});
const mapStateToProps = (state) =>{
  return{
    _id:state.setinfo._id,
    id:state.setinfo.id,
    coin:state.setinfo.coin,
    mgrefresh:state.sidefunc.mgrefresh,
    mg_hloader:state.sidefunc.mg_hloader
  }
}
const mapDispatchToProps = (dispatch) =>{
  return{
      mg_hloader_f: (index)=>{
        dispatch(actions.mg_hloader(index));
      }
  }   
}
export default connect(mapStateToProps,mapDispatchToProps)(MgScreen);