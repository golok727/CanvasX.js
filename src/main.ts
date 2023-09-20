import "./style.css";
import { CanvasX, Vector } from "../lib";
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
		const vec = Vector.new([1, 2, 2]);
		vec.add(10);
		console.log(vec);
		this.rect(square.x, square.y, square.w, square.h);
		this.fill("orange");
		this.noTick();
	}

	Tick(delta: number) {
		console.log("run");
		this.clear();

		this.rect(square.x, square.y, square.w, square.h);

		const playerXMovement = (50 * delta) / 1000;
		square.x += playerXMovement;

		this.fill("orange");
	}
}

new Canvas({ canvas: canvasEl });
