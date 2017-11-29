const getMissingParams = require('./get-missing')
//Express Docs: https://expressjs.com/en/guide/writing-middleware.html
module.exports = function (path, requiredParamsArray, forceRequireParams) {
    /* Handling Possible Errors */

    //make sure it's array
    if (!(requiredParamsArray instanceof Array)) {
        return new Error('you must be using array as the second argument')
    }
    //make sure it's not empty array
    if (!requiredParamsArray.length) {
        return new Error('not found Required parameters > Array is empty')
    }
    // double check its items: regex link >
    // https://stackoverflow.com/a/7713498/4591364
    const oneWordRegEx = new RegExp("^[A-Za-z]+$");
    //loop the array items
    requiredParamsArray.forEach((param) => {
        //make sure it's string
        if (typeof param !== 'string') {
            return new Error('check if all your required params are array of strings > ["param1","param2"]')
        }
        if (!oneWordRegEx.test(param)) {
            return new Error('check if all your params are named correctly > one worded')
        }

    })

    //Express Docs: https://expressjs.com/en/guide/writing-middleware.html
    return function (req, res, next) {
        /* Handling Possible Errors */
        //make sure it's object of request parameters
        if (!req.body) return new Error('are you sure you sending the request "object" containg body?')
        //extract params from the request body
        const reqParams = req.body
        //make sure it's the specific path for the middleware. No?... Skip... Next...
        if (req.path !== path) return next();
        //figure the missing required parameters
        const missingRequiredParams = getMissingParams(reqParams, requiredParamsArray);
        //is there missing parameters?... No? Skip... Next...
        if (!missingRequiredParams.length) return next();
        //More than one parameter missing? ...propper display message
        let msg = missingRequiredParams.length > 1 ?
            " parameters > NOT FOUND" :
            " parameter > NOT FOUND"
        let error = missingRequiredParams.join() + msg
        //you are force require params? code reached here? there must be missing params > send {error}
        if (forceRequireParams) return res.status(400).send(error);
        //not forcing required params? I will send you them with req body you can handle them by yourself
        req.missingParams = missingRequiredParams;
        next();
    }
}
