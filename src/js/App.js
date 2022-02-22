import React from "react";
const { api } = window;
import { useState } from "react";
export default function App() {
  const [ee,setBoolean] = useState("gnrghrlg")
  
  function execute() {
    api.send("install");
  }
  function received() {
    setBoolean("yes")
  }
  api.recieve('cabt',()=>{
    received()
   
  })
  return( <>
   <button onClick={execute}>{ee}</button>
  </>)
}