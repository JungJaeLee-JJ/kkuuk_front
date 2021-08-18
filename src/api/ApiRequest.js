import axios from "axios";
import {getDataAtSessionStorage} from "../Component/Storage";

const getAxios=()=>{
  const Axios = axios.create();
  Axios.defaults.headers.post['Content-Type'] = 'application/json';
  const token = getDataAtSessionStorage('token');
  if(token!=null) {
    Axios.defaults.headers.get['X-AUTH-TOKEN'] = token;
    Axios.defaults.headers.post['X-AUTH-TOKEN'] = token;
  }
  return Axios;
}

export async function sendGETRequest(url) {
  const Axios = getAxios()
  let ret;
  try {
    const tmp = await Axios.get(url);
    ret = tmp['data']
  } catch (e) {
    // alert(e)
    ret = null;
  }
  return ret;
}

export async function sendPOSTRequest(url, body) {
  const Axios = getAxios()
  let ret;
  try {
    const tmp = await Axios.post(url, JSON.stringify(body))
    ret = tmp['data']
  } catch (e) {
    ret = null;
  }
  return ret;
}
