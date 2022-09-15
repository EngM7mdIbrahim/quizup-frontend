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
