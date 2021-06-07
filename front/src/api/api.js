import {uri} from "./config.js";

import axios from 'axios';

export const signup = (data) => {console.log(data).axios.post(`${uri}/`,{data}).then((res)=>res.data);}

export const getSeller = () => axios.get(`${uri}/`).then((res)=>res.data);

export const login = (data) => axios.post(`${uri}/`).then((res)=>res.data);

//회원조회

//회원적립

//회원추가