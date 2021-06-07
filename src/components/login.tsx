import React,{useState,useEffect} from "react";

import {login} from "../api/api.js";

type loginProps = {

name : string,

password : string

};

function Login({}:loginProps){

const [member,setMember] = useState<loginProps>({

name : "",

password : "",

});

const loginHandler = (e:React.ChangeEvent<HTMLInputElement>)=>{

setMember({

...member,

[e.target.name] : e.target.value,

})

}

const ToMainHandler = () =>{

//로그인 정보가 db와 일치하는 지 여부를 판단.

}

return(

<>

<section className="container">

<p>E-mail : <input type="text" onChange={loginHandler} value={member.name} name="name"/></p>

<p>Password : <input type="text" onChange={loginHandler} value={member.password} name="password"/></p>

<button

onClick={()=>{login(member).then()}}

>로그인</button>

{/*POST부분*/}

</section>

</>

);

}

export default Login;