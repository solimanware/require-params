//Express Docs: https://expressjs.com/en/guide/writing-middleware.html
module.exports = function (path, requiredParamsArray, forceRequireParams) {
    /* handling errors */

    //make sure it's array
    if (!(requiredParamsArray instanceof Array)) {
        return new Error('you must be using array for the second argument')
    }
    //make sure it's not empty array
    if (requiredParamsArray < 1) {
        return new Error('not found Required parameters')
    }
    //it's array?...double check its items
    if(requiredParamsArray instanceof Array){
        //https://stackoverflow.com/questions/7713434/regular-expression-single-word
        const oneWordRegEx = new RegExp("^[A-Za-z]+$");
        //loop the array items
        requiredParamsArray.forEach((param)=>{
            //make sure it's string
            if(typeof param !== 'string'){
                return new Error('check if all your required params are array of strings > ["param1","param2"]')
             }
             //make sure it's proper one word paramerter name
             if(typeof param === 'string'){
                if(oneWordRegEx.test(param)){
                    return new Error('check if all your params are named correctly')
                }
             }

        })
    }
    //Express Docs: https://expressjs.com/en/guide/writing-middleware.html
    return function (req, res, next) {
        /* handling errors */
        //make sure it's object of request parameters
        if(typeof req !== "object") return new Error('are you sure you sending the request "object"?')

    
        //extract params from the request body
        const reqParams = req.body
        
        //specific path for the middleware
        if (req.path === path) {
            //figure the missing required parameters
            const missingRequiredParams = getMissingPrams(reqParams, requiredParamsArray);
            //is there missing parameters?
            if (missingRequiredParams.length > 0) {
                //more than one parameter missing? ...propper display message
                let msg = missingRequiredParams.length > 1
                    ? " parameters > NOT FOUND"
                    : " parameter > NOT FOUND"
                let error = missingRequiredParams.join() + msg
                if (forceRequireParams) {
                    res
                        .status(400)
                        .send(error);
                } else {
                    req.missingParams = missingRequiredParams;
                    next();
                }
            } else {
                next();
            }
        } else {
            next();
        }
    }
}
/**
 * function to detect missing paramerters
 *
 * @param  {Request:Request} reqParams - contains Request and Response
 * @param  {String[]} requiredParamsArray - array of required params during code excution
 * @returns {String[]} - sending array of missed required parameters array to handle them within the code
 */
function getMissingPrams(reqParams, requiredParamsArray) {
    //handling errors
    if (!reqParams) 
        return new Error('send reqParamsect for the first argument')
    if (!(requiredParamsArray instanceof Array)) 
        return new Error('you must be using array for the second argument')
    if (requiredParamsArray < 1) 
        return new Error('not found Required parameters')

        //Assigning body keys to array optimizing performance
    const reqParamsArray = Object.keys(reqParams);
    //extracting the missing paramerters
    const missedParams = requiredParamsArray.filter(param => !reqParamsArray.includes(param))
    //here's the array of missedParams
    return missedParams;
}
