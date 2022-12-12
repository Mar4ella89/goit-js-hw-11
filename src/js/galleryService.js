import axios from 'axios';

export default class GalleryApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  // ------- Method axios -------
  //  galleryImg() {
  //     const KEY = '31981261-43107a8c97a37675e78f6a341';
  //     axios.defaults.baseURL = 'https://pixabay.com/api';
  //
  //      return axios
  //       .get(
  //         `/?key=${KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`
  //       )
  //       .then(({ data }) => {
  //         console.log(data);
  //         this.incrementPage();
  //         return data.hits;
  //       })
  //       .catch(error => console.log(error));
  //   }

  async galleryImg() {
    const KEY = '31981261-43107a8c97a37675e78f6a341';
    axios.defaults.baseURL = 'https://pixabay.com/api';

    const { data } = await axios.get(
      `/?key=${KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`
    );
    console.log(data);
    this.incrementPage();
    return data;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    return (this.searchQuery = newQuery);
  }
}

// ------ Method fetch ------
// galleryImg() {
//   const KEY = '31981261-43107a8c97a37675e78f6a341';
//   const BASE_URL = 'https://pixabay.com/api';

//   return fetch(
//     `${BASE_URL}/?key=${KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`
//   )
//     .then(response => response.json())
//     .then(data => {
//       this.incrementPage();
//       return data.hits;
//     });
// .catch(error => console.log(error));
// }
