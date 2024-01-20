//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";

// include your styles into the webpack bundle
import "../styles/index.css";

//import your own components
import ToDoList from "./component/ToDoList.jsx";

//link for my icons
<script src="https://kit.fontawesome.com/4aa61b2126.js" crossorigin="anonymous"></script>

const countValue = document.querySelector(".count-value");
let taskCount = 0;

const displayCount = (taskCount) => {
    countValue.innerText = taskCount
}

//render your react application
ReactDOM.render(<ToDoList />, document.querySelector("#app"));
