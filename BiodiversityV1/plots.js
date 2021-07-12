function init() {
  var selector = d3.select("#selDataset");

  d3.json("samples.json").then((data) => {
    console.log(data);
    var sampleNames = data.names;
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });
})}

init();

function optionChanged(newSample) {
  buildMetadata(newSample);
  buildCharts(newSample);
}

function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    var PANEL = d3.select("#sample-metadata");

    PANEL.html("");
    PANEL.append("h6").text(result.location);
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
    
  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var samples = data.samples;
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    //  5. Create a variable that holds the first sample in the array.
    var result = resultArray[0];

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    otu_ids = resultArray.map(person => person.otu_ids)
    otu_labels = resultArray.map(person => person.otu_labels)
    sample_values = resultArray.map(person => person.sample_values)

     // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order so the otu_ids with the most bacteria are last. 
     var yticks = otu_ids.sort((a,b) => b - a).slice(0, 10);
 
     //   8. Create the trace for the bar chart. 
     var barData = [{
      x: sample_values,
      y: yticks,
      type: "bar"
     }];
//     // 9. Create the layout for the bar chart. 
      var barLayout = {
        title: "Top 10 Bacteris Cultures Found",
        xaxis: { title: "sample_values" },
        yaxis: { title: "Otu_labels"}
       };
//     // 10. Use Plotly to plot the data with the layout. 
Plotly.newPlot("bar", barData);
//   });
});
};







// // d3.json("samples.json").then((data) => {
// //   console.log(data);
// //   var sampleNames = data.names;
 
// //   console.log(sampleNames);
// // });

// // d3.json("samples.json").then(function(data){
// //   otu_ids = data.samples.map(person => person.otu_ids);
// //   var result1 = otu_ids[0]
// //   console.log(otu_ids);
// // });

// d3.json("samples.json").then(function(data){
//   otu_ids = data.samples.map(person => person.otu_ids).sort((a,b) => b - a);
  
//   console.log(otu_ids);
// });

// d3.json("samples.json").then(function(response){
//   var trace={
//    lables:response.samples.otu_ids.slice(0,10),
//    values:response.samples.sample_values.slice(0,10),
//    type: 'pie',
//    hovertext:response.samples.otu_labels
//   };
  
//   data=[trace]
//   Plotly.newPlot('pie', data);

//   });


  
// // d3.json("samples.json").then(function(data) {
// // result = [];
    
// //     for (var i = 0; i < data.samples.otu_ids.length; i++) {
// //       result.push({"otu_ids": data.otu_ids[i], "otu_labels": data.otu_labels[i], "sample_values": data.sample_values[i]});
// //     };
// //     result.sort((a, b) => b.sample_values - a.sample_values);
// //     result = result.slice(0, 10);
// //     console.log(result);
// //   });

 