# require-params 
[![npm version](https://badge.fury.io/js/require-params.svg)](https://badge.fury.io/js/require-params)
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
```javascript
const requireParams = require('require-params')
```


Arguments Explaining:

```javascript
requireParams(PATH:String,RequiredParmeters:String[],ForceRequireParams?:Boolean)
```

Usage basic example:


```javascript
app.use(requireParams('/api/endpoint',['text'],true))
```





Full code example
```javascript
const express = require('express')
const app = express()

app.use(express.urlencoded({extended: true}));
app.use(express.json())

const requireParams = require('require-params');

app.use(requireParams('/api/endpoint',['text'],true))

app.post('/api/endpoint', (req, res) => {
    //code happens here only when required params are provided when force require is enabled
})
```

Like it :+1: ... Tweet it [![Twitter](https://img.shields.io/twitter/url/https/www.npmjs.com/package/require-params.svg?style=social)](https://twitter.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Frequire-params)


This is on [GitHub](https://github.com/Microsmsm/require-params) your contributions are very welcomed.
[![star this repo](http://githubbadges.com/star.svg?user=Microsmsm&repo=require-params&style=flat)](https://github.com/Microsmsm/require-params)
[![fork this repo](http://githubbadges.com/fork.svg?user=Microsmsm&repo=require-params&style=flat)](https://github.com/Microsmsm/require-params/fork)


