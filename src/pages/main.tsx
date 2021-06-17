import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import {getSeller,enroll} from "../api/api.js";
import {SellerContext} from "../context/seller";

type MainProps = {

}

type sellerProps = {

    sellerName : string | undefined;

    totalMember : undefined | number;

    totalPoint : number | undefined;

}

type memberProps = {
    email : string;

    name : string;

    callNum : string;

}

type memberPointProps = {

    name : string;

    callNum : string;

    point : number;

}

function Main({}:MainProps){
    
    const {sellerInfo,setSellerInfo} = useContext<ISellerContext>(SellerContext);

    let history = useHistory();
    let f = new FormData();

    const [member,setMember] = useState<memberProps>({
        email : "seller@naver.com",

        name : "",

        callNum : ""

    });

    const [memberPoint, setMemberPoint] = useState<memberPointProps>({

        name : "",

        callNum : "",

        point : 0,

    });

    const callNumHandler = (e:React.ChangeEvent<HTMLInputElement>) =>{
        const regex = /^[0-9\b -]{0,4}$/;
        if(regex.test(e.target.value)){
            setMember({...member,
                callNum : e.target.value,})
            }
    }

    //seller의 정보 조회

    // useEffect(()=>{

    // getSeller().then((data: React.SetStateAction<sellerProps>)=>setSeller(data));

    // },[]);

    //member 인풋 상태 변화 state에 저장


    const joinmemberHandler = (e:React.ChangeEvent<HTMLInputElement>) =>{

        setMember({

        ...member,

        [e.target.name] : e.target.value,

        })

    }

    const memberPointHandler = (e:React.ChangeEvent<HTMLInputElement>) =>{

        setMemberPoint({

        ...memberPoint,

        [e.target.name] : e.target.value,

        })

    }
    const checkInputs=()=>{
        const name = member.name.length >=1;
        const bnum = member.callNum.length >=0;
        f.append('email',"akrnote@nate.com");
        f.append('name',member.name);
        f.append('last_4_digit',member.callNum);
        return (name && bnum)
    }

    const logout = () =>{
        setSellerInfo(undefined);
        history.replace('/');
    }

return(

    <section className="container">

        {(sellerInfo?.email===undefined)? <p>Loading</p>:

            <div>

                <div>
                    <button onClick={logout} >로그아웃</button>

                    {/* useEffect => get 으로 회원정보 보여줌.*/ }

                    <h3>{`업체명 : ${sellerInfo?.username}`}</h3>

                    <p>{`회원 수 : 0`}</p>

                    <p>{`총 포인트 : 0`}</p>

                    </div>

                    <div>

                        {/*POST 추가*/}

                        {/*POST 시 다시 GET요청 or db에만 적용하고 렌더되는 메모리 상으로 임의로 바꿔줌*/}

                        <h3>회원추가</h3>

                        <p>전화번호(끝 4자리)<input type="text" onChange={callNumHandler} value={member.callNum} name="callNum"/></p>

                        <p>이름<input type="text" onChange={joinmemberHandler} value={member.name} name="name"/></p>

                        <button
                            onClick={()=>{
                                if(checkInputs()){
                                    enroll(f);
                                }else{
                                    alert("Error");
                                }
                            }}
                        >추가</button>

                    </div>

                    <div>

                        <h3>적립</h3>

                        <p>전화번호(끝 4자리)<input type="text"/></p>

                        <button>조회</button>

                        <p>적립액<input type="text" onChange={memberPointHandler} value={memberPoint.point*-1} name="point"/></p>

                        <button>적립</button>

                        </div>

                    <div>

                    <h3>사용</h3>

                    <p>전화번호(끝 4자리)<input type="text"/></p>

                    <button>조회</button>

                    <p>사용액<input type="text" onChange={memberPointHandler} value={memberPoint.point} name="point"/></p>

                    <button>사용</button>

                </div>

            </div>

        }

    </section>

    )

}

export default Main;