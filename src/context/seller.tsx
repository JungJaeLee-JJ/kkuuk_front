import React, {createContext, useState,useEffect} from 'react';
import {uri} from '../api/config';
import axios from 'axios';
const defaultContext : ISellerContext = {
        sellerInfo: {username : undefined, email : undefined},
        setSellerInfo : undefined,
        sellerModal : {onoff : false, msg : ""},
        setSellerModal : undefined,
        sellerSet:()=>{},
}


const SellerContext = createContext(defaultContext);

interface Props{
    children : JSX.Element | Array<JSX.Element>;
}

const SellerContextProvider = ({children}:Props) => {
    const [sellerInfo, setSellerInfo] = useState<ISellerInfo | undefined>({
        username : undefined, 
        email : undefined
    });
    const [sellerModal, setSellerModal] = useState<ISellerModal>({
        onoff : false,
        msg : "",
    })
    const sellerSet = () =>{

    }
    const sessionGet =  async()=>{
        if(sessionStorage.length!==0){
          let sessionToken = sessionStorage.getItem('Token');
          axios.defaults.headers.common['Authorization'] = `Bearer ${sessionToken}`;
          try{
            const res = await axios.get(`${uri}`);
            console.log("session" + res);
          }catch(e){
              console.log(e);
          }
          
        }
      }
      useEffect(()=>{
        sessionGet();
    },[])

    return <SellerContext.Provider
        value = {{
            sellerInfo,
            setSellerInfo,
            sellerModal,
            setSellerModal,
            sellerSet
        }}
    >
        {children}
    </SellerContext.Provider>
}

export {SellerContextProvider,SellerContext};

