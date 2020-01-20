let dots = ['.','..','...']
let n = 1
function dotsAnimate() {
	$('load__dots').innerHTML = dots[n];
	n++;
	if (n == 2) {
		n = 0;
	}
}
setTimeout(dotsAnimate, 1000);