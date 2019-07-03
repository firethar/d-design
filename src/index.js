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
  direction == 'prev' ? currentStep += 33.33 : currentStep -= 33.33;    
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

function startSlidesLoop() {
  // const activeHeroSlide = document.querySelector('.hero__slide.is-active'); 
  const firstSlide = document.querySelector('.hero__slide:first-child');

  if (firstSlide.classList == 'hero__slide is-active') {
    //first slide is active, so start animation
    animateSlide(firstSlide); 
  } else {
    //console.log('first slide not active');
    activateSlide(firstSlide.nextElementSibling);
  }
}


function animateSlide(activeSlide) {
  setTimeout(() => {
    activeSlide.classList.add('animate');
  }, 50);

  setTimeout(() => {
    // console.log('Animation ended');
    //remove active state with animation
    activeSlide.classList.remove('is-active', 'animate');
    const activePaginate = document.querySelector('.hero__pagination .is-active');
    activePaginate ? activePaginate.classList.remove('is-active') : false;
    //move to another slide and activate it
    activateSlide(isLastSlide(activeSlide));       
  }, 4000);
}
function isLastSlide(currentSlide) {
  if (!currentSlide.nextElementSibling) {
    //if is last slide, then return the first one
    return document.querySelector('.hero__slide:first-child');
  } else {
    //return it
    return currentSlide.nextElementSibling;
  }
}
function activateSlide(slide) {
  //check if it is not active
  if (slide.classList == 'hero__slide') {
    //activate it
    slide.classList.add('is-active');
    paginate(slide);
    // and start animation
    animateSlide(slide);
  } 
  else {
    //slide already active
    animateSlide(slide);
  }
}

function paginate(currentSlide){
  document.querySelector(`[data-paginate="${currentSlide.dataset.slide}"]`).classList.add('is-active');
}

startSlidesLoop();


//SVG PATH
// getting the length of the svg path
const svg = document.getElementById("theMotionPath");
// console.log(svg.points);

// adjusting the SVG height and width to fit the body
const totalSvgHeight = document.body.clientHeight - document.documentElement.clientHeight * 0.5;

svg.points[0].x = document.documentElement.clientWidth;
svg.points[0].y = 0;

svg.points[1].x = 0;
svg.points[1].y = totalSvgHeight * 0.19;

svg.points[2].x = document.documentElement.clientWidth;
svg.points[2].y = totalSvgHeight * 0.40;

svg.points[3].x = 0;
svg.points[3].y = totalSvgHeight * 0.60;

svg.points[4].x = document.documentElement.clientWidth;
svg.points[4].y = totalSvgHeight * 0.83;

svg.points[5].x = 0;
svg.points[5].y = totalSvgHeight;

const svgLength = svg.getTotalLength();
// console.log('body: ', document.body.scrollHeight);
// console.log('strokeDasharray: ', svg.style.strokeDasharray);
// console.log('svg lenght: ', length);
// console.log('svg height: ', svg.length);

// start position of the drawing - normal display pre-animation
svg.style.strokeDasharray = svgLength;

// hides the svg before the scrolling starts
svg.style.strokeDashoffset = svgLength;

// offset the svg dash by the same amount as the percentage scrolled
window.addEventListener("scroll", function () {
  const scrollpercent = (document.body.scrollTop + document.documentElement.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
  console.log(scrollpercent);
  const draw = svgLength * scrollpercent + document.documentElement.clientHeight * 0.5;
  // console.log(draw);

  // Reverse the drawing (when scrolling upwards)
  svg.style.strokeDashoffset = svgLength - draw;

  // Get the position of a point at <scrollPercentage> along the path.
  var pt = svg.getPointAtLength(draw - 35);
  
  // Position the moon at this point
  var moon = document.getElementById("moon");
  moon.style.transform = `translate(${pt.x}px, ${pt.y}px)`;

});

})();
