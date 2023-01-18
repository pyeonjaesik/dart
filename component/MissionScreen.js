import React,{Component} from 'react';
import {StyleSheet, View, TouchableOpacity, Image, Text,TextInput,ScrollView,Dimensions,FlatList,KeyboardAvoidingView,Platform} from 'react-native';
import ShowItem from './ShowItem';
import Toast from 'react-native-simple-toast';
import { connect } from 'react-redux';
import * as actions from '../actions';
import {MyStatusBar} from './MyStatusBar';
import {URL} from '../config';

const {width}=Dimensions.get("window");
class MissionScreen extends Component{
  constructor(props){
    super(props);
    this.state={
      roll_result:[],
      text:''
    }
    this.didFocus=this.props.navigation.addListener(
      'didFocus',
      payload => {
        console.log('mission: didFocus');
        console.log(JSON.stringify(this.props.navigation.getParam('result', [])));
        this.setRollResult(this.props.navigation.getParam('result', []));
      }
    );
    this._post=this._post.bind(this);
    this.setRollResult=this.setRollResult.bind(this);
    this.removeRollResult=this.removeRollResult.bind(this);
    this.imagemodeRollResult=this.imagemodeRollResult.bind(this);
  }
  static navigationOptions = {
    header:null
  };
  didFocus;
  resultcoin=0;
  setRollResult(roll_result){
    console.log('setRollResult');
    this.setState({
      roll_result:roll_result
    })
  }
  removeRollResult(uri){
    console.log('removeRollResult  uri:'+uri);
    let roll_result=this.state.roll_result;
    let roll_index=roll_result.findIndex(em=>em.uri==uri);
    console.log(`roll_index: ${roll_index}`);
    roll_result.splice(roll_index,1);
    this.setState({
      roll_result:roll_result
    });
  }
  imagemodeRollResult(uri,type){
    console.log('imagemodeRollResult  uri:'+uri);
    let roll_result=this.state.roll_result;
    let roll_index=roll_result.findIndex(em=>em.uri==uri);
    let roll_temp=roll_result[roll_index];
    roll_temp={...roll_temp,mode:type};
    roll_result.splice(roll_index,1,roll_temp);
    this.setState({
      roll_result:roll_result
    });
  }
  componentWillUnmount(){
    this.didFocus.remove();
  }
  _post(){
    Toast.show('미션에 도전할 게시물을 업로드합니다.');
    this.props.mg_hloader(true);
    let result_txt=this.state.text;
    let roll_result = this.state.roll_result;
    let formData = new FormData();
    if(roll_result.length>1){
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
      formData.append("file", {
        uri: roll_result[0].uri,
        type: roll_result[0].type,
        name: 'coooolname',
      });
      if(roll_result[0].dur>0){
        formData.append('dur',roll_result[0].dur);
        let ratio=roll_result[0].ratio.toString();
        formData.append('imagemode',ratio);
      }else{
        Image.getSize(roll_result[0].uri,(width,height)=>{
          let ratio=(height/width).toString();
          formData.append('imagemode',ratio);
          formData.append('text',result_txt);
          formData.append('_id',this.props._id);
          formData.append('id',this.props.id);
          formData.append('post_id',this.props.navigation.getParam('post_id'));
          const options = {
            method: 'POST',
            body: formData
          };
          fetch(`${URL}/uploadmission`, options)
          .then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson);
            this.props.mg_hloader(false);
            if(responseJson.status===100){
              Toast.show('게시물을 성공적으로 업로드 하였습니다.');
              this.props.mgrefresh(parseInt(Date.now()));
            }else{
              Toast.show('게시물 업로드중 문제가 발생하였습니다.');
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
    formData.append('_id',this.props._id);
    formData.append('id',this.props.id);
    formData.append('post_id',this.props.navigation.getParam('post_id'));
    const options = {
      method: 'POST',
      body: formData
    };
    fetch(`${URL}/uploadmission`, options)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      this.props.mg_hloader(false);
      if(responseJson.status===100){
        Toast.show('게시물을 성공적으로 업로드 하였습니다.');
        this.props.mgrefresh(parseInt(Date.now()));
      }else{
        Toast.show('게시물 업로드중 문제가 발생하였습니다.');
      }

    })
    .catch((error) => {
      console.error(error);
    });
  }
  render(){
    return(
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS==='ios'?"height":""} enabled>
        <MyStatusBar backgroundColor='rgba(255,255,255,0)' barStyle='dark-content'/>
        <TouchableOpacity style={styles.leftbtn}
           onPress={()=>{
            this.props.navigation.goBack()}
          }
        >
          <Image source={require('../assets/x_black.png')} style={{width:33,height:33}}/>
        </TouchableOpacity>
        <ScrollView style={styles.main}>
          <TextInput 
            style={{...styles.main_input}}
            placeholder='내용을 입력해 주세요.'
            multiline={true}
            autoFocus={true}
            onContentSizeChange={(event)=>{
              console.log(event.nativeEvent.contentSize.height);
            }}
            onChangeText={(text)=>{
              this.setState({text});
            }}
            onContentSizeChange={(event) => 
              console.log(`${event.nativeEvent.contentSize.height}`)
           //   this.setState({ height:event.nativeEvent.contentSize.height})
              // storing the content text height to height state
          }
            // value={this.props.text}
          />
          <FlatList
              style={{backgroundColor:'white',marginTop:0}}
              data={this.state.roll_result}
              keyExtractor={(item) => item.uri}
              renderItem={({ item , index }) => (
                <ShowItem 
                  item={item} 
                  index={index} 
                  removeRollResult={this.removeRollResult} 
                  imagemodeRollResult={this.imagemodeRollResult}
                />
              )}
              numColumns={2}
          />
        </ScrollView>
        
        <View style={styles.bottom_container}>
          <TouchableOpacity style={styles.attach} onPress={()=>{
             this.props.navigation.navigate('Picker',{
               from:'mission'
             });
          }}>
            <Text style={styles.attach_txt}>사진/동영상 추가</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.finish} onPress={this._post}>
             <Text style={styles.finish_txt}>게시</Text>
          </TouchableOpacity>
        </View>
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
    marginLeft:width-60,
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
  main:{
    marginTop:50,
    flex:1,
    bottom:50
  },
  main_coin:{
    fontSize:15,
    alignSelf:'center',
    marginTop:10,
    color:'rgb(140,140,140)'
  },
  main_input:{
    marginTop:0,
    paddingHorizontal:30,
    fontSize:17,
    lineHeight:30,
    marginVertical:6,
  },
  image_container:{
    width:width,
    height:width,
  },  
  bottom_container:{
    position:'absolute',
    left:0,
    bottom:0,
    width:'100%',
    height:50,
    backgroundColor:'white',
    borderTopWidth:1,
    borderColor:'rgba(150,150,150,0.2)',
    flexDirection:'row',
    alignItems:'center',
  },
  bottom_txt:{
    color:'rgb(70,70,70)',
    fontSize:20,
    paddingLeft:15
  },
  attach:{
    position:'absolute',
    height:50,
    top:0,
    left:20,
    justifyContent:'center',
    alignItems:'center',
  },
  attach_txt:{
    fontSize:16,
    color:'rgb(22,23,27)',
    fontWeight:'400'
  },
  backgroundVideo: {
    position: 'absolute',
    top: 30,
    left: 0,
    width:300,
    height:300,
  },
  finish:{
    position:'absolute',
    top:7.5,
    right:20,
    width:80,
    height:35,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:40,
    backgroundColor:'#000000',
  },
  finish_txt:{
    fontSize:16,
    color:'rgb(240,240,240)',
  }
});
const mapStateToProps = (state) =>{
  return{
    _id:state.setinfo._id,
    id:state.setinfo.id,
    coin:state.setinfo.coin
  }
}
const mapDispatchToProps = (dispatch) =>{
  return{
      mgrefresh: (index)=>{
        dispatch(actions.mgrefresh(index));
      },
      mg_hloader: (index)=>{
        dispatch(actions.mg_hloader(index));
      }
  }   
}
export default connect(mapStateToProps,mapDispatchToProps)(MissionScreen);