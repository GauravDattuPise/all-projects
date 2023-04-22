// Create a college - a document for each member of the group
// - The logo link will be provided to you by the mentors. This link is a s3 (Amazon's Simple Service) url. 
//Try accessing the link to see if the link is public or not.

//   `Endpoint: BASE_URL/functionup/colleges`


const collegeModel = require('../models/collegeModel');
const internModel = require('../models/internModel');

const createCollege = async (req, res) => {

    try {

        const data = req.body

        if (Object.keys(data).length == 0)
            return res.status(400).send({ status: false, message: "Plese provide some data" });

        const { name, fullName, logoLink } = data

        if (!name) return res.status(400).send({ status: false, message: "Please provide abbriviated college name" })
        if (!fullName) return res.status(400).send({ status: false, message: "Please provide fullName college" })
        if (!logoLink) return res.status(400).send({ status: false, message: "Please provide logo link of college" })

        const findClgName = await collegeModel.findOne({ name: name });
        if (findClgName) return res.status(400).send({ status: false, message: "This college name is already exists" })

        const newData = { name: data.name, fullName: data.fullName, logoLink: data.logoLink, isDeleted: data.isDeleted }

        const createClg = await collegeModel.create(newData)
        return res.status(201).send({ status: true, message: createClg })

    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

module.exports.createCollege = createCollege

//===========================================================================================================

// ### GET /functionup/collegeDetails
// - Returns the college details for the requested college (Expect a query parameter by the name `collegeName`. 
// This is anabbreviated college name. For example `iith`)
// - Returns the list of all interns who have applied for internship at this college.


const getClgDetails = async (req, res) => {
    try {

        const clgName = req.query.collegeName
        if (!clgName) return res.status(400).send({ status: false, message: "Please provide collegeName" });

        const findClg = await collegeModel.findOne({ name: clgName })
        if(!findClg) return res.status(404).send({ status: false, message: "This college is not available" })

        const foundClgId = findClg._id
        let findInterns = await internModel.find({ collegeId: foundClgId }).select({ _id: 1, name: 1, email: 1, mobile: 1 })

        if (findInterns.length == 0) {
            findInterns = "no interns applied for this college"
        }

      const  data = { name: findClg.name, fullName: findClg.fullName, logoLink: findClg.logoLink, interns: findInterns }
        
        res.status(200).send({ status: true, data: data });

    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

module.exports.getClgDetails = getClgDetails

//=========================================================================================================
