window.onload = () => {
  const loader = {
    init: function () {
      this.loading();
    },
    loading: function () {
      const loader = document.querySelector('.loader');

      function loaded() {
        loader.classList.add('active');
      }
      setTimeout(loaded, 1);
    }
  }
  loader.init();

  const animation = {
    init:function(){
      this.animation();
    },
    animation:function(){
      const items = document.querySelectorAll('.hotline-group a');
      setInterval(() => {
        items.forEach(item => item.classList.add('animation'));
      }, 5000)
      items.forEach(item => item.addEventListener('animationend', () => {
        item.classList.remove('animation')
      }))
    }
  }
  animation.init();

  const nav = {
    init: function () {
      this.nav();
      this.scroll();
    },
    nav: function () {
      const navOpen = document.querySelector('.nav-button');
      const navClose = document.querySelector('.nav-close');
      const nav = document.querySelector('.nav');

      navOpen.addEventListener('click', () => {
        nav.classList.add('active');
      })

      navClose.addEventListener('click', () => {
        nav.classList.remove('active');
      })
    },
    scroll: function () {
      const onTopBtn = document.querySelector('.onTop');
      const nav = document.querySelector('header');
      const logo = document.querySelector('header .logo img');

      window.addEventListener('scroll', () => {
        if (window.scrollY > nav.offsetHeight) {
          onTopBtn.classList.add('active');
          nav.classList.add('active');
          logo.src = './images/logo/dila-english-logo-dark.png'
        } else if (window.scrollY === 0) {
          onTopBtn.classList.remove('active');
          nav.classList.remove('active');
          logo.src = './images/logo/dila-english-logo-white.png'
        }
      })
    }
  }
  nav.init();

  const grabSlider = {
    init: function () {
      this.grabSlider();
    },
    grabSlider: function () {
      const slider = document.querySelector('.courses .courses-items');
      if (slider === null) return;
      let isDown;

      slider.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
        slider.style.scrollBehavior = 'unset';
      })

      slider.addEventListener('mouseleave', () => {
        isDown = false;
      })

      slider.addEventListener('mouseup', () => {
        isDown = false;
      })

      slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        const x = e.pageX - slider.offsetLeft;
        const walk = x - startX;
        slider.scrollLeft = scrollLeft - walk;
      })
    }
  }
  grabSlider.init();

  const countUp = {
    init: function () {
      this.countUp('.count', '.number');
    },
    countUp: function (selfItem, itemNumber) {
      const self = document.querySelectorAll(selfItem);
      const time = 2000;

      self.forEach(i => {
        const items = i.querySelectorAll(itemNumber);

        let counter = 0;

        function countUp(item) {
          let step = Math.ceil(item.dataset.count / time);
          item.innerHTML = counter + '+';
          counter = counter + step;;

          if (counter < item.dataset.count) {
            setTimeout(function () {
              countUp(item);
            }, 1)
          }
          else if (counter >= item.dataset.count) {
            item.innerHTML = item.dataset.count + '+';
          }
        }

        const options = {
          threshold: 0.5,
          rootMargin: "0px",
        };

        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (!entry.isIntersecting) {
              return;
            } else {
              countUp(entry.target);
              observer.unobserve(entry.target);
            }
          })
        }, options);

        items.forEach(item => {
          observer.observe(item);
        })
      })

    }
  }
  countUp.init();

  const gallery = {
    init: function () {
      this.popUp('.gallery', 'img');
    },
    popUp: function (selfItem, imageItem) {
      const self = document.querySelectorAll(selfItem);

      // --------------------- Create Popup Element ------------------------ //
      function createPopup() {
        // Setting Popup
        const popUp = document.createElement('div');
        popUp.className = 'gal-popUp';
        popUp.style.cssText = 'position: fixed; z-index: 100; top: 0; left: 0; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.8); transition: 0.5s; opacity: 0; pointer-events:none;';

        // Setting Image
        const image = document.createElement('img');
        image.className = 'gal-image';
        image.src = '#';
        image.style.cssText = 'position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); height: 90%; object-fit: contain;';

        // Setting Next Button
        const nextBtn = document.createElement('div');
        nextBtn.className = 'gal-next';
        nextBtn.style.cssText = 'position: absolute; top: 50%; transform: translateY(-50%); right: 20px; color: #fff; font-size: 4rem; cursor: pointer;'
        nextBtn.innerHTML = '<img src="./images/icons/icon-arrow-gallery-next.svg" alt="" />';

        // Setting Prev Button
        const prevBtn = document.createElement('div');
        prevBtn.className = 'gal-prev';
        prevBtn.style.cssText = 'position: absolute; top: 50%; transform: translateY(-50%); left: 20px; color: #fff; font-size: 4rem; cursor: pointer;'
        prevBtn.innerHTML = '<img src="./images/icons/icon-arrow-gallery-prev.svg" alt="" />';

        // Setting Close Button
        const closeBtn = document.createElement('div');
        closeBtn.className = 'gal-close';
        closeBtn.style.cssText = 'position: absolute; right: 20px; top: 20px; color: #fff; font-size: 4rem; cursor: pointer;'
        closeBtn.innerHTML = '<img src="./images/icons/icon-close-white.svg" alt="" />';

        // Setting Index of Image
        const index = document.createElement('div');
        index.className = 'gal-index';
        index.style.cssText = 'position: absolute; right: 10px; bottom: 10px; color: #fff; font-size: 2rem;'
        index.innerHTML = '01 / 06';

        self.forEach(i => {
          i.appendChild(popUp);
          popUp.appendChild(image);
          popUp.appendChild(nextBtn);
          popUp.appendChild(prevBtn);
          popUp.appendChild(closeBtn);
          popUp.appendChild(index);
        })
      }
      createPopup();

      // --------------------- Function Popup Element ------------------------ //

      function popUpElement(index) {
        self.forEach(i => {
          const popup = i.querySelector('.gal-popUp');
          const items = i.querySelectorAll('.gallery .gallery-image img');

          const image = popup.querySelector('.gal-image');
          const nextBtn = popup.querySelector('.gal-next');
          const prevBtn = popup.querySelector('.gal-prev');
          const closeBtn = popup.querySelector('.gal-close');
          const indexNumber = popup.querySelector('.gal-index');

          let indexImage = index;
          indexNumber.innerHTML = `${indexImage + 1} / ${items.length - 1}`;

          popup.style.opacity = '1';
          popup.style.pointerEvents = 'unset';
          image.src = items[indexImage].src;

          nextBtn.addEventListener('click', () => {
            if (indexImage >= items.length - 2) indexImage = -1;
            indexImage++;
            image.src = items[indexImage].src;
            indexNumber.innerHTML = `${indexImage + 1} / ${items.length - 1}`;
          })

          prevBtn.addEventListener('click', () => {
            if (indexImage <= 0) indexImage = items.length - 1;
            indexImage--;
            image.src = items[indexImage].src;
            indexNumber.innerHTML = `${indexImage + 1} / ${items.length - 1}`;
          })

          closeBtn.addEventListener('click', () => {
            popup.style.opacity = '0';
            popup.style.pointerEvents = 'none';
          })
        });
      }

      self.forEach(i => {
        const items = i.querySelectorAll(imageItem);

        items.forEach((item, index) => item.addEventListener('click', () => {
          popUpElement(index);
        }))
      })
    }
  }
  gallery.init()

  const owl = {
    init: function () {
      this.slider();
    },
    slider: function () {
      $('.owl-carousel.testimonial').owlCarousel({
        loop: true,
        margin: 10,
        nav: false,
        autoplay: true,
        responsive: {
          0: {
            items: 2
          },
          768: {
            items: 3
          },
          991: {
            items: 5
          }
        }
      })

      $('.owl-carousel.about').owlCarousel({
        loop: true,
        margin: 15,
        nav: false,
        autoplay: true,
        responsive: {
          0: {
            items: 1
          },
          575: {
            items: 2
          },
          991: {
            items: 3
          }
        }
      })
    }
  }
  owl.init();
}

