const token=require('../schema/useToken');



function withToken(req,res,next) {
console.log(req.headers);
    var userToken = new token(false, req.headers['x-access-token']);

    if(userToken.isNotExprision()){
        req.user=userToken;
       
        console.log("token work!!");
        return next()
    }
  
    res.status(401).send();
    
}
module.exports=withToken