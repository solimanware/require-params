module.exports = function (path, requiredParamsArray, forceRequireParams) {
    //handle errors
    if (!(requiredParamsArray instanceof Array)) {
        return new Error('you must be using array for the second argument')
    }
    if (requiredParamsArray < 1) {
        return new Error('not found Required parameters for the second argument please use array of string' +
                ' parameters')
    }
    
    return function (req, res, next) {
        const reqParams = req.body
        console.log(reqParams);
        console.log(req.path, path);
        //specific path for the middleware
        if (req.path === path) {

            //figure the missing required parameters
            const missingRequiredParams = getMissingPrams(reqParams, requiredParamsArray);
            console.log(missingRequiredParams);

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
        return new Error('not found Required parameters for the second argument please use array of string' +
                ' parameters')

        //Assigning body keys to array optimizing performance
    const reqParamsArray = Object.keys(reqParams);
    //extracting the missing paramerters
    const missedParams = requiredParamsArray.filter(param => !reqParamsArray.includes(param))
    //here's the array of missedParams
    return missedParams;
}
