class QuickCanvas {
	constructor(w, h) {
		this.c = CreateCanvas(w, h);
		this.ctx = this.c.getContext("2d");
	}

	DrawLine(x1, y1, x2, y2) {
		DrawLine(this.ctx, x1, y1, x2, y2);
	}

	DrawCircle(x, y, r) {
		DrawCircle(this.ctx, x, y, r);
	}

	DrawRectangle(x, y, w, h) {
		DrawRectangle(this.ctx, x, y, w, h);
	}

	PaintCircle(x, y, r, color) {
		PaintCircle(this.ctx, x, y, r, color);
	}

	PaintRectangle(x, y, w, h, color) {
		PaintRectangle(this.ctx, x, y, w, h, color);
	}

	Clear() {
		ClearRectangle(this.ctx, 0, 0, this.c.width, this.c.height);
	}
}

function CreateCanvas(w, h) {
	var c = document.createElement('canvas');

	c.width = w;
	c.height = h;
	c.style.border = "1px solid";

	document.body.appendChild(c);

	return c;
}

function DrawLine(ctx, x1, y1, x2, y2) {
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
}

function DrawCircle(ctx, x, y, r) {
	ctx.beginPath();
	ctx.arc(x, y, r, 0, 2 * Math.PI);
	ctx.stroke();
}

function DrawRectangle(ctx, x, y, w, h) {
	ctx.beginPath();
	ctx.rect(x, y, w, h);
	ctx.stroke();
}

function PaintCircle(ctx, x, y, r, color) {
	ctx.beginPath();
	ctx.arc(x, y, r, 0, 2 * Math.PI);
	ctx.closePath();
	ctx.fillStyle = color;
	ctx.fill();
}

function PaintRectangle(ctx, x, y, w, h, color) {
	ctx.beginPath();
	ctx.rect(x, y, w, h);
	ctx.fillStyle = color;
	ctx.fill();
}

function ClearRectangle(ctx, x, y, w, h) {
	ctx.clearRect(x, y, w, h);
}