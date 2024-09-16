// contact.html page control by js code start
// logout processs....
var username=sessionStorage.getItem("username");
if(username==null)
    {
        document.body.innerHTML="<h1>illegal action perform !</h1>";
        document.body.classList.add("illegal");
    }

var logout_btn=document.querySelector(".logout-btn");
logout_btn.onclick=function()
{
    window.location="../index.html";
    sessionStorage.removeItem("username");
}

// welcome text on screen 
var welcome_el=document.querySelector("#welcome");
var user_data=JSON.parse(localStorage.getItem(username));

welcome_el.innerHTML="Welcome ! Mr/Mrs  "+user_data.f_name +"  "+ user_data.l_name;


// create contact process code .
var create_btn=document.querySelector(".create-btn");
var edit_btn=document.querySelector(".edit-btn");
var contact_detail=document.querySelector(".contact-detail");
var input_name=document.querySelector(".name");
var input_number=document.querySelector(".number");

create_btn.onclick=function(e){
    
    e.preventDefault();
    if(input_name.value != "" && input_number.value != "")
    {
        newContactApp();
    }
    else
    {
        alert("enter contact details !");
    }
    updateLocalstorage();
    
}
if(localStorage.getItem(username+"_list")!=null)
{
    var array_list=JSON.parse(localStorage.getItem(username+"_list"));
    array_list.forEach(task=>{
    newContactApp(task);
});
}


// function for new contact app 
function newContactApp(task)
{  
   var i;
   var name=input_name.value;
   var number=input_number.value;
   if(task)
   {
    name=task.contact_name;
    number=task.contact_number;
   }

   var accordion=document.createElement("DIV");
   accordion.classList="accordion mb-3";

   var all_accordion=contact_detail.getElementsByClassName("accordion");
   for(i=0;i<all_accordion.length;i++)
   {

   }
   var accordian_item=document.createElement("DIV");
   accordian_item.classList="accordion-item";

   accordion.append(accordian_item);

   var accordion_header=document.createElement("H5");
   accordion_header.classList="accordion-header";

   accordian_item.append(accordion_header);

   var button=document.createElement("BUTTON");
   button.innerHTML=name;
   button.setAttribute("data-bs-toggle","collapse");
   button.setAttribute("data-bs-target","#collapse"+i);
   button.classList="accordion-button";

   accordion_header.append(button);

   var accordian_collapse=document.createElement("DIV");
   accordian_collapse.classList="accordion-collapse collapse";
   accordian_collapse.id='collapse'+i;
   accordian_item.append(accordian_collapse);

   var accordian_body=document.createElement("DIV");
   accordian_body.classList="accordion-body";

   accordian_collapse.append(accordian_body);

   var row=document.createElement("DIV");
   row.classList="row";

   accordian_body.append(row);

   var col1=document.createElement("DIV");
   col1.classList="col-md-6";

   row.append(col1);

   var h5=document.createElement("H5");
   h5.innerHTML=name;
   h5.id="contact-"+i;
   col1.append(h5);

   var p=document.createElement("P");
   p.innerHTML=number;
   col1.append(p);
   var col2=document.createElement("DIV");
   col2.classList="col-md-4 d-flex justify-content-around align-items-center position-relative accord-div";

   col2.innerHTML='<i class="fa-solid fa-message"></i>&nbsp;&nbsp;&nbsp;<i class="fa-solid fa-square-phone"></i>&nbsp;&nbsp;<i class="fa-solid fa-ellipsis-vertical opt-btn"></i>&nbsp;&nbsp;&nbsp;&nbsp;';
   row.append(col2);

   var option_box=document.createElement("DIV");
   option_box.classList="option-box";
  
   
   option_box.innerHTML='<i class="fa-solid fa-trash"></i><br/><i class="fa-solid fa-pen-to-square"></i>';
   col2.append(option_box);
  
   contact_detail.append(accordion);
   // clear input filed after clicked button .
   input_name.value="";
   input_number.value="";

 
   //delete btn code....
   var iTag=option_box.getElementsByTagName("i");
   iTag[0].onclick=function()
   {
    var cnf=window.confirm("Are you sure to delete this !");
    if(cnf)
    {
        accordion.remove();
        updateLocalstorage();
    }
    else{
        alert("Cancelled deletion.!")
    }
   }  
   
   //Update btn/icon code ...
  
   iTag[1].onclick=function()
   { 
    var par=this.parentElement.parentElement.parentElement;

    var h5=par.getElementsByTagName("H5");
    var p=par.getElementsByTagName("P");
    var edited_name=h5[0].innerHTML;
    var edited_number=p[0].innerHTML;
    input_name.value=edited_name;
    input_number.value=edited_number;
    input_name.focus();
    create_btn.classList.add("d-none");
    edit_btn.classList.remove("d-none");

    edit_btn.onclick=function()
    {
        //e.preventDefault();
        var id=(h5[0].getAttribute("id").replace("contact-",""));
        var co_name=input_name.value;
        var co_number=input_number.value;
        updateLocalstorage(co_name,co_number,id);
     
        
    }
    
   }
   //otp-btn control.....
  
   var opt_btn=document.querySelectorAll(".opt-btn");
   for(i=0;i<opt_btn.length;i++)
   {
    opt_btn[i].onclick=function()
    {   
        var parent=this.parentElement;
        var opt_box=parent.querySelector(".option-box");
        if (option_box.style.display='block')
        {
       // opt_box.classList="active";
        opt_box.style.display='block';
        opt_box.style.opacity=1;
        //opt_box.style.background='red';
        opt_box.style.width='35px';
        }

    }
   }
}

//updating local storage .....
function updateLocalstorage(name,number,id)
{
    
    
   if(name !="" && number !="")
   {
         array_list[id]={
           contact_name:name,
           contact_number:number
        }
    }
       
   else
   {
    array_list=[];
    var i;
    var accordion_el=contact_detail.querySelectorAll(".accordion");
    for(i=0;i<accordion_el.length;i++)
    {
        var h5=accordion_el[i].getElementsByTagName("H5");
        var p=accordion_el[i].getElementsByTagName("P");
        array_list.push({
            contact_name:h5[1].innerHTML,
            contact_number:p[0].innerHTML
        });
    }

   }
   
 
    
   
    
    localStorage.setItem(username+"_list",JSON.stringify(array_list));
}

// code For Search...
function mySearch(){
    var i,btn,textval;
    var input=document.querySelector("#input-search").value;
    var filter=input.toUpperCase();
    var accordion=contact_detail.querySelectorAll(".accordion");
    for(i=0;i<=accordion.length;i++)
    {
        btn=accordion[i].getElementsByTagName("BUTTON")[0];
        textval=btn.innerText;
        if(textval.toUpperCase().indexOf(filter)>-1){
            accordion[i].style.display="";

        }
        else{
            accordion[i].style.display="none";
        }
    }
}