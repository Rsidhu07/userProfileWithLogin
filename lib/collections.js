import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";
import { FS } from 'meteor/cfs:base-package';
import  SimpleSchema  from 'simpl-schema';

export const Details = new Mongo.Collection('details');

export const Files = new Mongo.Collection('files');

export const Images = new FS.Collection("images", {
    stores: [new FS.Store.FileSystem("images", {path: "~/uploads"})]
  });

  Images.allow({
    insert: function () {
      // add custom authentication code here
      return true;
    },
    update: function (userId, doc) {
        return true;
      },
      remove: function (userId, doc) {
        return true;
      },
      download: function (userId, doc) {
        return true;
      }
    
  });

  // adding simple schema

  // SimpleSchema.defineValidationErrorTransform(error => {
  //   const ddpError = new Meteor.Error(error.message);
  //   ddpError.error = 'validation-error';
  //   ddpError.details = error.details;
  //   return ddpError;
  // });
  
  const myMethodObjArgSchema = new SimpleSchema({ 'text': String, 'userLocation': String, 'userDate' : String }, { check });
  // const myImageSchema = new SimpleSchema({'type': imag}, { check});

Meteor.methods({

    

'details.insert'(data){

    // check(, String);
    myMethodObjArgSchema.validate(data);

    console.log("Method insert called");

    if(!Meteor.userId()){

        console.log("Error called");

        throw new Meteor.Error('not-authorized');
    }

    console.log("I am above details insert");
   

   Details.insert({
        'text'         : data.text ,
        'userLocation' : data.userLocation,
        'userDate'     : data.userDate,
        createdAt      : new Date(),
        owner          : Meteor.userId(),
        username       : Meteor.user().username,
        
    });

        
  },

  // 'image.insert'(files){
    
    
  //   console.log("files:",files.length);
  //   for (var i = 0, ln = files[i].length; i < ln; i++){ 

      
  //       Images.insert(files[i], function (err, fileObj) {
  //          // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
  //        });
  //      }
    
  // },




   'details.delete'(show){


    if(show.owner !==Meteor.userId()){

      alert("You are not authorized to delete others Note!");
      throw new Meteor.error('Not authorized to delete others notes');
      
  }
  
    Details.remove(show._id);

   

  },

});

