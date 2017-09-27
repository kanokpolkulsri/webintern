function bindDeleteNews(news) {
  $('#content1 .btn.delete').click(function() {
    console.log('jerr');
    var item_id = $(this).closest('.row').attr('item_id');
    console.log(item_id);
    $.post('/api/deletenews', {_id: item_id}, function(data){
      // console.log(data);
      getNews(news);
    });

  });
}

function getNews(news) {
  $.get('/api/shownews', function(data){
    news.find('.row:not(.header)').remove();
    $.each(data, function(i, item) {
      console.log(item)
      news.append('<div class="row" item_id="' + item._id + '"><div class="cell">'+item.name+'</div><div class="cell"><button class="btn link"><a href="'+item.link+'" target="_blank">click</a></button></div>' + (admin_session ? '<div class="cell btn delete" id="admin">X</div>' : '') + '</div>');
    });
  });
  bindDeleteNews(news);
}

// function bindDeletePlaces(places) {
//   $('#content4 .btn.delete').click(function() {
//     var item_id = $(this).closest('.row').attr('item_id');
//     $.post('/api/deleteplaces', {_id: item_id}, function(data){
//       console.log(data);
//       getPlaces(places);
//     });
//
//   });
// }
//
// function getPlaces(places) {
//   $.get('/api/showplaces', function(data){
//     places.find('.row:not(.header)').remove();
//     $.each(data, function(i, item) {
//       console.log(item)
//       places.append('<div class="row" item_id="' + item._id + '"><div class="cell">'+item.name+'</div><div class="cell"><button class="btn link"><a href="'+item.link+'" target="_blank">click</a></button></div>' + (admin_session ? '<div class="cell btn delete" id="admin">X</div>' : '') + '</div>');
//     });
//   });
//   bindDeletePlaces(places);
// }

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
  $('#content1 .cell.btn.delete').click(function() {
    console.log('jerr');
  });

  // var addplacesYear = $('#addplacesYear');
  // var addplacesName = $('#addplacesName');
  // var addplacesLink = $('#addplacesLink');
  // var places = $('#places');
  // $('#addplacesButton').click(function(){
  //   $.post('/api/addplaces',{name: addplacesName.val(), link: addplacesLink.val(), year: addplacesYear.val()}, function(data) {
  //     console.log(data);
  //     if(data.ok === 1) {
  //       addplacesYear.val("");
  //       addplacesName.val("");
  //       addplacesLink.val("");
  //     }
  //   });
  // })
  // getPlaces(places);

  // var filecpe = $('#file-cpe');
  // var addcpeYear = $('#addcpeYear');
  // var addcpeName = $('#addcpeName');
  // var cpe = $('#cpe');
  //
  // $('#addcpeYear').onkeyup(function(){
  //   console.log('jer');
  // });
  //
  //
  // document.getElementById('file-cpe').onchange = function(){
  //   var file = this.files[0];
  //   var reader = new FileReader();
  //   reader.onload = function(progressEvent){
  //     var lines = this.result.split('\n');
  //     for(var line = 0; line < lines.length; line++){
  //       var check = lines[line].split(",");
  //       console.log(check[0]+check[1]);
  //     }
  //   };
  //   reader.readAsText(file);
  // };

});
