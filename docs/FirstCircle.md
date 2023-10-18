# How to draw in CanvasX


## Sample code to draw a circle
```ts
	this.Circle(this.center, {
			radius: 100,
			fill: "hotpink",
			stroke: "#fff",
			strokeWidth: 5,
			lineDashArray: [20, 10],
		});
```

* Param 1 `Location`
The `Circle` method takes in a `Vector` or a `[number, number]` array which describes the position of the circle in the canvas

The `(0, 0)` point in the canvas is the `Top-Left`  corner. *(Transformation functions is on the way)*


The `center` method in `CanvasX` returns a vector containing the center co-ordinates of the canvas
alternatively you can also use `Vector.from([this.centerX, this.centerY])`

* Param 1 `Styles` ( For more see [StylesGuide](/docs/Styles.md) )
  
- These are the styles for the circle
- `radius` is a mandatory value
- Rest of the styles have default values and are optional

### Circle Required Styles 
```ts
export interface CircleOptions extends Partial<CanvasXCircleStyles> {
	radius: number;
}
```

### Circle Optional Styles

```ts
export interface CanvasXCircleStyles extends CanvasXDefaultStyles {
	radius: number; 
	startAngle: number; // [ 0 -> 2 * Math.PI ]
	endAngle: number; // [ 0 -> 2 * Math.PI ]
	invert: boolean;
}
```

### Default Styles Works for every object
```ts
 interface CanvasXDefaultStyles {
	fill: typeof NO_FILL | string;

	stroke: typeof NO_STROKE | string;

	strokeWidth: number;

	lineCap: "butt" | "round" | "square";

	lineJoin: "round" | "bevel" | "miter";

	lineDashArray: number[];

	lineDashOffset: number;
}
```







