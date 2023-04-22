// POST /functionup/interns
// - Create a document for an intern. 
// - Also save the collegeId along with the document. Your request body contains the following fields 
//- { name, mobile, email, collegeName}
// - Return HTTP status 201 on a succesful document creation. Also return the document.
const collegeModel = require('../models/collegeModel');
const internModel = require('../models/internModel');

const createIntern = async (req, res) => {

    try {

        let data = req.body

        if (Object.keys(data).length == 0)
        return res.status(400).send({ status: false, message: "Please provide some details " })

        const { name, mobile, email, collegeName } = data

        if (!name) return res.status(400).send({ status: false, message: "Please provide name " })
        if (!mobile) return res.status(400).send({ status: false, message: "Please provide mobile number " })
        if (!email) return res.status(400).send({ status: false, message: "Please provide email id " })
        if (!collegeName) return res.status(400).send({ status: false, message: "Please provide college name " })

        const findClgName = await collegeModel.findOne({ name: collegeName }).select({ _id: 1 })
        if(!findClgName) return res.status(404).send({status : false, message :"College name not found"})

        data['collegeId'] = findClgName
        data.collegeName = undefined
        
        const savedIntern = await internModel.create(data);
        return res.status(201).send({ status: false, data: savedIntern })
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

module.exports.createIntern = createIntern