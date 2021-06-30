import { Button, CssBaseline, Table, TableBody, TableCell, TableHead, TextField } from "@material-ui/core";
import React,{useState,useContext, useEffect} from "react";
import {SellerContext} from "../context/seller";
import {lookup} from "../api/api.js";
import axios from "axios";
import { useHistory } from "react-router";

import CustomModal from "../components/modal";

//1. 번호판(cal 참고)
//2. 입력 후 확인 누르면 회원 조회
//3. 조회 된 곳에서 자신의 이름과 일치하는 block 클릭 시 페이지 전환
//4. history와 적립 포인트 개수 노출


type userPoint = {

    email : string,
    last_4_digit : string,
    flag : boolean,

}

function Client(){
    const {sellerInfo,sellerModal,setSellerModal,setSellerInfo} = useContext<ISellerContext>(SellerContext);
    const [userPoint,setUserPoint] = useState<userPoint>({
        email : sellerInfo?.email as string,
        last_4_digit : "",
        flag : true,
    });
    const [myClients,setMyClients] = useState<any[]>([]);
    const f = new FormData();
    const lm = localStorage.getItem('Email');
    const sm = sessionStorage.getItem('Email');
    const lt = localStorage.getItem('TOKEN');
    const st = sessionStorage.getItem('TOKEN');

    let history = useHistory();

    useEffect(()=>{
        if(lm!==null){
            //get요청
            setSellerInfo({
                ...sellerInfo,
                email : localStorage.getItem('Email')
            });
            axios.defaults.headers.common["Authorization"] = `Token ${lt}`;
            console.log(lm);
        }
        else if(sm!==null){
            //get요청
            setSellerInfo({
                ...sellerInfo,
                email : sessionStorage.getItem('Email')
            });
            axios.defaults.headers.common["Authorization"] = `Token ${st}`;
            console.log(sm);
        }else{
            setTimeout(()=>{
                localStorage.removeItem('Email');
                sessionStorage.removeItem('Email');
                history.replace("/bad_request");
            },5000)
        }
    },[]);
    

    const checkLookupInputs=()=>{
        const bnum = userPoint.last_4_digit.length ===4;
        f.append('email',sellerInfo?.email as string);
        f.append('last_4_digit',userPoint.last_4_digit);
        return bnum;
    }
    const lookupcallNumHandler = (e:React.ChangeEvent<HTMLInputElement>) =>{
        const regex = /^[0-9\b -]{0,4}$/;
        if(regex.test(e.target.value)){
            setUserPoint({...userPoint,
                last_4_digit : e.target.value,})
            }
    }


    return (
        <>
        <CssBaseline/>
        {
            userPoint.flag ? 
            <div>
                <form noValidate>
                    <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="전화번호 뒷 4자리"
                                name="callNum"
                                onChange={lookupcallNumHandler}
                                value={userPoint.last_4_digit}
                                autoFocus
                    />
                    <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={async()=>{
                        if(checkLookupInputs()){
                        setMyClients(await lookup(f));//고객 list 저장
                        }else{
                            setSellerModal({onoff : true, msg : "올바른 입력을 해주세요."});
                        }
                    }}>
                        조회
                    </Button>
                </form>
                {
                        myClients && myClients.map((value,key)=>{
                            return(
                                <Button>{`뒷자리 : ${userPoint.last_4_digit} 이름 : ${value.name} 쿠폰 개수 : ${value.stamp}`}</Button>
                            )
                        })
                        // radio chk logic
                    }
                {sellerModal?.onoff? <CustomModal/> : <></>}
            </div>
            //번호 입력 전 vs 입력 후
            :
            <div></div>

        }
        </>
    );
}

export default Client;