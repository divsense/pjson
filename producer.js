importScripts('https://cdnjs.cloudflare.com/ajax/libs/ramda/0.25.0/ramda.min.js')

/** DIVSENSE JSON. Still need to fix @TODO - booleans, 'strings with single quote '[, issue with not all nodes being evaluated */

const getval = v => {
    const val = R.prop('value', v)
    const clean = val === undefined ? "" : val
    return R.type(val) === 'Object' ? clean.dval : clean
}

const darray = (msg, callback)  => {
    const v = R.map(getval, msg.inputs)
    //console.log('array: ', v)
    callback( {dval: v} )
}

const dobject = (msg, callback) => {
    const v = R.mergeAll(R.map(getval, msg.inputs))
    if(msg.nodeText === '') console.log('json: ', JSON.stringify(v))
    callback( {dval: v} )
}

const dkey = (msg, callback) => {
    /* @TODO check if more than one node, then use manager error message
       to inform user that only 1 value per key */
    const v = R.objOf(msg.nodeText, getval(R.nth(0, msg.inputs)))
    //console.log('key: ', v)
    callback( {dval: v} )
}

application.setInterface({darray:darray, dobject:dobject, json: dobject, dkey: dkey});
