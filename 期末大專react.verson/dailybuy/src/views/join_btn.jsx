// import React from "react";
import React, { useState,useEffect } from "react";
import styles from "../public/css/joinbtn.module.css";
import "../public/css/product.css";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function JoinBTN(prop) {
  const navigate = useNavigate();
  var [productId,setproductId] = useState(prop.productId);
  var {userId ,Product}=prop;
  var [Pdname,setPdname] = useState('');
  var [Price,setPrice] = useState(0);
  var [isJoin, setIsJoin] = useState(false);

  const handleJoinMouse = () => {
    setIsJoin(true);
  console.log(userId);
  };

  let handleLeaveMouse = () => {
    setIsJoin(false);
  };
  const JoinGroup = () => {
    setPdname(prop.Pdname);
    setPrice(prop.Price);
    navigate("/agreement", {
      state: {
        productId: prop.productId,
        userId: prop.userId,
        Price: prop.Price,
        Pdname: prop.Pdname,
      },
    });
  };
  if(!userId){
    return (
      <button
        className={`${isJoin ? styles.btn_join_active : styles.btn_join}`}
        onMouseEnter={handleJoinMouse}
        onMouseLeave={handleLeaveMouse}
        onClick={()=>{navigate("/Login")}}
      >
        我要加團
      </button>
    );
  }
  else{
    return (
      <button
        className={`${isJoin ? styles.btn_join_active : styles.btn_join}`}
        onMouseEnter={handleJoinMouse}
        onMouseLeave={handleLeaveMouse}
        onClick={JoinGroup}
      >
        我要加團
      </button>
    );
  }
  
}

export default JoinBTN;
//  <button
//         className={`${isJoin ? styles.btn_join_active : styles.btn_join}`}
//         onMouseEnter={handleJoinMouse} onMouseLeave={handleLeaveMouse} onClick={Join_group}
//         Product={prop.Product} userId={prop.userId}
//       >
//         我要加團
//       </button>
