exports.error_custom = (err, req, res, next) => {

  // const statusCode = res.statusCode ? res.statusCode : 500;
  // res.status(statusCode);
  // res.json({
  //   msg: err.message,
  //   stack: process.env.NODE_ENV === "production" ? null : err.stack,
  // });

    // this needs to be handled properly after merging and separating out models and schemas
    res.status(404).send(err);

};

exports.error_mongoDb = (err, req, res, next) => {

  if (err.path === '_id' && err.kind === 'ObjectId' &&
      err.valueType !== 'ObjectId'){
        res.status(400).send({msg: "Invalid ID Format"});
      }

}

exports.error_pathNotFound = (req, res, next) => {

  res.status(404).send({msg: "Path Not Found"});
}

