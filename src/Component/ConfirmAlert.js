import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


export const ConfirmAlert=(title, message,yesFunc,noFunc)=>{
  confirmAlert({
    title: title,
    message: message,
    buttons: [
      {
        label: '확인',
        onClick: yesFunc
      },
      {
        label: '취소',
        onClick: noFunc
      }
    ]
  });
}

export function Alert(title, message){
  confirmAlert({
    customUI: ({ onClose }) => {
      return (
          <div className='customAlert'>
            <h1>{title}</h1>
            <p>{message}</p>
            <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
              <button className='customButton' onClick={onClose}>확인</button>
            </div>
          </div>
      );
    }
  });
}

export function StampGetAlert(title, name, val, onSuccess){
  confirmAlert({
    customUI: ({ onClose }) => {
      return (
          <div className='customAlert'>
            <h1>{title}</h1>
            <p>고객명 : {name}</p>
            <p>적립 수량 : {val}</p>
            <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
              <button className='customButton' onClick={onSuccess}>확인</button>
              <button className='customButton' onClick={onClose}>취소</button>
            </div>
          </div>
      );
    }
  });
}


export function StampUseAlert(title, name, val, onSuccess){
  confirmAlert({
    customUI: ({ onClose }) => {
      return (
          <div className='customAlert'>
            <h1>{title}</h1>
            <p>고객명 : {name}</p>
            <p>사용 수량 : {val}</p>
            <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
              <button className='customButton' onClick={onSuccess}>확인</button>
              <button className='customButton' onClick={onClose}>취소</button>
            </div>
          </div>
      );
    }
  });
}