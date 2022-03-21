const arrayResults = {
	every: {},
	filter: {},
	map: {},
	reduce: {},
	some: {}
};
const test = [1, 4, 9, 16, 25];

function process(arr, holder, path) {
    holder.every[path] = arr.every((x) => Math.sqrt(x) === Math.floor(Math.sqrt(x)));
    holder.filter[path] = arr.filter((x) => x > 2 && x < 20);
    holder.map[path] = arr.map((x) => x * 2);
	holder.reduce[path] = arr.reduce((p, c) => p * c);
    holder.some[path] = arr.some((x) => x === 5);
}

const before = process(test, arrayResults, "before"); // Vanilla JS processing

/* ---- REDEFINE PROTOTYPE FUNCTIONS ---- */
Array.prototype.every = function(cb) {
	console.log("Running custom 'every' function...");

	for (var i = 0; i < this.length; i++) {
		if (!cb(this[i], i, this)) {
			return false;
		}
	}

	return true;
};

Array.prototype.filter = function(cb) {
	console.log("Running custom 'filter' function...");

	const result = [];

	for (var i = 0; i < this.length; i++) {
		if (cb(this[i], i, this)) {
			result.push(this[i]);
		}
	}

	return result;
}

Array.prototype.map = function(cb) {
	console.log("Running custom 'map' function...");

	const result = [];

	for (var i = 0; i < this.length; i++) {
		result.push(cb(this[i], i, this));
	}

	return result;
}

Array.prototype.reduce = function(cb) {
	console.log("Running custom 'reduce' function...");

	if (this.length) {
		var result = this[0];

		for (var i = 1; i < this.length; i++) {
			result = cb(result, this[i], i, this);
		}

		return result;
	} else {
		return undefined;
	}
}

Array.prototype.some = function (cb) {
	console.log("Running custom 'some' function...");

	for (var i = 0; i < this.length; i++) {
		if (cb(this[i], i, this)) {
			return true;
		}
	}

	return false;
}
/* ---------------------- */

const after = process(test, arrayResults, "after"); // Rewritten JS processing

console.log("==== ARRAY PROTOTYPE RESULTS ====");
console.dir(arrayResults);

function createDummyPromise(value, timer) {
	return new Promise((resolve, reject) => {
		setTimeout(() => { resolve(value) }, timer);
	});
}

async function runAsyncStuff() {
	createDummyPromise(1, 1000).then(result => {
		console.log("Promise chain", result);
		return createDummyPromise(result + 1, 1000);
	}).then(result => {
		console.log("Promise chain", result);
		return createDummyPromise(result + 1, 1000);
	}).then(result => {
		console.log("Promise chain", result, "END");
	});

	var waitValue = await createDummyPromise(99, 2500);
	console.log("Wait Value:", waitValue);
}

console.log("==== PROMISE RESULTS ====");
runAsyncStuff();