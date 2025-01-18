import { useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Sidebar = () => {
  const [toggle, setToggle] = useState(false);
  const { onSent, previousPrompts, setRecentPrompt, newChat } = useContext(Context);

  const loadPrompt = async(prompt) =>{
    setRecentPrompt(prompt)
    await onSent(prompt)
  }

  return (
    <div className="Sidebar">
      <div className="top">
        <img
          onClick={() => setToggle((prev) => !prev)}
          className="menu"
          src={assets.menu_icon}
          alt=""
        />
        <div onClick={()=>newChat()} className="new-chat">
          <img src={assets.plus_icon} alt="" />
          {toggle ? <p>New Chat</p> : null}
        </div>
        {toggle ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {previousPrompts.map((item) => {
              return (
                <>
                  <div onClick={()=> loadPrompt(item)} className="recent-entry">
                    <img src={assets.message_icon} alt="" />
                    <p>{item.slice(0,18)}...</p>
                  </div>
                </>
              );
            })}
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {toggle ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {toggle ? <p>History</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {toggle ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
