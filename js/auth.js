// Auth Module - Simple Login/Logout
function login(){var n=prompt("Enter your name");if(n&&n.trim()){localStorage.setItem("amkyaw_user",n.trim());window.location.href="pages/chat.html";}}
function logout(){localStorage.removeItem("amkyaw_user");window.location.href="pages/login.html";}
function isLoggedIn(){return localStorage.getItem("amkyaw_user")!==null;}
function getUser(){return localStorage.getItem("amkyaw_user");}
function getUserInitials(){var u=getUser();return u?u.charAt(0).toUpperCase():"U";}
function requireAuth(){if(!isLoggedIn())window.location.href="pages/login.html";}
