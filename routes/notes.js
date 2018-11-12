const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {ensureAuthenticated} = require('../helpers/auth');


//load idea model

require('../models/Idea');
const Idea = mongoose.model('ideas');


//any thing begins with /notes => /

//notes index
router.get('/',ensureAuthenticated,(req,res)=>{
    Idea.find({user:req.user.id})
        .sort({date:'desc'})
        .then(notes =>{
            res.render('notes/index',{
                notes:notes
            })
        })
})

//notes form
router.get('/add',ensureAuthenticated,(req,res)=>{
    res.render('notes/add');
})

//Edit Notes form
router.get('/edit/:id',ensureAuthenticated,(req,res)=>{
    Idea.findOne({
        _id:req.params.id
    })
    .then(note =>{
        if(idea.user !=req.user.id){
            req.flash('error_msg','Not Authorized');
            res.redirect('/ideas');
        }else{
        res.render('notes/edit',{
            note:note
        })
    }
    })
    
})


//form processing
router.post('/',ensureAuthenticated,(req,res)=>{
   const newUser ={
       title:req.body.title,
       details:req.body.details,
       user:req.user.id
   }
    new Idea(newUser).save()
    .then(note => {
        req.flash('success_msg','Note Added');
        res.redirect('/notes');
    })
})

//Edit form process
//For updation you can't just change post to put 
//you need ajax
router.put('/:id',ensureAuthenticated,(req,res) => {
    Idea.findOne({
        _id:req.params.id
    })
    .then(note =>{
        //new Values
        note.title =req.body.title;
        note.details =req.body.details;

        note.save()
            .then(note =>{
                req.flash('success_msg','Note Updated');
                res.redirect('/notes');
            })
    })
})
//Delete Idea 

router.delete('/:id',ensureAuthenticated,(req,res)=>{
   Idea.remove({_id:req.params.id})
    .then(()=>{
        req.flash('success_msg','Note Removed');
        res.redirect('/notes');
    })
})









module.exports = router;