import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";
import { FS } from 'meteor/cfs:base-package';

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

Meteor.methods({

    

'details.insert'(data){

    // check(, String);
    

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

});

