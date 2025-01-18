import { useContext } from "react";
import { assets } from "../../assets/assets";
import "./Main.css";
import { Context } from "../../context/Context";

const Main = () => {
  const { onSent, recentPrompt, result, loading, resultData, setInput, input } =
    useContext(Context);

    const handleKeyPress=(e)=>{
        if(e.key === 'Enter'){
            onSent();
        }
    }

  return (
    <div className="main">
      <nav className="nav">
        <p>Gemini-Clone</p>
        <img src={assets.user_icon} alt="" />
      </nav>
      <div className="main-container">
        {!result ? (
          <>
            <div className="greet">
              <p>
                <span>Hola, Amigo</span>
              </p>
              <p>Kaise ho? Thik ho?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Help me make some plans for Holidays</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card">
                <p>Lorem ipsum dolor sit, amet consecte</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card">
                <p>amet consectetur adipisicing elit. .</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card">
                <p>Fugit magni repellat error. Dolorum.</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loader">
                    <hr />
                    <hr />
                    <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a prompt here"
              onKeyDown={handleKeyPress}
            />
            <div>
                {/* To be added mic and image functionality in future */}
              {/* <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" /> */}
              <img onClick={() => onSent()} src={assets.send_icon} alt="" />
            </div>
          </div>
          <p className="bottom-info">
            Made by Aman khan :)) <br /> Powered by Google's Generative AI
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
