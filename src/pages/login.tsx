import React,{useState,useEffect,useContext} from "react";
import { useHistory,Link } from "react-router-dom";

import {logIn} from "../api/api";
import {SellerContext} from "../context/seller";


import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Copyright from '../components/copyright.js';



type loginProps = {

    email : string,

    password : string

};

function Login({}:loginProps){
    const {sellerInfo,setSellerInfo} = useContext<ISellerContext>(SellerContext);
    let history = useHistory();
    let f = new FormData();
    const [member,setMember] = useState<loginProps>({

        email : "",

        password : "",

    });

    useEffect(()=>{
        const ls = localStorage.getItem("Email");
        if(ls!==null){
            history.replace("/main");
        }
    },[])

    const loginHandler = (e:React.ChangeEvent<HTMLInputElement>)=>{

        setMember({

        ...member,

        [e.target.name] : e.target.value,

        })

    }

    const onSubmitAccount = async ()=>{
        try{
            const seller = await logIn(f,sellerInfo?.ACCESS_TOKEN);
            setSellerInfo({
                 username : seller.username,
                 email : seller.email,
            });
            history.replace("/main");
        }catch(e){
           window.alert(e);
        }
    }
    const checkInputs = () => {
        let a = member.email.length >=1;
        let b = member.password.length >=7;
        f.append('email',member.email);
        f.append('password',member.password);
        return (a&&b);
    }
    //
    const checkvalid = ()=>{
        setSellerInfo({
            ...sellerInfo,
            ACCESS_TOKEN : "LOCAL"
        })
    }

    //style
    const useStyles = makeStyles((theme) => ({
        paper: {
          marginTop: theme.spacing(20),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          border : '5pt groove #3f51b5',
          height : 'auto',

        },
        subpapar : {
            display : 'flex',
            flexDirection : 'row',
            alignItems : 'center',
            justifyContent : 'space-between',
            height : '90%',
        },
        backimgpaper : {

        },
        backpaper : {
            display : 'flex',
            borderRadius : '20px',
            //backgroundColor : '#707070',
            position : 'relative',
            width : '60%',
        },
        loginbox : {
            display:'flex',
            //position : 'absolute',
            marginRight: theme.spacing(5),
            justifyContent : 'center',

        },
        kkuukbox : {
            display : 'flex',
            marginRight : theme.spacing(10),
        },
        avatar: {
          margin: theme.spacing(1),
          backgroundColor: theme.palette.secondary.main,
        },
        form: {
          width: '70%',
          marginTop: theme.spacing(1),
        },
        submit: {
          margin: theme.spacing(3, 0, 2),
        },
      }));
      const classes = useStyles();


    return(

    <>
    {/* <Container component="main" maxWidth="lg"> */}
        <CssBaseline/>
        <div className={classes.paper}> 
            <div className={classes.subpapar}>
                <div className={classes.backpaper}>  
                <div className={classes.loginbox} >
                    <form className={classes.form} noValidate>
                        <Typography component="h1" variant="h5">
                            로그인
                        </Typography>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            value={member.email}
                            autoComplete="email"
                            onChange={loginHandler}
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            value={member.password}
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={loginHandler}
                        />
                        <FormControlLabel
                            control={<Checkbox id="remember" value="remember" color="primary" onClick={checkvalid} />}
                            label="로그인 상태 유지"
                        />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={()=>{
                            if(checkInputs()){
                                onSubmitAccount();
                            }else{
                                //alert("아이디 혹은 비밀번호를 확인 해주세요");
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
                                <Link to="/signup">
                                {"회원가입"}
                                </Link>
                            </p>
                            
                        </Grid>
                    </Grid>
                </form>
            </div>
            </div> 
            <div className={classes.kkuukbox}>
            <Typography component="h1" variant="h5">
                간편한 쿠폰 적립 <br/> 꾸욱
            </Typography>
            </div>
            </div>
        </div>
        <Box mt={8}>
            <Copyright />
        </Box>
     {/* </Container> */}

    </>

    );

}

export default Login;