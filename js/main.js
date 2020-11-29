



let request = null,
  current = false,
  cache = {},
  container = document.querySelector('#photo-container'),
  frame = document.querySelector('#photo-viewer'),
  thumbs = document.querySelectorAll('.thumb');

let figcaption = document.querySelector('#photo-container figcaption');

console.log(figcaption)

thumbs.forEach((e) => {
  e.href = e.firstElementChild.src
});

// ----------funkcja realizująca przejście

function crossfade(img) {

  if (current) {
    current.classList.remove('actived');
  }
  img.classList.add('actived');

  if (typeof img.alt){
    figcaption.innerText = img.alt;
  }else{
    figcaption.innerText = 'brak podpisu';
  }

  current = img;
}

// ----------zdarzenie
container.addEventListener('click', (e) => {
    if (!e.target.parentNode.classList.contains('thumb')) return;

  e.preventDefault();

    let that = e.target.parentNode,
    src = that.href, //a.thumb.href
    title = that.title
    img = null;


   request = src;

  // ----------zmiana klas na miniaturach
  thumbs.forEach((thumb) => {
    thumb.classList.remove('actived');
  });
  that.classList.add('actived');

  // ----------ustawienie obiektu konfiguracyjnego cashe

  if (cache.hasOwnProperty(src)) {
    if (cache[src].isLoading === false) {
      crossfade(cache[src].img)
    }
  } else {
    img = document.createElement('img');
    img.setAttribute('src', src);
    img.setAttribute('alt', title);

    cache[src] = {
      img,
      isLoading: true
    }
  }

  if (cache[src].isLoading === true) {
    frame.classList.add('is-loading');
  }

console.log(cache)

  let currentImg = cache[src].img

  // ----------zdarzenie load na img

  currentImg.addEventListener('load', function () {

    currentImg.classList.remove('actived');
    frame.classList.remove('is-loading');
    frame.appendChild(currentImg);

    cache[src].isLoading = false;


    if (request === src) {
      crossfade(currentImg)
    }


  });

});


thumbs[0].firstElementChild.click();

