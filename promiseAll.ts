/**
 * @description Create a function `promiseAll`. This function should be based
 * off of the native Promise.all() function on the promise object in JavaScript
 * and the way that is works is: it takes in an array of promises and returns an
 * array of the resolved values of those promises. The resolved values should be
 * in the order that the promises are taken in and it should revolve when all
 * the promises were consumed have resolved and it should reject if any of the
 * promises rejects.
 */

const slowPromise = new Promise((resolve) =>
  setTimeout(() => resolve("Slow Promise"), 1000)
);
const PROMISES = [
  Promise.resolve(2),
  Promise.resolve(3),
  Promise.resolve(4),
  Promise.resolve("resolve"),
  slowPromise,
];

const promiseAll = (promises: Array<Promise<unknown>>) => {
  let OUTPUT: Array<unknown> = [];

  return new Promise((resolve, reject) => {
    promises.forEach((currentPromise, index) => {
      currentPromise
        .then((value) => {
          OUTPUT[index] = value;

          if (OUTPUT.length === promises.length) {
            resolve(OUTPUT);
          }
        })
        .catch((err) =>
          reject(
            `Promise in position ${
              index + 1
            } has been rejected. Details: ${err}`
          )
        );
    });
  });
};

promiseAll(PROMISES).then(console.log);
