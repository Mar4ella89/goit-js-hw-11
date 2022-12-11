import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import GalleryApiService from './galleryService';
import { markupPhotoGallery } from './template';

const ref = {
  searchForm: document.querySelector('#search-form'),
  photosContainer: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

const galleryApiService = new GalleryApiService();

function render(imagesList) {
  const renderImgContainer = imagesList.map(markupPhotoGallery).join('');
  ref.photosContainer.insertAdjacentHTML('beforeend', renderImgContainer);
}

ref.searchForm.addEventListener('submit', onSearch);
ref.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();
  galleryApiService.query = e.currentTarget.elements.searchQuery.value;
  galleryApiService.resetPage();
  galleryApiService.galleryImg().then(render);
  
}

function onLoadMore() {
  galleryApiService.galleryImg();
}

// SimpleLightbox('.gallery a', {
//     captionsData: 'alt',
//     captionPosition: 'bottom',
//     captionDelay: 250,
//     disableScroll: false,
//     scrollZoom: false,
//   });

// fetch(
//     'https://restcountries.com/v3.1/name/ukraine'
//   ).then(response => response.json()).then(console.log)
