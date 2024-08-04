/* ARCHIVE */


// Open modal overlay
function openModal() {
  document.body.classList.add('modal-open')
}


// Close modal overlay
function closeModal() {
  document.body.classList.remove('modal-open')
}


// Set up modal overlay close button
const closeButton = document.querySelector('.close-btn')
closeButton.addEventListener('click', closeModal)


// Set up modal content sections
const featuredContent = document.querySelector('.featured-content')
const additionalContent = document.querySelector('.additional-content')
const informationContent = document.querySelector('.information-content')


// Set up grid event listeners
const gridItems = document.querySelectorAll('.grid-item')


// Cycle through all grid items in the document and add click event
for (let i = 0; i < gridItems.length; i++) {
  gridItems[i].addEventListener('click', openItem)
}


// Set up grid item content in modal and open modal
function openItem() {


  // Get project info
  let projectName = this.getAttribute('data-name')
  let projectDate = this.getAttribute('data-date') || ''
  let projectInfo = this.getAttribute('data-info') || ''
  let projectImage = this.querySelector('img').getAttribute('src')
  

  
  // Create featured section
  let _featured = `
    <div class="project-image"><img src="${projectImage}" alt="${projectInfo}"></div>
  `;

  // Print featured content into featured div
  featuredContent.innerHTML = _featured

  // Create information section
  let _information = `
    <div class="project-name">${projectName}</div>
    <div class="project-info">${projectInfo}</div>
    <div class="project-date">${projectDate}</div>
  `;

  // Print information content into featured div
  informationContent.innerHTML = _information
  


  // Set up additional content
  const additionalImages = this.querySelector('.additional-images').querySelectorAll('img')

  let imagesCount = additionalImages.length
  let imagesPlace = 0
  let _additional = ``

  if (imagesCount > 4) {
    _additional += `
    <div class="additional-prev"><img src="images/arrow-left.svg"></div>
    `
  }

  _additional += `
    <div class="additional-content-image selected-image" 
         style="background-image:url(${projectImage})" 
         data-info="${projectInfo}"
         data-img="${projectImage}">
    </div>
  `
  

  for (let i = 0; i < additionalImages.length; i++) {
    let _src = additionalImages[i].getAttribute('src')
    let _alt = additionalImages[i].getAttribute('alt')
    _additional += `
    <div class="additional-content-image  ${i >= 4 ? "hide-image" : ""} " 
         style="background-image:url(${_src});" 
         data-info="${projectInfo}"
         data-img="${_src}"
         >
    </div>
    `;
  }

  if (imagesCount > 4) {
    _additional += `
    <div class="additional-next"><img src="images/arrow-right.svg"></div>
    `
  }


  // Print additional content into additional div
  additionalContent.innerHTML = _additional


  if (imagesCount > 4) {
    let prev = document.querySelector('.additional-prev')
    let next = document.querySelector('.additional-next')
    let list = document.querySelectorAll('.additional-content-image')
    prev.addEventListener('click', () => {
      if (imagesPlace > 0) {
        imagesPlace--
        let _end = imagesPlace + 5
        list[_end].classList.add('hide-image')
        list[imagesPlace].classList.remove('hide-image')
      }
    })
    next.addEventListener('click', () => {
      if (imagesPlace + 4 < imagesCount) {
        list[imagesPlace].classList.add('hide-image')
        let _end = imagesPlace + 5
        list[_end].classList.remove('hide-image')
        imagesPlace++
      }
    })
  }


  // Open modal with the content inside
  openModal()

  selectImages()

}


// Additional image modal functionality
function selectImages() {


  let allImages = additionalContent.querySelectorAll('.additional-content-image')


  for (let i = 0; i < allImages.length; i++) {
    allImages[i].addEventListener('click', function() {
      document.querySelector('.selected-image').classList.remove('selected-image')
      this.classList.add('selected-image')
      let _src = this.getAttribute('data-img')
      let _alt = this.getAttribute('data-info')

      document.querySelector('.project-info').innerHTML = `${_alt}`
      document.querySelector('.project-image').innerHTML = `<img src="${_src}" alt="${_alt}">`

    });
  }


}

// Add title and date to grid item cards
function gridItemCardInfo() {
  let cards = document.querySelectorAll('.grid-item')
  for (let i = 0; i < cards.length; i++) {
    let card = cards[i]
    let newEl = document.createElement('div')
    let cardTitle = card.getAttribute('data-name')
    let cardDate = card.getAttribute('data-date')
    newEl.setAttribute('class', 'grid-item-title-date')
    
    newEl.innerHTML = `
    <div class="grid-item-title">${cardTitle}</div>
    <div class="grid-item-date">${cardDate}</div>
    `
    card.appendChild(newEl)
  }
}

gridItemCardInfo()



// Mobile menu open and close

function mobileMenu() {
  if (document.querySelector('.menu-icon')) {
    let icon = document.querySelector('.menu-icon')
    icon.addEventListener('click', () => {
      document.querySelector('body').classList.toggle('menu-active')
    })

    let navLinks = document.querySelectorAll('nav a')
    for (let i = 0; i < navLinks.length; i++) {
      navLinks[i].addEventListener('click', () => {
        document.querySelector('body').classList.toggle('menu-active')
      })
    }
  }
}

mobileMenu()

let currentSlide = 0; // Index for tracking the current slide
const slideInterval = 5000; // Time between slides in milliseconds (e.g., 5000ms for 5 seconds)
let autoSlideInterval;

function setupCarousel() {
    const carouselWrapper = document.querySelector('.custom-carousel-wrapper');
    const items = Array.from(document.querySelectorAll('.custom-carousel-item'));
    const totalItems = items.length;

    // Clone the items to create an infinite loop effect
    const clones = [...items, ...items];
    
    // Add cloned items to the wrapper
    carouselWrapper.innerHTML = '';
    clones.forEach(item => carouselWrapper.appendChild(item.cloneNode(true)));

    // Set the width of the carousel wrapper to fit all items
    carouselWrapper.style.width = `${(totalItems + totalItems) * 100}%`;
    document.querySelector('.custom-carousel').style.transform = `translateX(-${items[0].offsetWidth}px)`;

    // Start automatic sliding
    autoSlideInterval = setInterval(nextSlide, slideInterval);
}

function moveToSlide(slideIndex) {
    const carouselWrapper = document.querySelector('.custom-carousel-wrapper');
    const itemWidth = document.querySelector('.custom-carousel-item').offsetWidth;
    const totalItems = document.querySelectorAll('.custom-carousel-item').length / 2;

    carouselWrapper.style.transition = 'transform 0.8s ease-in-out'; // Match with CSS transition timing
    carouselWrapper.style.transform = `translateX(-${(slideIndex + 1) * itemWidth}px)`;

    // If the last slide is reached, reset the position without transition
    if (slideIndex === totalItems - 1) {
        setTimeout(() => {
            carouselWrapper.style.transition = 'none';
            carouselWrapper.style.transform = `translateX(-${itemWidth}px)`;
            currentSlide = 0;
        }, 800); // Match with CSS transition timing
    }
}

function nextSlide() {
    const totalItems = document.querySelectorAll('.custom-carousel-item').length / 2;
    currentSlide = (currentSlide + 1) % totalItems;
    moveToSlide(currentSlide);
}

document.addEventListener('DOMContentLoaded', () => {
    setupCarousel();
});
