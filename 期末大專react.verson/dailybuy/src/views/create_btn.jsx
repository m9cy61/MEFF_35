import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "../public/css/createbtn.module.css";
import "../public/css/product.css";
function CreateBTN(prop) {
  const navigate = useNavigate();
  const [isCreate, setIsCreate] = useState(false);
  const [userId,setuserId]=useState("");
  useEffect(() => {
    if (prop) {
      setuserId(prop.userId);
    }
  }, [userId]);

  const CreateMouseETN = () => {
    setIsCreate(true);
  };

  let CreateMouseL = () => {
    setIsCreate(false);
  };

  if (!prop.userId ) {
    return (
      <button
        className={`${isCreate ? style.btn_create_active : style.btn_create}`}
        onMouseEnter={CreateMouseETN}
        onMouseLeave={CreateMouseL}
        onClick={()=>{navigate("/Login")}}
      >
        我要開新團
      </button>
    );
  } else {
    return (
      <button
        className={`${isCreate ? style.btn_create_active : style.btn_create}`}
        onMouseEnter={CreateMouseETN}
        onMouseLeave={CreateMouseL}
      >
        我要開新團
      </button>
    );
  }
}

export default CreateBTN;
