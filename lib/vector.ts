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
	 * @param args Specify
	 */
	constructor(args: VecCreatorArray) {
		switch (args.length) {
			case 1: {
				this.x = args[0];
				this.y = args[0];
				this.z = args[0];
				break;
			}
			case 2: {
				this.x = args[0];
				this.y = args[1];
				this.z = 0;
				break;
			}
			case 3: {
				this.x = args[0];
				this.y = args[1];
				this.z = args[2];
			}
		}
	}

	/**
	 * @description Creates a vector class from an array of components x, y, and z.
	 *  If length of array is 3 then x, y  and z components are set to data[0], data[1], data[2]  respectively
	 *  If length of array is 2 then x and y  components are set to data[0], data[1] respectively and z component is initialized to 0
	 *  If length of array is 1 then x, y and z  components are set to data[0]\
	 *  [ x , y , z ]\
	 * 	[ x, y ]\
	 * 	[ s ] -> s == scalar
	 */
	static new(data: VecCreatorArray): Vector {
		return new Vector(data);
	}

	/**
	 * @description Adds a given vector or a scalar value to the vector. This function will directly modify the current vector
	 * If you need a Vector back without modifying the current vector use the addClone method.
	 * @param val scalar value or another Vector to add to the components
	 *
	 * Number array format\
	 * [ x, y, z ]\
	 * [ x , y ] \
	 * [ x ]
	 */
	add(val: number | Vector | VecArray): void {
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
	}

	/**
	 * @description Multiplies a given vector or a scalar value to the vector. This function will directly modify the current vector
	 * If you need a Vector back without modifying the current vector use the multClone method.
	 * @param val scalar value or another Vector to multiply to the components
	 *
	 *
	 * Number array format\
	 * [ x, y, z ]\
	 * [ x , y ] \
	 * [ x ]
	 */
	mult(val: number | Vector | VecArray): void {
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
	}

	/**
	 * @description Subtracts a given vector or a scalar value from the vector. This function will directly modify the current vector
	 * If you need a Vector back without modifying the current vector use the subClone method.
	 * @param val scalar value or another Vector to subtract to the components
	 * Number array format\
	 * [ x, y, z ]\
	 * [ x , y ] \
	 * [ x ]
	 */
	sub(val: number | Vector): void {
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
	}
	/**
	 * @description Divides a given vector or a scalar value from the vector. This function will directly modify the current vector
	 * If you need a Vector back without modifying the current vector use the divClone method.
	 * @param val scalar value or another Vector to divide to the components
	 * Number array format\
	 * [ x, y, z ]\
	 * [ x , y ] \
	 * [ x ]
	 */
	div(val: number | Vector): void {
		if (typeof val === "number") {
			if (val === 0) {
				throw new Error("Division by zero is not allowed.");
			}
			this.x /= val;
			this.y /= val;
			this.z /= val;
		} else if (this.__isVector(val)) {
			if (val.x === 0 || val.y === 0 || val.z === 0) {
				throw new Error("Division by zero is not allowed.");
			}
			this.x /= val.x;
			this.y /= val.y;
			this.z /= val.z;
		} else if (Array.isArray(val)) {
			if (val[0] === 0 || val[1] === 0 || val[2] === 0)
				throw new Error("Division by zero is not allowed.");

			if (val[0] !== undefined) this.x /= val[0];
			if (val[1] !== undefined) this.y /= val[1];
			if (val[2] !== undefined) this.z /= val[2];
		}
	}

	/**
	 * @description Adds a given vector or a scalar value from the current vector and gives a new Vector back without modifying the current vector
	 * @param val scalar value or another Vector to add to the components
	 * Number array format\
	 * [ x, y, z ]\
	 * [ x , y ] \
	 * [ x ]
	 
	 */
	addClone(val: number | Vector): Vector {
		const result = new Vector([this.x, this.y, this.z]);
		result.add(val);
		return result;
	}

	/**
	 * @description Multiplies a given vector or a scalar value to the current vector and gives a new Vector back without modifying the current vector
	 * @param val scalar value to multiply to the components
	 * Number array format\
	 * [ x, y, z ]\
	 * [ x , y ] \
	 * [ x ]
	 */
	multClone(val: number | Vector): Vector {
		const result = new Vector([this.x, this.y, this.z]);
		result.mult(val);
		return result;
	}

	/**
	 * @description Subtracts a given vector or a scalar value from the current vector and gives a new Vector back without modifying the current vector
	 * @param val scalar value or another Vector to subtract from the components
	 * Number array format\
	 * [ x, y, z ]\
	 * [ x , y ] \
	 * [ x ]
	 */
	subClone(val: number | Vector): Vector {
		const result = new Vector([this.x, this.y, this.z]);
		result.sub(val);
		return result;
	}

	/**
	 * @description Divides a given vector or a scalar value from the current vector and gives a new Vector back without modifying the current vector
	 * @param val scalar value or another Vector to divide from the components
	 * Number array format\
	 * [ x, y, z ]\
	 * [ x , y ] \
	 * [ x ]
	 */
	divClone(val: number | Vector): Vector {
		const result = new Vector([this.x, this.y, this.z]);
		result.div(val);
		return result;
	}

	private __isVector(vec: any): vec is Vector {
		return vec instanceof Vector;
	}
}

export default Vector;
