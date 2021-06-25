import React from "react";
import { useHistory } from "react-router";


function NotFound(){
    let history = useHistory();
    return(
        <div>
            <h1>Not Found 404</h1>
            <button onClick={()=>{
                history.replace("/");
            }}
            >로그인 화면으로</button>
        </div>
    );
}

export default NotFound;