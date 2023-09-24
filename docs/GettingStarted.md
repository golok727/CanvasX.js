# Getting Started 


The main motive of CanvasX is to provide an api build on top of `HTMLCanvasElement` to make it easier to work with the 
canvas element.

CanvasX provides a class based approach it provides a base class from which you can `extend` from to make your graphics.

```ts

import { CanvasX } from 'canvas-x'

```

It also provides with essentials like **Vector**, **Math** utilities etc.. which are in development now.


## Make your canvas

* Import the `CanvasX` 
 
```ts
import { CanvasX } from 'canvas-x'
```

* Query your canvas element from the dom or make one with `document.createElement('canvas')`
 
```ts
  const canvas = document.querySelector('canvas') as HTMLCanvasElement
```



* `CanvasX` is an `abstract class` which you can extend to make your canvas class to write all your rendering logic.
 
```ts
class MyCanvas extends CanvasX {
  constructor() {
    super({})
  }
}
```
* The `CanvasX` constructor takes in a `CanvasOptions` object in which the values are set to `undefined` by default for you to pass in

```ts
export interface CanvasCreateOptions {
	width?: number;
	height?: number;
	canvas?: HTMLCanvasElement;
	container?: HTMLElement;
}
```
* You can either pass in the `HTMLElement` element _eg: <div\>_ so that a new canvas element will be created and added to the container element **or** you can pass in a `HTMLCanvasElement` which will be considered as the main canvas
* In this example we will use the previously queried canvas
 
```tsx
//Dom
  <div class='container'>
    <canvas></canvas>
  </div>
//-------
class MyCanvas extends CanvasX {
  constructor() {
    super({canvas: canvas})
  }
}
```
**or**

```tsx
//Dom
  <div id='my-canvas-container'>
  // your canvas will be appended here
  </div>
//-------
class MyCanvas extends CanvasX {
  constructor() {
    super({container: document.querySelector("#my-canvas-container")})
  }
}
```

* To begin working with the canvas and draw some stuff you need to `override` the existing two methods `OnBegin` and `Tick`.

* The `OnBegin` is like a setup function which only runs once after the canvas is setup. You can use this method to setup your canvas.

* The `Tick` function is called each frame. You can use this for things that need to be animated each frame

```ts

class MyCanvas extends CanvasX {
  // your constructor

  override onBegin() {
    // Your setup code
  }

  override Tick(delta: number) {
    // Each frame
  } 
}

```


