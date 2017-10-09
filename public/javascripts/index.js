function bindDeleteNews(news) {
  $('#content1 .btn.delete').click(function() {
    var item_id = $(this).closest('.row').attr('item_id');
    $.post('/api/deletenews', {_id: item_id}, function(data){
      getNews(news);
    });

  });
}

function getNews(news) {
  $.get('/api/shownews', function(data){
    news.find('.row:not(.header)').remove();
    $.each(data, function(i, item) {
      news.append('<div class="row" item_id="' + item._id + '"><div class="cell">'+item.name+'</div><div class="cell"><button class="btn link"><a href="'+item.link+'" target="_blank">click</a></button></div>' + (admin_session ? '<div class="cell btn delete" id="admin">X</div>' : '') + '</div>');
    });
    bindDeleteNews(news);
  });
}

function bindDeletePlaces(places) {
  $('#content4 .btn.delete').click(function() {
    var item_id = $(this).closest('.row').attr('item_id');
    $.post('/api/deleteplaces', {_id: item_id}, function(data){
      getPlaces(places);
    });

  });
}

function getPlaces(places) {
  $.get('/api/showplaces', function(data){
    places.find('.row:not(.header)').remove();
    $.each(data, function(i, item) {
      places.append('<div class="row" item_id="' + item._id + '"><div class="cell">'+item.name+'</div><div class="cell"><button class="btn link"><a href="'+item.link+'" target="_blank">click</a></button></div>' + (admin_session ? '<div class="cell btn delete" id="admin">X</div>' : '') + '</div>');
    });
    bindDeletePlaces(places);
  });
}

$(document).ready(function(){
  var addnewsYear = $('#addnewsYear');
  var addnewsName = $('#addnewsName');
  var addnewsLink = $('#addnewsLink');
  var news = $('#news');
  $('#addnewsButton').click(function(){
    $.post('/api/addnews',{name: addnewsName.val(), link: addnewsLink.val(), year: addnewsYear.val()}, function(data) {
      console.log(data);
      if(data.ok === 1) {
        addnewsYear.val("");
        addnewsName.val("");
        addnewsLink.val("");
        getNews(news);
      }
    });
  })
  getNews(news);

  var addplacesYear = $('#addplacesYear');
  var addplacesName = $('#addplacesName');
  var addplacesLink = $('#addplacesLink');
  var places = $('#places');
  $('#addplacesButton').click(function(){
    $.post('/api/addplaces',{name: addplacesName.val(), link: addplacesLink.val(), year: addplacesYear.val()}, function(data) {
      console.log(data);
      if(data.ok === 1) {
        addplacesYear.val("");
        addplacesName.val("");
        addplacesLink.val("");
        getPlaces(places);
      }
    });
  })
  getPlaces(places);

  var filecpe = $('#file-cpe');
  var addcpeYear = $('#addcpeYear');
  var addcpeName = $('#addcpeName');
  var cpe = $('#cpe');

  document.getElementById('file-cpe').onchange = function(){
    if( addcpeYear.val().length == 4){
      var file = this.files[0];
      var reader = new FileReader();
      reader.onload = function(progressEvent){
        var lines = this.result.split('\n');
        for(var line = 0; line < lines.length; line++){
          var check = lines[line].split(",");
          if(check.length < 5)
            break;
          console.log(check[0]+check[1]+check[2]+check[3]+check[4]);
          cpe.append('<div class="row"><div class="cell">'+check[0]+'</div><div class="cell">'+check[1]+'</div><div class="cell">'+check[2]+'</div><div class="cell">'+check[3]+'</div><div class="cell">'+check[4]+'</div></div>');
        }
      };
      reader.readAsText(file);
    } else {
      alert('4 digits for year');
    }

  };

  var fileske = $('#file-ske');
  var addskeYear = $('#addskeYear');
  var addskeName = $('#addskeName');
  var ske = $('#ske');
  document.getElementById('file-ske').onchange = function(){
    if( addskeYear.val().length == 4){
      var file = this.files[0];
      var reader = new FileReader();
      reader.onload = function(progressEvent){
        var lines = this.result.split('\n');
        for(var line = 0; line < lines.length; line++){
          var check = lines[line].split(",");
          if(check.length < 5)
            continue;
          console.log(check[0]+check[1]+check[2]+check[3]+check[4]);
          ske.append('<div class="row"><div class="cell">'+check[0]+'</div><div class="cell">'+check[1]+'</div><div class="cell">'+check[2]+'</div><div class="cell">'+check[3]+'</div><div class="cell">'+check[4]+'</div></div>');
        }
      };
      reader.readAsText(file);
    } else {
      alert('4 digits for year');
    }
  };

});
