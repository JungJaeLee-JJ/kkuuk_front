import {useEffect, useState} from "react";
import {
  setDataAtLocalStorage,
  setDataAtSessionStorage
} from "../Component/Storage";
import {
  goHistoryPage,
  goLoginPage,
  goMainPage,
  goSignUpPage
} from "../Component/MovePage";
import getUserInfo from "../Component/Session";
import {Loader} from "../Component/Loading";
import {
  Button,
  Table, TableBody, TableCell,
  TableContainer,
  TableHead,
  TextField
} from "@material-ui/core";
import {validateEmail, validatePassword} from "../Component/Validation";
import {Alert, ConfirmAlert, StampUseAlert} from "../Component/ConfirmAlert";
import {sendPOSTRequest} from "../API/ApiRequest";
import { DataGrid } from '@material-ui/data-grid';
import {
  getClientsByDigitUrl,
  getClientsByNameUrl,
  getClientUrl, getStampUrl
} from "../API/ApiUrl";
import TableRow from "@material-ui/core/TableRow";

function MainPage({history}) {

  const [isLoading, setIsLoading] = useState(false);
  const [storeInfo, setStoreInfo] = useState(null);
  const [clientInfo, setClientInfo] = useState({username: "", last4digit: ""});
  const [searchInfo, setSearchInfo] = useState({username: "", last4digit: ""});
  const [searchList, setSearchList] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [checkIdx, setCheckIdx] = useState(null);
  const [checkList, setCheckList] = useState([]);
  const [useQuantity, setUseQuantity] = useState(10);
  const [getQuantity, setGetQuantity] = useState(1);

  useEffect(async () => {
    setIsLoading(true);
    const ret = await getUserInfo();
    if (ret == null) {
      alert("로그인 시간이 만료되었습니다.");
      setDataAtSessionStorage('token', null);
      goLoginPage(history)
      return
    }
    setStoreInfo(ret);
    setIsLoading(false);
  }, []);

  const inputHandler = (e) => {
    setClientInfo({
      ...clientInfo,
      [e.target.name]: e.target.value,
    })
  }

  const inputOnlyNumberHandler = (e) => {
    const onlyNumber = e.target.value.replace(/[^0-9]/g, '')
    setClientInfo({
      ...clientInfo,
      [e.target.name]: onlyNumber,
    })
  }

  const inputHandlerForSearch = (e) => {
    setSearchInfo({
      ...searchInfo,
      [e.target.name]: e.target.value,
    })
  }

  const inputOnlyNumberHandlerForSearch = (e) => {
    const onlyNumber = e.target.value.replace(/[^0-9]/g, '')
    setSearchInfo({
      ...searchInfo,
      [e.target.name]: onlyNumber,
    })
  }

  const sendEnrollRequest = async () => {
    if (clientInfo.username === "" || clientInfo.last4digit.length !== 4) {
      Alert("입력 오류", "누락되거나 부적절한 입력이 존재합니다.")
      return;
    }
    const body = {
      storeId: storeInfo.id,
      username: clientInfo.username,
      last4digit: clientInfo.last4digit
    }
    console.log(body)
    const ret = await sendPOSTRequest(getClientUrl(), body);
    if (ret === null) {
      Alert("등록 오류", "등록에 실패하였습니다.")
    } else {
      Alert("등록 완료", ret.msg)
    }
    setClientInfo({username: "", last4digit: ""})
  }

  const sendSearchByNameRequest = async () => {
    setSearchList([]);
    setCheckList([]);
    const body = {
      storeId: storeInfo.id,
      username: searchInfo.username,
    }
    const ret = await sendPOSTRequest(getClientsByNameUrl(), body);
    console.log(ret);
    if (ret !== null) {
      setCheckList(ret.infos.map(each=>{
        return false;
      }))
      setSearchList(ret.infos);
    }
    setSearchInfo({username: "", last4digit: ""})
    setIsChecked(false);
  }

  const sendSearchByDigitRequest = async () => {
    setSearchList([]);
    setCheckList([]);
    const body = {
      storeId: storeInfo.id,
      last4digit: searchInfo.last4digit,
    }
    const ret = await sendPOSTRequest(getClientsByDigitUrl(), body);
    console.log(ret);
    if (ret !== null) {
      setCheckList(ret.infos.map(each=>{
        return false;
      }))
      setSearchList(ret.infos);
    }
    setSearchInfo({username: "", last4digit: ""})
    setIsChecked(false);
  }

 const checkHandler=(index)=>{
    if(checkList[index]){
      const list = JSON.parse(JSON.stringify(checkList));
      list[index] = false;
      setCheckList(list)
      setIsChecked(false);
    }else{
      const list = JSON.parse(JSON.stringify(checkList));
      list[index] = true;
      setCheckList(list)
      setCheckIdx(index);
      setIsChecked(true);
    }
  }

  const sendStampRequest = async (id,index,val,message)=>{
    const body = {
      clientId : id,
      val : val
    }
    const ret = await sendPOSTRequest(getStampUrl(),body);
    if(ret!==null){
      Alert(message,ret.msg);
      searchList[index].stamp = (Number(searchList[index].stamp) + Number(val)).toString();
    }
    setCheckList(searchList.map(each=>{
      return false;
    }))
    setIsChecked(false);
    setGetQuantity(1);
    setUseQuantity(10);
  }

  if (isLoading) {
    return (<Loader/>)
  }

  return (
      <div>
        {/*Navigation*/}
        <nav className="navbar navbar-expand-lg navbar-light mainBackColor">
          <div className="container px-4 px-lg-5 mainBackColor">
            <a className="navbar-brand" onClick={goMainPage}>꾸욱</a>
            <button className="navbar-toggler" type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation"><span
                className="navbar-toggler-icon"></span></button>
            <div className="collapse navbar-collapse"
                 id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                {/*<li className="nav-item"><a className="nav-link active"*/}
                {/*                            aria-current="page"*/}
                {/*                            onClick={() => goMainPage(*/}
                {/*                                history)}>홈</a>*/}
                {/*</li>*/}
                {/*<li className="nav-item"><a className="nav-link"*/}
                {/*                            onClick={() => goHistoryPage(*/}
                {/*                                history)}>적립내역</a></li>*/}
              </ul>
              <form className="d-flex">
                <button className="btn btn-outline-light" type="submit" onClick={()=>{
                  setDataAtSessionStorage('token', null);
                  setDataAtLocalStorage('token', null);
                  goLoginPage(history)
                }}>
                  로그아웃
                </button>
              </form>
            </div>
          </div>
        </nav>
        {/*Section*/}
        <section className="py-5">
          <div className="container px-4 px-lg-5 ">
            <div
                className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4">
              <div id="title" style={{
                borderBottom: "1px solid #ff7473",
                padding: "inherit",
                fontSize: "30px",
                width: "100%"
              }}>고객 등록
              </div>
              <div
                  style={{width: "100%", maxWidth: "400px"}}>
                <div style={{width: "100%", marginTop: "20px"}}>
                  <div id="subColor">고객명</div>
                  <TextField
                      className="inputText"
                      variant="outlined"
                      margin="none"
                      required
                      fullWidth
                      autoFocus
                      size="small"
                      name="username"
                      value={clientInfo.name}
                      onChange={inputHandler}
                  />
                </div>
                <div style={{width: "100%", marginTop: "20px"}}>
                  <div id="subColor">전화번호 끝 4자리</div>
                  <TextField
                      className="inputText"
                      variant="outlined"
                      margin="none"
                      required
                      fullWidth
                      autoFocus
                      size="small"
                      name="last4digit"
                      value={clientInfo.last4digit}
                      onChange={inputOnlyNumberHandler}
                  />
                </div>
                <div style={{width: "100%", marginTop: "20px"}}>
                  <Button
                      className="CustomButton"
                      style={{height: "43px"}}
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        ConfirmAlert("고객 등록", "등록하시겠습니까?", sendEnrollRequest,
                            () => {
                            })
                      }}
                  >등록</Button>
                </div>
              </div>
              <div id="title" style={{
                borderBottom: "1px solid #ff7473",
                padding: "inherit",
                fontSize: "30px",
                width: "100%",
                marginTop: "40px"
              }}>쿠폰 적립 및 사용
              </div>
              <div style={{width: "100%", maxWidth: "400px"}}>
                <div style={{marginTop: "20px"}}>
                  <div id="subColor">고객명</div>
                  <div style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center"
                  }}>
                    <TextField
                        className="inputText"
                        variant="outlined"
                        margin="none"
                        required
                        fullWidth
                        autoFocus
                        size="small"
                        name="username"
                        value={searchInfo.username}
                        onChange={inputHandlerForSearch}
                    />
                    <Button
                        className="CustomButton"
                        style={{height: "43px", marginLeft: "20px"}}
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={sendSearchByNameRequest}
                    >조회</Button>
                  </div>
                  <div style={{marginTop: "20px"}}>
                    <div id="subColor">전화번호(끝4자리)</div>
                    <div style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center"
                    }}>
                      <TextField
                          className="inputText"
                          variant="outlined"
                          margin="none"
                          required
                          fullWidth
                          autoFocus
                          size="small"
                          name="last4digit"
                          value={searchInfo.last4digit}
                          onChange={inputOnlyNumberHandlerForSearch}
                      />
                      <Button
                          className="CustomButton"
                          style={{height: "43px", marginLeft: "20px"}}
                          fullWidth
                          variant="contained"
                          color="primary"
                          onClick={sendSearchByDigitRequest}
                      >조회</Button>
                    </div>
                  </div>
                  {searchList.length > 0 ?
                      <TableContainer style={{marginTop:"20px"}}>
                        <Table>
                          <TableHead>
                            <TableRow style={{backgroundColor:"#FF7473"}}>
                              <TableCell style={{color:"white",fontWeight:"bolder"}} align="center"></TableCell>
                              <TableCell style={{color:"white",fontWeight:"bolder"}} align="center">고객명</TableCell>
                              <TableCell style={{color:"white",fontWeight:"bolder"}} align="center">전화번호</TableCell>
                              <TableCell style={{color:"white",fontWeight:"bolder"}} align="center">쿠폰갯수</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {searchList && searchList.map((row, index) => (
                                <TableRow key={row.index}>
                                  <TableCell component="th" scope="row"
                                                   align="left">
                                    {isChecked && checkIdx!==index ?<></> :
                                        <input style={{width: "20px", height: "20px"}}
                                               checked={checkList[index]}
                                               onChange={()=>{checkHandler(index)}}
                                               type="checkbox"/>
                                    }
                                  </TableCell>
                                  <TableCell align="center">{row.name}</TableCell>
                                  <TableCell align="center">{row.last4digit}</TableCell>
                                  <TableCell align="center">{row.stamp}</TableCell>
                                </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                      : <></>}
                  <div style={{
                    width: "100%",
                    display: "flex",
                    marginTop: "20px"
                  }}>
                    <div style={{width: "100%", display: "flex"}}>
                      <input className="form-control text-center me-3"
                             id="inputQuantity" type="number" onChange={(e) => {
                        setGetQuantity(e.target.value);
                      }} value={getQuantity}
                             style={{flexGrow: "1"}}/>
                      <Button
                          className="CustomButton"
                          style={{height: "43px", marginLeft: "5px"}}
                          fullWidth
                          variant="contained"
                          color="primary"
                          onClick={()=>{StampUseAlert("쿠폰 적립",searchList[checkIdx].name,getQuantity,()=>{
                            sendStampRequest(searchList[checkIdx].id,checkIdx,getQuantity,"쿠폰 적립이 완료되었습니다.")
                          })}}
                      >적립</Button>
                    </div>
                    <div style={{
                      width: "100%",
                      display: "flex",
                      marginLeft: "40px"
                    }}>
                      <input className="form-control text-center me-3"
                             id="inputQuantity" type="number" onChange={(e) => {
                        setUseQuantity(e.target.value);
                      }} value={useQuantity}
                             style={{flexGrow: "1"}}/>
                      <Button
                          className="CustomButton"
                          style={{height: "43px", marginLeft: "5px"}}
                          fullWidth
                          variant="contained"
                          color="primary"
                          onClick={()=>{StampUseAlert("쿠폰 사용",searchList[checkIdx].name,useQuantity,()=>{
                            sendStampRequest(searchList[checkIdx].id,checkIdx,useQuantity,"쿠폰 사용이 완료되었습니다.")
                          })}}
                      >사용</Button>
                    </div>
                  </div>
                </div>


              </div>
            </div>
          </div>
        </section>
      </div>
  )
}

export default MainPage;