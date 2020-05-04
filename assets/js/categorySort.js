var buttons = document.querySelectorAll(".childMenu li");

console.log(buttons);

var parent = document.querySelector("#postList ul");
var childs = document.querySelectorAll(".postContent");

console.log(parent);
console.log(childs);

buttons[0].addEventListener("click", ()=>{
    childs.forEach(e =>{
        console.log(e.id);
        e.remove();
    });
    console.log("deleted");
    childs.forEach(e=>{
        if(e.id === "front"){
            parent.appendChild(e);
        }
    });
    console.log("appended");
});

buttons[2].addEventListener("click", ()=>{
    childs.forEach(e =>{
        console.log(e.id);
        e.remove();
    });
    console.log("deleted");
    childs.forEach(e=>{
        if(e.id === "algorithm"){
            parent.appendChild(e);
        }
    });
    console.log("appended");
});