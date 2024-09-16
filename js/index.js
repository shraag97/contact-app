
//create variable and select element ....
var lActive = document.getElementById("l-active-btn");
var sActive = document.getElementById("s-active-btn");
var l_active_el = document.querySelector(".l-active");
var s_active_el = document.querySelector(".s-active");

// active and deactive div code start ......
sActive.onclick = function () {
  s_active_el.style.opacity = "0";
  s_active_el.classList =
    "animate__animated animate__fadeOutUp active-box s-active";
  l_active_el.style.opacity = "1";
  l_active_el.style.zIndex = "1";
  l_active_el.classList =
    "animate__animated animate__fadeInDown active-box l-active";
};

lActive.onclick = function () {
  l_active_el.style.opacity = "0";
  l_active_el.classList =
    "animate__animated animate__fadeOutUp active-box s-active";
  s_active_el.style.opacity = "1";
  s_active_el.style.zIndex = "1";
  s_active_el.classList =
    "animate__animated animate__fadeInDown active-box l-active";
};

//strat signup proocesss...
var signup_btn = document.querySelector(".signup-btn");
var f_name = document.querySelector("#f-name");
var l_name = document.querySelector("#l-name");
var s_username = document.querySelector("#s-username");
var s_password = document.querySelector("#s-password");
var s_notice=document.getElementById("s-notice");

signup_btn.onclick = function(e){
   e.preventDefault();
  if(localStorage.getItem(s_username.value)==null) 
  {
    var data = {
      f_name: f_name.value,
      l_name: l_name.value,
      s_username: s_username.value,
      s_password: s_password.value
    }
    var s_string=JSON.stringify(data);
    localStorage.setItem(s_username.value,s_string);  
    s_notice.innerHTML="Successfully Reaistered!";
    s_notice.style.color="green";
    s_notice.style.fontSize=20;
    s_notice.style.fontWeight="bold";
    setTimeout(function()
    {
        s_notice.innerHTML="";
    },5000)
    f_name.value="";
    l_name.value="";
    s_username.value="";
    s_password.value="";
  } 
  else 
  {
    s_notice.innerHTML="UserName Already exist !";
    s_notice.style.color="red";
    setTimeout(function()
    {
        s_notice.innerHTML="";
    },5000)
    
    
  }
};

//start login processs code start..
var login_btn=document.querySelector("#login-btn");
var username_el=document.querySelector("#username");
var password_el=document.querySelector("#password");
var l_notice=document.querySelector("#l-notice");

login_btn.onclick= function(e){
     e.preventDefault();
    if(username_el.value != "" || password_el.value != "")
    {
        if(localStorage.getItem(username_el.value)!=null)
        {
          var data=localStorage.getItem(username_el.value);
          var l_obj=JSON.parse(data);
          var password=l_obj.s_password;
          if(password_el.value==password)
          {
            alert("Welcome user");
            window.location="contact/contact.html";
            sessionStorage.setItem("username",username_el.value);
          }
          else
          {
            l_notice.innerHTML="Password is Incorrect!";
            l_notice.style.color="red";
            l_notice.style.fontSize=20;
            l_notice.style.fontWeight="bold";
            setTimeout(function()
            {
              l_notice.innerHTML="";
            },5000)
          }
        }
        else
        {
          l_notice.innerHTML="UserName does not exist!";
          l_notice.style.color="red";
          l_notice.style.fontSize=20;
          l_notice.style.fontWeight="bold";
          setTimeout(function()
          {
            l_notice.innerHTML="";
          },5000)
        }
    }
    else
    {
        l_notice.innerHTML="Please Enter Login detais!";
        l_notice.style.color="red";
        l_notice.style.fontSize=20;
        l_notice.style.fontWeight="bold";
        setTimeout(function(){
          l_notice.innerHTML="";
        },5000)
    }
     
}
