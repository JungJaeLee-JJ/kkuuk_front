import React,{useState,useEffect} from "react";
import { useHistory } from "react-router-dom";

import {login} from "../api/api.js";

type loginProps = {

    email : string,

    password : string

};
type authProps = {
    auth : boolean,
}

function Login({}:loginProps){

    const [member,setMember] = useState<loginProps>({

        email : "",

        password : "",

    });

    const [auth,setAuth] = useState<authProps>({
        auth : false,
    });

    let history = useHistory();

    const loginHandler = (e:React.ChangeEvent<HTMLInputElement>)=>{

        setMember({

        ...member,

        [e.target.name] : e.target.value,

        })

    }

    const onSubmitAccount = async ()=>{
        try{
            const user = await login(member);
            console.log(user);
            if(user){
                history.replace("/main");
            }
        }catch(e){
            window.alert(e);
        }
    }

    return(

    <>

    <section className="container">

        <p>E-mail : <input type="text" onChange={loginHandler} value={member.email} name="email"/></p>

        <p>Password : <input type="password" onChange={loginHandler} value={member.password} name="password"/></p>

    <button

    onClick={onSubmitAccount}

    >로그인</button>

    {/*POST부분*/}

    </section>

    </>

    );

}

export default Login;