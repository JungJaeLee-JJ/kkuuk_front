
const serverUrl = "http://localhost:8080";

const getUrl=(mainUrl,subUrl)=>{
  return `${mainUrl}/${subUrl}`
}

const getUrlWithPathParam=(mainUrl,subUrl,param)=>{
  return `${mainUrl}/${subUrl}/${param}`
}

const loginUrl = "login";
const signupUrl = "signup";
const duplicateUrl = "duplicate";
const infoUrl = "info";
const clientUrl = "client";
const clientsByDigitUrl = "clientsByDigit"
const clientsByNameUrl = "clientsByName"
const stampUrl = "stamp"

export const getLoginUrl = () =>{
  return getUrl(serverUrl,loginUrl);
}

export const getSignupUrl = () =>{
  return getUrl(serverUrl,signupUrl);
}

export const getDuplicateUrl = () =>{
  return getUrl(serverUrl,duplicateUrl);
}

export const getInfoUrl = () =>{
  return getUrl(serverUrl,infoUrl);
}

export const getClientUrl = () =>{
  return getUrl(serverUrl,clientUrl);
}

export const getClientsByDigitUrl = ()=>{
  return getUrl(serverUrl,clientsByDigitUrl);
}

export const getClientsByNameUrl = ()=>{
  return getUrl(serverUrl,clientsByNameUrl);
}

export const getStampUrl = ()=>{
  return getUrl(serverUrl,stampUrl);
}
