// src/routes/index.js
const router = require('express').Router();
const mongoose = require('mongoose');

//PATH TO /DOC
router.use('/doc', function(req, res, next) {
  res.end(`Documentation http://expressjs.com/`);
});


//Function in progress
//Goal is to determine if child is above, below, or right at average wieght and height based on user input.
function calHeightPercentile(height){
  const highaverage = 25;
  const lowaverage = 15;
  const aboveAverage = "Height is Above Average";
  const belowAverage = "Height is Below Average";
  const Average = "Height is Average";

    if (height <= 15) {
      console.log(belowAverage);
    } else if (height >= 25) {
      console.log(aboveAverage);
    } else {
      console.log(average);
    }
    //example of the math I will use to create this function
      // 1:
      // 6.6
      // 7.6
      // 8.6 *if less than or = to
      // 9.17 50% if == || less than (above #) || == || greater than (below #)
      // 10.6 *if greater than or = to
      // 11.6
      // 12.6
}

 //GET A LIST OF ALL CHARTS IN THE DB
 router.get('/chart', function(req, res, next) {
   const Chart = mongoose.model('Chart');
   //$ne means "not equal too..." ($ne unique to mongoose)
//find everything that is equal to not equal to true aka false.
   Chart.find({deleted: {$ne: true}}, function(err, charts) {
     if (err) {
       console.log(err);
       return res.status(500).json(err);
     }

     res.json(charts);
   });
 });

 //GET A SINGLE chart BY PASSING ITS ID AS A URL

router.get('/chart/:chartId', function(req, res, next) {
  const Chart = mongoose.model('Chart');
  const chartId = req.params.chartId;

  Chart.findById(chartId, function(err, chart) {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    if (!chart) {
      return res.status(404).json({message: "Chart not found"});
    }

    chart.name = req.body.name;
    chart.age = req.body.age;
    chart.height = req.body.height;
    chart.weight = req.body.weight;

    chart.save(function(err, savedChart) {
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }
      res.json(savedChart);
    })

  })

});


//use the function but instead of gettiing from the array, get from the database...use the object id..
//se the put method for a "how too..."
//GET A SINGLE chart BY PASSING ITS ID AS A URL
router.get('/chart/:chartId', function(req, res, next) {
  const Chart = mongoose.model('Chart');
  const chartId = req.params.chartId;

  Chart.findById(chartId, function(err, chart) {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    if (!chart) {
      return res.status(404).json({message: "Chart not found"});
    }

    chart.name = req.body.name;
    chart.age = req.body.age;
    chart.height = req.body.height;
    chart.weight = req.body.weight;

    chart.save(function(err, savedChart) {
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }
      res.json(savedChart);
    })

  })

});



//CREATE
//CREATES A NEW chart
router.post('/chart', function(req, res, next) {
  const Chart = mongoose.model('Chart');
  const chartData = {
    name: req.body.name,
    age: req.body.age,
    height: req.body.height,
    weight: req.body.weight,
    heightPercentile: calHeightPercentile(req.body.height)
  };

  Chart.create(chartData, function(err, newChart) {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    res.json(newChart);
  });
});

//UPDATE
//UPDATES AN ELEMENT
router.put('/chart/:chartId', function(req, res, next) {
  const Chart = mongoose.model('Chart');
  const chartId = req.params.chartId;

  Chart.findById(chartId, function(err, chart) {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    if (!chart) {
      return res.status(404).json({message: "Chart not found"});
    }

    chart.name = req.body.name;
    chart.age = req.body.age;
    chart.height = req.body.height;
    chart.weight = req.body.weight;

    chart.save(function(err, savedChart) {
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }
      res.json(savedChart);
    })

  })

});

//DELETE
//DELETES AN ELEMENT
router.delete('/chart/:chartId', function(req, res, next) {
  //asking mongoose to get a model named Chart
 const Chart = mongoose.model('Chart');
  //pulls object id out of req.param
 const chartId = req.params.chartId;
//looks for the chart id of a chart.
 Chart.findById(chartId, function(err, chart) {

   if (err) {
     console.log(err);
     return res.status(500).json(err);
   }
      //if we don't find the chart... give a 404
   if (!chart) {
     return res.status(404).json({message: "Chart not found"});
   }
   //if we do find the chart...set the delete property of chart to true.
   //which will not show the "deleted" chart object
   chart.deleted = true;
      //we save the chart object
   chart.save(function(err, doomedChart) {
     res.json(doomedChart);
   })

 })
});

module.exports = router;
