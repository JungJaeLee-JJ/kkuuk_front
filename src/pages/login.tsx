import React,{useState,useEffect,useContext} from "react";
import { useHistory } from "react-router-dom";

import {logIn} from "../api/api";
import {SellerContext} from "../context/seller";

type loginProps = {

    email : string,

    password : string

};

function Login({}:loginProps){
    const {setSellerInfo} = useContext<ISellerContext>(SellerContext);
    let history = useHistory();

    const [member,setMember] = useState<loginProps>({

        email : "",

        password : "",

    });

    const loginHandler = (e:React.ChangeEvent<HTMLInputElement>)=>{

        setMember({

        ...member,

        [e.target.name] : e.target.value,

        })

    }

    const onSubmitAccount = async ()=>{
        try{
            const seller = await logIn(member);
            setSellerInfo({
                username : seller.username,
                email : seller.email,
                picture : "" 
            });
            history.replace("/main");
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

    </section>

    </>

    );

}

export default Login;