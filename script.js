// Show or hide the pop-up
// Function to show or hide the pop-up
function showPopup(show) 
{
    const popup = document.getElementById("popup");
    if (show) 
    {
      popup.style.visibility = "visible";
    } 
    
    else 
    {
      popup.style.visibility = "hidden";
    }
}

// Add reccommendation
function addRecommendation() 
{
  let recommendation = document.getElementById("new_recommendation");

  if (recommendation.value.trim() !== "") 
    {
    const newDiv = document.createElement("div");
    newDiv.classList.add("recommendation");
    newDiv.innerHTML = `<span>&#8220;</span>${recommendation.value}<span>&#8221;</span>`;
    document.getElementById("all_recommendations").appendChild(newDiv);

    recommendation.value = "";
    // Use the custom pop-up instead of alert
    showPopup(true);
  } 
  
  else 
  {
    alert("Please write a recommendation before submitting.");
  }
}


// Handle Contact Form Submission
document.getElementById('contact-form').addEventListener('submit', function(event) 
{
  event.preventDefault(); // Prevent the default form submission

  // Send the email using EmailJS
  emailjs.send("service_at13aoc", "template_z39a68s", 
    {
    user_name: event.target.user_name.value,
    user_email: event.target.user_email.value,
    user_message: event.target.user_message.value
  })
  .then(function(response) 
  {
     console.log('SUCCESS!', response.status, response.text);
     showPopup(true); // Show success popup
     event.target.reset(); // Reset the form fields
  }, function(error) 
  {
     console.log('FAILED...', error);
     alert('There was an error sending your message. Please try again later.');
  });
  
});