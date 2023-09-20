# CanvasX
CanvasX is a JavaScript library for creating and managing HTML canvas elements with support for animation and game development. It provides a flexible and easy-to-use framework for creating interactive graphics and animations on the web.


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
    // or 
    // super({container: HtmlElement}) to add a new canvas to the container
		this.rectangle = { loc: Vector.new(300), w: 200, h: 100 };

	}
  
  // Initial Draw
	OnBegin() {

		this.rect(this.rectangle.loc, this.rectangle.w, this.rectangle.h);

		this.fill("orange");

		this.noTick(); // Stop the tick if you need static image

	}
  // Draw per frame 
	Tick(_delta: number) {

		this.clear();

		this.rectangle.loc.add([0.9]);

		this.rect(this.rectangle.loc, this.rectangle.w, this.rectangle.h);

		this.fill("orange");

	}
}

new MyCanvas().render();



```

* Make sure to add correct `css` the canvas by default sizes to the width of the container
```css

canvas {
  height: 100%;
}
```




