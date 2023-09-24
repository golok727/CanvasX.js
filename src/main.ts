import "./style.css";
import { CanvasX, Vector } from "../lib";

const canvas = document.querySelector("[data-canvas]") as HTMLCanvasElement;

const v1 = Vector.new([10, 0, 0]);

console.log(v1);

class MyCanvas extends CanvasX {
	rectangle: { loc: Vector; w: number; h: number };

	constructor() {
		super({ canvas });

		this.rectangle = { loc: Vector.new(10), w: 200, h: 100 };
	}

	override OnBegin() {
		// this.rect(this.rectangle.loc, this.rectangle.w, this.rectangle.h);
		// this.fill("orange");
		// this.ctx.translate(this.ctx.canvas.width / 2, this.ctx.canvas.height / 2);
		// this.ctx.strokeStyle = "#fff";
		// this.ctx.lineWidth = 10;
		// this.ctx.lineCap = "round";
		// this.ctx.moveTo(0, 0);
		// this.ctx.lineTo(v1.x, v1.y);
		// this.ctx.stroke();
		// this.noTick();
	}

	override Tick(delta: number) {
		this.clear();

		this.rectangle.loc.add([delta * 0.07, delta * 0.07]);

		this.rect(this.rectangle.loc, this.rectangle.w, this.rectangle.h);

		this.fill("#f50");
	}
}

const c = new MyCanvas();
c.render();
