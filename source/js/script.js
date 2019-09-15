var deliveryOfficeTitle = document.querySelector('.title-wrapper--office');
var deliverySelfTitle = document.querySelector('.title-wrapper--self');
var deliveryOffice = document.querySelector('.user-info__wrapper');
var deliverySelf = document.querySelector('.delivery-address__wrapper');
var userInfoForm = document.querySelector('.user-info');
var inputName = userInfoForm.querySelector('#name');
var inputPhone = userInfoForm.querySelector('#phone');
var isOpenOffice = true;
var isOpenSelf = false;

var mapInit = function() {
  ymaps.ready(function () {
    var myMap = new ymaps.Map("map", {
      center: [55.82, 37.57],
      zoom: 10,
      controls: []
    },
    {
      searchControlProvider: 'yandex#search'
    }),

    myPlacemark_1 = new ymaps.Placemark([55.801131, 37.508167], {
      hintContent: "Песчаная улица, дом 13",
    },
    {
      iconLayout: "default#image",
      iconImageHref: "img/pin.png",
      iconImageSize: [32, 44],
      iconImageOffset: [-62, -106]
    });

    myPlacemark_2 = new ymaps.Placemark([55.757556, 37.651592], {
      hintContent: "Подсосенский переулок, 11",
    },
    {
      iconLayout: "default#image",
      iconImageHref: "img/pin.png",
      iconImageSize: [32, 44],
      iconImageOffset: [-22, -56]
    });

    myMap.behaviors.disable("scrollZoom");
    myMap.controls.add("zoomControl", {
      position: {
        top: 15,
        left: 15
      }
    });

    myMap.geoObjects.add(myPlacemark_1);
    myMap.geoObjects.add(myPlacemark_2);
  });
};

var changeStateTwoTabs = function (manageTabOne, manageTabTwo, drivenTabOne, drivenTabTwo) {
  manageTabOne.classList.remove('title-wrapper--open');
  drivenTabOne.classList.remove('wrapper-open');
  manageTabOne.classList.add('title-wrapper--close');
  drivenTabOne.classList.add('wrapper-close');

  manageTabTwo.classList.remove('title-wrapper--close');
  drivenTabTwo.classList.remove('wrapper-close');
  manageTabTwo.classList.add('title-wrapper--open');
  drivenTabTwo.classList.add('wrapper-open');
};

var validateName = function () {
  var reg = /^[а-яА-Я\ -]+$/;
  var valid = reg.test(inputName.value);
  if (!valid) {
    inputName.setCustomValidity('Поле не должно содердать латинских букв и цифр!')
  } else {
    inputName.setCustomValidity('');
  }
};

var validatePhone = function () {
  if (inputPhone.value.length < 18) {
    inputPhone.setCustomValidity('Номер телефона введен неправильно!')
  } else {
    inputPhone.setCustomValidity('');
  }
};

var maskPhone = function (event) {
  var keyCode = event.keyCode;
  var matrix = "+7 (___) ___-__-__";
  var i = 0;
  var def = matrix.replace(/\D/g, "");
  var val = this.value.replace(/\D/g, "");
  var new_value = matrix.replace(/[_\d]/g, function(a) {
    return i < val.length ? val.charAt(i++) || def.charAt(i) : a
  });

  i = new_value.indexOf("_");
  if (i != -1) {
      i < 5 && (i = 3);
      new_value = new_value.slice(0, i)
  }

  var reg = matrix.substr(0, this.value.length).replace(/_+/g,
      function(a) {
          return "\\d{1," + a.length + "}"
      }).replace(/[+()]/g, "\\$&");
  reg = new RegExp("^" + reg + "$");

  if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
  if (event.type == "blur" && this.value.length < 5)  this.value = "";
};

mapInit();

deliveryOfficeTitle.addEventListener('click', function () {
  if (!isOpenOffice) {
    changeStateTwoTabs(deliverySelfTitle, deliveryOfficeTitle, deliverySelf, deliveryOffice);
    isOpenSelf = false;
    isOpenOffice = true;
  }
});

deliverySelfTitle.addEventListener('click', function () {
  if (!isOpenSelf) {
    changeStateTwoTabs(deliveryOfficeTitle, deliverySelfTitle, deliveryOffice, deliverySelf);
    isOpenOffice = false;
    isOpenSelf = true;
  }
});

inputName.addEventListener('blur', validateName);
inputPhone.addEventListener('input', maskPhone);
inputPhone.addEventListener('blur', validatePhone);
