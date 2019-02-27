import { Meteor } from "meteor/meteor";
import  SimpleSchema  from 'simpl-schema';
import { check } from "meteor/check";
import { Details } from "../imports/collections.js";
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

const myMethodObjArgSchema = new SimpleSchema({ 'text': String, 'userLocation': String, 'userDate' : String }, { check });
  
Meteor.methods({

  'update-detail'(){


    const appId = FlowRouter.getParam('_Id');
    console.log("get param working", appId);
    
//     Details.update( result,  {
//       $set: { text         : data.text,
//               userLocation : data.userLocation,
//               userDate     : data.userDate
//       },
//     });
},
  
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
    
        'details.delete'(show){
    
    
         

        if(show.owner!==Meteor.userId()){
    
          alert("You are not authorized to delete others Note!");
          throw new Meteor.error('Not authorized to delete others notes');
          
      }

      
      console.log(" delete method triggered", show._id);
        Details.remove(show._id);
    
       
    
      },



       
    
    });