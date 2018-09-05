$("#submit").on('click', function(event){
  event.preventDefault();
  let loadhtml= '<div class="loader">Loading...</div>';
  $('#results').html(loadhtml);

  let url = "https://www.reddit.com/r/";

  let searchterm = $('#searchterm').val();
  url += searchterm;
  url += ".json";

  // console.log(url)

  let promise = $.ajax({
    type:'GET',
    url: url
  });

  promise.then(function(response){
    console.log('success', response);
    let html='';

    //forEach is a type of for loop thingy, but a nice version
    response.data.children.forEach(function(thread){
    //`` allow to enter variables with ${}
      html +=`
      <div class="postbody">
      <div class="posttitle">${thread.data.title}</div>
      <div class="info"> Author: ${thread.data.author} | Score: ${thread.data.score} </div>

      `;
      try{
        thread.data.preview.images.forEach(function(image){
            html +=`
            <a href="${image.source.url}" target="_blank">
            <img class="pic" src="${image.source.url}">
            </a>
            </div>
            `
        });
      }
      catch(err){
        console.log(err);
      }
      html +=`</div>` //close postbody


    });



    $('#results').html(html);

  }, function(){
    console.log('error');
  });

});
