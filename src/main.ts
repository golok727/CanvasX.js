import "./style.css";
import { CanvasX, Vector } from "../lib";

const canvas = document.querySelector("[data-canvas]") as HTMLCanvasElement;

class MyCanvas extends CanvasX {
	rectangle: { loc: Vector; w: number; h: number };

	constructor() {
		super({ canvas });

		this.rectangle = { loc: Vector.new(10), w: 200, h: 100 };
	}

	override OnBegin() {
		this.noTick();
	}

	override Tick(_delta: number) {}
}

const c = new MyCanvas();
c.render();
