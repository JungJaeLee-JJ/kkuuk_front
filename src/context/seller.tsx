import { isPending } from 'q';
import React, {createContext, useState} from 'react';
import { useHistory } from 'react-router-dom';
import {logIn} from '../api/api.js';

const defaultContext : ISellerContext = {
        sellerInfo: undefined,
        login:()=>{},
        logout:()=>{},
        sellerSet:()=>{},
}

// declare namespace JSX {
//     interface IntrinsicElements{
//         sellerProvider : any;
//     }
// }

const SellerContext = createContext(defaultContext);

interface Props{
    children : JSX.Element | Array<JSX.Element>;
}

const SellerContextProvider = ({children}:Props) => {
    const [sellerInfo, setSellerInfo] = useState<ISellerInfo | undefined>(undefined);
    const login = (email : string, password : string) =>{
        logIn({
            email : email,
            password : password,
        }).then((res)=>{
                setSellerInfo({
                    username : "김갑생할머니김",
                    email : res.email,
                    picture : "",
                });
        })
    }

    const logout = () =>{

    }

    const sellerSet = () =>{

    }

    return <SellerContext.Provider
        value = {{
            sellerInfo,
            login,
            logout,
            sellerSet
        }}
    >
        {children}
    </SellerContext.Provider>
}

export {SellerContextProvider,SellerContext};

