# require-params 
[![npm version](https://badge.fury.io/js/require-params.svg)](https://badge.fury.io/js/require-params)
[![GitHub release](https://img.shields.io/github/release/qubyte/rubidium.svg)](https://github.com/Microsmsm/require-params)
[![GitHub issues](https://img.shields.io/github/issues/Microsmsm/require-params.svg)](https://github.com/Microsmsm/require-params/issues)

Fast, minimalist middleware for express.


useful features:

 * require important params
 * auto send message with missing params
 * return missing params array 

Install:
```
npm i require-params
```

And here's basic usage code:

```javascript
app.use(requireParams('/api/isSadPost',['text'],true))
```



Full code example
```javascript
const express = require('express')
const app = express()

app.use(express.urlencoded({extended: true}));
app.use(express.json())

const requireParams = require('require-params');

app.use(requireParams('/api/isSadPost',['text'],true))

app.post('/api/isSadPost', (req, res) => {
    //code happens here only when required params are provided
})
```

This is on [GitHub](https://github.com/Microsmsm/require-params) your contributions are very welcomed.
[![GitHub stars](https://img.shields.io/github/stars/badges/shields.svg?style=social&label=Stars)]()



