/*

Flickr API url: http://www.flickr.com/services/api/request.rest.html


Example AJAX request URL with tags=cat:

http://api.flickr.com/services/rest/?format=json&method=flickr.photos.search&api_key=2fd41b49fedfd589dc265350521ab539&tags=cat&jsoncallback=?


Info about creating photo url from json data: http://www.flickr.com/services/api/misc.urls.html

Example constructing photo url: http://farm{farm#}.staticflickr.com/{server-id}/{id}_{secret}.jpg

*/

$(document).ready(function() {

  var query, url, photos, photo_url;

  $("#flickrsearch").on("submit", function(event) {
    event.preventDefault();
    query = $("#keyword").val();
    url = "http://api.flickr.com/services/rest/?format=json&method=flickr.photos.search&api_key=2fd41b49fedfd589dc265350521ab539&tags=" + query + "&jsoncallback=?";
    $.getJSON(url, function(data) {
      photos = data.photos.photo;
      console.log(photos);
      $.each(photos, function(index, photo){
        photo_url = "http://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + ".jpg";
        permalink = "http://www.flickr.com/photos/" + photo.owner + "/" + photo.id;
        // if(index < 10)
        $("#feed").prepend("<a href='" + permalink + "'><img src='" + photo_url + "'></a>");
      });
    });
  });

});