import styles from './_scss/main.scss';


(function() {
  
  const navLinks = document.querySelectorAll('.top-nav a');

	function scrollTo(element) {
		element.scrollIntoView({
      behavior: 'smooth',
      block: 'start' 
		});
	}

	navLinks.forEach( element => {
		element.addEventListener('click', el => {
      el.preventDefault();
      scrollTo(document.querySelector(`#${el.target.dataset.scroll}`));
		});
	});



  // trim polyfill : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
  if (!String.prototype.trim) {
    (function() {
      // Make sure we trim BOM and NBSP
      var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
      String.prototype.trim = function() {
        return this.replace(rtrim, '');
      };
    })();
  }

  [].slice.call( document.querySelectorAll( '.form-control' ) ).forEach( function( inputEl ) {
    // in case the input is already filled..
    if( inputEl.value.trim() !== '' ) {
      inputEl.parentNode.classList.add( 'input--filled' );
    }

    // events:
    inputEl.addEventListener( 'focus', onInputFocus );
    inputEl.addEventListener( 'blur', onInputBlur );
  } );

  function onInputFocus( ev ) {
    ev.target.parentNode.classList.add( 'input--filled' );
  }

  function onInputBlur( ev ) {
    if( ev.target.value.trim() === '' ) {
      ev.target.parentNode.classList.remove( 'input--filled' );
    }
  }


const slidesWrapper = document.querySelector('.slides__wrapper'); 
const slideArrowPrev = document.querySelector('.slider__arrow--prev'); 
const slideArrowNext = document.querySelector('.slider__arrow--next'); 

let currentStep = 0;
slidesWrapper.style.transform = `translateX(${currentStep}vw)`;

slideArrowPrev.addEventListener('click', () => {
  slideArrowNext.style.display = 'block';
  const activeSlide = getActiveSlide();
  if (activeSlide.previousElementSibling !== null ) {
    activeSlide.previousElementSibling.classList.add('slide__item--active');
    activeSlide.classList.remove('slide__item--active');
    activeSlide.previousElementSibling.previousElementSibling == null ? slideArrowPrev.style.display = 'none' : false ;
    moveSlides('prev');
  } 
});

slideArrowNext.addEventListener('click', (el) => {
  slideArrowPrev.style.display = 'block';
  const activeSlide = getActiveSlide();
  if (activeSlide.nextElementSibling !== null ) {
    activeSlide.nextElementSibling.classList.add('slide__item--active');
    activeSlide.classList.remove('slide__item--active');
    activeSlide.nextElementSibling.nextElementSibling == null ? slideArrowNext.style.display = 'none' : false ;
    moveSlides('next'); 
  }

});

function moveSlides(direction) {
  direction == 'prev' ? currentStep += 33 : currentStep -= 33;    
  slidesWrapper.style.transform = `translateX(${currentStep}vw)`;
}

function getActiveSlide() {
  return document.querySelector('.slide__item--active');
}


const overlayTriggers = document.querySelectorAll('.slide__overlay--trigger');

overlayTriggers.forEach(function (trigger) {
  trigger.addEventListener("click", function(event) {
    event.preventDefault();
    triggerOverlay(event.target.src);
  }, false);
});


function triggerOverlay(imageSrc) {
  let overlay = createOverlay(imageSrc);

  document.body.appendChild(overlay);

  overlay.addEventListener("click", function() {
      document.body.removeChild(this);
    }, false);
}

function createOverlay(src) {
  const newOverlay = document.createElement("div");
  const newImage = document.createElement("img");
  const newButton = document.createElement("button");

  newOverlay.classList.add('overlay__wrapper');
  newImage.classList.add('overlay__image');
  newImage.srcset = src;
  newButton.classList.add('overlay__close');

  newOverlay.appendChild(newImage);  
  newOverlay.appendChild(newButton);  
  return newOverlay;
}

})();
