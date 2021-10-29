let input = document.querySelector("#writ_item");
let btn_click = document.querySelector(".btnclick");
let itemDraw = document.querySelector(".items");
let saveitem = document.querySelector(".btnSave");
var d = new Date();
var arr=[];


// Date
var dd = String(d.getDate()).padStart( 2 ,'0');
var mm = String(d.getMonth()+1).padStart(2 , '0');
var yy = d.getFullYear();

d = mm + '/' + dd + '/' +yy;
// end Date


window.onload = function(){
    input.focus();
}


Draw();

function List(id , text){
this.id = id;
this.text = text;
this.isDone = false;
}

btn_click.addEventListener("click" ,function(){
    inputval = input.value;
    if(inputval.trim() != 0)
    {
      let listTask = localStorage.getItem("localTaskDB") ? JSON.parse(localStorage.getItem("localTaskDB")) : [];
      let list = new List(listTask.length + 1 , inputval);
      listTask = [...listTask , list];

      localStorage.setItem("localTaskDB" ,JSON.stringify(listTask));
      Draw();
    }  
    else{
        alert("please something....");
    }
    Draw();
});



function  Draw(){
    let webTask = localStorage.getItem("localTaskDB");
    if(webTask == null){
        taskobj = [];
    }
    else{
        taskobj = JSON.parse(webTask);
    }
        let  itemdraw = ``;
        taskobj.forEach((item) => {
            itemdraw += 
            `<div class="content-item">
                   <i class="fa fa-check  checksave" style = "display:${item.isDone == true? "block" : "none"}" ></i>
                    <p style="text-decoration:${item.isDone == true? "line-through" : "none"}" class="text">${item.text}</p> 
                    <span> ${d} </span>
                <div class="buttons">
                    <button class="btn-save"  onclick="Done(${item.id})">Save</button>
                    <button class="btn-alter" onclick="AlterItem(${item.id})" >Alter</button>
                   
                </div>
                <button class="btn-delete" onclick = "DeletItem(${item.id})">Drop</button>
            </div>`;
        });
        
        itemDraw.innerHTML = itemdraw;
       
      input.value = '';
}

let saveindex ;
function AlterItem(id){
    let webTask = JSON.parse(localStorage.getItem("localTaskDB"));
    alterItem = webTask.find((item) => item.id == id);
    input.value = alterItem.text;
    btn_click.style.display = "none";
    saveitem.style.display = "block";
    saveindex = id;
}
// savebtn

saveitem.addEventListener("click" ,function(){
    let webTask = JSON.parse(localStorage.getItem("localTaskDB"));
    webTask.map((item) => {
        if(item.id == saveindex){
            item.text = input.value;
        }
    })
    localStorage.setItem("localTaskDB" , JSON.stringify(webTask));
    Draw();
    saveitem.style.display = "none";
    btn_click.style.display = "block";
    input.value = '';
});

// DeletITem
function DeletItem(index){
    let webTask = JSON.parse(localStorage.getItem("localTaskDB"));
    webTask.splice(index -1 , 1);
    localStorage.setItem("localTaskDB" , JSON.stringify(webTask));
    Draw();
    console.log(webTask);
}

// Done

function Done(id)
{
    let array = JSON.parse(localStorage.getItem("localTaskDB"));
    let res = array.find((item) => {
        if(item.id == id){
            item.isDone = true;
        }
    });
   localStorage.setItem( "localTaskDB" ,JSON.stringify(array));
   Draw();    
}