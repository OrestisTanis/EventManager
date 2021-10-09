import { _Event } from "./_event.js";

/** [ Constructs an object giving access to the EventManager object through its getInstance method.]
 * @return {[Object]} [ An object giving access to the EventManager object through its getInstance method.  ]
 * */
export default (function(){
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