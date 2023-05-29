import React, { useEffect, useState } from "react";
import { Heart, HeartFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

// function Hearticon(props) {
//   const { isClicked, colleteList, productId, userId, toggleHeart } = props;
//   const navigate = useNavigate();
//   const handleToggleHeart = () => {
//     if (
//       colleteList.product_id === productId &&
//       colleteList.user_id === userId
//     ) {
//       return <HeartFill className="collect_list" />
//        toggleHeart()
//     } else {
//       return <Heart className="collect_list" />;
//       toggleHeart()
//     }
//   };
//   if (userId === 0) {
//     return (
//       <i
//         onClick={() => {
//           navigate("/Login");
//         }}
//       >
//         <Heart className="collect_list" />
//       </i>
//     );
//   } else {
//     return (
//       <i onClick={handleToggleHeart}>
//         {!isClicked ? (
//           <Heart className="collect_list" />
//         ) : (
//           <HeartFill className="collect_list" />
//         )}
//       </i>
//     );
//   }
// }
function Hearticon(props) {
  const { isClicked, colleteList, productId, userId, toggleHeart } = props;
  const navigate = useNavigate();
  
  let heartElement;
  if (userId === 0) {
    heartElement = (
      <i
        onClick={() => {
          navigate("/Login");
        }}
      >
        <Heart className="collect_list" />
      </i>
    );
  } else {
    if (colleteList.product_id === productId && colleteList.user_id === userId) {
      heartElement = (
        <i onClick={() => {
          toggleHeart();
        }}>
          <HeartFill className="collect_list" />
        </i>
      );
    } else {
      heartElement = (
        <i onClick={() => {
          toggleHeart();
        }}>
          {!isClicked ? (
            <Heart className="collect_list" />
          ) : (
            <HeartFill className="collect_list" />
          )}
        </i>
      );
    }
  }

  return heartElement;
}

export default Hearticon;
