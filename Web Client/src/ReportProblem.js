import React, {useState} from "react";
import "./ReportProblemStyle.css"
import firebase from "firebase/app";
import "firebase/auth"
import "firebase/database"
var config = {
    apiKey: "AIzaSyBLwWyP1YuWZrqvpo_zsNJIyEf8Xi_Lpco",
    authDomain: "gyradosvpn.firebaseapp.com",
    databaseURL: "https://gyradosvpn.firebaseio.com",
    projectId: "gyradosvpn",
    storageBucket: "gyradosvpn.appspot.com",
    messagingSenderId: "50961203679",
    appId: "1:50961203679:web:5889613169c3eeb168c46a"
};
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}else {
   firebase.app();
}
const ReportProblem =() =>{
  const [fullName,setFullName] = useState("");
  const [email,setEmail] = useState("");
  const [problem,setProblem] = useState("");
  const [isVisible, setVisible] = useState(true);
  function handleNameChange(event) {
    setFullName(event.target.value);
  }
  function handleEmailChange(event) {
    setEmail(event.target.value);
  }
  function handleProblemChange(event) {
    setProblem(event.target.value);
  }
  function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
  }
  function handleSubmit(event) {
    if(fullName===""){
      alert('Full Name is required, can not be empty.');
      event.preventDefault();
    }
    else if(email===""){
      alert('Email is required, can not be empty.');
      event.preventDefault();
    }
    else if(!validateEmail(email)){
      alert('Invalid Email');
      event.preventDefault();
    }else if(problem===""){
      alert('Problem is required, can not be empty.');
      event.preventDefault();
    }else{
      firebase.database().ref('Reports/' + Date.now()).set({
        name: fullName,
        email: email,
        problem : problem
      });
      setFullName("")
      setEmail("")
      setProblem("")
      setVisible(false)
      event.preventDefault();
    }
  }
  if(isVisible){
    return (
      <form onSubmit={handleSubmit} id="reportForm">
        <label id="reportEntry">
          Full Name:
          <input type="text" value={fullName} onChange={handleNameChange} />
        </label>
        <label id="reportEntry">
          Email:
          <input type="text" value={email} onChange={handleEmailChange} />
        </label>
        <label id="reportEntry">
          Problem:
          <textarea id="textArea" type="text" value={problem} onChange={handleProblemChange} />
        </label>
        <input id="reportButton" type="submit" value="Submit" />
      </form>
    );
  }else{
    return(
      <div className="reportSubmitted">
        <p>Problem Reported</p>
      </div>
    );
  }
}

export default ReportProblem;