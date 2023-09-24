import { DEG_TO_RAD, NUMBER_TYPES, OUTPUT_T, RAD_TO_DEG } from "../constants";

class MathX {
	/**
	 * PI in radians 3.141592...
	 */
	static PI = Math.PI;
	/**
	 * 2 times PI 6.283185...
	 */
	static TAU = Math.PI * 2;

	/**
	 * The value to convert degrees to radians. **degree \* DEG_TO_RAD**
	 * @example
	 * 180 * DEG_TO_RAD = Math.PI = 3.141592...
	 */
	static DEG_TO_RAD = Math.PI / 180;

	/**
	 * The value to convert radians to degrees. **radians \* RAD_TO_DEG**
	 * @example
	 * Math.PI * RAD_TO_DEG = 180
	 */
	static RAD_TO_DEG = 180 / Math.PI;

	/**
	 * Half of PI -> PI / 2 rad or 90 deg
	 */
	static HALF_PI = Math.PI / 2;

	/**
	 * Quarter of PI -> PI / 4 rad or 45 deg
	 */
	static QUARTER_PI = Math.PI / 4;

	/**
	 * Converts the given angle in `radians` to `degrees`
	 * @param radians angle in `radians`
	 * @param out defines the output type the values can be `FLOAT`, `INT`, `U_INT`, default is `FLOAT`
	 * @returns angle in `degrees`
	 * @example
	 *  radToDeg(Math.PI) // 180
	 */
	static radToDeg(radians: number, out: OUTPUT_T = NUMBER_TYPES.FLOAT) {
		const deg = radians * RAD_TO_DEG;
		switch (out) {
			case NUMBER_TYPES.FLOAT:
				return deg;
			case NUMBER_TYPES.INT:
				return Math.floor(deg);
			case NUMBER_TYPES.U_INT:
				return Math.max(0, Math.floor(deg));
			default:
				return deg;
		}
	}

	/**
	 * Converts the given angle in `degrees` to `radians`
	 * @param degrees angle in `degrees`
	 * @returns angle in `radians`
	 * @example
	 *  degToRad(180) // 3.141592 === Math.PI
	 */
	static degToRad(degrees: number) {
		return degrees * DEG_TO_RAD;
	}

	/**
	 * Linearly interpolates between two numbers.
	 *
	 * @param  start - The starting value.
	 * @param  end - The ending value.
	 * @param  t - The interpolation factor, typically a value between 0 and 1.
	 * @returns  The interpolated value between `start` and `end`.
	 */
	static lerp(start: number, end: number, t: number) {
		return start + (end - start) * t;
	}

	/**
	 * Converts the given `value` to a value between the provided `min` and `max` values
	 * @param value The value to constrained
	 * @param min The minimum output value
	 * @param max The maximum output value
	 * @returns The value which is constrained between the `min` and `max` values provided
	 * @example
	 * MathX.minmax(5, 0, 10) // 5
	 * MathX.minmax(11, 0, 10) // 10
	 * MathX.minmax(-1, 0, 10) // 0
	 */
	static minmax(value: number, min: number, max: number) {
		return Math.min(Math.max(min, value), max);
	}

	/**
	 *
	 * @param n The number to map to another number
	 * @param inMin The `Input Minimum` -> `inMin <= n` if not it will be scaled with minmax function
	 * @param inMax The `Input Maximum` -> `inMax >= n` if not it will be scaled with minmax function
	 * @param outMin The Output minimum range
	 * @param outMax The Output maximum range
	 * @returns The scaled version of `n` between `outMin` and `outMax`
	 * @example
	 * MathX.map(5, 0, 10, 0, 1) // results `0.5`
	 */
	static map(
		n: number,
		inMin: number,
		inMax: number,
		outMin: number,
		outMax: number
	) {
		n = this.minmax(n, inMin, inMax);
		return ((n - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
	}
}

export default MathX;
