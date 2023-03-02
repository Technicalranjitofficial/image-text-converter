import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useState } from "react";
import Tesseract from "tesseract.js";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [img, setImg] = useState("");
  const [progress,setProgress] = useState(0);
  const [cp,setCp] = useState("Copy Text");
  const convert = () => {
    setLoading(true);
    Tesseract.recognize(
      `${img}`,
      "eng",
      { logger: (m) => {
        if(m.status ==="recognizing text"){
        setProgress(parseInt(m.progress*100))
        }
      }}
    ).then(({ data: { text } }) => {
      setText(text);
      setLoading(false);
    });
  };

 

  const resetAll=()=>{
    const imgs = document.getElementById("img");
    if(imgs){
      imgs.value ="";
    }
    setImg("");
    setProgress(0);
    setText("");

  }

  const copyText=()=>{
    navigator.clipboard.writeText(text);
    setCp("Copied!!");
    setTimeout(() => {
      setCp("Copy Text")
    }, 3000);

  }

  return (
    <>
      <div className="w-full min-h-screen bg-black/90">
        <div className="md:max-w-xl w-full mx-auto flex min-h-screen justify-center relative">
        
          <div className="flex justify-center border-2 border-cyan-800 shadow-lg rounded-md  items-center flex-col px-14 my-2">
           <div className="flex flex-col w-full justify-center items-center">
            <br />
          <img width={200} className="rounded-md border-2 border-cyan-700 z-50" height={200} src="https://ci5.googleusercontent.com/proxy/zVgsIgc750QxXCtzMaFvJUs3qXxr3ERLssf2WyyUIckzgtk_fxZF1-dwgJwhARDb2dnURZB1huT_JePOx57D5BoHTT7ImeaXVC0yqhCwQHOxkPR7U0Zt5B7su0p3CWMxK00ilKAzc8yCZupXcSQakRCwZF6UC2WnmQ=s0-d-e1-ft#https://user-images.githubusercontent.com/112815459/221346528-aad1c0e1-d207-4c0b-a971-0f5d1fc5d290.png" alt="" />
           
            <br />
            <span className=" text-cyan-500 text-center font-bold text-lg md:text-2xl">
              <h1>Image To Text Converter</h1>
            </span>
           </div>
            
            <br />
            {img && <img className="rounded-md " width={400} height={400} src={`${img}`} alt="" />}
            <br />
        
            <div className="flex flex-col w-full">
              {!loading && !text && <div>
                <input
              id = "img"
                className="block rounded-lg w-full text-green-500 border-2 file:bg-gradient-to-r file:text-white file:from-blue-600 file:to-amber-600 border-cyan-500"
                type="file"
                
                onChange={(e) => setImg(URL.createObjectURL(e.target.files[0]))}
              />
              <br />
              <p className="text-center font-bold text-slate-400">or</p>
             
              </div>
              } 
            
              {!loading && !text && ( <div><br /><input
              id = "img"
                className=" w-full py-1 pl-2 outline-none rounded-lg bg-transparent  text-green-500 border-2    border-cyan-500"
                type="text"
                placeholder="Enter image url.."
                onChange={(e) => setImg(e.target.value)}
              /></div> )}
             
              <br />
             {!loading && !text && <button onClick={convert} className="text-cyan-500 w-full rounded-md hover:text-green-600 hover:scale-105 duration-500 hover:border-green-400 font-bold border-2 border-cyan-500">
                Submit
              </button>} 
               {!loading && text && <button onClick={resetAll} className="text-cyan-500 rounded-md hover:text-green-600 hover:scale-105 duration-500 hover:border-green-400 font-bold border-2 border-cyan-500">
                Convert Next
              </button>}
              <br />
              {!loading && text && <button onClick={copyText} className="text-cyan-500 rounded-md hover:text-green-600 hover:scale-105 duration-500 hover:border-green-400 font-bold border-2 border-cyan-500">
                {cp}
              </button>}
              {loading && !text  && <p className="text-center text-white">Converting : {progress}%</p> }
            </div>
            <br />
            <br />
            {!loading && text && (
              <div className="">
                <div  className="bg-transparent w-full max-w-md border-2 hover:scale-110 duration-500 border-cyan-700 rounded-md text-cyan-600 focus:border-green-700 outline-none pl-2 hover:border-green-700">
                 <p className="duration-200 w-full ease-linear">{text}</p>
                </div>
                <br />
              </div>
              
            )}
          
          <p  className="text-slate-300">Made with 💖 by <a href="https://github.com/Technicalranjitofficial"><span className="text-cyan-500 font-bold">Ranjit Das</span></a> </p>
          <br />
               
          </div>


        </div>
      </div>
    </>
  );
}
