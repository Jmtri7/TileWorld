var images = [];
var loaded = 0;

function LoadImage(src) {
	var img = new Image();
	img.src = src;

	images.push(img);

	img.onload = function () {
		loaded++;
	}

	return img;
}