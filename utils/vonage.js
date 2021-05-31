const Vonage = require('@vonage/server-sdk');
const vonage = new Vonage({
  apiKey: "77cc334a",
  apiSecret: "N1Oje0Cu21VKjXXz"
});

function smsVonage(){

function request(req,res,number){
    console.log(number);
    vonage.verify.request({
        number: number,
        brand: "izik madical"
      }, (err, result) => {
        if (err) {
          console.error(err);
          res.status(400).send('err vonage')
        } else {
          const verifyRequestId = result.request_id;
          console.log('request_id', verifyRequestId);
          res.status(200).send({request_id:verifyRequestId})
          
        }
      });
    
}

function check(res,REQUEST){
    var REQUEST_ID=REQUEST._ID
    var CODE=REQUEST.CODE
console.log(REQUEST);
    vonage.verify.check({
        request_id: REQUEST_ID,
        code: CODE
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


