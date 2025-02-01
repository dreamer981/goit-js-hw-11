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
      alert('Lütfen geçerli bir arama terimi girin.');
    }
  });