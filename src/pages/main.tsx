import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import {enroll,lookup,earn} from "../api/api.js";
import {SellerContext} from "../context/seller";
import CustomModal from "../components/modal";

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { formatMs, makeStyles } from '@material-ui/core/styles';
import Copyright from '../components/copyright.js';
import HeaderBar from '../components/header.js';
import { FormControlLabel, Radio } from '@material-ui/core';

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
    let f2 = new FormData();//point

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
    const [onModal, setOnModal] = useState({
        onoff : false,
        msg : "",
    });

    

    //고객 등록
    const joinmemberHandler = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setMember({
        ...member,
        [e.target.name] : e.target.value,
        })
    }
    const callNumHandler = (e:React.ChangeEvent<HTMLInputElement>) =>{
        const regex = /^[0-9\b -]{0,4}$/;
        if(regex.test(e.target.value)){
            setMember({...member,
                callNum : e.target.value,})
            }
    }
    const checkInputs=()=>{
        const name = member.name.length >=1;
        const bnum = member.callNum.length ===4;
        f.append('email',member.email);
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
    const lookupcallNumHandler = (e:React.ChangeEvent<HTMLInputElement>) =>{
        const regex = /^[0-9\b -]{0,4}$/;
        if(regex.test(e.target.value)){
            setTargetMember({...targetMember,
                callNum : e.target.value,})
            }
    }
    const checkLookupInputs=()=>{
        const name = targetMember.name.length >=1;
        const bnum = targetMember.callNum.length ===4;
        f.append('email',targetMember.email);
        f.append('last_4_digit',targetMember.callNum);
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
        f2.append('val',memberPoint.point as any);
        f2.append('last_4_digit',memberPoint.callNum);
        f2.append('name',memberPoint.name);
        f2.append('email',memberPoint.email);
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
        f2.append('val',memberUsePoint.point*-1 as any);
        f2.append('last_4_digit',memberUsePoint.callNum);
        f2.append('name',memberUsePoint.name);
        f2.append('email',memberUsePoint.email);
        return (name&&bnum&&pt);
    }
    //useeffect
    // useEffect(()=>{
    //     // setSellerInfo({
    //     //     email : document.cookie.get("email"),
    //     // })
    //     console.log(cookies);

    // },[sellerInfo])    
    
    

    const logout = () =>{
        setSellerInfo(undefined);
        history.replace('/');
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
    {(sellerInfo?.email===undefined)? <p>Loading</p>:
    <div className={classes.paper}>
        <Typography component="h1" variant="h5">
                    {`${sellerInfo.username} 님 환영합니다!`}
                </Typography>
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
                    onClick={async ()=>{
                        if(checkInputs()){
                            const res = await enroll(f);
                            const msg = res.data.msg;
                            if(msg==="이미 가입된 고객입니다."){
                                setSellerModal({onoff : true, msg : "이미 존재하는 고객입니다."});
                            }else{
                                setSellerModal({onoff : true, msg : `환영 합니다 ${member.name}님!`});
                            }
                        }else{
                            alert("Error");
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
                        setMyClient(await lookup(f));//고객 list 저장
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
                        myClient && myClient.map((value,key)=>{
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
                        // radio chk logic
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
                                earn(f2);
                                setSellerModal({onoff : true, msg : "포인트 적립이 완료되었습니다."});   
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
                                earn(f2);
                                setSellerModal({onoff : true, msg : "포인트 사용이 완료되었습니다."});
                            }else{
                                setSellerModal({onoff : true, msg : "서버 에러"});
                            }

                            //useEffect 현재 포인트 초과 금지 logic 추가
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