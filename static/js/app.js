// placing the url
let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
// create the variables for function inputs
let data = {};
let selDataset = d3.select("#selDataset")

// Fecting the JSON data
d3.json(url).then(

    function(response){
        data = response;
        populateDropdown();
        updateDashboard(data.names[0]);
    }
);
//populating the dropdown with change options
function populateDropdown(){
    data.names.forEach(
        function(val){
            selDataset.append("option").attr("value",val).text(val);
        }
    );

    selDataset.on("change",function() {
        let newSelection = this.value;
        updateDashboard(newSelection);
    });
}

// update the demographicinfo
function updateDemographicInfo(metadata){
    let demographicInfoDiv = d3.select("#sample-metadata");
    console.log(metadata);
    demographicInfoDiv.html(
        `id : ${metadata.id}<br>
        eth: ${metadata.ethnicity}<br>
        gender:${metadata.gender}<br>
        age : ${metadata.age}<br>
        location : ${metadata.location}<br>
        bbtype : ${metadata.bbtype}<br>
        wfreq: ${metadata.wfreq}
        `
    );
}
//Plot horizontal bar chart
function plotBarChart(samples, selectedItem){
    //create an arrayIndex to find the samples for selected items
    let arrayIndex = samples.findIndex(val => val.id === selectedItem);

    //create a variables for bar chart
    let otu_ids = samples[arrayIndex].otu_ids;
    let otu_labels = samples[arrayIndex].otu_labels;
    let sample_values = samples[arrayIndex].sample_values;
    

   console.log(otu_ids,otu_labels,sample_values);
    //create a lables, xticks,yticks
    let xticks = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
    let labels = otu_labels.slice(0,10).reverse();
    let yticks = sample_values.slice(0,10).reverse();

    //set the trace for bar chart

    let trace = {
        y: xticks,
        x : yticks,
        text: labels,
        type : "bar",
        orientation :"h"
    };    
    //set the layout for bar chart
    let layout = {
        title : "Top 10 OTUs Present"
    } ;
    //plotly to plot the bar chart
    Plotly.newPlot("bar",[trace],layout)  
    }
   
//plot Bubble chart
 function  plotBubbleChart(samples,selectedItem){
    //create an arrayIndex to find the samples for selecteditem
    let arrayIndex = samples.findIndex(val => val.id === selectedItem);

    //create a varaibles for bubble chart
    let otu_ids = samples[arrayIndex].otu_ids;
    let otu_labels = samples[arrayIndex].otu_labels;
    let sample_values = samples[arrayIndex].sample_values;
    

   console.log(otu_ids,otu_labels,sample_values);
    //set the trace for bubble chart
    let trace1 = {
        x : otu_ids,
        y : sample_values,
        text : otu_labels,
        mode : "markers",
        marker : {
            size : sample_values,
            color : otu_ids,
            colorscale : "Earth",
        }
    };
    //set the layout for bubble chart
    let layout = {
        title: "Bacteria Per Sample",
        hovermode: "closest",
        xaxis:{title:"OTU ID"},
    };
    //plotly to plot the bubble chart
    Plotly.newPlot("bubble",[trace1],layout)
 } 

   

// create the function to update the dashboard with selecteditem
function updateDashboard(selectedItem){

    console.log(data);
    console.log(data.samples);
    //create the variables for selecteditem
    let samples = data.samples;
    let arrayIndex = data.names.findIndex(val => val == selectedItem);


    let otu_ids = samples[arrayIndex].otu_ids;
    let otu_labels = samples[arrayIndex].otu_labels;
    let sample_values = samples[arrayIndex].sample_values;
    let metadata = data.metadata[arrayIndex]

    
    //update the demographic info
    updateDemographicInfo(metadata);

    //update the Bar chart
    plotBarChart(samples,selectedItem);

    //update the Bubble chart
    plotBubbleChart(samples,selectedItem);
};





