const body = document.querySelector('body');

// missing forEach on NodeList for IE11
if (window.NodeList && !NodeList.prototype.forEach) {
	NodeList.prototype.forEach = Array.prototype.forEach;
}

// Get the current breakpoint
function getBreakpoint() {
	return window.getComputedStyle(document.body, ':before').content.replace(/"/g, '');
}

window.addEventListener('load', () => {
	body.classList.remove('no-transition');
});

export default getBreakpoint;