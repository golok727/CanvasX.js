import { ANGLE_MODE } from "./constants";

import Renderer from "./renderer";

import { Vector } from "..";

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

	angleMode: keyof typeof ANGLE_MODE = ANGLE_MODE.RADIANS;

	constructor(options: CanvasCreateOptions) {
		this.__init(options);
		if (this.canvas) {
			this.renderer = new Renderer(this.canvas, this);
		}
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

	/** Begins Rendering after setup
	 * Must be called after the super call to start the render
	 */

	get width() {
		return this.renderer.width;
	}
	get height() {
		return this.renderer.height;
	}

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

	private __init(options: CanvasCreateOptions) {
		if (options.canvas) {
			this.canvas = options.canvas;

			this.canvas.width = this.canvas.offsetWidth;
			this.canvas.height = this.canvas.offsetHeight;
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

				this._isReady = true;
			}
		}
	}
}

export default CanvasX;
