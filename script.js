document.addEventListener("DOMContentLoaded",function(){
  var menuBtn=document.getElementById("menu-toggle");
  var navLinks=document.getElementById("nav-links");
  if(menuBtn){
    menuBtn.addEventListener("click",function(){
      var open=navLinks.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded",open?"true":"false");
    });
  }
  var toTop=document.getElementById("to-top");
  window.addEventListener("scroll",function(){
    if(window.scrollY>320){toTop.classList.add("show")}else{toTop.classList.remove("show")}
  });
  var yearSpan=document.getElementById("year");
  if(yearSpan){yearSpan.textContent=new Date().getFullYear()}
  if(window.emailjs&&emailjs.init){emailjs.init("Qg2fU0vZ-xiv09L-Q")}
  var form=document.getElementById("contact-form");
  if(form){
    var statusEl=document.getElementById("form-status");
    var submitBtn=document.getElementById("submit-btn");
    form.addEventListener("submit",function(e){
      e.preventDefault();
      if(!window.emailjs){statusEl.textContent="Messaging service unavailable. Please email me directly.";return}
      var name=document.getElementById("name").value.trim();
      var email=document.getElementById("email").value.trim();
      var message=document.getElementById("message").value.trim();
      if(!name||!email||!message){statusEl.textContent="Please complete all fields.";return}
      submitBtn.disabled=true;
      submitBtn.textContent="Sending...";
      statusEl.textContent="";
      emailjs.send("service_at13aoc","template_z39a68s",{from_name:name,from_email:email,message:message})
      .then(function(){
        statusEl.textContent="Thanks for reaching out. I’ll get back to you soon.";
        form.reset();
        submitBtn.disabled=false;
        submitBtn.textContent="Send Message";
      })
      .catch(function(){
        statusEl.textContent="Could not send message. Please try again or email me.";
        submitBtn.disabled=false;
        submitBtn.textContent="Send Message";
      });
    });
  }
});
