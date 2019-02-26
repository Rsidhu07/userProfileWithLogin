import { Mongo } from "meteor/mongo";
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

 
  



