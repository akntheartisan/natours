const tourmodel = require('../Models/tourSchema');

// const fs = require('fs');

// const tours = JSON.parse(
//     fs.readFileSync(`./dev-data/data/tours-simple.json`)
//   );

//   exports.checkId = (req,res,next,val)=>{
//     if(req.params.id > tours.length){
//         return res.status(404).json({
//             status:'fail',
//             message:'Invalid Id'
//         })
//     }

//     next();
//   }

//   exports.checkReqBody = (req, res, next) => {
//     if (req.body.hasOwnProperty('name') && req.body.hasOwnProperty('price')) {
//       next();
//     } else {
//       res.status(400).json({
//         status: 'error',
//         message: 'there is no property'
//       });
//     }
//   };

exports.getTours = async (req, res) => {
  const queryObj = { ...req.query };
  try {
    //Build the Query
    // const query = tourmodel.find(req.query);
    let queryString = tourmodel.find(queryObj);
    // Execute the resulting document
    const tours = await queryString;

    res.status(200).json({
      staus: 'success',
      data: { tours: tours },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.postTour = async (req, res) => {
  try {
    const newTour = await tourmodel.create(req.body);
    res.status(200).json({
      status: 'success',
      data: { tour: newTour },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await tourmodel.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: { tour: tour },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await tourmodel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: { tour: tour },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await tourmodel.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};
