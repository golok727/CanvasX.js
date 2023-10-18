import { Vector } from "..";
import { ANGLE_MODE } from "./constants";

import Renderer from "./renderer";

export interface CanvasCreateOptions {
	width?: number;
	height?: number;
	canvas?: HTMLCanvasElement;
	container?: HTMLDivElement;
}

/**
 * @description
 * CanvasX is a base class for creating and managing HTML canvas elements.
 * Subclasses can override the Begin and Tick methods for custom functionality.
 * @example
 * 	const canvas = document.querySelector('canvas')
 *
 * class MyCanvas extends CanvasX {
 * 		constructor() {
 * 			super({ canvas })
 * 			this.square = {x: 0 , y: 0, w: 0, h: 0}
 * 	}
 * 	OnBegin() {
 * 			// For Rendering your first frame or setup
 * 	}
 * 	Tick(delta: number) {
 * 	 	// code to run per frame
 * 	}
 *  }
 *
 * new Canvas().render() // Initialize and call the render method to render the canvas
 */

abstract class CanvasX {
	private canvas!: HTMLCanvasElement;

	private lastTime: number = 0;

	private _allowTick: boolean = true;

	private _isReady: boolean = false;

	private _animationFrameId: number | null = null;

	private _targetFrameRate: number = 60;

	private renderer!: Renderer;

	private mouse!: {
		x: number;
		y: number;
		isDown: boolean;
	};

	Rect!: Renderer["Rect"];
	Circle!: Renderer["Circle"];
	Line!: Renderer["Line"];
	Background!: Renderer["Background"];

	angleMode: keyof typeof ANGLE_MODE = ANGLE_MODE.RADIANS;

	constructor(options: CanvasCreateOptions) {
		this.mouse = {
			x: 0,
			y: 0,
			isDown: false,
		};
		this.__init(options);
	}

	/*--------------------------------------------- */

	// Overridden Methods
	/**
	 * This method is called once when the canvas is created.
	 * Subclasses can override this method to perform initialization.
	 */

	protected OnBegin() {
		// Subclass-specific initialization code goes here.
		console.warn("OnBegin method should be overridden in the sub class.");
	}

	/**
	 * This method is called in an animation loop.
	 * @param delta - The time elapsed since the last frame in milliseconds.
	 * Subclasses should override this method to implement animations or updates.
	 */
	protected Tick(_delta: number) {
		// Subclass-specific animation/update code goes here.
		console.warn("Tick method should be overridden in the sub class.");
		this.noTick();
		return;
	}

	/**
	 * This method allow you to access keyboard keys for the current canvas
	 * Using this method you can add keyboard handling and add interactivity
	 * Subclasses should override this method to implement keyboard events
	 */
	protected onKeyDown() {}

	/**
	 * This method allow you to access keyboard keys for the current canvas
	 * Using this method you can add keyboard handling and add interactivity
	 * Subclasses should override this method to implement keyboard events
	 */
	protected onKeyUp() {}
	/*--------------------------------------------- */

	/**
	 * This function is called when the window is resized. Use this to position elements after resize
	 */
	onResize() {}

	/**
	 * Returns the fill width of the canvas
	 */
	get width() {
		return this.renderer.width;
	}

	/**
	 * Returns the fill height of the canvas
	 */
	get height() {
		return this.renderer.height;
	}

	/**
	 * Returns the center  position of the canvas as a two component vector
	 */
	get center() {
		return Vector.new([this.centerX, this.centerY]);
	}
	/**
	 * Gets the center x position of the canvas
	 */
	get centerX() {
		return this.renderer.centerX;
	}
	/**
	 * Gets the center y position of the canvas
	 */
	get centerY() {
		return this.renderer.centerY;
	}

	/**
	 * Returns the mouses x position
	 */
	get mouseX() {
		return this.mouse.x;
	}

