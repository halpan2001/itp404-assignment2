let resultTemplateString = document.getElementById('result-template').innerHTML;
let renderResults = Handlebars.compile(resultTemplateString);

Handlebars.registerHelper('comma-format', function(num){
  return num.toLocaleString('en-IN');
});


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
    let renderedResults = renderResults({
      result: response.data.children
    });
    console.log(renderedResults);
    $('#results').html(renderedResults);
  }, function(error){
    console.log('Error!');
    let noResult = '<div class="postbody"><h3>Oops! Something went wrong :( </h3></div>'
    $('#results').html(noResult);
  });

});
