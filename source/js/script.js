var menuButton = document.querySelector(".menu-button");
var menuLists = document.querySelectorAll(".main-nav__list");
var modal = document.querySelector(".modal-size");
var modalOpenIndex = document.querySelector(".popular-good__button");
var modalOpenCatalog = document.querySelectorAll(".goods-description__button");
var modalClose = document.querySelector(".modal-size__button");
var isMenuOpen = true;

var openModal = function(element){
  element.addEventListener("click", function(evt){
    evt.preventDefault();
    modal.classList.add("modal-size--open");
  })
}

var mapInit = function() {
  ymaps.ready(function () {
    var myMap = new ymaps.Map("map", {
      center: [59.938631, 30.323000],
      zoom: 17,
      controls: []
    },
    {
      searchControlProvider: 'yandex#search'
    }),
    myPlacemark = new ymaps.Placemark([59.938631, 30.323055], {
      hintContent: "Mishka",
      balloonContent: "191186, Санкт-Петербург,<br>ул. Б.Конюшенная, д. 19/8"
    },
    {
      iconLayout: "default#image",
      iconImageHref: "img/map-pin.svg",
      iconImageSize: [124, 106],
      iconImageOffset: [-62, -106]
    });
    myMap.behaviors.disable("scrollZoom");
    myMap.controls.add("zoomControl", {
      position: {
        top: 15,
        left: 15
      }
    });
    myMap.geoObjects.add(myPlacemark);
  });
};

for (var i = 0; i < menuLists.length; i++) {
  menuButton.classList.remove("menu-button--open");
  menuLists[i].classList.remove("main-nav__list--open");
  menuButton.classList.add("menu-button--close");
  menuLists[i].classList.add("main-nav__list--close");
  isMenuOpen = false;
}

menuButton.addEventListener("click", function(){
  if (!isMenuOpen) {
    for (var i = 0; i < menuLists.length; i++) {
      menuButton.classList.remove("menu-button--close");
      menuLists[i].classList.remove("main-nav__list--close");
      menuButton.classList.add("menu-button--open");
      menuLists[i].classList.add("main-nav__list--open");
    }
    isMenuOpen = true;
  }

  else if (isMenuOpen) {
    for (var i = 0; i < menuLists.length; i++) {
      menuButton.classList.remove("menu-button--open");
      menuLists[i].classList.remove("main-nav__list--open");
      menuButton.classList.add("menu-button--close");
      menuLists[i].classList.add("main-nav__list--close");
    }
    isMenuOpen = false;
  }
})

for (var i = 0; i < modalOpenCatalog.length; i++) {
  openModal(modalOpenCatalog[i]);
}

openModal(modalOpenIndex);

modalClose.addEventListener("click", function(){
  modal.classList.remove("modal-size--open");
})

mapInit();
