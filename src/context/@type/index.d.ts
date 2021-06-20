interface ISellerInfo {
    username : string;
    email : string;
    ACCESS_TOKEN : string;
    
}

interface ISellerContext{
    sellerInfo : ISellerInfo | undefined;
    setSellerInfo : sellerInfo;
    sellerSet : ()=>void;

}