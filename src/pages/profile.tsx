import React from "react";

type sellerProps = {
    email : string,
    name : string,
    callNum : string,
}


function Profile({}:sellerProps){
    return (
        <>
        <h1>profile</h1>
        <dt>E-mail</dt>
        <dd>{}</dd>
        </>
    )
}

export default Profile;