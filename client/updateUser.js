import { Meteor } from "meteor/meteor";
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

import './updateUser.html';

Template.updateinfo.events({

    'submit .update-details': function(event, template){
        event.preventDefault();

        
        var getid = FlowRouter.getParam('_id');
        console.log("parameter is :", getid);

        const target       = event.target;
        const text         = target.text.value;
        const userLocation = target.userLocation.value;
        const userDate     = target.userDate.value;

        const data = {

              'text'          : text,
              'userLocation'  : userLocation,
              'userDate'      : userDate,
              'getid'         : getid
        }
        
        console.log("update user event is :", data);
        // console.log("Event called", event, "Template is :", template); 
        // console.log("usr id is :",Meteor.userId(),"user is :", Meteor.user());
        // console.log("temporary data is ", temp);


        Meteor.call('update-detail', data);

        FlowRouter.go('/');
    },
    
    });
