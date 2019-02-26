import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { Template } from 'meteor/templating';
import { Details } from "../imports/collections.js";
import { Images } from "../imports/collections.js";
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import './main.html';



Accounts.ui.config({

  passwordSignupFields:'USERNAME_ONLY'

});



// Dropzone.autoDiscover = true;

Template.home.helpers({

  details(){

    console.log("add details helper called.");

    return Details.find({});

  },

  images() {

    console.log("display images helper called.");
    return Images.find(); // Where Images is an FS.Collection instance
  },

  isOwner() {
      return this.owner === Meteor.userId();
    },
  

});




Template.add.events({

  'submit .add-details' : function(event){

    console.log("Event called");
    event.preventDefault();

   const target       = event.target;
   const text         = target.text.value;
   const userLocation = target.userLocation.value;
   const userDate     = target.userDate.value;
   const files        = event.target.files.files;
   console.log(files.length);

   for (let i = 0, ln = files.length; i < ln; i++){ 

     
     Images.insert(files[i], function (err, fileObj) {
        // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
      });
    }
   const data = {

    'text'         : text ,
    'userLocation' : userLocation,
    'userDate'     : userDate ,

   }

  

   console.log(data);



    Meteor.call('details.insert',data);


    target.text.value = "";
    target.userDate.value = "";
    target.userLocation.value = "";
  },

});


Template.show.events({ 

  'click .btn-danger' : function(event){



    var promp = window.confirm("Are you sure you want to delete the selected record?");

        if(promp){

          Meteor.call('details.delete', this);
          alert("Select record is Deleted");
        }   
          else{
            alert("Delete operation cancelled");
          }

  },

  'click .btn-warning' : function(event, template){ 

    console.log("Event is :",event, "Template is : ", template);
    FlowRouter.go('/update');
    console.log("Event is :",event, "Template is : ", template);

  }

});


