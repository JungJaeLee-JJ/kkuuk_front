import React, {createContext, useState} from 'react';

const defaultContext : ISellerContext = {
        sellerInfo: {username : undefined, email : undefined, ACCESS_TOKEN : "SESSION"},
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
    const [sellerInfo, setSellerInfo] = useState<ISellerInfo | undefined>({username : undefined, email : undefined, ACCESS_TOKEN : "SESSION"});
    const [sellerModal, setSellerModal] = useState<ISellerModal>({
        onoff : false,
        msg : "",
    })
    const sellerSet = () =>{

    }

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

