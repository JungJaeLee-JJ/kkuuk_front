import React, {useState, useEffect, useContext} from "react";
import {useHistory, Link, NavLink} from "react-router-dom";

import {logIn} from "../api/api";
import {SellerContext} from "../context/seller";


import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';


type loginProps = {
    email: string,
    password: string
};

function Login({}: loginProps) {
    const {sellerInfo, setSellerInfo} = useContext<ISellerContext>(SellerContext);
    const {sellerModal,setSellerModal} = useContext<ISellerContext>(SellerContext);
    let history = useHistory();
    let f = new FormData();
    const [member, setMember] = useState<loginProps>({
        email: "",
        password: "",
    });
    //로그인 시 이메일 비밀번호 감지 함수
    const loginHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMember({
            ...member,
            [e.target.name]: e.target.value,
        })
    }
    // check input 이 유효하다면 해당 로직 실행
    // 로그인으로 form 넘겨주고 그 정보를 context에 저장한 뒤 main으로 이동시킴
    const onSubmitAccount = async () => {
        try {
            const seller = await logIn(f);
            console.log(seller)
                if(seller.code==200){
                setSellerInfo({
                    username: seller.data.username,
                    email: seller.data.email,
                });
                history.push("/main");
            }else if(seller.code==400){
                setSellerModal({onoff:true,msg:"등록되지 않은 이메일 입니다."})
            }else{
                setSellerModal({onoff:true,msg:"비밀번호를 확인해 주세요."})
            }
        } catch (e) {
            window.alert(e);
        }
    }
    //이메일 1글자 이상, 패스우드 7글자 이상.
    const checkInputs = () => {
        let a = member.email.length >= 1;
        let b = member.password.length >= 7;
        f.append('email', member.email);
        f.append('password', member.password);
        return (a && b);
    }

    return (
        <div className="container">
            <div className="flex-container">
                <div className="login-wrapper">
                    <form noValidate>
                        <div id="title" style={{fontSize: "50px"}}>꾸욱!</div>
                        <div>
                            <div id="subColor">E-mail</div>
                            <TextField
                                className="inputText"
                                variant="outlined"
                                margin="none"
                                required
                                fullWidth
                                id="email"
                                // label="Email Address"
                                name="email"
                                value={member.email}
                                autoComplete="email"
                                onChange={loginHandler}
                                autoFocus
                                size="small"
                            />
                        </div>
                        <div className="password">
                            <div id="subColor">Password</div>
                            <TextField
                                className="inputText"
                                variant="outlined"
                                margin="none"
                                required
                                fullWidth
                                name="password"
                                value={member.password}
                                // label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={loginHandler}
                                size="small"
                            />
                        </div>
                        <FormControlLabel style={{color:"#838383"}}
                            control={<Checkbox id="remember" value="remember" color="primary"
                                                />}
                            label="로그인 상태 유지"
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                if (checkInputs()) {
                                    onSubmitAccount();
                                } else {
                                    alert("아이디 혹은 비밀번호를 확인 해주세요");
                                    <Box zIndex="modal">
                                        아이디 혹은 비밀번호를 확인 해주세요
                                    </Box>
                                }
                            }}
                        >
                            로그인
                        </Button>
                        <Grid container>
                            <Grid item>
                                <p>회원이 아니신가요?
                                    <NavLink to="/signup" replace style={{marginLeft:"10px",color:"#FF747",fontWeight:"bold"}}>
                                        {"회원가입"}
                                    </NavLink>
                                </p>

                            </Grid>
                        </Grid>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;