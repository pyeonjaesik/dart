import * as types from './type';

export function set_id(_id){
    return{
        type: types.SET_ID,
        _id: _id
    };
}
export function setid(id){
    return{
        type: types.SETID,
        id: id
    };
}
export function setcoin(coin){
    return{
        type: types.SETCOIN,
        coin: coin
    };
}
export function setall(_id,id,user_id,coin,logintype,pwindex){
    return{
        type: types.SETALL,
        _id:_id,
        id:id,
        user_id:user_id,
        coin: coin,
        logintype:logintype,
        pwindex:pwindex
    };
}
export function setkit(ph,email){
    return{
        type: types.SETKIT,
        ph: ph,
        email:email
    };
}
export function setpwindex(pwindex){
    return{
        type: types.SETPWINDEX,
        pwindex:pwindex
    };
}
export function mgrefresh(index){
    return{
        type: types.MGREFRESH,
        mgrefresh:index
    };
}
export function home1refresh(index){
    return{
        type: types.HOME1REFRESH,
        home1refresh:index
    };
}
export function home_hloader(index){
    return{
        type: types.HOME_HLOADER,
        home_hloader:index
    };
}
export function mg_hloader(index){
    return{
        type: types.MG_HLOADER,
        mg_hloader:index
    };
}