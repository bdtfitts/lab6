'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('.project a').click(addProjectDetails);

	$('#colorBtn').click(randomizeColors);
    $('#playBtn').click(playSong);
}

/*
 * Make an AJAX call to retrieve project details and add it in
 */
function addProjectDetails(e) {
	// Prevent following the link
	e.preventDefault();

	// Get the div ID, e.g., "project3"
	var projectID = $(this).closest('.project').attr('id');
	// get rid of 'project' from the front of the id 'project3'
	var idNumber = projectID.substr('project'.length);
    var url = "/project/" + idNumber;
    console.log("AJAX get from URL " + url);
	$.get(url, displayRetrievedDetails);
}

/*
 * Make an AJAX call to retrieve a color palette for the site
 * and apply it
 */
function randomizeColors(e) {
    var randomPalette = $.get("/palette", applyRetrievedPalette);
}

function playSong(e) {
    $(this).html("Grabbing URL...");
    $.get("https://api.spotify.com/v1/tracks/0eGsygTp906u18L0Oimnem", showPreview);
}
function applyRetrievedPalette(result) {
    console.log(result);
    var colors = result["colors"]["hex"];
    $('body').css('background-color', colors[0]);
    $('.thumbnail').css('background-color', colors[1]);
    $('h1, h2, h3, h4, h5, h5').css('color', colors[2]);
    $('p').css('color', colors[3]);
    $('.project img').css('opacity', .75);
}
function displayRetrievedDetails(result) {
    console.log(result);
    var id = result["id"];
    var details = "<img src='" + result["image"] + "' class='detailsImage'/><p>" + result["title"] + "</p><p><small>" + result["date"] + "</small></p>" + result["summary"];
    $(".project[id='project"+id+"'] div.details").html(details);
}
function showPreview(result) {
    console.log(result);
    var preview = result["preview_url"];
    var name = result["name"];
    $("#spotifyplayer").html("<img src='"+result["album"]["images"][1]["url"]+"' style='margin-top:10px'/><p>" + name + "</p><a href='" + preview + "'>Preview song.</a>");
    $("#playBtn").html("Grab another song!");
}
