import React,{Component} from 'react';
import {StyleSheet, View, TouchableOpacity, Image,Dimensions,Text,ScrollView} from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import {MyStatusBar} from './MyStatusBar';
import {URL} from '../config';
// import IMP from 'iamport-react-native';
import DialogC from './DialogC';
import Ripple from 'react-native-material-ripple';

const {width}=Dimensions.get("window");

class PayScreen extends Component{
  constructor(props){
    super(props);
    this.state={
      pay_index:false,
      pay_amount:'1100',
      pay_method:'card',
      dialog:false
    }
    this._btnL=this._btnL.bind(this);
    this._btnR=this._btnR.bind(this);
    this._cancel=this._cancel.bind(this);
    this._dialog=this._dialog.bind(this);
  }
  static navigationOptions = {
    header:null
  };
  _btnL(){
    console.log('gigigi');
    this.setState({
      dialog:false,
      pay_index:true,
      pay_method:'phone'
    })
  }
  _btnR(){
    this.setState({
      dialog:false,
      pay_index:true,
      pay_method:'card'
    });
    //somecode
  }
  _cancel(){
    this.setState({
      dialog:false,
    });
  }
  _dialog({pay_amount}){
    this.setState({
      dialog:true,
      pay_amount
    })
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
          <Text style={styles.subject}>다트 구매</Text>
        </View>
        {
          this.state.pay_index===true?(
            null
          ):(
            <ScrollView style={{flex:1}}>
              {
                (()=>{
                  let dartArr=[10,20,30,50,100,200,300,400,500,700,1000,1500,2000];
                  let dartJSX=dartArr.map((x)=>{
                    return(
                      <View style={styles.comp}
                      rippleContainerBorderRadius={50}
                      rippleColor={'#ffffff'}
                      rippleDuration={300}
                      onPress={
                        ()=>{
                          this._dialog({pay_amount:x})
                        }
                      }
                      key={x}  
                    >
                      <Text style={styles.comp_txt}>{`다트 ${x}개 (${(x*110).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원)`}</Text>
                    </View>
                    )
                  })
                  return dartJSX;
                })()
              }
          </ScrollView>
          )
        }
        {
          this.state.dialog===true?(
            <DialogC 
              subject='결제 수단'
              main={'어떤 결제 수단으로 \n'+this.state.pay_amount+' 다트를 구매하시겠습니까?' }
              _btnL={this._btnL}
              _btnR={this._btnR}
              _cancel={this._cancel}
              btnL_txt={'핸드폰 소액 결제'}
              btnR_txt={'카드'}
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
  subject:{
    fontSize:19,
    fontWeight:'600',
    marginLeft:5,
    color:'#000000'
  },
  comp:{
    width:'80%',
    height:50,
    alignSelf:'center',
    backgroundColor:'#000000',
    borderRadius:50,
    justifyContent:'center',
    alignItems:'center',
    marginTop:20,
    marginBottom:10,
  },
  comp_txt:{
    fontSize:18,
    color:'#ffffff'
  }
});
const mapStateToProps = (state) =>{
  return{
    _id:state.setinfo._id,
    id:state.setinfo.id,
    user_id:state.setinfo.user_id
  }
}
const mapDispatchToProps = (dispatch) =>{
  return{
      mgrefresh: (index)=>{
        dispatch(actions.mgrefresh(index));
      }
  }   
}

export default connect(mapStateToProps,mapDispatchToProps)(PayScreen);