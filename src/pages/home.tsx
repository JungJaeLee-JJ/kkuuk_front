import React from 'react';

import {Link, Redirect} from "react-router-dom";

type HomeProps = {

}

function Home({}:HomeProps){

return(

<section className="container">

<Link to="/signup">업체등록</Link>

<Link to="/login">로그인</Link>

</section>

)

}

export default Home;