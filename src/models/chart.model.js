// Load mongoose package
const mongoose = require('mongoose');

const ChartSchema = new mongoose.Schema({
  name: String,
  age: Number,
  height: Number,
  weight: Number,
  date: { type: Date, default: Date.now },
  deleted: {type: Boolean, default: false}
});

const Chart = mongoose.model('Chart', ChartSchema);

Chart.count({}, function(err, count) {
  if (err) {
    throw err;
  }

  if (count > 0) return ;

  const charts = require('./chart.seed.json');
  Chart.create(charts, function(err, newCharts) {
    if (err) {
      throw err;
    }
    console.log("DB seeded")
  });

});

module.exports = Chart;
