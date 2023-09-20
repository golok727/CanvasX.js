export type VecArray =
	| [x: number, y: number, z: number]
	| [x: number, y: number]
	| [x: number];

type VecCreatorArray =
	| [x: number, y: number, z: number]
	| [x: number, y: number]
	| [s: number];

class Vector {
	x: number;
	y: number;
	z: number;
	/**
	 * @param arg Specify
	 */
	constructor(arg: VecCreatorArray | number) {
		if (Array.isArray(arg)) {
			switch (arg.length) {
				case 1: {
					this.x = arg[0];
					this.y = 0;
					this.z = 0;
					break;
				}
				case 2: {
					this.x = arg[0];
					this.y = arg[1];
					this.z = 0;
					break;
				}
				case 3: {
					this.x = arg[0];
					this.y = arg[1];
					this.z = arg[2];
				}
			}
		} else {
			this.x = arg;
			this.y = arg;
			this.z = arg;
		}
	}

	/**
	 * @description Creates a vector class from an array of components x, y, and z.
	 *  If length of array is 3 then x, y  and z components are set to data[0], data[1], data[2]  respectively
	 *  If length of array is 2 then x and y  components are set to data[0], data[1] respectively and z component is initialized to 0
	 *  If length of array is 1 then x  component is set to data[0] and the other two are set to 0
	 *  If it is a scalar value then all the components will be set to the the same value
	 *
	 *  [ x , y , z ] => [ x: v0, y: v1, z: v2] \
	 * 	[ x, y ] => [ x: v0, y: v1, x: 0 ]\
	 * 	[ x ] => [ x: v0, y: 0, z: 0 ]\
	 * 	s => [ x: s , y: s , z: s ]
	 *  Where s is a scalar value
	 */
	static new(data: VecCreatorArray | number): Vector {
		return new Vector(data);
	}

	/**
	 * Makes a clone of a vector from the given vector as input
	 */
	static clone(other: Vector): Vector {
		return new Vector([other.x, other.y, other.x]);
	}

	/**
	 * @description Adds a given vector or a scalar value to the vector. This function will directly modify the current vector and return this
	 * If you need a Vector back without modifying the current vector use the addClone method.
	 * @param val scalar value or another Vector to add to the components
	 *
	 * Number array format\
	 * [ x, y, z ]\
	 * [ x , y ] \
	 * [ x ]
	 */
	add(val: number | Vector | VecArray): Vector {
		if (typeof val === "number") {
			this.x += val;
			this.y += val;
			this.z += val;
		} else if (this.__isVector(val)) {
			this.x += val.x;
			this.y += val.y;
			this.z += val.z;
		} else if (Array.isArray(val)) {
			if (val[0] !== undefined) this.x += val[0];
			if (val[1] !== undefined) this.y += val[1];
			if (val[2] !== undefined) this.z += val[2];
		}
		return this;
	}

	/**
	 * @description Multiplies a given vector or a scalar value to the vector. This function will directly modify the current vector and return this
	 * If you need a Vector back without modifying the current vector use the multClone method.
	 * @param val scalar value or another Vector to multiply to the components
	 *
	 *
	 * Number array format\
	 * [ x, y, z ]\
	 * [ x , y ] \
	 * [ x ]
	 */
	mult(val: number | Vector | VecArray): Vector {
		if (typeof val === "number") {
			this.x *= val;
			this.y *= val;
			this.z *= val;
		} else if (this.__isVector(val)) {
			this.x *= val.x;
			this.y *= val.y;
			this.z *= val.z;
		} else if (Array.isArray(val)) {
			if (val[0] !== undefined) this.x *= val[0];
			if (val[1] !== undefined) this.y *= val[1];
			if (val[2] !== undefined) this.z *= val[2];
		}
		return this;
	}

