
//FETCHES DATA FROM THE API
function getCharts() {
  return $.ajax('/api/chart')
    .then(res => {
      console.log("Results from getCharts()", res);
      return res;
    })
    .fail(err => {
      console.error("Error in getCharts()", err);
      throw err;
    });
}

//FETCH ChartS FROM THE API AND RENDER TO THE PAGE
//Whenever the list of Charts is refreshed, save that array to a property on the global window object
function refreshChartList() {
  const template = $('#chart-template').html();
  const compiledTemplate = Handlebars.compile(template);

  getCharts()
    .then(charts => {

      window.chartList = charts;

      const data = {charts: charts};
      const html = compiledTemplate(data);
      $('#list-container').html(html);
    })
}

//BUTTON FOR SHOWING FORM VISIBILITY
function handleAddChartClick() {
  // console.log("Baby steps...");
  setFormData({});
  toggleAddChartFormVisibility();
}

//HANDLER FOR HIDING FORM VISIBILITY
function toggleAddChartFormVisibility() {
  $('#form-container').toggleClass('d-none');
}

//The Submit button will trigger a javascript function that grabs the data from the form and POSTs it to an API endpoint
// After POSTing the data and receiving a response, the page will refresh the list of Charts.
function submitChartForm() {
  // console.log("You clicked 'submit'. Congratulations.");

  const chartData = {
    name: $('#chart-name').val(),
    age: $('#chart-age').val(),
    height: $('#chart-height').val(),
    weight: $('#chart-weight').val(),
    date: $('#chart-date').val(),
    _id: $('#chart-id').val(),
  };

  let method, url;
  if (chartData._id) {
    method = 'PUT';
    url = '/api/chart/' + chartData._id;
  } else {
    method = 'POST';
    url = '/api/chart';
  }

  $.ajax({
    type: method,
    url: url,
    data: JSON.stringify(chartData),
    dataType: 'json',
    contentType : 'application/json',
  })
    .done(function(response) {
      // console.log("We have posted the data");
      refreshChartList();
      toggleAddChartFormVisibility();
    })
    .fail(function(error) {
      // console.log("Failures at posting, we are", error);
    })

  // console.log("Your chart data", chartData);
}

//CANCEL BUTTON WILL CLEAR THE FORM WITHOUT POSTING THE DATA
function cancelChartForm() {
  toggleAddChartFormVisibility();
}

//VIEW BUTTON HANDLER
function handleViewChartClick(id) {
  const chart = window.chartList.find(chart => chart._id === id);
  if (id) {
    //code that redirects to a webpage or pop up modle that will show individual id properties.
    console.log("It works!!!" + chart._id);
    alert(chart.name +
          chart.age +
          chart.height +
          chart.weight +
          chart.date);

  }
}

//SET LIST DATA
function setListData(data) {

  data = data || {};

  const id = {
    _id: data._id || '',
  };

  $('#chart-id').val(_id);
}

//EDIT BUTTON HANDLER
function handleEditChartClick(id) {
  const chart = window.chartList.find(chart => chart._id === id);
  if (chart) {
    setFormData(chart);
    toggleAddChartFormVisibility();
  }
}

//DELETE CLICK HANDLER
//gets file id, makes sure you want to delete, then soft deletes
function handleDeleteChartClick(id) {
  //asks user permission if they click the delete button
  if (confirm("Are you sure you wish to delete?")) {
    deleteChart(id);
  }
}

//SET FORM DATA
function setFormData(data) {
  data = data || {};

  const chart = {
    name: data.name || '',
    age: data.age || '',
    height: data.height || '',
    weight: data.weight || '',
    date: data.date || '',
    _id: data._id || '',
  };

  $('#chart-name').val(chart.name);
  $('#chart-age').val(chart.age);
  $('#chart-height').val(chart.height);
  $('#chart-weight').val(chart.weight);
  $('#chart-date').val(chart.date);
  $('#chart-id').val(chart._id);
}

//DELETE ELEMENT FUNCTION
function deleteChart(id) {
  $.ajax({
    type: 'DELETE',
    url: '/api/chart/' + id,
    dataType: 'json',
    contentType : 'application/json',
  })
    .done(function(response) {
      console.log("Chart", id, "Something Went Wrong!");
      refreshChartList();
    })
    .fail(function(error) {
      console.log("File Not Deleted!", error);
    })
}

//REFRESHES THE LIST
refreshChartList();
