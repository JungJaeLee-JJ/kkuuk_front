import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import {signup,duplicate} from "../api/api";

import '../css/signup.css'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { formatMs, makeStyles } from '@material-ui/core/styles';
import Copyright from '../components/copyright.js';
import HeaderBar from '../components/header.js';
import { SellerContext } from '../context/seller';
import CustomModal from '../components/modal';

function SignUp(){

//state
    const {sellerModal,setSellerModal} = useContext<ISellerContext>(SellerContext);

    const [callNum,setCallNum] = useState({callNum : ""});
    const [sellerName,setSellerName] = useState({sellerName : ""});
    const [email,setEmail] = useState({email : ""});
    const [validEmail,setValidEmail] = useState(false);
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
                setSellerModal({onoff : true, msg : "사용 가능 합니다."});
                setValidEmail(true);
            }else{
                setSellerModal({onoff : true, msg : "중복된 이메일 입니다."});
            }
        }else{
            //실패
            setSellerModal({onoff : true, msg : "이메일 형식이 잘못되었습니다."});
        }
        

    }


const checkInputs= async() => {
    let re = /\S+@\S+\.\S+/;
    let emailTest = re.test(email.email);
    let pwTest = password.password.length >= 8 && password.password.length <= 50 && password.password === rePassword.rePassword
    let af = sellerName.sellerName.length >=2 && callNum.callNum.length >=8 
    f.append('email',email.email);f.append('call',callNum.callNum);f.append('username',sellerName.sellerName);f.append('password',password.password);

    return (emailTest && pwTest && af);
}


//style 

const useStyle = makeStyles((theme)=>({
    paper: {
        marginTop : theme.spacing(20),
        display : 'flex',
        flexDirection : 'column',
        alignItems : 'center',
    },
    signupbox : {
        display : 'flex',
        justifyContent : 'center',
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
      },
}));
const classes = useStyle();
return(
<>
<CssBaseline/>
<HeaderBar/>
<div className={classes.paper}>
    <div className={classes.signupbox}>
        <form noValidate>
            <Typography component="h1" variant="h5">
                회원가입
            </Typography>
            {/* <div className="imgContainer">{$imagePreview}</div>
            <input type="file" onChange={isSelectedImg}/>        */}
            <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="전화번호"
                            name="call"
                            value={callNum.callNum}
                            onChange={callNumHandler}
                            autoFocus
            />
            <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="상호명"
                            name="name"
                            value={sellerName.sellerName}
                            onChange={sellerNameHandler}
                            autoFocus
            />
            <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="이메일 주소"
                            name="email"
                            value={email.email}
                            autoComplete="email"
                            onChange={emailHandler}
                            autoFocus
            />
            <Button
            fullWidth
            variant="contained"
            color="primary"
                onClick={emailCorrectHandler}
            >중복검사</Button>
            <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="패스워드"
                            name="password"
                            value={password.password}
                            type="password"
                            onChange={passwordHandler}
                            autoFocus
            />
            <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            value={rePassword.rePassword}
                            label="패스워드 재입력"
                            type="password"
                            onChange={repasswordHandler}
                        />
            <p>{correct}</p>
            <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={()=>

                    {
                        if(checkInputs()&&validEmail){
                            signup(f);
                            if(sellerModal.onoff ===false){
                                history.replace('/');
                            }
                            
                        }else{
                            setSellerModal({onoff : true, msg : "회원 가입 실패입니다!."});
                        }
                     }
                }
            >회원가입</Button>
            <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={()=>{
                    history.replace("/");
                }}
            >돌아가기</Button>
        </form>
        {sellerModal.onoff? <CustomModal/> : <></>}
    </div>
    <Copyright/>
</div>
</>
)

}

export default SignUp;