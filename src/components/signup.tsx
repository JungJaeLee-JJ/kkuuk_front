import React, { useState } from 'react';

import {signup} from "../api/api";

type signupProps = {

    name : string | undefined;

    call : string | undefined;

    password : string | undefined;

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

    });

    const [imgUrl, setImgUrl] = useState(null);

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

    const isSelectedImg = (e:React.ChangeEvent<HTMLInputElement>)=>{

    //setImgUrl(e.target.files[0]);

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


<input type="file" accept="image/jpeg, image/jpg" onChange={isSelectedImg}/>

<p>전화번호 : <input type="text" onChange={signupHandler} value={seller.call} name="call"/></p>

<p>상호명 : <input type="text" onChange={signupHandler} value={seller.name} name="name"/></p>

<button type="button" onClick={idCorrectHandler}>확인</button>

<p>비밀번호 : <input type="text" onChange={signupHandler} value={seller.password} name="password"/></p>

<p>비밀번호확인 : <input type="text" onChange={passwordCorrectHandler} name="passwordCorrect"/></p>  {/*유효성 검사*/}

<button

onClick={()=>

{

//post

allFieldCheckHandler();

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