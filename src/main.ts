import "./style.css";
import { CanvasX, Vector } from "../lib";
import { NO_FILL, NO_STROKE } from "../lib/core/constants";

const canvas = document.querySelector("[data-canvas]") as HTMLCanvasElement;

class MyCanvas extends CanvasX {
	obj: { loc: Vector; rad: number };
	objects: { loc: Vector; rad: number }[];

	constructor() {
		super({ canvas });
		this.obj = { loc: this.center, rad: 20 };
		this.objects = [];
	}
	draw() {
		this.Background("#002122");
		this.Rect(Vector.new([this.centerX, this.centerY]), {
			height: 100,
			width: 100,
			fill: NO_FILL,
			stroke: "#fa0",
			strokeWidth: 4,
			lineDashArray: [20, 10],
			lineCap: "round",
		});

		this.Rect(Vector.new([100, 200]), {
			height: 100,
			width: 100,
			fill: "#fff",
			stroke: NO_STROKE,
			borderRadius: 10,
		});

		this.Circle(Vector.new([this.centerX, this.centerY - 200]), {
			radius: 100,
			fill: "hotpink",
			stroke: "#fff",
			strokeWidth: 5,
			lineDashArray: [20, 10],
		});

		this.Line([100, 100], Vector.new([300, 100]), {
			stroke: "#faa",
			lineCap: "round",
			strokeWidth: 8,
		});
	}
	drawMovingObj(obj: typeof this.obj) {
		this.Circle(obj.loc, {
			radius: obj.rad,
			fill: "orange",
		});
	}
	override OnBegin() {
		// this.draw();

		this.drawMovingObj(this.obj);
		// this.noTick();
	}

	override onMouseUp(): void {
		this.objects.push({
			...this.obj,
			loc: Vector.new([this.mouseX, this.mouseY]),
		});
	}

	override Tick(_delta: number) {
		this.Background("#002122", true);

		this.drawMovingObj(this.obj);

		console.log(this.objects);
		this.objects.forEach((o) => this.drawMovingObj(o));

		if (this.isMouseDown) {
			this.obj.rad += 0.4;
		}

		this.obj.loc.x = this.mouseX;
		this.obj.loc.y = this.mouseY;
	}
	override onResize(): void {
		// console.log("resize");
		// this.obj.loc.x = this.centerX;
		// this.obj.loc.y = this.centerY;
	}
}

const c = new MyCanvas();
c.render();
