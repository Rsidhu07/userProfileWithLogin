import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import '../client/updateUser.html';
import '../client/main.js';


FlowRouter.route('/update', {
    name : 'updateProfile',
    action: function() {
        BlazeLayout.render('updateinfo');
    }
});

FlowRouter.route('/', {
    name : 'Home',
    action: function() {
        BlazeLayout.render('home');
    }
});