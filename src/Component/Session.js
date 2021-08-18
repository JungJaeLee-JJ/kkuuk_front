import {getDataAtLocalStorage, getDataAtSessionStorage} from "./Storage";
import {sendGETRequest} from "../API/ApiRequest";
import {getInfoUrl} from "../API/ApiUrl";

async function getUserInfo(){
  const token1 = getDataAtSessionStorage('token');
  if(token1==null){
    const token2 = getDataAtLocalStorage('token');
    let ret;
    try{
      ret = await sendGETRequest(getInfoUrl());
      console.log(ret)
    }catch (e){
      alert(e)
      ret = null
    }
    return ret;
  }
  let ret;
  try{
    ret = await sendGETRequest(getInfoUrl());
    console.log(ret)
  }catch (e){
    alert(e)
    ret = null
  }
  return ret;
}

export default getUserInfo;