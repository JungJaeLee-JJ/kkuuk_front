import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import {enroll,lookup,earn} from "../api/api.js";
import {SellerContext} from "../context/seller";
import CustomModal from "../components/modal";

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { formatMs, makeStyles, rgbToHex } from '@material-ui/core/styles';
import Copyright from '../components/copyright.js';
import HeaderBar from '../components/header.js';
import ClipLoader from "react-spinners/ClipLoader";
import axios from 'axios';
import { ConsoleWriter } from 'istanbul-lib-report';

type MainProps = {
}

type memberProps = {
    email : string;
    name : string;
    callNum : string;
}

type memberPointProps = {
    email : string;
    name : string;
    callNum : string;
    point : number;
}

function Main({}:MainProps){
    
    const {sellerInfo,setSellerInfo} = useContext<ISellerContext>(SellerContext);
    const {sellerModal,setSellerModal} = useContext<ISellerContext>(SellerContext);
    let history = useHistory();
    let f = new FormData();//member
    let f2 = new FormData();//lookupm
    let f3 = new FormData(); //accpoint
    let f4 = new FormData(); //usePoint

    const [member,setMember] = useState<memberProps>({
        email : sellerInfo?.email as string,
        name : "",
        callNum : ""
    });
    const [targetMember,setTargetMember] = useState<memberProps>({
        email : sellerInfo?.email as string,
        name : "",
        callNum : ""
    });
    const [memberPoint, setMemberPoint] = useState<memberPointProps>({
        email : sellerInfo?.email as string,
        name : "",
        callNum : "",
        point : 0,
    });
    const [memberUsePoint, setMemberUsePoint] = useState<memberPointProps>({
        email : sellerInfo?.email as string,
        name : "",
        callNum : "",
        point : 0,
    });

    const [myClient, setMyClient] = useState<any[]>([]);

    

    //고객 등록
    const joinmemberHandler = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setMember({
        ...member,
        [e.target.name] : e.target.value,
        })
    }
    //고객 등록 휴대폰 뒷자리
    const callNumHandler = (e:React.ChangeEvent<HTMLInputElement>) =>{
        const regex = /^[0-9\b -]{0,4}$/;
        if(regex.test(e.target.value)){
            setMember({...member,
                callNum : e.target.value,})
            }
    }
    //등록 고객 유효성 검사
    const checkInputs=()=>{
        const name = member.name.length >=1;
        const bnum = member.callNum.length ===4;
        f.append('email',sellerInfo?.email as string);
        f.append('name',member.name);
        f.append('last_4_digit',member.callNum);
        return (name && bnum)
    }


    //고객 조회
    const lookupmemberHandler = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setTargetMember({
        ...targetMember,
        [e.target.name] : e.target.value,
        })
    }
    //조회 고객 전화번호 뒷자맂
    const lookupcallNumHandler = (e:React.ChangeEvent<HTMLInputElement>) =>{
        const regex = /^[0-9\b -]{0,4}$/;
        if(regex.test(e.target.value)){
            setTargetMember({...targetMember,
                callNum : e.target.value,})
            }
    }
    //조회 고객 유효성 검사
    const checkLookupInputs=()=>{
        const name = targetMember.name.length >=1;
        const bnum = targetMember.callNum.length ===4;
        f2.append('email',sellerInfo?.email as string);
        f2.append('last_4_digit',targetMember.callNum);
        return (name && bnum)
    }
    //포인트 적립
    const memberPointHandler = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setMemberPoint({
        ...memberPoint,
        [e.target.name] : e.target.value,
        })
    }
    const checkPointInputs=()=>{
        const name = memberPoint.name.length>=1;
        const bnum = memberPoint.callNum.length===4;
        const pt = memberPoint.point>0;
        f3.append('val',memberPoint.point as any);
        f3.append('last_4_digit',memberPoint.callNum);
        f3.append('name',memberPoint.name);
        f3.append('email',memberPoint.email);
        return (name&&bnum&&pt);
    }
    //포인트 사용
    const memberUsePointHandler = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setMemberUsePoint({
        ...memberUsePoint,
        [e.target.name] : e.target.value,
        })
    }
    const checkUsePointInputs=()=>{
        const name = memberUsePoint.name.length>=1;
        const bnum = memberUsePoint.callNum.length===4;
        const pt = memberPoint.point>0;
        f4.append('val',memberUsePoint.point*-1 as any);
        f4.append('last_4_digit',memberUsePoint.callNum);
        f4.append('name',memberUsePoint.name);
        f4.append('email',memberUsePoint.email);
        return (name&&bnum&&pt);
    }

    const logout = () =>{
        setSellerInfo(undefined);
        history.replace('/');
    }

    const submitEnroll=async()=>{
        const res = await enroll(f);
        const msg = res?.data.msg;
        if(msg==="이미 가입된 고객입니다."){
            setSellerModal({onoff : true, msg : "이미 존재하는 고객입니다."});
        }else if(msg==="고객 등록이 완료 되었습니다."){
            setSellerModal({onoff : true, msg : `환영 합니다 ${member.name}님!`});
        }else{
            setSellerModal({onoff : true, msg : "관리자에게 문의 바랍니다."});
        }
    }

    const submitLookup=async()=>{
        const res = await lookup(f2);
        console.log(res);
        if(res.length===0){
            setSellerModal({onoff:true,msg:"해당 번호에 해당하는 고객들이 없습니다."})
        }else{
            setMyClient(res);
        }  
    }

    const submitPoint=async()=>{
        const res = await earn(f3);
        setSellerModal({onoff : true, msg : "포인트 적립이 완료되었습니다."});  
    }

    const submitUsePoint=async()=>{
        const res = await earn(f2);
        setSellerModal({onoff : true, msg : "포인트 사용이 완료되었습니다."});
    }

    //style
    const useStyle = makeStyles((theme)=>({
        paper:{
            marginTop : theme.spacing(20),
        display : 'flex',
        flexDirection : 'column',
        alignItems : 'center',
        },
        clientbox : {
            display : 'flex',
            justifyContent : 'center',
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
          },
        pointmainbox : {
            display : 'flex',
            flexDirection : 'row',
            justifyContent : 'stretch',
                },
        pointsubbox : {
            display : 'flex',
            flexDirection : 'column',
            alignItems : 'center',
        }
    }));
    const classes = useStyle();

