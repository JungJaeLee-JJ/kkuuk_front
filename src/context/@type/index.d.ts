interface ISellerInfo {
    username : string;
    email : string;
    ACCESS_TOKEN : string;
    
}
interface ISellerModal{
    onoff : boolean;
    msg : string;
}

interface ISellerContext{
    sellerInfo : ISellerInfo | undefined;
    setSellerInfo : sellerInfo;
    sellerModal : ISellerModal;
    setSellerModal : sellerModal;
    sellerSet : ()=>void;

}