// change local storage to listen to same window
/* const originalSetItem = localStorage.setItem;

localStorage.setItem = function (key, value) {
    var event = new Event('itemInserted');

    event.value = value; // Optional..
    event.key = key; // Optional..

    document.dispatchEvent(event);

    originalSetItem.apply(this, arguments);
};

const localStorageSetHandler = function (e) {
    alert('localStorage.set("' + e.key + '", "' + e.value + '") was called');

var originalSetItem = localStorage.setItem;
localStorage.setItem = function () {
  document.createEvent('Event').initEvent('itemInserted', true, true);
  originalSetItem.apply(this, arguments);
}
}; */