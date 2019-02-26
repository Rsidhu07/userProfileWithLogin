import { Template } from 'meteor/templating';
import './main.js';
import './updateUser.html';

Template.updateinfo.events({

    'submit .update-details': function(event){
    
        console.log("Event called", event);
        event.preventDefault();
      
    },
    
    });