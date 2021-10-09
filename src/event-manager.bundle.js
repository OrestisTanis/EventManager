/**
 * [ Constructs an EventDTO object to encapsuslate event related data ]
 * @return {[Object]} [ Returns an object of type EventData ]
 */
  var EventDTO = function(name, payload){
    return {
        name: name,
        payload: payload
    }
}

/** [ Constructs an _Event object ]
 * @param  {[string]} eventName [ The event's name ]
 * @return {[Object]} [ An _Event object ]
 * */
var _Event = function(eventName){
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


/** [ Constructs an object giving access to the EventManager object through its getInstance method.]
 * @return {[Object]} [ An object giving access to the EventManager object through its getInstance method.  ]
 * */
var EventManager = (function(){
    var instance = null;

    /** [ Constructs an object of type EventManagerSingleton ]
     * @return {[Object]} [ An object of type EventManagerSingleton.  ]
     * */
    var EventManagerSingleton = function(){
        var events = {};

        var registerEvent = function(eventName){
            if (!events[eventName]){
                var newEvent = new _Event(eventName);
                events[eventName] = newEvent;
            }
        }

        var deregisterEvent = function(eventName){
            delete events[eventName];
        }

        return Object.freeze({
            logEvents: function(){
                Object.keys(events).forEach(function(key){
                    console.log(events);
                })
            },
            /**
             * [ Attaches a listener to the current event ]
             * @param  {eventName} eventName [ A string representing the name of the event to which the listener will be attached to ]
             * @param  {lstener} listener [ An object or a function to be added as a listener for the event ]
             */
            on: function(eventName,listener){
                if (!events[eventName]){
                    registerEvent(eventName);
                }
                events[eventName].addListener(listener);
            },
             /**
             * [ Detaches a listener from the current event ]
             * @param  {eventName} eventName [ A string representing the name of the event to which the listener will be detached from ]
             * @param  {lstener} listener [ An object or a function that was previously added as a listener for the event ]
             */
            off: function(eventName,listener){
                if (!events[eventName]){
                    console.error(`There is no event named ${eventName} to remove the listener from.`);
                    return;
                }
                events[eventName].removeListener(listener);
                if (events[eventName].getListeners().length === 0){
                    deregisterEvent(eventName);
                }
            },
             /**
             * [ Fires the event ]
             * @param  {string} eventName [ A string repesenting the name of the event to fire ]
             * @param  {Object} eventPayload [ An object carrying the event's payload ]
             */
            fireEvent: function(eventName, eventPayload){
                var eventFound = false;
                Object.keys(events).forEach(function(key){
                    if (key === eventName){
                        events[key].fire(eventName, eventPayload);
                        eventFound = true;
                    }
                });
                if (!eventFound){
                    console.warn(`There is no event named ${eventName} to fire.`);
                    return;
                }
            }
        });
    }

    return Object.freeze({
        /**
         * [ Returns the single EventManager instance ]
         * @return {Object} [ An object of type EventManager ]
         */
        getInstance: function(){
            if (!instance){
                instance = new EventManagerSingleton();
            }
            return instance;
        }
    });
})();   