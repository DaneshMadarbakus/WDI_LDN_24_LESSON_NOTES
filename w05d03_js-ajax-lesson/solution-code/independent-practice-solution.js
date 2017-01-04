
  // Get a single donut and spit out the JSON collection in the console
  var ajax = $.get('https://api.doughnuts.ga/doughnuts/1')
    .done(function(data){
      console.log(data);
    });

  // Use the more generic $.ajax to do the same request
  $.ajax({
  	url: 'https://api.doughnuts.ga/doughnuts/1',
    method: 'get', // GET by default
    dataType: 'json' // Intelligent Guess by default (xml, json, script, or html)
  }).done(function(data){
    console.log(data);
  });
  // type: is an alias for method.
  // You should use type if you're using versions of jQuery prior to 1.9.0.

  // Modify that donut by changing it's flavor
  $.ajax({
    url: 'https://api.doughnuts.ga/doughnuts/1',
    type: 'PUT',
    dataType: 'json',
    data: {id: 1, style: "Old Fashioned", flavor: "Strawberry"},
  }).done(function(data){
    console.log(data);
  });

  // Add a new donut to the list with style and flavor
  var doughnut = {
    style: "Ring",
    flavor: "Chocolate-iced"
  };

  $.post('https://api.doughnuts.ga/doughnuts', doughnut)
    .done(function(data){
      console.log("Doughnut was added");
    });
