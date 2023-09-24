import "./style.css";
import { CanvasX, Vector } from "../lib";

const canvas = document.querySelector("[data-canvas]") as HTMLCanvasElement;

const v1 = Vector.new([1, 3, 0]);

console.log(v1);

class MyCanvas extends CanvasX {
	rectangle: { loc: Vector; w: number; h: number };

	constructor() {
		super({ canvas });

		this.rectangle = { loc: Vector.new(300), w: 200, h: 100 };
	}

	override OnBegin() {
		this.rect(this.rectangle.loc, this.rectangle.w, this.rectangle.h);
		this.fill("orange");

		this.noTick();
	}

	override Tick(_delta: number) {
		this.clear();

		this.rectangle.loc.add([0.9, 0.2]);

		this.rect(this.rectangle.loc, this.rectangle.w, this.rectangle.h);

		this.fill("#f50");
	}
}

const c = new MyCanvas();
c.render();
