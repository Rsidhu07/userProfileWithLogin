import { Meteor } from "meteor/meteor";
import  SimpleSchema  from 'simpl-schema';
import { check } from "meteor/check";

const myMethodObjArgSchema = new SimpleSchema({ 'text': String, 'userLocation': String, 'userDate' : String }, { check });
  
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
    
        'details.delete'(show){
    
    
        if(show.owner!==Meteor.userId()){
    
          alert("You are not authorized to delete others Note!");
          throw new Meteor.error('Not authorized to delete others notes');
          
      }
      
        Details.remove(show._id);
    
       
    
      },
    
    });