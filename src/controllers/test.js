// ## GET /functionup/collegeDetails
// - Returns the college details for the requested college
// (Expect a query parameter by the name `collegeName`. This is anabbreviated college name. For example `iith`)
// - Returns the list of all interns who have applied for internship at this college.
// - The response structure should look like [this](#college-details)

const collegeModel = require("../models/collegeModel");
const internModel = require("../models/internModel");


const getClgDetails = async function(req,res){

    const collegeName = req.query.collegeName

    const findClg = await collegeModel.findOne({name : collegeName});

    const getInterns = await internModel.find({collegeId : findClg._id});

    const obj = {name : findClg.name, fullName : findClg.fullName, logoLink : findClg.logoLink, interns : getInterns}

    return res.status(200).send({status : true, data : obj})
}
module.exports.getClgDetails = getClgDetails