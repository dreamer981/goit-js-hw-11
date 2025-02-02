console.log("hello world")

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const apiKey = '48552658-8d0576f2bce30f826d9dd5e42'; 

const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-button');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
      fetchImages(query);
    } else {
      alert('Please enter a valid search term!');
    }
  });

  document.querySelector('.load-more').addEventListener('click', function() {
    const query = searchInput.value.trim();
    loadMoreImages(query);  // Yeni görselleri yükle
  });
  

  let page = 1;  // Sayfa numarasını takip etmek için bir değişken

  function fetchImages(query) {
    loader.style.display = 'block';  // Yükleme göstergesini aç
    gallery.innerHTML = '';  // Önceki görselleri temizle
  
    fetch(`https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&per_page=15&page=${page}`)
      .then(function(response) {
        return response.json();  // API'den gelen yanıtı JSON formatına çevir
      })
      .then(function(data) {
        const images = data.hits;  // Görsellerin bulunduğu dizi
  
        if (images.length === 0) {
          iziToast.error({
            title: 'Error',
            message: 'Sorry, there are no images matching your search query. Please try again!',
            position: 'topRight'
          });
          return;
        }
  
        // Görsellerin HTML yapısını oluştur
        let imageMarkup = '';
        images.forEach(function(image) {
          imageMarkup += `
            <a href="${image.largeImageURL}" class="gallery-item">
              <img src="${image.webformatURL}" alt="${image.tags}" />
              <div class="image-info">
                <p>Likes: ${image.likes}</p>
                <p>Views: ${image.views}</p>
                <p>Comments: ${image.comments}</p>
                <p>Downloads: ${image.downloads}</p>
              </div>
            </a>
          `;
        });
        
        gallery.innerHTML = imageMarkup; // Galeriye HTML ekle
        updateLightbox();  // SimpleLightbox'u güncelle
        loader.style.display = 'none';  // Yükleme göstergesini kapat
      })
      .catch(function(error) {
        iziToast.error({
          title: 'Error',
          message: 'An error occurred while loading images!',
          position: 'topRight'
        });
        console.error("Error:", error);
      });
      document.querySelector('.load-more').style.display = 'block';  // Butonu görünür yap
  }
  

  function loadMoreImages(query) {
    page++;  // Sayfa numarasını bir arttırıyoruz
    loader.style.display = 'block';  // Yükleme göstergesini aç
  
    fetch(`https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&per_page=15&page=${page}`)
      .then(function(response) {
        return response.json();  // API'den gelen yanıtı JSON formatına çevir
      })
      .then(function(data) {
        const images = data.hits;  // Görsellerin bulunduğu dizi
  
        if (images.length === 0) {
          iziToast.error({
            title: 'Error',
            message: 'No more images found!',
            position: 'topRight'
          });
          loader.style.display = 'none';  // Yükleme göstergesini kapat
          return;
        }
  
        // Yeni görsellerin HTML yapısını oluştur
        let imageMarkup = '';
        images.forEach(function(image) {
          imageMarkup += `
            <a href="${image.largeImageURL}" class="gallery-item">
              <img src="${image.webformatURL}" alt="${image.tags}" />
              <div class="image-info">
                <p>Likes: ${image.likes}</p>
                <p>Views: ${image.views}</p>
                <p>Comments: ${image.comments}</p>
                <p>Downloads: ${image.downloads}</p>
              </div>
            </a>
          `;
        });
  
        gallery.innerHTML += imageMarkup;  // Yeni görselleri mevcut galeriye ekle
        updateLightbox();  // SimpleLightbox'u güncelle
        loader.style.display = 'none';  // Yükleme göstergesini kapat
      })
      .catch(function(error) {
        iziToast.error({
          title: 'Error',
          message: 'An error occurred while loading images!',
          position: 'topRight'
        });
        console.error("Error:", error);
        loader.style.display = 'none';  // Yükleme göstergesini kapat
      });
  }
  
  // SimpleLightbox'u başlat
let lightbox = new SimpleLightbox('.gallery a');

// Galeri güncellendiğinde SimpleLightbox'u yenile
function updateLightbox() {
  lightbox.refresh();
}
