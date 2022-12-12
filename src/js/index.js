import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import GalleryApiService from './galleryService';
import { markupPhotoGallery } from './template';
import LoadMoreBtn from './load-more-btn';

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
  disableScroll: false,
  scrollZoom: false,
});

console.dir(lightbox)

const ref = {
  searchForm: document.querySelector('#search-form'),
  photosContainer: document.querySelector('.gallery'),
  // loadMoreBtn: document.querySelector('[data-action="load-more"]'),
};

const galleryApiService = new GalleryApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
console.log(loadMoreBtn);

function fetchSuccess({ totalHits }) {
  if (totalHits != 0) {
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`, {
      clickToClose: true,
      timeout: 3000,
    });
  }
  
}

// function fetchError() {
//   Notiflix.Notify.failure(`Page is not defined. Please try again.`, {
//     clickToClose: true,
//     timeout: 3000,
//   });
// }

function fetchFailure() {
  Notiflix.Notify.failure(
    `Sorry, there are no images matching your search query. Please try again.`,
    {
      clickToClose: true,
      timeout: 3000,
    }
  );
}

function fetchNotify() {
  Notiflix.Notify.info(
        `We're sorry, but you've reached the end of search results.`,
        {
          clickToClose: true,
          timeout: 3000,
        }
)}
let totalImage = 0;
function render({ hits, totalHits }) {
  
  
  if (totalHits === 0) {
    fetchFailure();
    loadMoreBtn.hide();
    return;
  }
  
  const renderImgContainer = hits.map(markupPhotoGallery);
  totalImage = totalImage + hits.length;
  console.log(totalImage)
  ref.photosContainer.insertAdjacentHTML(
    'beforeend',
    renderImgContainer.join('')
  );
  lightbox.refresh()

  if (totalImage >= totalHits) {
    loadMoreBtn.hide();
    fetchNotify()
    
  return;
  }
}

ref.searchForm.addEventListener('submit', onSearch);
// ref.loadMoreBtn.addEventListener('click', onLoadMore);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();
  galleryApiService.query = e.currentTarget.elements.searchQuery.value;

  loadMoreBtn.show();
  loadMoreBtn.disable();
  galleryApiService.resetPage();

  galleryApiService
    .galleryImg()
    .then(data => {
      clearGallery();
      render(data);
      fetchSuccess(data);
      loadMoreBtn.enable();
    })
    // .catch(fetchError());
}

function onLoadMore() {
  loadMoreBtn.disable();
  galleryApiService.galleryImg().then(data => {
    render(data);
    loadMoreBtn.enable();
  });
}

function clearGallery() {
  ref.photosContainer.innerHTML = '';
}

// fetch(
//     'https://restcountries.com/v3.1/name/ukraine'
//   ).then(response => response.json()).then(console.log)
