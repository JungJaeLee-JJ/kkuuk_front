import { isPending } from 'q';
import React, {createContext, useState} from 'react';
import { useHistory } from 'react-router-dom';
import {logIn} from '../api/api.js';

const defaultContext : ISellerContext = {
        sellerInfo: undefined,
        setSellerInfo : undefined,
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


    const logout = () =>{

    }

    const sellerSet = () =>{

    }

    return <SellerContext.Provider
        value = {{
            sellerInfo,
            setSellerInfo,
            sellerSet
        }}
    >
        {children}
    </SellerContext.Provider>
}

export {SellerContextProvider,SellerContext};

