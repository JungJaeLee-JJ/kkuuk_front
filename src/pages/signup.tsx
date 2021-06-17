import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import {signup,duplicate} from "../api/api";

import '../css/signup.css'

function SignUp(){

//state


    const [callNum,setCallNum] = useState({callNum : ""});
    const [sellerName,setSellerName] = useState({sellerName : ""});
    const [email,setEmail] = useState({email : ""});
    const [password,setPassword] = useState({password : ""});
    const [rePassword,setRepassword] = useState({rePassword : ""});
    const [imgUrl, setImgUrl] = useState({
        file: '',
        imagePreviewUrl : '',
    });
    const [correct,setCorrect] = useState("불일치");
    let f = new FormData();
    let f2 = new FormData();
    let passwordFlag = false;
    let emailFlag = false;
    let history = useHistory();
    let {imagePreviewUrl} = imgUrl;
    let $imagePreview: {} | null | undefined = null;
    if (imagePreviewUrl){
        $imagePreview = (<img className="imgBox" src={imagePreviewUrl}/>);
    }

    //전화번호 유효성 검사
    const callNumHandler = (e:React.ChangeEvent<HTMLInputElement>) =>{
        const regex = /^[0-9\b -]{0,13}$/;
        if(regex.test(e.target.value)){
            setCallNum({callNum : e.target.value,})
            }
    }
    useEffect(()=>{
        // if(callNum.callNum.length === 10){
        //     setCallNum({
        //         callNum : callNum.callNum.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
        //     });
        // }
        if(callNum.callNum.length === 11){
            setCallNum({
                callNum : callNum.callNum.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
            })
        }
        if(password.password === rePassword.rePassword && password.password.length>=1){
           setCorrect("일치");
        }else{
            setCorrect("불일치");
        }
    },[callNum.callNum,rePassword.rePassword]);

    const sellerNameHandler = (e:React.ChangeEvent<HTMLInputElement>) =>{setSellerName({sellerName : e.target.value,})}
    const emailHandler = (e:React.ChangeEvent<HTMLInputElement>) =>{setEmail({email : e.target.value,})}
    const passwordHandler = (e:React.ChangeEvent<HTMLInputElement>) =>{setPassword({password : e.target.value,})}
    const repasswordHandler = (e:React.ChangeEvent<HTMLInputElement>) =>{setRepassword({rePassword : e.target.value,})}

    const  isSelectedImg = (e:React.ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault();
        let reader = new FileReader();
        let file = (e.target as any).files[0];

        reader.onloadend = () => {
            setImgUrl({
                file : file,
                imagePreviewUrl : reader.result as any
            });
            
        }
        reader.readAsDataURL(file);
    }

    //이메일 유효성 검사
    const emailCorrectHandler = async() =>{
        let re = /\S+@\S+\.\S+/;
        let emailTest = re.test(email.email);
        if(emailTest){
            f2.append('email',email.email);
            //통과
            let flag = await(duplicate(f2));
            if(flag){
                alert("사용 가능한 이메일 입니다!");
                emailFlag = true;
            }else{
                alert("중복 된 이메일 입니다!")
            }
        }else{
            //실패
            alert("이메일 형식이 잘못 되었습니다.")
        }
        

    }


const checkInputs= async() => {
    let re = /\S+@\S+\.\S+/;
    let emailTest = re.test(email.email);
    let pwTest = password.password.length >= 8 && password.password.length <= 50 && password.password === rePassword.rePassword
    let af = sellerName.sellerName.length >=2 && callNum.callNum.length >=8 
    f.append('email',email.email);f.append('call',callNum.callNum);f.append('name',sellerName.sellerName);f.append('pwd',password.password);
    return (emailTest && pwTest && af);
}

return(

<section className="container">

<h1>가게등록</h1>

<div className="imgContainer">{$imagePreview}</div>
<input type="file" onChange={isSelectedImg}/>

<p>전화번호 : <input type="text" onChange={callNumHandler} value={callNum.callNum} name="call"/></p>
<p>상호명 : <input type="text" onChange={sellerNameHandler} value={sellerName.sellerName} name="name"/></p>
<p>E-mail : <input type="text" onChange={emailHandler} value={email.email} name="email"/><button type="button" onClick={emailCorrectHandler}>확인</button></p>
<p>비밀번호 : <input type="password" onChange={passwordHandler} value={password.password} name="password"/></p>
<p>비밀번호확인 : <input type="password" onChange={repasswordHandler} value={rePassword.rePassword}/>{<div>{correct}</div>}</p>  {/*유효성 검사*/}

<button

onClick={()=>

{
    if(checkInputs()&&emailFlag){
        signup(f);
        alert("회원가입이 완료되었습니다!");
        history.replace('/');
    }else{
        alert("Sign up Error");
    }
 }

}>등록</button>

</section>

)

}

export default SignUp;