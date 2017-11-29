/**
* function to detect missing paramerters
*
* @param  {Request:Request} reqParams - contains Request and Response
* @param  {String[]} requiredParamsArray - array of required params during code excution
* @returns {String[]} - sending array of missed required parameters array to handle them within the code
*/
module.exports = function getMissingParams(reqParams, requiredParamsArray) {
   //handling errors
   if (!reqParams) throw new Error('expecting params object for the first argument')
   if (!(requiredParamsArray instanceof Array)) throw new Error('you must be using "array" for the second argument')
   if (requiredParamsArray.length < 1) throw new Error('not found Required parameters')
   //Assigning body keys to array optimizing performance
   const reqParamsArray = Object.keys(reqParams);
   //extracting the missing paramerters
   const missedParams = requiredParamsArray.filter(param => !reqParamsArray.includes(param))
   //here's the array of missedParams
   return missedParams;
}
