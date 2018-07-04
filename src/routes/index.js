// src/routes/index.js
const router = require('express').Router();
const mongoose = require('mongoose');

//PATH TO /DOC
router.use('/doc', function(req, res, next) {
  res.end(`Documentation http://expressjs.com/`);
});

 //GET A LIST OF ALL CHARTS IN THE DB
 router.get('/chart', function(req, res, next) {
   const Chart = mongoose.model('Chart');

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
  const {chartId} = req.params;
  // same as 'const chartId = req.params.chartId'

  const chart = CHARTS.find(entry => entry.id === chartId);
  if (!chart) {
    return res.status(404).end(`Could not find chart '${chartId}'`);
  }

  res.json(chart);
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
 const Chart = mongoose.model('Chart');
 const chartId = req.params.chartId;

 Chart.findById(chartId, function(err, chart) {
   if (err) {
     console.log(err);
     return res.status(500).json(err);
   }
   if (!chart) {
     return res.status(404).json({message: "Chart not found"});
   }

   chart.deleted = true;

   chart.save(function(err, doomedChart) {
     res.json(doomedChart);
   })

 })
});


// //ROUTE TO THE HOMEPAGE PUG TEMPLATE
// router.get('/', function(req, res, next) {
//   return res.render('index', { name: 'Home' });
// });
//
// //example of how to get a pug template homepage
// // app.get('/page', function(req, res, next){
// //   //get the data dynamically
// //   res.render('page', data);
// // })


module.exports = router;
