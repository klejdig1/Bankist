'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelector('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const accountModal = document.querySelector('#closeAccountModal');


// work

const openModal=()=>{
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal=()=>{
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

btnsOpenModal.addEventListener('click',(e)=>{
    e.preventDefault();
    openModal()
})

accountModal.addEventListener('click',(e)=>{
    closeModal()
})



 // button scrolling
 btnScrollTo.addEventListener('click',(e)=>{
     const s1coords=section1.getBoundingClientRect();
     console.log(s1coords);

     console.log(e.target.getBoundingClientRect())

     console.log('current scroll (X/Y)',window.pageXOffset,pageYOffset);

     console.log('height/width viewport',
         document.documentElement.clientHeight,
         document.documentElement.clientWidth);

 //     scrolling
 //     window.scrollTo(s1coords.left + window.pageXOffset,s1coords.top + window.pageYOffset);

     // window.scrollTo({
     //   left: s1coords.left + window.pageXOffset,
     //    top: s1coords.top + window.pageYOffset,
     //     behavior:'smooth',
     //
     // })

     section1.scrollIntoView({
         behavior:'smooth',
     });
 });


////////////////////////////////////////////////////////////
// page navigation

document.querySelectorAll('.nav__link-scroll').forEach((btn)=>{
     btn.addEventListener('click',(e)=>{
         e.preventDefault()
       const id = e.target.getAttribute('href');
         document.querySelector(id).scrollIntoView({
             behavior:'smooth',
         })
    });
});


// tabbed component

tabsContainer.addEventListener('click',(e)=>{
    const clicked=e.target.closest('.operations__tab');
    if (!clicked) return;

//     remove activate classes
tabs.forEach((t)=>{
    t.classList.remove('operations__tab--active')
});
    tabsContent.forEach((c)=>{
        c.classList.remove('operations__content--active');
    });

    //     active tab

    clicked.classList.add('operations__tab--active')

//     active content area

    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')

});


// menu fate animation

const handleHover=function (e){
    if (e.target.classList.contains('nav__link')){
        const  link =e.target;
        const siblings=link.closest('.nav').querySelectorAll('.nav__link');
        const logo = link.closest('.nav').querySelector('img');

        siblings.forEach((el)=>{
            if (el !== link){
                el.style.opacity=this;

            }
        })
        logo.style.opacity=this;

    }

};


// const obsCallBack=(enties,observer)=>{
//     enties.forEach((entry)=>{
//         console.log(entry);
//     })
// };
//
// const obsoptions ={
//     root: null,
//     threshold:[0,0.2],
// };

// const obsrver=new IntersectionObserver(obsCallBack,obsoptions);
// obsrver.observe(section1);

const header = document.querySelector('.header');
const navHeight=nav.getBoundingClientRect().height;

const stickyNav=(entries)=>{
    const [entry]=entries;

    if (!entry.isIntersecting) {
        nav.classList.add('sticky');
    }else {
        nav.classList.remove('sticky');

    }
};

const headerObserver=new IntersectionObserver(stickyNav,{
    root:null,
    threshold:0,
    rootMargin:`-${navHeight}px`,
});
headerObserver.observe(header);


// reveal section
const allSectionObserver=document.querySelectorAll('.section');

const revealSection = function (entries,obserever){
const [entry]=entries;

    if (!entry.isIntersecting) return;
        entry.target.classList.remove('section--hidden');

        obserever.unobserve(entry.target);

};

const sectionObserver=new IntersectionObserver(revealSection,{
    root:null,
    threshold:0.15,

});
allSectionObserver.forEach((section)=>{
sectionObserver.observe(section);
// section.classList.add('section--hidden');

});


// lazy loading images
const revealImg=function (entries,observer){
    const[entry]=entries;
    if (!entry.isIntersecting) return;

        // replace src with data-src
        entry.target.src=entry.target.dataset.src;
        entry.target.addEventListener('load',()=>{
            entry.target.classList.remove('lazy-img');
        });
        observer.unobserve(entry.target);


};

const imgTargets = document.querySelectorAll('img[data-src]');

const imgObserver = new IntersectionObserver(revealImg,{
root:null,
    threshold:0,
    rootMargin:'100px',

});

imgTargets.forEach((img)=>{
    imgObserver.observe(img);
});



// slider
const slider=function () {
    const slides = document.querySelectorAll('.slide');
    const btnLeft = document.querySelector('.slider__btn--left');
    const btnRight = document.querySelector('.slider__btn--right');
    const dotContainer = document.querySelector('.dots');

    let currentSlide = 0;
    const maxSlide = slides.length


// functions


    const createDots = () => {
        slides.forEach((_, i) => {
            dotContainer.insertAdjacentHTML('beforeend',
                `<button class="dots__dot" data-slide="${i}"></button>`
            )
        });
    };


    const activateDot = function (slide) {
        document.querySelectorAll('.dots__dot').forEach((dot) => {
            dot.classList.remove('dots__dot--active');
            document.querySelector(`.dots__dot[data-slide='${slide}'`).classList.add('dots__dot--active');

        });
    };


    const goToSlide = function (slide) {
        slides.forEach((s, i) => {
            s.style.transform = `translateX(${100 * (i - slide)}%)`;
        });
    };


// next slide

    const nextSlide = function () {
        if (currentSlide === maxSlide - 1) {
            currentSlide = 0;
        } else {
            currentSlide++;

        }

        goToSlide(currentSlide);
        activateDot(currentSlide)
    };

    const prevSlide = function () {
        if (currentSlide === 0) {
            currentSlide = maxSlide - 1;

        } else {
            currentSlide--;
        }
        goToSlide(currentSlide)
        activateDot(currentSlide)
    }

    const init = function () {
        goToSlide(0);
        createDots();
        activateDot(0)

    };
    init()

// event handlers
    btnRight.addEventListener('click', nextSlide);
    btnLeft.addEventListener('click', prevSlide);


    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        }
        ;
        if (e.key === 'ArrowRight') {
            nextSlide();
        }

    });

    dotContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('dots__dot')) {
            const {slide} = e.target.dataset;
            goToSlide(slide);
            activateDot(slide);

        }
    });


};
slider();