	/**
	 * @description Subtracts a given vector or a scalar value from the vector. This function will directly modify the current vector and return this
	 * If you need a Vector back without modifying the current vector use the subClone method.
	 * @param val scalar value or another Vector to subtract to the components
	 * Number array format\
	 * [ x, y, z ]\
	 * [ x , y ] \
	 * [ x ]
	 */
	sub(val: number | Vector): Vector {
		if (typeof val === "number") {
			this.x -= val;
			this.y -= val;
			this.z -= val;
		} else if (this.__isVector(val)) {
			this.x -= val.x;
			this.y -= val.y;
			this.z -= val.z;
		} else if (Array.isArray(val)) {
			if (val[0] !== undefined) this.x -= val[0];
			if (val[1] !== undefined) this.y -= val[1];
			if (val[2] !== undefined) this.z -= val[2];
		}
		return this;
	}
	/**
	 * @description Divides a given vector or a scalar value from the vector. This function will directly modify the current vector and return this
	 * If you need a Vector back without modifying the current vector use the divClone method.
	 * @param val scalar value or another Vector to divide to the components
	 * Number array format\
	 * [ x, y, z ]\
	 * [ x , y ] \
	 * [ x ]
	 */
	div(val: number | Vector): Vector {
		if (typeof val === "number") {
			if (val === 0) {
				console.warn(
					"CanvasX.Vector.div: \n",
					"Division by zero is not allowed."
				);
				return this;
			}
			this.x /= val;
			this.y /= val;
			this.z /= val;
		} else if (this.__isVector(val)) {
			if (val.x === 0 || val.y === 0 || val.z === 0) {
				console.warn(
					"CanvasX.Vector.div: \n",
					"One of the components provided have 0, Can't divide by Zero"
				);

				return this;
			}
			this.x /= val.x;
			this.y /= val.y;
			this.z /= val.z;
		} else if (Array.isArray(val)) {
			if (val[0] === 0 || val[1] === 0 || val[2] === 0) {
				console.warn(
					"CanvasX.Vector.div: \n",
					"One of the components provided have 0, Can't divide by Zero"
				);

				return this;
			}

			if (val[0] !== undefined) this.x /= val[0];
			if (val[1] !== undefined) this.y /= val[1];
			if (val[2] !== undefined) this.z /= val[2];
		}
		return this;
	}

	/**
	 * @description
	 * Returns the dot product of two vectors. The dot product is a number that
	 * describes the overlap between two vectors. Visually, the dot product can be
	 * thought of as the "shadow" one vector casts on another. The dot product's
	 * magnitude is largest when two vectors point in the same or opposite
	 * directions. Its magnitude is 0 when two vectors form a right angle.
	 *
	 * @param { Vector | VecArray } vec A Vector instance or a vector array of below format \
	 * [ x, y, z ]\
	 * [ x , y ] \
	 * [ x ]
	 * @returns {number} the dot product of the two vectors
	 *
	 *  * @example
	 * const vectorA = new Vector([1, 2, 3]);
	 * const vectorB = new Vector([4, 5, 6]);
	 *
	 * const result = vectorA.dot(vectorB); // Result: 32 | -> (1*4 + 2*5 + 3*6)
	 */
	dot(vec: Vector | VecArray): number {
		let x: number = 0,
			y: number = 0,
			z: number = 0;
		if (this.__isVector(vec)) {
			x = vec.x;
			y = vec.y;
			z = vec.z;
		} else if (Array.isArray(vec)) {
			x = vec[0] ?? 0;
			y = vec[1] ?? 0;
			z = vec[2] ?? 0;
		}

		return this.x * x + this.y * y + this.z * z;
	}

	private __isVector(vec: any): vec is Vector {
		return vec instanceof Vector;
	}

	/**
	 * Returns a debug string of a simplified version of the Vector class with all the components
	 */
	toString() {
		return `Vector: [ x: ${this.x} y: ${this.y}, z: ${this.z} ]`;
	}
}

export default Vector;
