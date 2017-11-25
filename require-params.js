module.exports = requireParams

/**
 * Utility package to faster require certain paramerters and using them during the post request handling
 * 
 * @param  {{Response:Response,Request:Request}} mainObject - contains Request and Response
 * @param  {Array} requiredParamsArray - array of required params during code excution
 * @param  {Boolean=} defualtResponse - Setting to true adding default message of missed params not found
 * @returns {Boolean|Array} - returns boolean to stop excution if defaultResponse is true sending response of default message to the user "or" sending array of missed required parameters array to handle them within the code
 */
function requireParams ({req,res}, requiredParamsArray, defualtResponse) {
    //handling errors
    if (!{req,res}) return new Error('send {req,res} for the first argument')
    if (!(requiredParamsArray instanceof Array)) return new Error('you must be using array for the second argument')
    if (requiredParamsArray < 1) return new Error('not found Required parameters for the second argument please use array of string parameters')
    if (typeof(defualtResponse) !== "boolean") return new Error('third argument must be true or false')

    //Assigning body keys to array optimizing performance
    const bodyObjKeys = Object.keys(req.body);
    //extracting the missing paramerters
    const missedParams  = requiredParamsArray.filter(param => !bodyObjKeys.includes(param))
    //do you want to display default response setting defaultResponse to true 
    if(defualtResponse){
        if (missedParams && missedParams.length) {
            let msg = missedParams.length > 1
                ? " parameters > NOT FOUND"
                : " parameter > NOT FOUND"
            let error = missedParams.join() + msg
            res.send({error})
            return new Error(error)
        }
    }
    //or use custom one?? here's the array of missedParams
    return missedParams
}