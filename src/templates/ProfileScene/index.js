import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {  Outlet, useNavigate } from "react-router-dom";
import TopBar from '../../components/organisms/TopBar';
import { signOut } from "../../slices/auth.slice";

import "./styles.css";

export default function ProfileScene({
  name = "Mohamed Ibrahim",
}) {
  const goTo = useNavigate();
  const dispatch = useDispatch();
  useEffect(()=>{
    goTo('/profile/quizzes')
  },[])

  const handleTabClick = (_,name)=>{
    if(name)
    goTo(`/profile/${name}`);
  }

  const handleSignOut = ()=>{
    dispatch(signOut());
    goTo('/signin');
  }
  
  return (
    <div style={{flexDirection: 'column'}} className="page">
      <TopBar onButtonClick={handleSignOut} onTabClick={handleTabClick}  userName={name} />
      <Outlet/>
    </div>
  );
}
