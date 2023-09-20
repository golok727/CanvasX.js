import "./style.css";
import { CanvasX, Vector } from "../lib";

const canvas = document.querySelector("[data-canvas]") as HTMLCanvasElement;

class MyCanvas extends CanvasX {
	rectangle: { loc: Vector; w: number; h: number };

	constructor() {
		super({ canvas });

		this.rectangle = { loc: Vector.new(300), w: 200, h: 100 };
	}

	OnBegin() {
		this.rect(this.rectangle.loc, this.rectangle.w, this.rectangle.h);

		this.fill("orange");
	}

	Tick(_delta: number) {
		this.clear();

		this.rectangle.loc.add([0.9, 0.2]);

		this.rect(this.rectangle.loc, this.rectangle.w, this.rectangle.h);

		this.fill("#f50");
	}
}

const c = new MyCanvas();
c.render();
