import { NO_STROKE, NO_FILL, TAU } from "../constants";

export interface CanvasXDefaultStyles {
	fill: typeof NO_FILL | string;
	stroke: typeof NO_STROKE | string;
	strokeWidth: number;
}

interface CanvasXCircleStyles extends CanvasXDefaultStyles {
	radius: number;
	startAngle: number;
	endAngle: number;
	invert: boolean;
}

export interface CircleOptions extends Partial<CanvasXDefaultStyles> {
	radius: number;
	startAngle?: number;
	endAngle?: number;
	invert?: boolean;
}

export interface CanvasXRectangleStyles extends Partial<CanvasXDefaultStyles> {
	width: number;
	height: number;
}

export const defaultStyles: CanvasXDefaultStyles = {
	fill: "#fff",
	stroke: NO_STROKE,
	strokeWidth: 2,
};

export const defCircleStyles: CircleOptions = {
	...defaultStyles,
	radius: 100,
	startAngle: 0,
	endAngle: TAU,
	invert: false,
};
