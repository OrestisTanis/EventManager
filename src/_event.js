import { EventDTO } from "./event-dto.js";

/** [ Constructs an _Event object ]
 * @param  {[string]} eventName [ The event's name ]
 * @return {[Object]} [ An _Event object ]
 * */
export var _Event = function(eventName){
    var name = eventName;
    var listeners = [];

    return Object.freeze({
        /**
         * [ Returns a string representng the event's name ]
         * @return { string } [ A string representing the event's name ]
         */
        getName: function(){
            return name;
        },
        /**
         * [ Attached a listener to the current event ]
         * @param  {Object} listener [ A listener object ]
         * @return {void}
         */
        addListener: function(listener){
            if (typeof listener !== "function" && !listener.notify && !typeof listeners.notify === 'function'){
                console.warn("EventManager.On() method callback argument must be a function or an object with a notify() method. Skipping...");
                return;
            }
            listeners.push(listener);
        },
        /**
         * [ Removes the listener from the event ]
         * @param  {Object} listener [ A listener object ]
         */
        removeListener: function(listener){
            for (var i = 0; i < listeners.length; i++){
                if (listeners[i] === listener){
                    listeners.splice(i,1);
                }
            }
        },
        getListeners: function(){
            return listeners;
        },
        logListeners: function(){
            console.log(listeners);
        },
        /**
         * [ Fires the event while transfering a payload ]
         * @param  {eventName} eventName [ The name of the event to fire ]
         * @return {void} 
         */
        fire: function(eventName, eventPayload){
            var eventDTO = new EventDTO(eventName, eventPayload);

            if (!listeners.length){
                console.warn(`There are no listeners for '${eventName}' event.`)
                return;
            }
            for (var i = 0; i < listeners.length; i++){
                if (typeof listeners[i] === 'function'){
                    listeners[i](eventDTO);
                }
                
                if (typeof listeners[i] === 'object' && listeners[i].notify && typeof listeners[i].notify === 'function'){
                    listeners[i].notify(eventDTO);
                }
            }
        }
    });
};