// // passing argument int handler
// nav.addEventListener('mouseover',handleHover.bind(0.5));
// nav.addEventListener('mouseout',handleHover.bind(1));
//
//
//
// // sticky navigation
// const initionalCoord=section1.getBoundingClientRect();
// console.log(initionalCoord);
//
// window.addEventListener('scroll',(e)=>{
//
// if (window.scrollY>initionalCoord.top){
//     nav.classList.add('sticky')}
// else nav.classList.remove('sticky');
//
//
// })



/*************************************************************************************************/

// select elements
//
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);
//
// const header=document.querySelector('.header');
// const allSection=document.querySelectorAll('.section');
// console.log(allSection);
//
// document.getElementById('section--1');
// const allButtons=document.getElementsByTagName('button')
// console.log(allButtons);
//
// console.log(document.getElementsByClassName('btn'));
//
// // creating and inserting elements
// const message=document.createElement('div');
// message.classList.add('cookie-message');
// // message.textContent='we use cookies for improved functionality and analytics';
// message.innerHTML='we use cookies for improved functionality and analytics.' +
//     '<button class="btn btn--close-cookie">Got it</button>';
// // header.prepend(message);
// header.append(message);
//
// // header.before(message);
// // header.after(message);
//
// // deleted elements
//
//  document.querySelector('.btn--close-cookie')
//     .addEventListener('click',()=>{
// message.remove();
// });
//
// //  styles
//
// message.style.backgroundColor='#37383d';
// message.style.width='120%';
//
// console.log(message.style.color);
// console.log(message.style.backgroundColor);
//
// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message).height);
//
// message.style.height = Number.parseFloat( getComputedStyle(message).height,  10)+ 30 + 'px';
//
// document.documentElement.style.setProperty('--color-primary','orangered')
//
// // attributes
//
// const logo=document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.src);
// console.log(logo.className);
//
// logo.alt='Beautiful minimalist logo';
//
// // non-standard
// console.log(logo.getAttribute('designer'));
// console.log(logo.designer);
// logo.setAttribute('company','Bankist');
//
// console.log(logo.src);
// console.log(logo.getAttribute('src'));
//
//
// const twLink=document.querySelector('.nav__link--btn');
// console.log(twLink.href);
// console.log(twLink.getAttribute('href'));
//
// // data attributes
//
// console.log(logo.dataset.versionNumber);
//
// // classes
//
// logo.classList.add('hello','m');
// logo.classList.remove('hi','m');
// logo.classList.toggle('world');
// logo.classList.contains('her');
//
// // don't use
// logo.className='jonas';
//
//
//

