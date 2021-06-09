import React,{useState,useEffect,useContext} from "react";
import { useHistory } from "react-router-dom";

import {SellerContext} from "../context/seller";

type loginProps = {

    email : string,

    password : string

};

function Login({}:loginProps){
    const {login, sellerInfo} = useContext<ISellerContext>(SellerContext);
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
            login(member.email,member.password);
            // if(sellerInfo?.email === member.email){
                 history.replace('/main');
            // }
        }catch(e){
           alert(e);
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