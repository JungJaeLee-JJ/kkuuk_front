interface ISellerInfo {
    username : string;
    email : string;
    picture : string;
    
}

interface ISellerContext{
    sellerInfo : ISellerInfo | undefined;
    setSellerInfo : sellerInfo;
    sellerSet : ()=>void;

}