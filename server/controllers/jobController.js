const Job  = require('../models/jobModel');

exports.postJob = async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      type,
      description,
      inclusiveTags = [],
      skills = [],
      inclusiveTypes = []
    } = req.body;

    if (!title || !company || !location || !type || !description) {
      return res.status(400).json({
        success: false,
        message: 'Please fill all required fields.'
      });
    }

    // Validate arrays
    if (
      !Array.isArray(inclusiveTags) ||
      !Array.isArray(skills) ||
      !Array.isArray(inclusiveTypes)
    ) {
      return res.status(400).json({
        success: false,
        message: 'inclusiveTags, skills, and inclusiveTypes must be arrays.'
      });
    }

    const job = await Job.create({
      title,
      company,
      location,
      type,
      description,
      inclusiveTags,
      skills,
      inclusiveTypes
    });

    return res.status(201).json({
      success: true,
      message: 'Job created successfully.',
      data: job
    });

  } catch (err) {
    console.error('Post Job error:', err.message);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};


exports.getAllJobs =async(req,res)=>{
    try{
        const {search} = req.query;
        const query = search ? {
        $or: [{title: new RegExp(search,'i')}, {company:new RegExp(search,'i')} ] } : {};
        const getAll = await Job.find(query).sort({createdAt: - 1})
        res.status(200).json({
            success: true,
            message: 'Get All Jobs',
            data: getAll
        })
        }catch(err){
            console.log(`Get All Jobs error : ${err.message}`)
            res.status(400).json({
                success: false,
                message: 'Internal Server Error'
            })
        }
    }
