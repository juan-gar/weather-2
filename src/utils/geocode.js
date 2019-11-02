const request = require('request')


const geocode = (address,callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?limit=1&access_token=pk.eyJ1IjoiZ2VuaXVzYXRnZW9jb2RpbmciLCJhIjoiY2sxcDl0aW1rMHM2azNrcWtydTNpaTlrZiJ9.1l9TwAEmUuTTyw9ihk3IxA`

    request({url, json: true}, (error, response) => {
        if(error){
            callback('Unable to reach location services',undefined)
        } else if (response.body.features.length === 0){
            callback('Could not find that place',undefined)
        } else {
            callback(undefined,{
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                place: response.body.features[0].text
            })
        }
        
        
    })
}


module.exports = geocode