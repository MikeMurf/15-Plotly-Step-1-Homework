// Plotly Homework - Belly Button Biodiversity
	
// Use the D3 library to read in `samples.json`
// buildMetadata function retrieves and displays the data from "Samples"
function buildMetadata(sample) {
	// Use `d3.json` to fetch the metadata for a sample
	console.log("in buildMetadata:  ")
	d3.json("samples.json").then((data) => {
	// console.log(data);
	var metadata= data.metadata;
	var resultsarray= metadata.filter(sampleobject => 
		sampleobject.id == sample);
	var result= resultsarray[0]
	// Use d3 to select the panel with id of `#sample-metadata`
	var panel = d3.select("#sample-metadata");
	// Use `.html("") to clear any existing metadata
	panel.html("");
	// Use `Object.entries` to add each key and value pair to the panel
	Object.entries(result).forEach(([key, value]) => {
		panel.append("h5").text(`${key}: ${value}`);
	});
	// console.log("panel:  " )
	});

}
	
	// buildCharts function
	function buildCharts(sample) {
	// Use `d3.json` to fetch the sample data for the plots
	d3.json("samples.json").then((data) => {
	  var samples= data.samples;
	  var resultsarray= samples.filter(sampleobject => 
	      sampleobject.id == sample);
	  var result= resultsarray[0]
	
	  var ids = result.otu_ids;
	  var labels = result.otu_labels;
	  var values = result.sample_values;
	

	// Build the Bubble Chart 
	  var LayoutBubble = {
	    margin: { t: 0 },
	    xaxis: { title: "OTU ID" },
	    hovermode: "closest",
	    };
	
	    var DataBubble = [ 
	    {
	      x: ids,
	      y: values,
	      text: labels,
	      mode: "markers",
	      marker: {
	        color: ids,
	        size: values,
	        }
	    }
	  ];
	
	  Plotly.newPlot("bubble", DataBubble, LayoutBubble);
	
	//  Build the Horizontal Bar Chart
	  var bar_data =[
	    {
	      y:ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
	      x:values.slice(0,10).reverse(),
	      text:labels.slice(0,10).reverse(),
	      type:"bar",
	      orientation:"h"
	    }
	  ];
	
	  var barLayout = {
	    title: "Top 10 Bacteria Cultures Found",
	    margin: { t: 30, l: 150 }
	  };
	
	  Plotly.newPlot("bar", bar_data, barLayout);
	});
	}
	 
	function init() {
	// Retrieve reference to the dropdown select element
	var selector = d3.select("#selDataset");
	
	// Use the list of sample names to populate the select options
	d3.json("samples.json").then((data) => {
	  var sampleNames = data.names;
	  sampleNames.forEach((sample) => {
	    selector
	      .append("option")
	      .text(sample)
	      .property("value", sample);
	  });
	
	  // Use the first sample from the list to build the initial plots
	  const firstSample = sampleNames[0];
	  buildCharts(firstSample);
	  buildMetadata(firstSample);
	});
	}

	function optionChanged(newSample) {
	// Fetch new data each time a new sample is selected
	buildCharts(newSample);
	buildMetadata(newSample);
	}

	// Initialize the dashboard
	init();


