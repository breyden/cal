const express=require('express');
var router=express.Router();
var mcache = require('memory-cache');

var cache = (duration) => {
    return (req, res, next) => {
      let key = '__express__' + req.originalUrl || req.url
      let cachedBody = mcache.get(key)
      if (cachedBody) {
        res.send(cachedBody)
        return
      } else {
        res.sendResponse = res.send
        res.send = (body) => {
          mcache.put(key, body, duration * 1000);
          res.sendResponse(body)
        }
        next()
      }
    }
  }




// router.get('/',(req,res)=>{
//     res.render("customerInfo/form");
    
// });
router.get('/', cache(10), (req, res) => {
    setTimeout(() => {
      res.render("customerInfo/form")
    }, 5000) //setTimeout was used to simulate a slow processing request
  })
  

// router.post('/',(req,res)=>{
//    //insertRecord(req,res);
//    console.log(req.body);
//  //  res.render("customerInfo/form");
    
// });


module.exports=router; 