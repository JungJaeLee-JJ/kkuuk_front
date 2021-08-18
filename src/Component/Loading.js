import ReactLoading from 'react-loading'

export const Loader=()=>{
  return (
      <div className="container" style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh"
      }}>
        <ReactLoading type="spin" color="#000"/>
      </div>
  )
}