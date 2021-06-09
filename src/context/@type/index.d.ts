interface ISellerInfo {
    username : string;
    email : string;
    picture : string;
    
}

interface ISellerContext{
    sellerInfo : ISellerInfo | undefined;
    login : (email : string, password : string)=>void;
    logout : ()=>void;
    sellerSet : ()=>void;

}