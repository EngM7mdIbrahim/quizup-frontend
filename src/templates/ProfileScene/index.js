import { create } from "@mui/material/styles/createTransitions";
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
  },[]);

  const createQuiz = window.location.href.includes('/profiel/quizzes/create')

  const handleTabClick = (_,name)=>{
    goTo(`/profile/${name}`);
  }
  const handleSignOut = ()=>{
    dispatch(signOut());
    goTo('/signin');
  }

  const handleSaveQuiz = () =>{
    
  }
  const handleTopBarButton = createQuiz ? handleSaveQuiz : handleSignOut; 
  const buttonText = createQuiz ? 'Save Quiz' : 'Log out'
  
  return (
    <div style={{flexDirection: 'column'}} className="page">
      <TopBar buttonText={buttonText} onButtonClick={handleTopBarButton} onTabClick={handleTabClick}  userName={name} />
      <Outlet/>
    </div>
  );
}
