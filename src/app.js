/* eslint-disable radix */
const express = require('express');

const app = express();

app.use(express.json());

// app.get('/strings/hello/:name', (req, res) => {
//   const { name } = req.params;
//   res.status(200).json({ result: `Hello, ${name}!` });
// });

const { sayHello } = require('./lib/strings');

app.get('/strings/hello/:string', (req, res) => {
  res.json({ result: sayHello(req.params.string) });
});

const { uppercase } = require('./lib/strings');

app.get('/strings/upper/:string', (req, res) => {
  res.json({ result: uppercase(req.params.string) });
});

const { lowercase } = require('./lib/strings');

app.get('/strings/lower/:string', (req, res) => {
  res.json({ result: lowercase(req.params.string) });
});

const { firstCharacter } = require('./lib/strings');

// app.get('/strings/first-character/:string', (req, res) => {
//   res.json({ result: firstCharacter(req.params.string) });
// });

const { firstCharacters } = require('./lib/strings');

app.get('/strings/first-characters/:string', (req, res) => {
  if (req.query.length === undefined) {
    res.json({ result: firstCharacter(req.params.string) });
  } else {
    res.json({ result: firstCharacters(req.params.string, req.query.length) });
  }
});

const { add } = require('./lib/numbers');

// app.get('/numbers/add/:a/and/:b', (req, res) => {
//   res.json({ result: add(req.params.a.b) });
// });

// app.get('/numbers/add/:a/and/:b', (req, res) => {
//   const a = parseInt(req.params.a);
//   const b = parseInt(req.params.b);

//   res.json({ result: add(a, b) });
// });

app.get('/numbers/add/:a/and/:b', (req, res) => {
  const a = parseInt(req.params.a);
  const b = parseInt(req.params.b);

  if (Number.isNaN(a) || Number.isNaN(b)) {
    res.status(400).json({ error: 'Parameters must be valid numbers.' });
  } else {
    res.json({ result: add(a, b) });
  }
});

const { subtract } = require('./lib/numbers');

app.get('/numbers/subtract/:b/from/:a', (req, res) => {
  const a = parseInt(req.params.a);
  const b = parseInt(req.params.b);

  if (Number.isNaN(a) || Number.isNaN(b)) {
    res.status(400).json({ error: 'Parameters must be valid numbers.' });
  } else {
    res.status(200).json({ result: subtract(a, b) });
  }
});

const { multiply } = require('./lib/numbers');

// app.post('/numbers/multiply', (req, res) => {
//   const { a } = req.body;
//   const b = parseInt(req.body.b);

//   res.status(200).json({ result: multiply(a, b) });
// });

// app.post('/numbers/multiply', (req, res) => {
//   res.json({ result: multiply(req.body.a, req.body.b) });
// });

app.post('/numbers/multiply', (req, res) => {
  const { a } = req.body;
  const { b } = req.body;

  if (a === undefined || b === undefined) {
    res.status(400).json({ error: 'Parameters "a" and "b" are required.' });
  } else if (Number.isNaN(parseInt(a)) || Number.isNaN(parseInt(b))) {
    res.status(400).json({ error: 'Parameters "a" and "b" must be valid numbers.' });
  } else {
    res.json({ result: multiply(req.body.a, req.body.b) });
  }
});

const { divide } = require('./lib/numbers');

app.post('/numbers/divide', (req, res) => {
  const { a } = req.body;
  const { b } = req.body;

  if (b === 0) {
    res.status(400).json({ error: 'Unable to divide by 0.' });
  } else if (a === undefined || b === undefined) {
    res.status(400).json({ error: 'Parameters "a" and "b" are required.' });
  } else if (Number.isNaN(parseInt(a)) || Number.isNaN(parseInt(b))) {
    res.status(400).json({ error: 'Parameters "a" and "b" must be valid numbers.' });
  } else {
    res.json({ result: divide(req.body.a, req.body.b) });
  }
});

const { remainder } = require('./lib/numbers');

app.post('/numbers/remainder', (req, res) => {
  const { a } = req.body;
  const { b } = req.body;

  if (b === 0) {
    res.status(400).json({ error: 'Unable to divide by 0.' });
  } else if (a === undefined || b === undefined) {
    res.status(400).json({ error: 'Parameters "a" and "b" are required.' });
  } else if (Number.isNaN(parseInt(a)) || Number.isNaN(parseInt(b))) {
    res.status(400).json({ error: 'Parameters must be valid numbers.' });
  } else {
    res.json({ result: remainder(req.body.a, req.body.b) });
  }
});

const { negate } = require('./lib/booleans');

app.post('/booleans/negate', (req, res) => {
  res.json({ result: negate(req.body.value) });
});

const { truthiness } = require('./lib/booleans');

app.post('/booleans/truthiness', (req, res) => {
  res.json({ result: truthiness(req.body.value) });
});

const { isOdd } = require('./lib/booleans');

app.get('/booleans/is-odd/:number', (req, res) => {
  if (Number.isNaN(parseInt(req.params.number))) {
    res.status(400).json({ error: 'Parameter must be a number.' });
  } else {
    res.json({ result: isOdd(req.params.number) });
  }
});

const { startsWith } = require('./lib/booleans');

app.get('/booleans/:string/starts-with/:char', (req, res) => {
  if (req.params.char.length > 1) {
    res.status(400).json({ error: 'Parameter "character" must be a single character.' });
  } else {
    res.json({ result: startsWith(req.params.char, req.params.string) });
  }
});

const { getNthElement } = require('./lib/arrays');

app.post('/arrays/element-at-index/:index', (req, res) => {
  res.json({ result: getNthElement(req.params.index, req.body.array) });
});

const { addToArray2 } = require('./lib/arrays');

app.post('/arrays/append', (req, res) => {
  res.json({ result: addToArray2(req.body.value, req.body.array) });
});

const { elementsStartingWithAVowel } = require('./lib/arrays');

app.post('/arrays/starts-with-vowel', (req, res) => {
  res.json({ result: elementsStartingWithAVowel(req.body.array) });
});

const { removeNthElement, removeNthElement2 } = require('./lib/arrays');

app.post('/arrays/remove-element', (req, res) => {
  if (req.query === undefined) {
    res.json({ result: removeNthElement2(0, req.body.array) });
  } else {
    res.json({ result: removeNthElement2(parseInt(req.query.index), req.body.array) });
  }
});

module.exports = app;
