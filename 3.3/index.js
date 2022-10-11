const slideCarousel = document.querySelector('.slide-carousel');
const carouselImages = document.querySelectorAll('.image');

//   Buttons
const prevBtn = document.querySelector('#prev-btn');
const nextBtn = document.querySelector('#next-btn');

// counter
let counter = 1;
const size = carouselImages[0].clientWidth;

const dots = document.querySelectorAll('.dot');
slideCarousel.style.transform = `translateX(${-size * counter}px)`;


//   Next and prev functions

function nextImage() {
  if (counter >= carouselImages.length - 1) {return;};
  counter++;
  slideCarousel.style.transition ='transform 0.3s ease-in-out';
  slideCarousel.style.transform = `translateX(${-size * counter}px)`;
  dots[counter - 2].className = dots[counter - 2].className.replace(' active', '');
  if (counter === carouselImages.length - 1) {
    dots[0].className += ' active';
  } else {
    dots[counter - 1].className += ' active';
  };
};

nextBtn.addEventListener('click', nextImage);

function prevImage() {
  if (counter <= 0) {return;};
  counter--;
  slideCarousel.style.transition ='transform 0.3s ease-in-out';
  slideCarousel.style.transform = `translateX(${-size * counter}px)`;
  dots[counter].className = dots[counter].className.replace(' active', '');
  if (counter === 0) {
    dots[carouselImages.length -3].className += ' active';
  } else {
    dots[counter - 1].className += ' active';
  };
};

prevBtn.addEventListener('click', prevImage);

slideCarousel.addEventListener('transitionend', () => {
  if(carouselImages[counter].id === 'clone-last') {
    slideCarousel.style.transition = 'none';
    counter = carouselImages.length - 2;
    slideCarousel.style.transform = `translateX(${-size * counter}px)`;
  };
  if(carouselImages[counter].id === 'clone-first') {
    slideCarousel.style.transition = 'none';
    counter = 1;
    slideCarousel.style.transform = `translateX(${-size * counter}px)`;
  };
});

function dotBtn(n) {
  dots[counter - 1].className = dots[counter - 1].className.replace(' active', '');
  counter = n;
  slideCarousel.style.transition ='transform 0.3s ease-in-out';
  slideCarousel.style.transform = `translateX(${-size * counter}px)`;
  dots[counter - 1].className += ' active';
};

// =====  Image to modal size  ====
const modal = document.querySelector('#myModal');

function modalSize() {
  const modalImg = document.querySelector('#img01');
  const captionText = document.querySelector('#caption');
  modal.style.display = "block";
  modalImg.src = carouselImages[counter].src;
  captionText.innerHTML = carouselImages[counter].alt;
}

function closeModal() {
  modal.style.display = "none";
}

//  set interval

let interval = setInterval(nextImage, 3000);
document.querySelector('.slide-container').addEventListener('mouseover', () => {
  clearInterval(interval);
});
document.querySelector('.slide-container').addEventListener('mouseout', () => {
  interval = setInterval(nextImage, 3000);
});