	/**
	 * Returns the mouses y position
	 */
	get mouseY() {
		return this.mouse.y;
	}
	/**
	 * Returns `true` if mouse is down in the canvas else returns `false`
	 */
	get isMouseDown() {
		return this.mouse.isDown;
	}

	/** Begins Rendering after setup
	 * Must be called after the super call to start the render
	 */
	render() {
		if (!this._isReady) {
			console.warn("Renderer is not initialized yet!!");
			return;
		}

		this.OnBegin();
		if (this._allowTick == true) {
			this._animationFrameId = requestAnimationFrame(this.__tick.bind(this));
		}
	}

	restart() {
		if (this._animationFrameId) cancelAnimationFrame(this._animationFrameId);
		const wasTickEnabled = this.isTickEnabled();
		this.noTick();

		this._allowTick = wasTickEnabled;
		this.render();
	}

	/**
	 * This will start the animation loop if the animation is stopped
	 */
	tickOn() {
		if (this._allowTick === false) {
			this._allowTick = true;
			requestAnimationFrame(this.__tick.bind(this));
		}
	}

	/**
	 * This will stop the animation loop if the animation is enabled
	 */
	noTick() {
		this._allowTick = false;
		if (this._animationFrameId !== null) {
			cancelAnimationFrame(this._animationFrameId);
			this._animationFrameId = null;
		}
	}
	/** Checks and returns a boolean weather the tick is enabled or not */
	isTickEnabled() {
		return this._allowTick;
	}

	/**
	 * @description Sets the frame create at which the renderer renders the canvas
	 * @param fps the frame rate per second
	 */
	setFPS(fps: number) {
		this._targetFrameRate = fps;
	}

	private __tick(time: number) {
		if (!this._allowTick) {
			return;
		}
		const targetFrameTime = 1000.0 / this._targetFrameRate;
		const delta = time - this.lastTime;

		if (delta >= targetFrameTime) {
			this.lastTime = time;
			this.Tick(delta);
		}

		this._animationFrameId = requestAnimationFrame(this.__tick.bind(this));
	}

	private __handleMouseMove(ev: MouseEvent) {
		this.mouse.x = ev.offsetX;
		this.mouse.y = ev.offsetY;
	}
	private __handleMouseDown(_ev: MouseEvent) {
		this.mouse.isDown = true;
	}
	private __handleMouseUp(_ev: MouseEvent) {
		this.mouse.isDown = false;
	}

	private __applyMouseEvents() {
		this.canvas.addEventListener(
			"mousemove",
			this.__handleMouseMove.bind(this)
		);

		this.canvas.addEventListener(
			"mousedown",
			this.__handleMouseDown.bind(this)
		);

		this.canvas.addEventListener("mouseup", this.__handleMouseUp.bind(this));
	}

	private __init(options: CanvasCreateOptions) {
		if (options.canvas) {
			this.canvas = options.canvas;

			this.canvas.width = options.width ?? this.canvas.offsetWidth;
			this.canvas.height = options.height ?? this.canvas.offsetHeight;
			this._isReady = true;
		} else {
			if (!options.container) {
				throw new Error(
					"If canvas element is not specified in the options, a container is required to append the canvas element"
				);
			} else {
				this.canvas = document.createElement("canvas");

				const canvasWidth = options.width ?? options.container.offsetWidth;
				const canvasHeight = options.height ?? options.container.offsetHeight;

				this.canvas.width = canvasWidth;
				this.canvas.height = canvasHeight;
				options.container.appendChild(this.canvas);
			}
		}

		if (this.canvas) {
			this.__applyMouseEvents();
			this.renderer = new Renderer(this.canvas, this, options);

			// Bind renderer methods to CanvasX
			this.Rect = this.renderer.Rect.bind(this.renderer);
			this.Circle = this.renderer.Circle.bind(this.renderer);
			this.Line = this.renderer.Line.bind(this.renderer);
			this.Background = this.renderer.Background.bind(this.renderer);
		}
		this._isReady = true;
		console.log(this);
	}
}

export default CanvasX;
