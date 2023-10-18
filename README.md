# CanvasX
CanvasX is a JavaScript library for creating and managing HTML canvas elements.

For more docs [See This](/docs/GettingStarted.md)

**This Library is under development this is just a personal project**


# Sample usage 

```ts



class MyCanvas extends CanvasX {
	obj: { loc: Vector; rad: number };

	constructor() {
		super({ canvas });
		this.obj = { loc: this.center, rad: 20 };
	}
	
	drawMovingObj() {
		this.Background("#002122", true);
		this.Circle(this.obj.loc, {
			radius: this.obj.rad,
			fill: "orange",
		}); // More available Rectangle, Line, .... more on the way

	}
	override OnBegin() {

		this.drawMovingObj();
		// this.noTick(); Cancel Loop Static Draw
	}

	override Tick(_delta: number) {
		this.drawMovingObj();

		if (this.isMouseDown) {
			console.log(this.mouseX, this.mouseY)
		} // check for mouse events

		this.obj.loc.x = this.mouseX;
		this.obj.loc.y = this.mouseY;
	}
	override onResize(): void {
		console.log("resize");
		this.obj.loc.x = this.centerX;
		this.obj.loc.y = this.centerY;
	}
}

const c = new MyCanvas();
c.render();



```

* Make sure to add correct `css` the canvas, by default canvasx takes the height of the actual canvas element as resolution; 
```css

canvas {
  height: 100%;
}
```




