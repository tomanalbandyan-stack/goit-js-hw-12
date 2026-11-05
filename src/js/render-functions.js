import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.btn-load-more');

const lightbox = new SimpleLightbox('.gallery a');

export const createGallery = images => {
  const fragment = document.createDocumentFragment();

  images.forEach(image => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    const img = document.createElement('img');
    const info = document.createElement('div');

    a.href = image.largeImageURL;
    img.src = image.webformatURL;
    img.alt = image.tags;

    info.innerHTML = `
      <div>
        <p>Likes</p>
        <p>${image.likes}</p>
      </div>
      <div>
        <p>Views</p>
        <p>${image.views}</p>
      </div>
      <div>
        <p>Comments</p>
        <p>${image.comments}</p>
      </div>
      <div>
        <p>Downloads</p>
        <p>${image.downloads}</p>
      </div>
    `;

    li.append(a);
    a.append(img);
    li.append(info);
    fragment.append(li);
  });

  gallery.append(fragment);
  lightbox.refresh();
};

export const clearGallery = () => {
  gallery.innerHTML = '';
};

export const showLoader = () => {
  loader.classList.add('is-visible');
};

export const hideLoader = () => {
  loader.classList.remove('is-visible');
};

export const showLoadMoreBtn = () => {
  loadMoreBtn.classList.remove('is-hidden');
};

export const hideLoadMoreBtn = () => {
  loadMoreBtn.classList.add('is-hidden');
};