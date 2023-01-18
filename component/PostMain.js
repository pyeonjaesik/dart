import React,{Component} from 'react';
import {StyleSheet, View, TouchableOpacity, Image, Text,TextInput,ScrollView,Dimensions,FlatList,Platform} from 'react-native';
import ShowItem from './ShowItem';
import Dialog from './Dialog';
import Toast from 'react-native-simple-toast';
import {KeyboardAvoidingView} from 'react-native';

const {width,height}=Dimensions.get("window");
export default class PostMain extends Component{
  constructor(props){
    super(props);
    this.state={
      dialog:false
    }
    this.didFocus=this.props.navigation.addListener(
      'didFocus',
      payload => {
        this.props.setRollResult(this.props.navigation.getParam('result', []));
      }
    );
    this._ok=this._ok.bind(this);
    this._cancel=this._cancel.bind(this);

  }
  didFocus;
  update_index=false;
  resultcoin=0;

  componentWillUnmount(){
    this.didFocus.remove();
  }
  _ok(){
    this.props._post();
    Toast.show('미션을 업로드 하는중 입니다.');
    this.props.navigation.goBack();
  }
  _cancel(){
    console.log('aaaa');
    this.setState({
      dialog:false
    })
  }
  render(){
    console.log(this.props);
    return(
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS==='ios'?"height":""} enabled>
        <TouchableOpacity style={styles.leftbtn}
          onPress={this.props.back}
        >
          <Image source={require('../assets/left_mint.png')} style={{width:40,height:40}}/>
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
            ref='mainInput'
            onChangeText={(text)=>{
              this.props.setText(text)
            }}
            onContentSizeChange={(event) => 
              console.log(`${event.nativeEvent.contentSize.height}`)
           //   this.setState({ height:event.nativeEvent.contentSize.height})
              // storing the content text height to height state
          }
            value={this.props.text}
          />
          <FlatList
              style={{backgroundColor:'white',marginTop:0}}
              data={this.props.roll_result}
              keyExtractor={(item) => item.uri}
              renderItem={({ item , index }) => (
                <ShowItem 
                  item={item} 
                  index={index} 
                  removeRollResult={this.props.removeRollResult}
                  imagemodeRollResult={this.props.imagemodeRollResult}
                />
              )}
              numColumns={2}
          />
        </ScrollView>
        
        <View style={styles.bottom_container}>
          <TouchableOpacity style={styles.attach} onPress={()=>{
             this.props.navigation.navigate('Picker',{
               roll:this.props.roll
             });
          }}>
          <Text style={styles.attach_txt}>사진/동영상 추가</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.finish} onPress={()=>{
            this.refs.mainInput.blur();
            this.setState({dialog:true})}}>
             <Text style={styles.finish_txt}>게시</Text>
          </TouchableOpacity>
        </View>
        {
          this.state.dialog===true?(
          <Dialog 
            _ok={this._ok} 
            _cancel={this._cancel} 
            subject='새 미션' 
            main={this.props.coin+'다트를 포상으로 하여 정말로 미션을 게시하시겠습니까?'}/>
          ):(null)
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
  main:{
    marginTop:50,
    flex:1,
    //  backgroundColor:'blue',
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
    // borderTopWidth:1,
    // borderBottomWidth:1,
    // borderColor:'rgba(100,100,100,0.2)',
    paddingHorizontal:30,
    fontSize:24,
    lineHeight:30,
    marginVertical:6,
  },
  image_container:{
    width:width,
    height:width,
    // backgroundColor:'blue'
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