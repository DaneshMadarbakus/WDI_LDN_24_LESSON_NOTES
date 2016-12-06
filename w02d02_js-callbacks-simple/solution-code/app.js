// function capitalize(string){
//   return string.charAt(0).toUpperCase() + string.slice(1);
// }
//
// function greet(name, callback){
//   console.log("Hello, " + callback(name));
// }
//
// greet("alex", capitalize);

var CallbackLesson = CallbackLesson || {};

CallbackLesson.init = function(){
  document.getElementById("hello").addEventListener("click", CallbackLesson.clicker);
};

CallbackLesson.clicker = function(){
  console.log("A div with id of #hello was clicked!");
};

window.addEventListener("DOMContentLoaded", CallbackLesson.init);
