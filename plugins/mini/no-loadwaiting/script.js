/*
* Early Page Animation Trigger
* Starts CSS animations on DOM ready instead of waiting for full window load.
* Removes loader and triggers scroll/resize handlers immediately for faster visual feedback.
*/
(function () {
'use strict';

var initialized = false;

function getBody() {
return document.body;
}

function markReadyNow() {
var body = getBody();
if (!body) return;

body.classList.remove('is-loading', 'with-loader');

if (!body.classList.contains('is-ready')) {
body.classList.add('is-playing');
setTimeout(function () {
body.classList.remove('is-playing');
body.classList.add('is-ready');
}, 750);
}
}

function hideLoaderIfPresent() {
var loader = document.getElementById('loader');
if (loader) {
loader.style.cssText = 'display:none; visibility:hidden; opacity:0';
}
}

function kickScrollHandlers() {
var pulses = 0;
var maxPulses = 15;

var timer = setInterval(function () {
if (++pulses >= maxPulses) {
clearInterval(timer);
return;
}
try {
window.dispatchEvent(new Event('resize'));
window.dispatchEvent(new Event('scroll'));
} catch (e) { /* ignore */ }
}, 75);

var rafPulses = 0;
(function rafTick() {
try {
window.dispatchEvent(new Event('resize'));
window.dispatchEvent(new Event('scroll'));
} catch (e) { /* ignore */ }
if (++rafPulses < 5) requestAnimationFrame(rafTick);
})();
}

function setupObservers() {
var body = getBody();
if (!body) return;

var classObserver = new MutationObserver(function (mutations) {
mutations.forEach(function (m) {
if (m.attributeName === 'class' && body.classList.contains('with-loader')) {
body.classList.remove('with-loader');
}
});
});

var childObserver = new MutationObserver(hideLoaderIfPresent);

classObserver.observe(body, { attributes: true, attributeFilter: ['class'] });
childObserver.observe(body, { childList: true });

setTimeout(function() {
classObserver.disconnect();
childObserver.disconnect();
}, 5000);
}

function init() {
if (initialized) return;
initialized = true;

try {
markReadyNow();
hideLoaderIfPresent();
setupObservers();
kickScrollHandlers();
} catch (e) {
console.warn('early-animate-override failed:', e);
}
}

if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
init();
}
})();