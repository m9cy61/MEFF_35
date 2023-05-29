import React from 'react'
import { BsPersonCircle } from 'react-icons/bs'

const Header_top = () => {
     return (
          <header>
               <a href="/index" className="header_logo">
                    <img src={require("../public/media/logo/大專logo_帶你買.png")} alt="logo" />
               </a>
               <div className="header_text">
                    <div className="items"><a href="#">最新消息</a></div>
                    <div className="items"><a href="#">精選團購</a></div>
                    <div className="items"><a href="#">全部團購</a></div>
                    <div className="items"><a href="#">許願清單</a></div>
               </div>

               <a href="#" className="member_icon"><BsPersonCircle /></a>
          </header>
     )
}

export default Header_top