import {
	CircleOptions,
	CanvasXDefaultStyles,
	CanvasXRectangleStyles,
	defCircleStyles,
	defaultStyles,
} from "./styles";
import { Vector } from "../..";
import CanvasX from "../canvasx";
import { NO_FILL, NO_STROKE } from "../constants";

class Renderer {
	drawingCtx!: CanvasRenderingContext2D;
	canvas!: HTMLCanvasElement;
	canvasXCtx!: CanvasX;

	constructor(canvas: HTMLCanvasElement, context: CanvasX) {
		this.__init(canvas);
		this.canvasXCtx = context;
		const pos = Vector.new([this.width / 2, this.height / 2]);

		// this.drawingCtx.fillStyle = "#fff";
		// this.drawingCtx.arc(pos.x, pos.y, 100, 0, TAU);
		// this.drawingCtx.fill();
		this.circle(pos, {
			radius: 100,
			fill: "#fff",
			stroke: "#f00",
			strokeWidth: 10,
		});

		this.rect(Vector.clone(pos).add(100), {
			width: 200,
			height: 200,
			fill: "#fff",
			stroke: "#f00",
			strokeWidth: 4,
		});
	}
	/**
	 * @descriptions Returns the width of the canvas element
	 */
	get width() {
		return this.canvas.width;
	}

	/**
	 * @descriptions Returns the height of the canvas element
	 */
	get height() {
		return this.canvas.height;
	}

	background() {}

	clear() {}

	fillStyle() {}

	strokeStyle() {}

	circle(pos: Vector, styles: CircleOptions) {
		styles = { ...defCircleStyles, ...styles };

		this.drawingCtx.beginPath();

		this.__setStylesIf(styles);

		this.drawingCtx.arc(
			pos.x,
			pos.y,
			styles.radius,
			styles.startAngle!,
			styles.endAngle!,
			styles.invert
		);

		this.__fillIf(styles.fill);
		this.__strokeIf(styles.stroke);

		this.drawingCtx.closePath();
	}

	rect(pos: Vector, styles: CanvasXRectangleStyles) {
		styles = { ...defaultStyles, ...styles };

		this.drawingCtx.beginPath();

		this.__setStylesIf(styles);

		this.drawingCtx.rect(pos.x, pos.y, styles.width, styles.height);

		this.__fillIf(styles.fill);
		this.__strokeIf(styles.stroke);

		this.drawingCtx.closePath();
	}

	line() {}

	private __setStylesIf(styles: Partial<CanvasXDefaultStyles>) {
		this.drawingCtx.fillStyle = styles.fill ?? "";

		this.drawingCtx.strokeStyle = styles.stroke ?? "";

		this.drawingCtx.lineWidth = styles.strokeWidth ?? 2;
	}

	private __fillIf(fill: string | typeof NO_FILL | undefined) {
		if (fill !== undefined && fill !== NO_FILL) this.drawingCtx.fill();
	}

	private __strokeIf(stroke: string | typeof NO_STROKE | undefined) {
		if (stroke !== undefined && stroke !== NO_STROKE) this.drawingCtx.stroke();
	}

	private __init(canvas: HTMLCanvasElement) {
		this.canvas = canvas;

		const ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;

		if (!ctx) throw new Error("CanvasX is not supported in your browser");

		this.drawingCtx = ctx;
	}
}

export default Renderer;
