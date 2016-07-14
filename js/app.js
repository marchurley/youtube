
$(function(){

  var nextPageToken;
  var searchTerm;

  $('.next').hide();

  /*--- GET USER INPUT: Use JSON own function called getRequest() --*/
  $('#search-term').submit(function(event){
    event.preventDefault();
    searchTerm = $('#query').val();
    getRequest(searchTerm);
    $('#query').val('');
    $('.next').show();
  });

  $('.next').on('click', function(event){
    event.preventDefault();
    nextPage(searchTerm);
  });


});



/*--- Process Data --*/
function getRequest(searchTerm){
  var params = {
    part: "snippet",
    q: searchTerm,
    maxResults: '4',
    key: 'AIzaSyDh_Y4PsbVn9f_lJf6oAULtcZnb66BKbq4'
  };
  url = 'https://www.googleapis.com/youtube/v3/search';

  $.getJSON(url, params, function(data){
    showResults(data.items);
    nextPageToken = data.nextPageToken;
    console.log(nextPageToken);
  });

}

/*--- Go to next page --*/
function nextPage(searchTerm){
  var params = {
    pageToken: nextPageToken,
    part: "snippet",
    q: searchTerm,
    maxResults: '4',
    key: 'AIzaSyDh_Y4PsbVn9f_lJf6oAULtcZnb66BKbq4'
  };
  url = 'https://www.googleapis.com/youtube/v3/search';

  $.getJSON(url, params, function(data){
    console.log(data.items[0].snippet.thumbnails.medium);
    showResults(data.items);
    nextPageToken = data.nextPageToken;
  });

}



/*--- SHOW DATA: --*/
function showResults(results){
  $("li").remove();
  $.each(results, function(index, value){
    $("ul").append("<li><a href=https://www.youtube.com/watch?v=" + value.id.videoId + " target='_blank'><img src=" + value.snippet.thumbnails.medium.url + "></a></li>")
  });
};