// const h1 =document.querySelector('h1');
//
// const alertH1=(e)=>{
//     alert('addaventlistner:great');
//
// };
//
// h1.addEventListener("mouseenter", alertH1);
//
// setTimeout(()=>{
//     h1.removeEventListener("mouseenter",alertH1);
//
// },3000)
// h1.onmouseenter=(e)=>{
//     alert('addaventlistner:great')
//
// }

// keydown

// document.addEventListener("keydown", function(event) {
//     alert("U shtyp tasti: "+event.key);
// });
//
//
// window.addEventListener("load", function() {
//     console.log("Faqja u ngarkua plotësisht!");
// });

// rgb(255,255,255)

// const randomInt=(min,max)=>{return Math.floor(Math.random()*(max-min+1)+min)};
// const randomColor=()=>{return`rgb(${randomInt(0,255)},
// ${randomInt(0,255)},${randomInt(0,255)})`};
//
// document.querySelector('.nav__link').addEventListener('click',(e)=>{
//     e.preventDefault();
//   e.target.style.backgroundColor = randomColor();
//     console.log('1',e.target,e.currentTarget);
//
// //   stop propagation
// //     e.stopPropagation()
// });
// document.querySelector('.nav__links').addEventListener('click',(e)=>{
//     e.preventDefault()
//     e.target.style.backgroundColor = randomColor();
//     console.log('2',e.target,e.currentTarget);
//
//
// });
// document.querySelector('.nav').addEventListener('click',(e)=>{
//     e.preventDefault()
//     e.target.style.backgroundColor = randomColor();
//     console.log('3',e.target,e.currentTarget);
//
// });

//
//  const h1 = document.querySelector('h1');
//
// //  going downward : child
//
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.children);
// h1.firstElementChild.style.color='blue';
// h1.lastElementChild.style.color='red';
//
// // going Upwards : parents
// console.log(h1.parentNode);
// console.log(h1.parentElement);
//
// h1.closest('.header').style.backgroundColor='yellow';
// h1.closest('h1').style.backgroundColor='pink';
// h1.closest('h1').style.borderRadius='12px';
//
// // going sideways: siblings
//
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);
//
// console.log(h1.previousSibling);
// console.log(h1.nextSibling);
//
// console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach((el)=>{
//     if (el !== h1)el.style.transform='scale(0.5)'
// })



// // try
//
// const JustTry = document.querySelector('.try');
//
// console.log(JustTry.previousElementSibling);
// console.log(JustTry.nextElementSibling);
//



document.addEventListener('DOMContentLoaded',(e)=>{
    console.log('html parsed and dom tree built!',e);
});


window.addEventListener('load',(e)=>{
    console.log('Page full loaded',e);
});
//
// window.addEventListener('beforeunload',(e)=>{
//     e.preventDefault();
//     console.log(e);
//     e.returnValue='';
// });
