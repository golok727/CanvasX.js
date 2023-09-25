import { NO_STROKE, NO_FILL, TAU } from "../constants";

export interface CanvasXDefaultStyles {
	fill: typeof NO_FILL | string;
	stroke: typeof NO_STROKE | string;
	strokeWidth: number;
	lineCap: "butt" | "round" | "square";
	lineJoin: "round" | "bevel" | "miter";
	lineDashArray: number[];
	lineDashOffset: number;
}

// Circle Complete
export interface CanvasXCircleStyles extends CanvasXDefaultStyles {
	radius: number;
	startAngle: number;
	endAngle: number;
	invert: boolean;
}

// Circle params
export interface CircleOptions extends Partial<CanvasXCircleStyles> {
	radius: number;
}

// Rectangle Complete
export interface CanvasXRectangleStyles extends CanvasXDefaultStyles {
	width: number;
	height: number;
}

//Rectangle Params
export interface RectangleOptions extends Partial<CanvasXDefaultStyles> {
	width: number;
	height: number;
}

// Line Complete

export interface CanvasXLineStyles extends CanvasXDefaultStyles {
	lineCap: "butt" | "round" | "square";
	lineJoin: "round" | "bevel" | "miter";
	lineDashArray: number[];
	lineDashOffset: number;
}

export interface LineOptions extends Partial<CanvasXLineStyles> {
	strokeWidth: number;
}

export const defaultStyles: CanvasXDefaultStyles = {
	fill: "#fff",
	stroke: NO_STROKE,
	strokeWidth: 2,
	lineCap: "butt",
	lineDashArray: [],
	lineDashOffset: 0,
	lineJoin: "miter",
};

export const defCircleStyles: CanvasXCircleStyles = {
	...defaultStyles,
	radius: 100,
	startAngle: 0,
	endAngle: TAU,
	invert: false,
};

export const defRectangleStyles: CanvasXRectangleStyles = {
	...defaultStyles,
	width: 100,
	height: 100,
};

export const defLineOptions: CanvasXLineStyles = {
	...defaultStyles,

	fill: NO_FILL,
	stroke: "#fff",
	strokeWidth: 2,
};
