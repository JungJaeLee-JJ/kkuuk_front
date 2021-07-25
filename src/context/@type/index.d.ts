interface ISellerInfo {
    username : string | undefined;
    email : string | undefined;
    
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