return(

    <>
    <CssBaseline/>
    <HeaderBar/>
    {(sellerInfo?.email===undefined)? 
    <div style={{
        display : 'flex',
        alignContent : 'center',
        justifyContent : 'center',
    }}>
        <div style={{marginTop:'300px'}}>
    <ClipLoader color="rgb(255,156,155)" size={150} loading={true}/>
    </div>
    </div>
    :
    <div className={classes.paper}>
        <Typography component="h1" variant="h5">
                    {`${sellerInfo.username} 님 환영합니다!`}
                </Typography>
                <button onClick={logout}>로그아웃</button>
        <div className={classes.clientbox}>
            <form noValidate>
                <Typography component="h1" variant="h5">
                    고객등록
                </Typography>
                <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="이름"
                            name="name"
                            value={member.name}
                            onChange={joinmemberHandler}
                            autoFocus
                />
                <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="전화번호 뒷 4자리"
                                name="callNum"
                                value={member.callNum}
                                onChange={callNumHandler}
                                autoFocus
                />
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={()=>{
                        if(checkInputs()){
                            submitEnroll();
                        }else{
                            setSellerModal({onoff:true, msg: "빈 칸이 있습니다."})
                        }
                    }}>
                        추가
                    </Button>
            </form>
        </div>
        <div className={classes.clientbox}>
            <form noValidate>
                <Typography component="h1" variant="h5">
                    고객조회
                </Typography>
                <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="이름"
                            name="name"
                            value={targetMember.name}
                            onChange={lookupmemberHandler}
                            autoFocus
                />
                <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="전화번호 뒷 4자리"
                                name="callNum"
                                value={targetMember.callNum}
                                onChange={lookupcallNumHandler}
                                autoFocus
                />
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={async()=>{
                        if(checkLookupInputs()){
                            submitLookup();
                        }else{
                            setSellerModal({onoff : true, msg : "올바른 입력을 해주세요."});
                        }
                    }}>
                        조회
                    </Button>
            </form>
        </div>
        <div className={classes.pointmainbox}>
            <Typography component="h1" variant="h5">
                고객 목록
            </Typography>
            <div className={classes.pointsubbox}>
                    {
                        myClient? 
                        myClient.map((value,key)=>{
                            return(
                                <div><input type="radio" name={targetMember.callNum} value={value.name} onClick={()=>{
                                    setMemberPoint({
                                        ...memberPoint,
                                        name : value.name,
                                        callNum : targetMember.callNum,
                                    });
                                    setMemberUsePoint({
                                        ...memberUsePoint,
                                        name : value.name,
                                        callNum : targetMember.callNum,
                                    });
                                }}/>{`뒷자리 : ${targetMember.callNum} 이름 : ${value.name} 쿠폰 개수 : ${value.stamp}`}</div>
                            )
                        })
                        :
                        <></>
                    }
                    
            </div>
            <div className={classes.pointmainbox}>
                    <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="적립 개수"
                                name="point"
                                value={memberPoint.point}
                                onChange={memberPointHandler}
                                type="number"
                                autoFocus
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={()=>{
                            if(checkPointInputs()){
                                submitPoint(); 
                            }else{
                                setSellerModal({onoff : true, msg : "서버 에러"});
                            }
                            
                        }}
                    >적립</Button>
                    <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="사용 개수"
                                name="point"
                                value={memberUsePoint.point}
                                onChange={memberUsePointHandler}
                                type="number"
                                autoFocus
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={()=>{
                            if(checkUsePointInputs()){
                               submitUsePoint();
                            }else{
                                setSellerModal({onoff : true, msg : "서버 에러"});
                            }
                        }}
                    >사용</Button>
                    {sellerModal?.onoff? <CustomModal/> : <></>}

            </div>
        </div>
        <Copyright/>
    </div>
    
    }
    </>

    )

}

export default Main;