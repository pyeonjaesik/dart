import * as types from '../actions/type';

const initialState ={
    _id:'',
    id:'',
    user_id:'',
    coin:0,
    logintype:'',
    email:'',
    ph:'',
    pwindex:'false',
    post_id:[],
    ms_id:[],
    mgrefresh:0,
    home1refresh:0,
    home_hloader:false,
    mg_hloader:false
};

export default function setinfo(state=initialState,action){
    switch(action.type){
        case types.SET_ID:
          return{
            ...state,
            _id:action._id,
          }
        case types.SETID:
          return{
            ...state,
            id:action.id
          }
        case types.SETCOIN:
          return{
            ...state,
            coin:action.coin
          }
        case types.SETALL:
          return{
            ...state,
            _id:action._id,
            id:action.id,
            user_id:action.user_id,
            coin:action.coin,
            logintype:action.logintype,
            pwindex:action.pwindex
          }
        case types.SETKIT:
          return{
            ...state,
            ph:action.ph,
            email:action.email
          } 
        case types.SETPWINDEX:
          return{
            ...state,
            pwindex:action.pwindex
          }    
        case types.SETLV:
          return{
            ...state,
            post_id:action.post_id,
            ms_id:action.ms_id
          }        
        default:
          return state;        
    }
}