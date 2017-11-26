//module.exports = requireParams

/**
 * Utility package to faster require certain paramerters and using them during the post request handling
 * 
 * @param  {{Response:Response,Request:Request}} mainObject - contains Request and Response
 * @param  {Array} requiredParamsArray - array of required params during code excution
 * @returns {Boolean|Array} - returns boolean to stop excution if defaultResponse is true sending response of default message to the user "or" sending array of missed required parameters array to handle them within the code
 */
function missingPrams({
    req,
    res
}, requiredParamsArray) {
    //handling errors
    if (!{
            req,
            res
        }) return new Error('send {req,res} for the first argument')
    if (!(requiredParamsArray instanceof Array)) return new Error('you must be using array for the second argument')
    if (requiredParamsArray < 1) return new Error('not found Required parameters for the second argument please use array of string parameters')

    //Assigning body keys to array optimizing performance
    const bodyObjKeys = Object.keys(req.body);
    //extracting the missing paramerters
    const missedParams = requiredParamsArray.filter(param => !bodyObjKeys.includes(param))

    //or use custom one?? here's the array of missedParams
    return missedParams;
}


//requiredParamsArray
//path
exports.express = function (path, requiredParams,forceParams) {
    return function (req, res, next) {

        //Only run when req.path equles path
        if(req.path === path){

            const missingRequiredParams = missingPrams({
                req,
                res
            }, requiredParams);

            if(missingRequiredParams.length > 0){
                let msg = missingRequiredParams.length > 1 ?
                " parameters > NOT FOUND" :
                " parameter > NOT FOUND"
                let error = missingRequiredParams.join() + msg

                if(forceParams){
                    res.status(400).send(error);
                }else{
                    req.missingParams = missingRequiredParams;
                    next();
                }
            }

        }else{
            next()            
        }
    }
}
