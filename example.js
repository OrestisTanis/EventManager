import EventManager from './src/event-manager.js';

// 1) Get the eventManager instance
var eventManager = EventManager.getInstance();

// 2) Attach listeners to events
// Listeners can be any function OR object with a notify() method;
var myDbSyncFunction = (event) => { 
    console.log(`User with user.id = ${event.payload.user_id} was just deleted. Syncing databases...`);
};
eventManager.on('USER_DELETED', myDbSyncFunction);

// Multiple listeners can be attached to the same event
const emailService = { 
    someOtherMethod: () => { },
    notify: (event) => {
        if (event.name === 'USER_DELETED'){
            console.log(`User with user.id = ${event.payload.user_id} was just deleted. Sending email...`);
        }
    }
}
eventManager.on('USER_DELETED', emailService);


// 3) Fire events with carried payloads
// eg. user with id = 5 was just deleted from db, fire the event
eventManager.fireEvent('USER_DELETED', {user_id: 5});


// 4) Detach listeners from events at the end
eventManager.off("USER_DELETED", myDbSyncFunction);
eventManager.off("USER_DELETED", emailService);

