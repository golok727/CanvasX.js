export interface CanvasCreateOptions {
	width?: number;
	height?: number;
	canvas?: HTMLCanvasElement;
	container?: HTMLDivElement;
}

/**
 * CanvasX is a base class for creating and managing HTML canvas elements.
 * Subclasses can override the Begin and Tick methods for custom functionality.
 */

class CanvasX {
	private canvas!: HTMLCanvasElement;
	private lastTime: number = 0;

	private canvasWidth!: number;
	private canvasHeight!: number;
	private allowTick: boolean = true;

	angleMode: "degrees" | "radians" = "radians";
	private ctx!: CanvasRenderingContext2D;

	constructor(options: CanvasCreateOptions) {
		this.__int(options);
		this.Begin();

		if (this.allowTick) {
			requestAnimationFrame(this.__tick.bind(this));
		}
	}

	/*--------------------------------------------- */
	// Overridden Methods
	/**
	 * This method is called once when the canvas is created.
	 * Subclasses can override this method to perform initialization.
	 */

	Begin() {
		// Subclass-specific initialization code goes here.
	}

	/**
	 * This method is called in an animation loop.
	 * @param delta - The time elapsed since the last frame in milliseconds.
	 * Subclasses should override this method to implement animations or updates.
	 */
	Tick(_delta: number) {
		// Subclass-specific animation/update code goes here.
	}

	/**
	 * This method allow you to access keyboard keys for the current canvas
	 * Using this method you can add keyboard handling and add interactivity
	 * Subclasses should override this method to implement keyboard events
	 */
	onKeyDown() {}

	/**
	 * This method allow you to access keyboard keys for the current canvas
	 * Using this method you can add keyboard handling and add interactivity
	 * Subclasses should override this method to implement keyboard events
	 */
	onKeyUp() {}
	/*--------------------------------------------- */

	/**
	 * This will start the animation loop if the animation is stopped
	 */
	play() {
		if (this.allowTick === false) {
			this.allowTick = true;
			requestAnimationFrame(this.__tick.bind(this));
		}
	}

	/**
	 * This will stop the animation loop if the animation is enabled
	 */
	noTick() {
		if (this.allowTick === true) {
			this.allowTick = false;
		}
	}
	/** Checks and returns a boolean weather the tick is enabled or not */
	isTickEnabled() {
		return this.allowTick;
	}

	clear() {
		this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
	}

	rect(...args: Parameters<CanvasRenderingContext2D["rect"]>) {
		this.beginPath();
		this.ctx.rect(...args);
		this.closePath();
	}

	setFill(color: string) {
		this.ctx.fillStyle = color;
	}

	setStroke(color: string) {
		this.ctx.strokeStyle = color;
	}

	setNoStroke() {
		this.ctx.lineWidth = 0;
	}
	setStrokeWidth(width: number) {
		this.ctx.lineWidth = width;
	}

	fill(color?: string) {
		if (color) this.setFill(color);
		this.ctx.fill();
	}

	stroke(color?: string) {
		if (color) this.setFill(color);
		this.ctx.stroke();
	}

	beginPath() {
		this.ctx.beginPath();
	}
	closePath() {
		this.ctx.closePath();
	}

	floodFill() {}

	private __tick(time: number) {
		if (!this.allowTick) {
			return;
		}

		const delta = time - this.lastTime;
		this.lastTime = time;
		this.Tick(delta);
		requestAnimationFrame(this.__tick.bind(this));
	}

	private __int(options: CanvasCreateOptions) {
		if (options.canvas) {
			this.canvas = options.canvas;

			this.canvasWidth = this.canvas.offsetWidth;
			this.canvasHeight = this.canvas.offsetHeight;

			this.canvas.width = this.canvasWidth;
			this.canvas.height = this.canvasHeight;
		} else {
			if (!options.container) {
				throw new Error(
					"If canvas element is not specified in the options, a container is required to append the canvas element"
				);
			} else {
				this.canvas = document.createElement("canvas");
				this.canvasWidth = options.container.offsetWidth;
				this.canvasHeight = options.container.offsetHeight;
				this.canvas.width = this.canvasWidth;
				this.canvas.height = this.canvasHeight;
				options.container.appendChild(this.canvas);
			}
		}

		this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
		if (!this.ctx) throw new Error("CanvasX is not supported in your browser");
	}
}

export default CanvasX;
