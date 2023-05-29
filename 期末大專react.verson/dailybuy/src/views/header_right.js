import React from 'react'
import { BsFacebook, BsInstagram, BsSearch,BsFillHeartFill } from 'react-icons/bs'

const Header_right = () => {
     return (
          <aside>
               <div className="seach_icon">
                    <a href="#" className="icon"><BsSearch /></a>
                    <a href="#" className="icon"><BsFacebook /></a>
                    <a href="#" className="icon"><BsInstagram /></a>
                    <a href="#" className="icon"><BsFillHeartFill /></a>
               </div>

               <div className="about_us">

                    <div className="block"><a href="/about_us">關於我們</a></div>
                    <div className="block"><a href="/about_us"> 聯絡我們</a></div>
                    <div className="block"><a href="/instruction"> 使用教學</a></div>
               </div>
          </aside >

     )
}

export default Header_right