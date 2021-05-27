const encToken=require('../utils/token')

const split='<?>'
const ttl=1000*60*2


function useToken(isNew,token,fullName,_id,role,roleNum){
if(isNew){
    this.fullName=fullName
    this._id=_id
    this.role=role
    this.roleNum=roleNum
    this.expirationTime = Date.now() + ttl;
    this.token=encToken.getEncrypto(
        fullName+split+
        _id+split+
        role+split+
        roleNum+split+
       this.expirationTime
    )
}else{
    this.token=token
    var data=encToken.getDecrypto(token).split(split)
    this.fullName=data[0]
    this._id=data[1]
    this.role=data[2]
    this.roleNum=data[3]
    this.expirationTime = data[4]

}
this.isNotExprision=function () {
    
    return this.expirationTime && +this.expirationTime > Date.now()
}

}
module.exports=useToken