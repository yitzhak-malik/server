const Vonage = require('@vonage/server-sdk');
const vonage = new Vonage({
  apiKey: "77cc334a",
  apiSecret: "N1Oje0Cu21VKjXXz"
});

function smsVonage(){

function request(req,res){
    console.log(req.body.phoneNumber);
    vonage.verify.request({
        number:req.body.phoneNumber,
        brand: "izik madical"
      }, (err, result) => {
        if (err) {
          console.error(err);
          res.status(400).send(err)
        } else {
          const verifyRequestId = result.request_id;
          console.log('request_id', verifyRequestId);
          res.status(200).send({request_id:verifyRequestId})
          
        }
      });
    
}

function check(req,res){
  
    vonage.verify.check({
        request_id:req.body.sms.request_id,
        code:req.body.sms.code
      }, (err, result) => {
        if (err) {
          console.error(err);
        } else {
          console.log(result);
          res.status(200).send(result)
        }
      });
  
}
 

return {
    request,
    check
}  

}

module.exports=smsVonage()


