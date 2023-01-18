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

export default function sidefunc(state=initialState,action){
    switch(action.type){
        case types.MGREFRESH:
          return{
            ...state,
            mgrefresh:action.mgrefresh,
          }
        case types.HOME1REFRESH:
          return{
            ...state,
            home1refresh:action.home1refresh,
          }
        case types.HOME_HLOADER:
          return{
            ...state,
            home_hloader:action.home_hloader,
          } 
        case types.MG_HLOADER:
          return{
            ...state,
            mg_hloader:action.mg_hloader,
          }           
        default:
          return state;        
    }
}