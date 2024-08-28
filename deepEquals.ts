/**
 * @description Create a function called `deepEquals`. It basically takes in
 * two values that can be any values except functions and it compares them
 * at a deep level, meaning that if you have two objects it's going to compare
 * all the values inside the object including their nested objects or arrays.
 */

type PrimitiveValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | BigInt
  | Symbol;

type ObjectValue = Record<string, unknown> | Date | Array<unknown> | RegExp;

const deepEquals = (
  valueOne: PrimitiveValue | ObjectValue,
  valueTwo: PrimitiveValue | ObjectValue
): boolean => {
  if (typeof valueOne !== "object" && typeof valueTwo !== "object") {
    if (typeof valueOne === "number" && typeof valueTwo === "number") {
      return checkNumberEquality(valueOne, valueTwo);
    }

    return valueOne === valueTwo;
  }

  // We have to cover this bug in JavaScript, since typeof null == 'object'
  if (valueOne === null && valueTwo === null) return true;

  if (Array.isArray(valueOne) && Array.isArray(valueTwo)) {
    return checkArrayEquality(valueOne, valueTwo);
  }

  if (
    !Array.isArray(valueOne) &&
    !Array.isArray(valueTwo) &&
    valueOne !== null &&
    valueTwo !== null
  ) {
    return checkObjectEquality(
      valueOne as Record<string, PrimitiveValue | ObjectValue>,
      valueTwo as Record<string, PrimitiveValue | ObjectValue>
    );
  }

  // Any other combination that was not mapped is going to return false
  return false;
};

const checkNumberEquality = (valueOne: number, valueTwo: number): boolean => {
  if (isNaN(valueOne) && isNaN(valueTwo)) {
    return true;
  }
  return valueOne == valueTwo;
};

const checkArrayEquality = (
  arrayOne: Array<PrimitiveValue | ObjectValue>,
  arrayTwo: Array<PrimitiveValue | ObjectValue>
): boolean => {
  let arrayAreEqual: boolean = true;

  if (arrayOne.length != arrayTwo.length) return !arrayAreEqual;

  for (let index = 0; index < arrayOne.length; index++) {
    const sameValue = deepEquals(arrayOne[index], arrayTwo[index]);

    if (!sameValue) {
      arrayAreEqual = false;
      break;
    } else {
      continue;
    }
  }

  return arrayAreEqual;
};

const checkObjectEquality = (
  objectOne: Record<string, PrimitiveValue | ObjectValue>,
  objectTwo: Record<string, PrimitiveValue | ObjectValue>
): boolean => {
  let objectsAreEqual: boolean = true;

  if (Object.entries(objectOne).length != Object.entries(objectTwo).length)
    return !objectsAreEqual;

  const containSameKeys = deepEquals(
    Object.keys(objectOne).sort(),
    Object.keys(objectTwo).sort()
  );

  const containSameValues = deepEquals(
    Object.values(objectOne).sort(),
    Object.values(objectTwo).sort()
  );

  return containSameKeys && containSameValues;
};

console.log("\nTRUE: \n");
console.log(deepEquals(1, 1));
console.log(deepEquals("a", "a"));
console.log(deepEquals(NaN, NaN));
console.log(deepEquals([], []));
console.log(deepEquals([1], [1]));
console.log(
  deepEquals(
    [
      [1, 2],
      [3, 4],
    ],
    [
      [1, 2],
      [3, 4],
    ]
  )
);
console.log(deepEquals({ a: 1, b: 2 }, { a: 1, b: 2 }));
console.log(deepEquals({ a: 1, b: 2 }, { b: 2, a: 1 }));
console.log(deepEquals(BigInt(9007199254740991), BigInt(9007199254740991)));
console.log(deepEquals(null, null));
console.log(deepEquals(undefined, undefined));
console.log(deepEquals(new Array(1000).fill("a"), new Array(1000).fill("a")));
console.log("\nFALSE: \n");
console.log(deepEquals(1, 0));
console.log(deepEquals("a", "b"));
console.log(deepEquals(NaN, 10));
console.log(deepEquals(NaN, "NaN"));
console.log(deepEquals([], [1]));
console.log(deepEquals([10], [1]));
console.log(
  deepEquals(
    [
      [1, 2, 3],
      [3, 4],
    ],
    { 1: 1 }
  )
);
console.log(deepEquals({ a: 1, b: 2 }, { a: 1, b: { c: 1 } }));
console.log(deepEquals(BigInt(9007199254740991), BigInt(900719925474099)));
console.log(deepEquals(Symbol("hello"), Symbol("hello")));
console.log(deepEquals(null, {}));
