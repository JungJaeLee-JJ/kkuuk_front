import React, { useState } from 'react';

import {signup} from "../api/api";

import '../css/signup.css'
type signupProps = {

    name : string | undefined;

    call : string | undefined;

    password : string | undefined;

    email : string | undefined;

}

type checkProps = {

    idCheck : boolean;

    passwordCheck : boolean;

    allFieldCheck : boolean;

}

function SignUp({}:signupProps){

//state

    const [seller,setSeller] = useState<signupProps>({

        name : undefined,

        call : undefined,

        password : undefined,

        email : undefined,

    });

    const [imgUrl, setImgUrl] = useState({
        file: '',
        imagePreviewUrl : '',
    });

    let {imagePreviewUrl} = imgUrl;
    let $imagePreview: {} | null | undefined = null;
    if (imagePreviewUrl){
        $imagePreview = (<img className="imgBox" src={imagePreviewUrl}/>);
    }

    const [check, setCheck] = useState<checkProps>({

        idCheck : false,

        passwordCheck : false,

        allFieldCheck : false,

    });

    const signupHandler = (e:React.ChangeEvent<HTMLInputElement>) =>{

        setSeller({

        ...seller,

        [e.target.name]:e.target.value,

        });

    }

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

    const idCorrectHandler = () =>{

        setCheck({

            ...check,

            idCheck : true,

    })

        alert("사용 가능 한 아이디 입니다.");

}

const allFieldCheckHandler = () =>{

    if(seller.call === undefined || seller.name === undefined  || seller.password === undefined){

        return false;

        }else{

            setCheck({

                ...check,

                allFieldCheck : true,

        })

    }

}

const passwordCorrectHandler = (e:React.ChangeEvent<HTMLInputElement>)=>{

//유효성검사 추가 중복 등.

//1. call number valid

//2. name number valid

//3. password valid

//4. password correction valid

if(seller.password === e.target.name){

setCheck({

...check,

passwordCheck : true,

})

}else{

}

return true;

}

return(

<section className="container">

<h1>가게등록</h1>

<div className="imgContainer">{$imagePreview}</div>
<input type="file" onChange={isSelectedImg}/>

<p>전화번호 : <input type="text" onChange={signupHandler} value={seller.call} name="call"/></p>

<p>상호명 : <input type="text" onChange={signupHandler} value={seller.name} name="name"/><button type="button" onClick={idCorrectHandler}>확인</button></p>


<p>E-mail : <input type="text" onChange={signupHandler} value={seller.email} name="email"/></p>


<p>비밀번호 : <input type="password" onChange={signupHandler} value={seller.password} name="password"/></p>

<p>비밀번호확인 : <input type="password" onChange={passwordCorrectHandler} name="passwordCorrect"/></p>  {/*유효성 검사*/}

<button

onClick={()=>

{

//post

allFieldCheckHandler();
console.log(imgUrl.file);
console.group(imgUrl.imagePreviewUrl);
console.log(imagePreviewUrl);
console.log($imagePreview as any);
if(check.allFieldCheck === true && check.idCheck === true && check.passwordCheck === true){

signup(seller);

}else{

alert("wrong info.")

}

}

}>등록</button>

</section>

)

}

export default SignUp;