import { CanvasCreateOptions } from "./../canvasx";
import { Vector } from "../..";
import CanvasX from "../canvasx";
import { NO_FILL, NO_STROKE } from "../constants";
import {
	CanvasXCircleStyles,
	CanvasXDefaultStyles,
	CanvasXLineStyles,
	CanvasXRectangleStyles,
	CircleOptions,
	LineOptions,
	RectangleOptions,
	defCircleStyles,
	defLineOptions,
	defRectangleStyles,
} from "./styles";

class Renderer {
	drawingCtx!: CanvasRenderingContext2D;
	canvas!: HTMLCanvasElement;
	canvasXCtx!: CanvasX;
	canvasXOptions: CanvasCreateOptions;

	constructor(
		canvas: HTMLCanvasElement,
		context: CanvasX,
		canvasXOptions: CanvasCreateOptions
	) {
		this.__init(canvas);
		this.canvasXCtx = context;
		this.canvasXOptions = canvasXOptions;
		this.__test();
	}

	private __test() {}

	/**
	 * @description Returns the width of the canvas element
	 */
	get width() {
		return this.canvas.width;
	}

	/**
	 * @description Returns the height of the canvas element
	 */
	get height() {
		return this.canvas.height;
	}

	get centerX() {
		return this.canvas.width / 2;
	}
	get centerY() {
		return this.canvas.height / 2;
	}

	Background(color: string, clear?: boolean) {
		if (clear) {
			this.ClearCanvas();
		}
		this.drawingCtx.fillStyle = color;
		this.drawingCtx.fillRect(0, 0, this.width, this.height);
		this.drawingCtx.fill();
	}

	ClearCanvas() {
		this.drawingCtx.clearRect(0, 0, this.width, this.height);
	}

	/**
	 * @description Draws a circle with given options
	 * @param pos A vector with the center of circle
	 * @param styles Styles for the circle mandatory value is `radius` others will be overwritten by the default styles if not specified
	 */
	Circle(pos: Vector | [number, number], styles: CircleOptions) {
		const s = { ...defCircleStyles, ...styles } satisfies CanvasXCircleStyles;

		this.drawingCtx.beginPath();

		this.__applyStyles(s);

		let x: number;
		let y: number;

		if (Vector.isVector(pos)) {
			x = pos.x;
			y = pos.y;
		} else {
			x = pos[0];
			y = pos[1];
		}

		this.drawingCtx.arc(x, y, s.radius, s.startAngle, s.endAngle, s.invert);

		this.__fillIf(s.fill);
		this.__strokeIf(s.stroke);

		this.drawingCtx.closePath();
		this.__resetStyles();
	}

	/**
	 * @description Draws a rectangle with given options
	 * @param pos A vector with the x and y co-ordinates of the rectangle
	 * @param styles Styles for the rectangle mandatory values are `width` and `height` others will be overwritten by the default styles if not specified
	
	
	 */
	Rect(pos: Vector | [number, number], styles: RectangleOptions) {
		const s = {
			...defRectangleStyles,
			...styles,
		} satisfies CanvasXRectangleStyles;

		let x: number;
		let y: number;
		if (Vector.isVector(pos)) {
			x = pos.x;
			y = pos.y;
		} else {
			x = pos[0];
			y = pos[1];
		}

		this.drawingCtx.beginPath();

		this.__applyStyles(s);

		this.drawingCtx.roundRect(x, y, s.width, s.height, s.borderRadius);

		this.__fillIf(s.fill);
		this.__strokeIf(s.stroke);
		this.drawingCtx.closePath();
		this.__resetStyles();
	}

	/**
	 *
	 * @param p1
	 * @param p2
	 * @param styles
	 */
	Line(
		p1: Vector | [number, number],
		p2: Vector | [number, number],
		styles: LineOptions
	) {
		const s = { ...defLineOptions, ...styles } satisfies CanvasXLineStyles;

		let x1: number;
		let x2: number;

		let y1: number;
		let y2: number;
		if (Vector.isVector(p1)) {
			x1 = p1.x;
			y1 = p1.y;
		} else {
			x1 = p1[0];
			y1 = p1[1];
		}

		if (Vector.isVector(p2)) {
			x2 = p2.x;
			y2 = p2.y;
		} else {
			x2 = p2[0];
			y2 = p2[1];
		}

		this.__applyStyles(s);

		this.drawingCtx.beginPath();

		this.drawingCtx.moveTo(x1, y1);
		this.drawingCtx.lineTo(x2, y2);

		this.__strokeIf(s.stroke);
		this.drawingCtx.closePath();
		this.__resetStyles();
	}

	private __applyStyles(styles: CanvasXDefaultStyles) {
		this.drawingCtx.fillStyle = styles.fill ?? "";

		this.drawingCtx.strokeStyle = styles.stroke ?? "";

		this.drawingCtx.lineWidth = styles.strokeWidth ?? 2;
		this.drawingCtx.lineCap = styles.lineCap;

		this.drawingCtx.lineJoin = styles.lineJoin;

		this.drawingCtx.setLineDash(styles.lineDashArray);

		if (styles.lineDashOffset > 0)
			this.drawingCtx.lineDashOffset = styles.lineDashOffset;
	}
	private __resetStyles() {
		this.drawingCtx.setLineDash([]);
		this.drawingCtx.strokeStyle = "";
		this.drawingCtx.lineCap = "butt";
		this.drawingCtx.lineJoin = "miter";
	}

	private __fillIf(fill: string) {
		if (fill !== NO_FILL) this.drawingCtx.fill();
	}

	private __strokeIf(stroke: string) {
		if (stroke !== NO_STROKE) this.drawingCtx.stroke();
	}

	private __resizeHandler() {
		const newWidth = this.canvasXOptions.width ?? this.canvas.offsetWidth;
		const newHeight = this.canvasXOptions.height ?? this.canvas.offsetHeight;
		this.canvas.width = newWidth;
		this.canvas.height = newHeight;
		this.ClearCanvas();
		this.canvasXCtx.onResize();
		this.canvasXCtx.restart();
	}

	private __init(canvas: HTMLCanvasElement) {
		this.canvas = canvas;

		const ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;

		if (!ctx) throw new Error("CanvasX is not supported in your browser");

		this.drawingCtx = ctx;

		window.addEventListener("resize", this.__resizeHandler.bind(this));
	}
}

export default Renderer;
