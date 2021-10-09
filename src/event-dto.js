/**
 * [ Constructs an EventDTO object to encapsuslate event related data ]
 * @return {[Object]} [ Returns an object of type EventData ]
 */
 export var EventDTO = function(name, payload){
    return {
        name: name,
        payload: payload
    }
}