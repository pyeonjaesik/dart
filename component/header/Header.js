import React from 'react';
import HeaderLB from './HeaderLB';
import HeaderLA from './HeaderLA';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Header extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    console.log(this.props);
    if(this.props._id===''){
      return <HeaderLB navigation={this.props.navigation}/>;
    }else{
      return <HeaderLA navigation={this.props.navigation} info={{_id:this.props._id,id:this.props.id,coin:this.props.coin}} _dialog={this.props._dialog}/>;
    }
  }
}
const mapStateToProps = (state) =>{
  return{
      _id:state.setinfo._id,
      id:state.setinfo.id,
      coin:state.setinfo.coin
  }
}
const mapDispatchToProps = (dispatch) =>{
  return{

  }   
}
export default connect(mapStateToProps)(Header);