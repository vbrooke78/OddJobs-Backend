exports.errMsg_invalidPostObj = {status: 400, msg: "Invalid Post Object"};
exports.errMsg_idNotFound = {status: 404, msg: "ID Not Found"};
exports.errMsg_emailExists = {status:400, msg: "Email Already Exists"};
exports.errMsg_uniqueFieldExists = (field) => {
  return {status:400, msg: `${field} already exists`};
} 


exports.error_custom = (err, req, res, next) => {

    if (err.status && err.msg){
      res.status(err.status).send(err.msg);
    }
    else{
      next(err);
    }
};

exports.error_mongoDb = (err, req, res, next) => {

  if (err.path === '_id' && err.kind === 'ObjectId' &&
      err.valueType !== 'ObjectId'){
        res.status(400).send({msg: "Invalid ID Format"});
      }
  else{
    next(err);
  }

}

exports.error_pathNotFound = (req, res, next) => {

  res.status(404).send({msg: "Path Not Found"});
}

