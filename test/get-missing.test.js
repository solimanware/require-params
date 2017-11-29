const getMissingParams = require('../get-missing')

it('should return missing',()=>
    expect(getMissingParams({text:'hello'},['text','phone']))
    .toEqual(['phone'])
)