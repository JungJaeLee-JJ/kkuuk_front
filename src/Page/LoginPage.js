import {useEffect, useState} from "react";
import {
  Box,
  Button, Checkbox,
  FormControlLabel,
  Grid,
  TextField
} from "@material-ui/core";
import {NavLink} from "react-router-dom";
import {sendPOSTRequest} from "../API/ApiRequest";
import {getLoginUrl} from "../API/ApiUrl";
import {
  setDataAtLocalStorage,
  setDataAtSessionStorage
} from "../Component/Storage";
import {goMainPage} from "../Component/MovePage";
import {Loader} from "../Component/Loading";
import getUserInfo from "../Component/Session";
import {Alert} from "../Component/ConfirmAlert";

function LoginPage({history}){

  const [isLoading, setIsLoading] = useState(false);
  const [member, setMember] = useState({
    email: "",
    password: "",
  });
  const [autoLogin,setAutoLogin] = useState(false);
  const clickAutoLogin = () => {setAutoLogin(!autoLogin)}

  useEffect(async () => {
    const info = await getUserInfo();
    if(info!=null){
      goMainPage(history);
    }
  }, []);

  //로그인 시 이메일 비밀번호 감지 함수
  const inputHandler = (e) => {
    setMember({
      ...member,
      [e.target.name]: e.target.value,
    })
  }

  const sendRequest = async () => {
    setIsLoading(true);
    const ret = await sendPOSTRequest(getLoginUrl(),member);
    if(ret!=null){
      Alert(ret['msg'])
      setDataAtSessionStorage('token',ret['token'])
      // if(autoLogin){
      //   setDataAtLocalStorage('token',ret['token'])
      // }
      goMainPage(history);
    }
    setIsLoading(false);
  }

  if(isLoading){
    return (<Loader/>)
  }

  return (
      <div id="container">
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
                    onChange={inputHandler}
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
                    onChange={inputHandler}
                    size="small"
                />
              </div>
              <FormControlLabel style={{color:"#838383"}}
                                control={<Checkbox id="remember" value="remember" color="primary"
                                                   onClick={clickAutoLogin}
                                />}
                                label="로그인 상태 유지"
              />
              <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={sendRequest}
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

export default LoginPage;