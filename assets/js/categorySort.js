var buttons = document.querySelectorAll(".childMenu li");



var parent = document.querySelector("#postList ul");
var childs = document.querySelectorAll(".postContent");

console.log(parent);
console.log(childs);

buttons.forEach(e=>{
    console.log(e);
    e.addEventListener("click", ()=>{
        //한번 비워주고
        childs.forEach(e =>{
            e.remove();
        });
        //카테고리에 해당하는 포스팅만 표시
        childs.forEach(c=>{
            if(c.id === e.id ){
                parent.appendChild(c);
            }
        });
    });
})
