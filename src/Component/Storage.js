export const setDataAtSessionStorage = (key, value)=>{
  sessionStorage.setItem(key,value);
}

export const getDataAtSessionStorage = (key)=>{
  return sessionStorage.getItem(key)
}

export const setDataAtLocalStorage = (key, value)=>{
  localStorage.setItem(key,value);
}

export const getDataAtLocalStorage = (key)=>{
  return localStorage.getItem(key)
}