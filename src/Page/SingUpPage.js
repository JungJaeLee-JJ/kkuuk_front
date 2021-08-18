import {useEffect, useState} from "react";
import {Button, TextField} from "@material-ui/core";
import {goHomePage, goLoginPage, goSignUpPage} from "../Component/MovePage";
import {
  callFormat,
  validateEmail,
  validatePassword
} from "../Component/Validation";
import {sendPOSTRequest} from "../API/ApiRequest";
import {getDuplicateUrl, getSignupUrl} from "../API/ApiUrl";
import {Alert, ConfirmAlert} from "../Component/ConfirmAlert";
import {Loader} from "../Component/Loading";
import {
  setDataAtLocalStorage,
  setDataAtSessionStorage
} from "../Component/Storage";

function SingUpPage({history}) {


  const [isLoading, setIsLoading] = useState(false);
  const [inputData, setInputData] = useState({
    email: "",
    name: "",
    call: "",
    password: "",
    rePassword: "",
  });

  const [callForShow, setCallForShow] = useState("");


  const inputHandler = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    })
  }

  useEffect(() => {
    setDataAtSessionStorage('token', null);
    setDataAtLocalStorage('token', null);
  }, []);

  useEffect(() => {
   setCallForShow(callFormat(inputData.call))
  }, [inputData]);


  const duplicateHandler = async () => {
    setIsLoading(true);
    const body = {email:inputData.email};
    const ret = await sendPOSTRequest(getDuplicateUrl(),body);
    if(ret==null){
      Alert("서버 오류", "일시적인 서버 오류입니다. 문제가 지속된다면 관리자에게 문의하십시오.")
    }
    else if(ret['isDuplicated']){
      Alert("중복확인", "중복된 이메일이 존재합니다.")
      setInputData({
        ...inputData,
        email: "",
      })
    }else{
      Alert("중복확인", "사용 가능한 이메일 입니다.")
    }
    setIsLoading(false);
  }

  const requestHandler = async () => {
    if(!validateEmail(inputData.email)){
      Alert("입력 오류","이메일이 올바르지 않습니다.")
      return;
    }
    if(!validatePassword(inputData.password)){
      Alert("입력 오류","비밀번호 양식이 올바르지 않습니다.")
      return;
    }
    if(!(inputData.password===inputData.rePassword)){
      Alert("입력 오류","비밀번호가 일치하지 않습니다.")
      return;
    }
    if(inputData.call==="" || inputData.name===""){
      Alert("입력 오류","빈칸이 존재합니다.")
      return;
    }
    setIsLoading(true);
    const body = {
      email:inputData.email,
      password:inputData.password,
      call:inputData.call,
      name:inputData.name
    }
    const ret = await sendPOSTRequest(getSignupUrl(),body);
    setIsLoading(false);
    if(ret===null){
      Alert("회원 가입","회원 가입에 실패하였습니다.");
    }else{
      Alert("회원 가입","회원 가입이 완료되었습니다.");
      goLoginPage(history);
    }
  }

  if(isLoading){
    return (<Loader/>)
  }

  return (
      <div>
        {/*Navigation*/}
        <nav className="navbar navbar-expand-lg navbar-light mainBackColor">
          <div className="container px-4 px-lg-5 mainBackColor">
            <a className="navbar-brand" onClick={goHomePage}>꾸욱</a>
            <button className="navbar-toggler" type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation"><span
                className="navbar-toggler-icon"></span></button>
            <div className="collapse navbar-collapse"
                 id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                <li className="nav-item"><a className="nav-link active"
                                            aria-current="page"
                                            onClick={()=>goSignUpPage(history)}>회원가입</a>
                </li>
                <li className="nav-item"><a className="nav-link"
                                            onClick={()=>goLoginPage(history)}>로그인</a></li>
              </ul>
              <form className="d-flex">
                <button className="btn btn-outline-light" type="submit">
                  문의하기
                </button>
              </form>
            </div>
          </div>
        </nav>
        {/*Section*/}
        <section className="py-5">
          <div className="container px-4 px-lg-5 mt-5">
            <div
                className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">

              <div style={{width: "100%", maxWidth: "800px"}}>
                <div id="subColor">E-mail</div>
                <div style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center"
                }}>
                  <TextField
                      error={inputData.email!=="" && !validateEmail(inputData.email)}
                      helperText= {(inputData.email!=="" && !validateEmail(inputData.email))?"올바른 이메일 형식이 아닙니다.":null}
                      className="inputText"
                      variant="outlined"
                      margin="none"
                      required
                      fullWidth
                      autoFocus
                      size="small"
                      name="email"
                      value={inputData.email}
                      onChange={inputHandler}
                  />
                  <Button
                      className="CustomButton"
                      style={{marginLeft: "5%", height:"43px"}}
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={duplicateHandler}
                  >중복검사</Button>
                </div>
              </div>
              <div style={{width: "100%", maxWidth: "800px", marginTop:"20px"}}>
                <div id="subColor">전화번호</div>
                <TextField
                    className="inputText"
                    variant="outlined"
                    margin="none"
                    required
                    fullWidth
                    autoFocus
                    size="small"
                    name="call"
                    value={callForShow}
                    onChange={inputHandler}
                />
              </div>
              <div style={{width: "100%", maxWidth: "800px", marginTop:"20px"}}>
                <div id="subColor">가게명</div>
                <TextField
                    className="inputText"
                    variant="outlined"
                    margin="none"
                    required
                    fullWidth
                    autoFocus
                    size="small"
                    name="name"
                    value={inputData.name}
                    onChange={inputHandler}
                />
              </div>
              <div style={{width: "100%", maxWidth: "800px", marginTop:"20px"}}>
                <div id="subColor">비밀번호</div>
                <TextField
                    error={inputData.password!==""&&!validatePassword(inputData.password)}
                    helperText= {(inputData.password!==""&&!validatePassword(inputData.password))?"8글자 이상, 숫자 및 특수문자 포함":null}
                    className="inputText"
                    variant="outlined"
                    margin="none"
                    required
                    fullWidth
                    autoFocus
                    type="password"
                    size="small"
                    name="password"
                    value={inputData.password}
                    onChange={inputHandler}
                />
              </div>

              <div style={{width: "100%", maxWidth: "800px", marginTop:"20px"}}>
                <div id="subColor">비밀번호 확인</div>
                <TextField
                    error={inputData.rePassword!==""&&inputData.password!==inputData.rePassword}
                    helperText= {(inputData.rePassword!==""&&inputData.password!==inputData.rePassword)?"비밀번호가 일치하지 않습니다.":null}
                    className="inputText"
                    variant="outlined"
                    margin="none"
                    required
                    fullWidth
                    autoFocus
                    type="password"
                    size="small"
                    name="rePassword"
                    value={inputData.rePassword}
                    onChange={inputHandler}
                />
              </div>

              <Button
                  className="CustomButton"
                  style={{width: "95%", maxWidth: "750px", marginTop:"20px",marginLeft:"calc(var(--bs-gutter-x) * .5)",marginRight:"calc(var(--bs-gutter-x) * .5)"}}
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={()=>{ConfirmAlert("회원가입","회원 가입을 신청하시겠습니까?",requestHandler,()=>{})}}
              >회원가입</Button>
            </div>
          </div>
        </section>
      </div>
  )

}

export default SingUpPage;