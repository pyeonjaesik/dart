import React,{Component} from 'react';
import { StyleSheet, Text,Dimensions,Image,View} from 'react-native';
import Ripple from 'react-native-material-ripple';

const {width}=Dimensions.get("window");
export default class Alarm2 extends Component{
  constructor(props){
    super(props);
    var rc=parseInt(Date.now())-this.props.item.ct;
    var d = new Date(this.props.item.ct);
    var h=d.getHours();
    var m=d.getMinutes();
    if(m<10){
      m='0'+m;  
    }    
    if(h>=13){
      h=' 오후 '+(h-12)+':'+m;  
    }else if(h>0){
      h=' 오전 '+h+':'+m;  
    }else{
      h=' 오후 '+'12'+':'+m;  
    }    
    rc = (d.getMonth()+1)+'월'+d.getDate()+'일'+h;
    this.state={
      rc:rc,
      clicked:false
    }
  }
  t_index=false;
  render(){
    return(
      <Ripple style={{...styles.container,backgroundColor:this.state.clicked===false?'#ffffff':'rgba(180,180,180,0.1)'}} activeOpacity={0.7} onPress={() => {
          if(this.t_index==false){
            this.t_index=true;
            this.props.navigation.push('Mga',{
              post_id:this.props.item.post_id,
              type:2
            });
          }
          setTimeout(()=>{this.t_index=false
            console.log('t_index ==> false');
          },1000);
          this.setState({
            clicked:true
          }) 
        }}
        rippleColor='rgb(100,100,100)' rippleDuration={500}>
        <View style={styles.div}>
          <View style={styles.imgcontainer}>
            <Image source={require('../../assets/alarm2.png')} style={{width:40,height:40}}/>
          </View>
          <View style={styles.main}>
            <Text style={styles.main_subject}>{'게시물이 채택되었습니다.'}</Text>
            <Text style={styles.main_subject_v}>{`${this.props.item.coin}다트를 획득하셨습니다!`}</Text>
            {
              this.props.item.txt!=undefined?(
                <Text style={styles.main_txt}>{this.props.item.txt}</Text>
              ):(null)
            }
            <Text style={styles.main_time}>{this.state.rc}</Text>
          </View>
        </View>

      </Ripple>
    )
  }
}
const styles = StyleSheet.create({
  container:{
    width:'100%',
  },
  div:{
    width:width-40,
    marginLeft:20,
    borderBottomWidth:0.3,
    borderColor:'rgb(180,180,180)',
    flexDirection:'row'
  },
  main:{
    width:width-100,
    marginLeft:0,
  },
  imgcontainer:{
    width:60,
    height:60,
    justifyContent:'center',
    alignItems:'center'
  },
  main_subject:{
    fontSize:17,
    color:'rgb(50,50,50)',
    width:'100%',
    marginTop:7,
    fontWeight:'500'
  },
  main_subject_v:{
    fontSize:15,
    color:'rgb(70,70,70)',
    width:'100%',
  },
  main_txt:{
    fontSize:14,
    color:'rgb(100,100,100)',
    marginTop:5,
    marginBottom:10
  },
  main_time:{
    fontSize:14,
    color:'rgb(115,115,115)',
    marginBottom:10
  }
})