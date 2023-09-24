# CanvasX
CanvasX is a JavaScript library for creating and managing HTML canvas elements.

For more docs [See This](/docs/GettingStarted.md)

**This Library is under dev this is just a personal project**


# Sample usage 

Make a moving rectangle

```ts


import { CanvasX, Vector } from "../lib";

const canvas = document.querySelector("[data-canvas]") as HTMLCanvasElement;

class MyCanvas extends CanvasX {

	rectangle: { loc: Vector; w: number; h: number };

	constructor() {

		super({ canvas }); // pass in your canvas element
		this.rectangle = { loc: Vector.new(300), w: 200, h: 100 };

	}
  
  // Initial Draw
	OnBegin() {

		this.rect(this.rectangle.loc, this.rectangle.w, this.rectangle.h);

		this.fill("orange");

	}

	Tick(_delta: number) {

		this.clear();

		this.rectangle.loc.add([0.9]);

		this.rect(this.rectangle.loc, this.rectangle.w, this.rectangle.h);

		this.fill("orange");

	}
}

new MyCanvas().render();



```

* Make sure to add correct `css` the canvas, by default canvasx takes the height of the actual canvas element as resolution; 
```css

canvas {
  height: 100%;
}
V```




