export const formatMessages = (message) => {
  const newMessage = {
    emailError: message.includes("email") ? message : "",
    passwordError: message.includes("password") ? message : "",
    confirmPasswordError: message.includes("Confirm Password") ? message : "",
    usernameError: message.includes("username") ? message : "",
    errorMessage: message,
  };

  return newMessage;
};

export const isRejectedAction = (actionSlice) => {
  return (action) => action.type.endsWith("rejected") && action.type.includes(actionSlice);
};

export const isLoadingAction = (actionSlice) => {
  return (action) =>
    action.type.endsWith("pending") && action.type.includes(actionSlice);
};

export const isFulfilledAuthAction = (action) => {
  return (
    (action.type.includes("signin") || action.type.includes("signup")) &&
    action.type.endsWith("fulfilled")
  );
};

export const checkAxiosError = (error)=>{
  const isDev = true;
  
  if(error.code.includes('ERR_NETWORK')){
      return `${isDev ? 'Axios: ': ''} ${error.message}`
  }else{
    return `${isDev ? 'Server: ': ''} ${error.response.data.message}`
  }
}

export const constructChoicesArray = (questions)=>{
  let choices = [];

  for(let i= 0;i<questions;i++){
    choices.push(`Write choice ${i}`)
  }
  return choices;
}

export const calcChoicesStats = (choices, players) =>{
  let choiceStats = [];
  choices.forEach (choice => {
    let choicesSum = 0;
    players.forEach(player=>{
      choicesSum += player.choices[player.choices.length -1] === choice ? 1 : 0
    })
    choiceStats.push(choicesSum);
  });
  choiceStats.push(players.length)
  return choiceStats;
}
