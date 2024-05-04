const fs = require('fs');

const tours = JSON.parse(
    fs.readFileSync(`./dev-data/data/tours-simple.json`)
  );
  
  exports.checkId = (req,res,next,val)=>{
    if(req.params.id > tours.length){
        return res.status(404).json({
            status:'fail',
            message:'Invalid Id'
        })
    }

    next();
  }
  
  exports.getTours = (req, res) => {
    res.status(200).json({
      staus: 'success',
      data: { tours: tours },
    });
  };
  
  exports.postTour = (req, res) => {
    console.log(req.body);
    const id = tours[tours.length - 1].id + 1;
  
    const newTour = Object.assign({ id: id }, req.body);
  
    tours.push(newTour);
    fs.writeFile(
      `${__dirname}/dev-data/data/tours-simple.json`,
      JSON.stringify(tours),
      (err) => {
        res.status(201).json({
          staus: 'success',
          data: { tours: newTour },
        });
      }
    );
  };
  
  exports.getTour = (req, res) => {
    const id = req.params.id * 1;
  
    const result = tours.find((el) => el.id === id);
  
    if (!result) {
      res.status(404).json({
        staus: 'success',
        error: 'data not found',
      });
    }
  
    res.status(200).json({
      staus: 'success',
      data: { tours: result },
    });
  };