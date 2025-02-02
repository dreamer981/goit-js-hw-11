import{i as l,S as m}from"./assets/vendor-BrddEoy-.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();console.log("hello world");const u="48552658-8d0576f2bce30f826d9dd5e42",d=document.querySelector(".search-input"),y=document.querySelector(".search-button"),a=document.querySelector(".gallery"),i=document.querySelector(".loader");y.addEventListener("click",()=>{const o=d.value.trim();o?h(o):alert("Please enter a valid search term!")});document.querySelector(".load-more").addEventListener("click",function(){const o=d.value.trim();g(o)});let p=1;function h(o){i.style.display="block",a.innerHTML="",fetch(`https://pixabay.com/api/?key=${u}&q=${o}&image_type=photo&per_page=15&page=${p}`).then(function(t){return t.json()}).then(function(t){const s=t.hits;if(s.length===0){l.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}let n="";s.forEach(function(e){n+=`
            <a href="${e.largeImageURL}" class="gallery-item">
              <img src="${e.webformatURL}" alt="${e.tags}" />
              <div class="image-info">
                <p>Likes: ${e.likes}</p>
                <p>Views: ${e.views}</p>
                <p>Comments: ${e.comments}</p>
                <p>Downloads: ${e.downloads}</p>
              </div>
            </a>
          `}),a.innerHTML=n,f(),i.style.display="none"}).catch(function(t){l.error({title:"Error",message:"An error occurred while loading images!",position:"topRight"}),console.error("Error:",t)}),document.querySelector(".load-more").style.display="block"}function g(o){p++,i.style.display="block",fetch(`https://pixabay.com/api/?key=${u}&q=${o}&image_type=photo&per_page=15&page=${p}`).then(function(t){return t.json()}).then(function(t){const s=t.hits;if(s.length===0){l.error({title:"Error",message:"No more images found!",position:"topRight"}),i.style.display="none";return}let n="";s.forEach(function(e){n+=`
            <a href="${e.largeImageURL}" class="gallery-item">
              <img src="${e.webformatURL}" alt="${e.tags}" />
              <div class="image-info">
                <p>Likes: ${e.likes}</p>
                <p>Views: ${e.views}</p>
                <p>Comments: ${e.comments}</p>
                <p>Downloads: ${e.downloads}</p>
              </div>
            </a>
          `}),a.innerHTML+=n,f(),i.style.display="none"}).catch(function(t){l.error({title:"Error",message:"An error occurred while loading images!",position:"topRight"}),console.error("Error:",t),i.style.display="none"})}let $=new m(".gallery a");function f(){$.refresh()}
//# sourceMappingURL=index.js.map
