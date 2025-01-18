import { createContext, useState } from "react";
import runChat from "../config/gemini";
export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState(""); // to process the input
  const [recentPrompt, setRecentPrompt] = useState(""); // to store the recent prompt
  const [previousPrompts, setPreviousPrompts] = useState([]); // to store previous prompts and show as recent chat
  const [result, setResult] = useState(false); // to show  the result
  const [loading, setLoading] = useState(false); // to show loading screen before result
  const [resultData, setResultData] = useState(""); // to store the result data

  const delayedPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const newChat = ()=>{
    setLoading(false);
    setResult(false);
  }

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setResult(true);
    let response;
    if(prompt !== undefined){
        response=await runChat(prompt);
        setRecentPrompt(prompt);
    }else{
        setPreviousPrompts(prev =>[...prev, input])
        setRecentPrompt(input)
        response=await runChat(input);
    }
    
    let responseArray = response.split("**");
    let newArray="";
    console.log(responseArray);
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newArray += responseArray[i];
      } else {
        newArray += "<b>" + responseArray[i] + "</b>";
      }
    }
    let newArray2 = newArray.split("\n\n" || "* **").join("</br>");
    let newResponseArray = newArray2.split(" ");
    for(let i=0; i<newResponseArray.length; i++){
        const nextWord = newResponseArray[i] ;
        delayedPara(i, nextWord+" ");
    }
    // setResultData(newArray2);
    setLoading(false);
    setInput("");
  };

  const contextValue = {
    previousPrompts,
    setPreviousPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    result,
    loading,
    resultData,
    input,
    setInput,
    newChat
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
