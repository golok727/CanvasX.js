export const PI = Math.PI;
export const TAU = Math.PI * 2;

export const RAD_TO_DEG = 180 / PI;
export const DEG_TO_RAD = PI / 180;

export const ANGLE_MODE = {
	DEGREES: "DEGREES",
	RADIANS: "RADIANS",
} as const;

export const NUMBER_TYPES = {
	FLOAT: "FLOAT",
	U_INT: "U_INT",
	INT: "INT",
} as const;

export const ROUNDING_MODES = {
	FLOOR: "FLOOR",
	CEIL: "CEIL",
	ROUND: "ROUND",
} as const;

export const NO_FILL = "NO_FILL" as const;
export const NO_STROKE = "NO_STROKE" as const;
export type OUTPUT_T = keyof typeof NUMBER_TYPES;
export type ROUNDING_MODES_T = keyof typeof ROUNDING_MODES;
