import "./style.css";
import { CanvasX } from "../lib";
import { CanvasCreateOptions } from "../lib/canvasx";

const canvasEl = document.querySelector("[data-canvas]") as HTMLCanvasElement;

const square = {
	x: 100,
	y: 100,
	w: 100,
	h: 100,
};

class Canvas extends CanvasX {
	constructor(options: CanvasCreateOptions) {
		super(options);
	}

	Begin() {
		console.log("Radhey Shyam");
	}

	Tick(delta: number) {
		this.clear();
		this.beginPath();
		this.rect(square.x, square.y, square.w, square.h);
		this.closePath();

		const playerXMovement = (50 * delta) / 1000;
		square.x += playerXMovement;

		this.fill("orange");
	}
}

new Canvas({ canvas: canvasEl });
