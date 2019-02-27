import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import '../client/updateUser.js';
import '../client/main.js';
import '../client/not-found.js';


FlowRouter.route('/update/:_id', {
    name : 'updateProfile',
    action: function(params, qs) {
        
        console.log("params:" ,params, qs);
        BlazeLayout.render('updateinfo');
        
    }
});

FlowRouter.route('/', {
    name : 'Home',
    action: function() {
        BlazeLayout.render('home');
    }
});

FlowRouter.route('*', { 
    action: function() {

        BlazeLayout.render('not-found');

    }
});