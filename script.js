let img = document.querySelector("img");
let result = document.querySelector(".result");
let u = document.querySelector(".entry"); 
let submit=document.querySelector("#submit");
let url;
submit.addEventListener("click",function(dets){
  dets.preventDefault();
  let url = `https://api.github.com/users/${u.value.trim()}`;
  
  fetch(url)
  .then(response => response.json())
  .then(data => {
    result.innerHTML = JSON.stringify(data.name);
    img.classList.add("img")
    img.setAttribute("src",data.avatar_url) 
  })
  .catch(error => {
    result.innerHTML = "INVALID USERNAME-OR SOMEISSUES";
  });
});


