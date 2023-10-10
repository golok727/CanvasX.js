import "./style.css";
import { CanvasX, Vector } from "../lib";
import { NO_FILL, PI } from "../lib/core/constants";

const canvas = document.querySelector("[data-canvas]") as HTMLCanvasElement;

class MyCanvas extends CanvasX {
	rectangle: { loc: Vector; w: number; h: number };

	constructor() {
		super({ canvas });

		this.rectangle = { loc: Vector.new(10), w: 200, h: 100 };
	}

	override OnBegin() {
		this.Rect(Vector.new(200), {
			height: 100,
			width: 100,
			fill: NO_FILL,
			stroke: "#fa0",
			strokeWidth: 4,
			lineDashArray: [20, 10],
			lineCap: "round",
		});

		this.Circle(Vector.new([0, -150]), {
			radius: 100,
			fill: "hotpink",
			stroke: "#fff",
			endAngle: PI,
			strokeWidth: 5,
			lineDashArray: [20, 10],
		});

		this.Line([0, 0], Vector.new([200, 0]), {
			stroke: "#faa",
			lineCap: "round",
			strokeWidth: 4,
			lineDashArray: [20, 10],
		});

		this.noTick();
	}

	override Tick(_delta: number) {}
}

const c = new MyCanvas();
c.render();
