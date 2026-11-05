import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api.js';

import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreBtn,
  hideLoadMoreBtn,
} from './js/render-functions.js';

let page = 1;
let totalHits = 0;

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.btn-load-more');
let searchQuery = '';

const fetchImages = async () => {
  try {
    const res = await getImagesByQuery(searchQuery, page);

    if (res.hits.length === 0 && page === 1) {
      iziToast.warning({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }

    totalHits = res.totalHits;

    createGallery(res.hits);

    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    if (page * 15 >= totalHits) {
      hideLoadMoreBtn();

      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      showLoadMoreBtn();
    }
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
    });
    console.error(error);
  } finally {
    hideLoader();
  }
};

form.addEventListener('submit', e => {
  e.preventDefault();

  const formData = new FormData(form);
  searchQuery = formData.get('search-text').trim();
  page = 1;

  if (searchQuery === '') {
    iziToast.warning({
      message:
        'Sorry, there are no images matching your search query. Please try again!',
    });
    return;
  }

  showLoader();
  hideLoadMoreBtn();
  clearGallery();

  fetchImages();
});

loadMoreBtn.addEventListener('click', () => {
  showLoader();
  hideLoadMoreBtn();

  page += 1;
  fetchImages();
});
