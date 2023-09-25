export type VecArray =
	| [x: number, y: number, z: number]
	| [x: number, y: number]
	| [x: number];

type VecCreatorArray =
	| [x: number, y: number, z: number]
	| [x: number, y: number]
	| [s: number];
type Vec3Array = [x: number, y: number, z: number];
class Vector {
	x: number;
	y: number;
	z: number;
	/**
	 * @param arg Specify
	 */
	constructor(arg: VecCreatorArray | number | Vector) {
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
		} else if (arg instanceof Vector) {
			this.x = arg.x;
			this.y = arg.y;
			this.z = arg.z;
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
	static new(data: VecCreatorArray | number | Vector): Vector {
		return new Vector(data);
	}

	/**
	 * @description Makes a clone of a vector from the given vector as input
	 */
	static clone(other: Vector): Vector {
		return new Vector([other.x, other.y, other.x]);
	}
	/**
	 * @description Adds the two vectors and returns a new vector without modifying the original vectors
	 */
	static add(v1: Vector, v2: Vector) {
		return new Vector(v1).add(v2);
	}

	/**
	 * @description Multiplies the two vectors and returns a new vector without modifying the original vectors
	 */
	static mult(v1: Vector, v2: Vector) {
		return new Vector(v1).mult(v2);
	}

	/**
	 * @description subtracts the two vectors and returns a new vector without modifying the original vectors
	 */
	static sub(v1: Vector, v2: Vector) {
		return new Vector(v1).sub(v2);
	}

	/**
	 * @description Divides the two vectors and returns a new vector without modifying the original vectors
	 */
	static div(v1: Vector, v2: Vector) {
		return new Vector(v1).div(v2);
	}
	/**
	 * Returns `true` if the given vectors are equal
	 */
	equals(other: Vector | Vec3Array) {
		let x: number, y: number, z: number;
		if (this.__isVector(other)) {
			x = other.x;
			y = other.y;
			z = other.z;
		} else {
			x = other[0];
			y = other[1];
			z = other[2];
		}
		return x === this.x && y === this.y && z === this.z;
	}

	/**
	 * @description Adds a given vector or a scalar value to the vector. This function will directly modify the current vector and return this
	 * If you need a Vector back without modifying the current vector use the addClone method.
	 * @param vec scalar value or another Vector to add to the components
	 *
	 * Number array format\
	 * [ x, y, z ]\
	 * [ x , y ] \
	 * [ x ]
	 */
	add(vec: number | Vector | VecArray): Vector {
		if (typeof vec === "number") {
			this.x += vec;
			this.y += vec;
			this.z += vec;
		} else if (this.__isVector(vec)) {
			this.x += vec.x;
			this.y += vec.y;
			this.z += vec.z;
		} else if (Array.isArray(vec)) {
			if (vec[0] !== undefined) this.x += vec[0];
			if (vec[1] !== undefined) this.y += vec[1];
			if (vec[2] !== undefined) this.z += vec[2];
		}
		return this;
	}

	/**
	 * @description Multiplies a given vector or a scalar value to the vector. This function will directly modify the current vector and return this
	 * If you need a Vector back without modifying the current vector use the multClone method.
	 * @param vec scalar value or another Vector to multiply to the components
	 *
	 *
	 * Number array format\
	 * [ x, y, z ]\
	 * [ x , y ] \
	 * [ x ]
	 */
	mult(vec: number | Vector | VecArray): Vector {
		if (typeof vec === "number") {
			this.x *= vec;
			this.y *= vec;
			this.z *= vec;
		} else if (this.__isVector(vec)) {
			this.x *= vec.x;
			this.y *= vec.y;
			this.z *= vec.z;
		} else if (Array.isArray(vec)) {
			if (vec[0] !== undefined) this.x *= vec[0];
			if (vec[1] !== undefined) this.y *= vec[1];
			if (vec[2] !== undefined) this.z *= vec[2];
		}
		return this;
	}

	/**
	 * @description Subtracts a given vector or a scalar value from the vector. This function will directly modify the current vector and return this
	 * If you need a Vector back without modifying the current vector use the subClone method.
	 * @param vec scalar value or another Vector to subtract to the components
	 * Number array format\
	 * [ x, y, z ]\
	 * [ x , y ] \
	 * [ x ]
	 */
	sub(vec: number | Vector | VecArray): Vector {
		if (typeof vec === "number") {
			this.x -= vec;
			this.y -= vec;
			this.z -= vec;
		} else if (this.__isVector(vec)) {
			this.x -= vec.x;
			this.y -= vec.y;
			this.z -= vec.z;
		} else if (Array.isArray(vec)) {
			if (vec[0] !== undefined) this.x -= vec[0];
			if (vec[1] !== undefined) this.y -= vec[1];
			if (vec[2] !== undefined) this.z -= vec[2];
		}
		return this;
	}
	/**
	 * @description Divides a given vector or a scalar value from the vector. This function will directly modify the current vector and return this
	 * If you need a Vector back without modifying the current vector use the divClone method.
	 * @param vec scalar value or another Vector to divide to the components
	 * Number array format\
	 * [ x, y, z ]\
	 * [ x , y ] \
	 * [ x ]
	 */
	div(vec: number | Vector | VecArray): Vector {
		if (typeof vec === "number") {
			if (vec === 0) {
				console.warn(
					"CanvasX.Vector.div: \n",
					"Division by zero is not allowed."
				);
				return this;
			}
			this.x /= vec;
			this.y /= vec;
			this.z /= vec;
		} else if (this.__isVector(vec)) {
			if (vec.x === 0 || vec.y === 0 || vec.z === 0) {
				console.warn(
					"CanvasX.Vector.div: \n",
					"One of the components provided have 0, Can't divide by Zero"
				);

				return this;
			}
			this.x /= vec.x;
			this.y /= vec.y;
			this.z /= vec.z;
		} else if (Array.isArray(vec)) {
			if (vec[0] === 0 || vec[1] === 0 || vec[2] === 0) {
				console.warn(
					"CanvasX.Vector.div: \n",
					"One of the components provided have 0, Can't divide by Zero"
				);

				return this;
			}

			if (vec[0] !== undefined) this.x /= vec[0];
			if (vec[1] !== undefined) this.y /= vec[1];
			if (vec[2] !== undefined) this.z /= vec[2];
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

	/**
	 * @description Sets the current components of the vector to the given vector or array or a scalar
	 */
	set(vec: Vector | VecArray | number): Vector {
		if (typeof vec === "number") {
			this.x = vec;
			this.y = vec;
			this.z = vec;
		} else if (this.__isVector(vec)) {
			this.x = vec.x;
			this.y = vec.y;
			this.z = vec.z;
		} else if (Array.isArray(vec)) {
			if (vec[0] !== undefined) this.x = vec[0];
			if (vec[1] !== undefined) this.y = vec[1];
			if (vec[2] !== undefined) this.z = vec[2];
		}
		return this;
	}
	private __isVector(vec: any): vec is Vector {
		return vec instanceof Vector;
	}
	static isVector(vec: any): vec is Vector {
		return vec instanceof Vector;
	}
	/**
	 * @description Returns the **magnitude(_length_)** of the given vector
	 * sqrt(x^2 + y^2 + z^2)
	 */
	magnitude() {
		return Math.sqrt(this.magSquared());
	}

	/**
	 * @description Returns the **squared magnitude** of the vector
	 * x^2 + y^2 + z^2
	 *
	 */
	magSquared() {
		const { x, y, z } = this;
		return x * x + y * y + z * z;
	}
	/**
	 * Converts the magnitude of a vector to the range of 0 and 1;
	 */
	normalize() {
		const len = this.magnitude();
		if (len !== 0) this.mult(1 / len);
		return this;
	}
	/**
	 *  Limits a vector's magnitude to a maximum value.
	 * @param max The maximum value for the magnitude
	 */
	limit(max: number) {
		const magSq = this.magSquared();
		if (magSq > max * max) {
			this.div(Math.sqrt(magSq)).mult(max);
		}
		return this;
	}
	/**
	 * Sets the magnitude of the vector to the given magnitude
	 * @param mag The new magnitude
	 */
	setMag(mag: number) {
		return this.normalize().mult(mag);
	}

	/**
	 * Returns the 2d angle which is made with the x axis of the vector
	 */
	heading() {
		const ang = Math.atan2(this.y, this.x);
		// TODO return according to the angle mode
		return ang;
	}
	/**
	 * Sets the heading of the given vector to the given angle
	 */
	setHeading(angle: number) {
		// TODO set angle according to the angle mode
		let len = this.magnitude();
		this.x = len * Math.cos(angle);
		this.y = len * Math.sin(angle);
		return this;
	}
	/**
	 * Rotates a vector by a given angle
	 */
	rotate(angle: number) {
		// TODO set angle according to the angle mode
		const newHeading = this.heading() + angle;
		const mag = this.magnitude();

		this.x = mag * Math.cos(newHeading);
		this.y = mag * Math.sin(newHeading);
		return this;
	}
	/**
	 * Returns a debug string of a simplified version of the Vector class with all the components
	 */

	str() {
		return `Vector: [ x: ${this.x} y: ${this.y}, z: ${this.z} ]`;
	}
	/**
	 * Returns an array vector of the vector **Array([x , y, z])**
	 */
	array() {
		return [this.x, this.y, this.z];
	}
}

export default Vector;
