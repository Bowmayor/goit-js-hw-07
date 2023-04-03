import { galleryItems } from './gallery-items.js';
// Change code below this line

function createGalleryMarkup(items) {
  return galleryItems
    .map(
      (item) => `
    <li class="gallery__item">
      <a class="gallery__link" href="${item.original}">
        <img
          class="gallery__image"
          src="${item.preview}"
          data-source="${item.original}"
          alt="${item.description}"
        />
      </a>
    </li>
  `
    )
    .join("");
}

const galleryList = document.querySelector(".gallery");
galleryList.insertAdjacentHTML("beforeend", createGalleryMarkup(galleryItems));

galleryList .addEventListener("click", onGalleryItemClick);

function onGalleryItemClick(event) {
    event.preventDefault();

    const target = event.target;

    if (target.nodeName !== "IMG") {
        return;
    }

    const originalSrc = target.dataset.source;

    const instance = basicLightbox.create(`
    <div class="modal">
      <img src="${originalSrc}" alt="" />
    </div>
  `);

    instance.show();
    
    const modal = document.querySelector('.modal');

    modal.addEventListener('click', event => {
        const closeButton = event.target.closest('.modal__button');
        const modalImg = modal.querySelector('img');
    
        if (event.target === modalImg || closeButton) {
            instance.close();
            modal.removeEventListener('click', closeModal);
        }
    });
};

console.log(galleryItems);
