import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import GalleryApiService from './galleryService';
import { markupPhotoGallery } from './template';

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
  disableScroll: false,
  scrollZoom: false,
});

const ref = {
  searchForm: document.querySelector('#search-form'),
  photosContainer: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

const galleryApiService = new GalleryApiService();

function render(hits) {
  if (hits.length === 0) {
    Notiflix.Notify.failure(
      `Sorry, there are no images matching your search query. Please try again.`,
      {
        clickToClose: true,
        timeout: 3000,
      }
    );
    return;
  }
  const renderImgContainer = hits.map(markupPhotoGallery);
  ref.photosContainer.insertAdjacentHTML(
    'beforeend',
    renderImgContainer.join('')
  );
}

function onFetchError() {
  Notiflix.Notify.failure(`Page is not defined. Please try again.`, {
    clickToClose: true,
    timeout: 3000,
  });
}

ref.searchForm.addEventListener('submit', onSearch);
ref.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();
  galleryApiService.query = e.currentTarget.elements.searchQuery.value;
  galleryApiService.resetPage();

  galleryApiService
    .galleryImg()
    .then(data => {
      clearGallery();
      render(data.hits);
    })
    .catch(onFetchError);
}

function onLoadMore() {
  galleryApiService.galleryImg().then(data => render(data.hits));
}

function clearGallery() {
  ref.photosContainer.innerHTML = '';
}

// fetch(
//     'https://restcountries.com/v3.1/name/ukraine'
//   ).then(response => response.json()).then(console.log)
