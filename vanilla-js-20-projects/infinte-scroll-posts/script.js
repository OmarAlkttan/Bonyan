const posts = document.getElementById("posts");
const postsBtn = document.getElementById("get-posts");
const loader = document.getElementById("loader");
const input = document.getElementById("filter-post");

let page = 1;

let postsData = [];
getPosts();
let flag = false;
let filteredPosts = [];

async function getPosts(){
  console.log("inside get posts")
  let response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${page}`);
  let data = await response.json();
  postsData = postsData.concat(data);
  loader.style.display = "none";
  console.log(postsData)
  displayPosts(postsData);
  page++;
  flag = false;
}


window.onscroll = function(ev){
  if ((window.innerHeight + window.scrollY + 1) >= document.body.offsetHeight && flag == false) {
    flag = true;
    console.log("reach bottom")
    loader.style.display = "block";
    setTimeout(getPosts, 1000);
  } 
}


function displayPosts(data){
  console.log(posts)
  let inner = "";
  for(const post of data){
    inner += `<div class="post">
    <span class="post-id">${post.id}</span>
    <h2 class="post-title">${post.title}</h2>
    <p class="post-body">${post.body}</p>
  </div>`
  }
  console.log(inner)
  posts.innerHTML = inner;
}

function filterPosts(value){
  console.log(value);
  filteredPosts = postsData.filter((post)=>{
    return post.body.includes(value) || post.title.includes(value);
  })
  displayPosts(filteredPosts);
}