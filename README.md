# EventManager.js

The EventManager.js library is designed to help achieve loose coupling between the components of an application with regards to messaging.

## Features

- Easy and straight-forward to use
- Attach/detach listeners to custom events
- Fire custom events


## Usage
- In case you installed via npm or other package managers  
```js
import EventManager from  'path_to_lib_src_folder/event-manager.js;
```

<br/>

- You can alternatively even include the bundle file with your HTML  
```html
<script src="path_to_lib_src_folder/event-manager.bundle.js"></script>
```

<br/>

1.) Get the reference of the EventManager instance  
```js
var eventManager = EventManager.getInstance();
```

<br/>

2.) Attach listeners to events
```js
// Listeners can be any function OR object with a notify() method;
const myDbSyncFunction = (event) => { 
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
eventManager.on('USER_DELETED', emailService);]
```

<br/>

3.) Fire events with carried payloads
```js
// eg. user with id = 5 was just deleted from db, fire the event
eventManager.fireEvent('USER_DELETED', {user_id: 5});
```

<br/>

4.) Detach listeners from events by reference
```js
eventManager.off('MyEventName', myDbSyncFunction);
eventManager.off('MyEventName', emailService);
```
