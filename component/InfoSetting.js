import React,{Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import InfoName from './InfoName';

export default class InfoSetting extends Component{
  constructor(props){
    super(props);
    this.state={
      status:0
    }
  }

  render(){
    return(
      <View style={styles.container}>
        {
         (()=>{
            if(this.state.status==0){
              return(<Text>aaaa</Text>);
            }
          })()
        }
        {/* <InfoName back={this.props.back}/> */}
      </View>
    )
    
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white'
  }
})
// onClick() {
//   this.setState({ showGreeting: true })

//   this._timer = setTimeout(() => this.setState({ showGreeting: false }), 3000)
// }

// componentWillUnmount() {
//   clearTimeout(this._timer)

//   // is it legal?
//   this.setState({ showGreeting: false })
// }