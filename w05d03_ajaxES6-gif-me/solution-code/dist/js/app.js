"use strict";

$(init);

function init() {
  getAndRenderGifs();
  $("form").on("submit", getAndRenderGifs);
}

function getAndRenderGifs() {
  if (event) event.preventDefault();
  return $.ajax({
    method: "GET",
    url: "http://api.giphy.com/v1/gifs/search",
    data: $("form").serialize()
  }).done(onSuccess).fail(onError);
}

function onSuccess(json) {
  var $container = $("main");
  $("img").remove();

  json.data.forEach(function (gif, i) {
    $container.append("<img src=\"" + gif.images.fixed_height.url + "\">");
  });
}

function onError(xhr, status, errorThrown) {
  alert("Sorry, there was a problem!");
  console.log("Error: " + errorThrown);
  console.log("Status: " + status);
  console.dir(xhr);
}