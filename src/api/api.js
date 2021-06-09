import {uri} from "./config.js";

import axios from 'axios';

export const signup = async(member) => {
    console.log(member);
    const res = await axios.post(`${uri}/`,member);
    console.log(res);

}

export const getSeller = () => axios.get(`${uri}/`).then((res)=>res.data);

//서버 완성되면 post로 요청 바꿈, view에서 일치여부 판단.

export const logIn = async(member)=>{
    const response = await axios.get(`${uri}`);
    const users = response.data;
    const user = users.find((user)=>user.email === member.email);
    if(!user||user.password !== member.password){
        throw new Error("아이디나 비밀번호가 잘못 되었습니다.")
    }
        return user;
}

//회원조회

//회원적립

//회원추가