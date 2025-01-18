// Show or hide the pop-up
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
