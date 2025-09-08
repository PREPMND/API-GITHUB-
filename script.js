let ok = document.querySelector(".ok");
let result = document.querySelector(".result");
let u = document.querySelector(".entry"); 
let submit=document.querySelector("#submit");
let url;
submit.addEventListener("click",function(dets){
  dets.preventDefault();
  let url = `https://api.github.com/users/${u.value.trim()}`;
  ok.innerHTML=url;
  fetch(url)
  .then(response => response.json())
  .then(data => {
    result.innerHTML = JSON.stringify(data.name); 
  })
  .catch(error => {
    result.innerHTML = "INVALID USERNAME-OR SOMEISSUES";
  });
});


