import {uri} from "./config.js";

import axios from 'axios';
import { enumNumberMember } from "@babel/types";



export const signup = async(f) => {
    const res = await axios.post(`${uri}/signup`,f);
    console.log(res);
}

//서버 완성되면 post로 요청 바꿈, view에서 일치여부 판단.

export const logIn = async(f)=>{
    const response = await axios.post(`${uri}/login`,f);
    axios.defaults.headers.common["Authorization"] = `Token ${response.data.data.token}`;
    //document.cookie = `키이름=${response.data.data.token}`;
    console.log(response);
    
    // const users = response.data;
    // console.log(users);
    // const user = users.find((user)=>user.email === member.email);
    // if(!user||user.password !== member.password){
    //     throw new Error("아이디 또는 비밀번호가 일치하지 않습니다.");
    // }
     return response.data.data;
}

//회원조회
export const lookup = async(f)=>{
    //f => seller Email(pk), name, callNum
    const response = await axios.post(`${uri}/getclient`,f);
    const clients = response.data.data;
    console.log(clients);
    return clients;
} 

//회원적립
export const earn = async(f) => {
    const response = await axios.post(`${uri}/accstamp`,f);
    console.log(response);
    return response;
}

//회원추가

export const enroll = async(member)=>{
    const response = await axios.post(`${uri}/addclient`,member);
    console.log(response);
    return response;
}

//중복체크
export const duplicate = async(f)=>{
    const response = await axios.post(`${uri}/duplicate`,f);
    console.log(response.data.msg);
    if(response.data.msg==='중복'){
        return false;
    }else{
        return true;
    }
}