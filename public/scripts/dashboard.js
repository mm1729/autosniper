$(document).ready(function() {
  var data = [{'course' : 'Computer Architecture', 'sections' :'03912, 21344'},
  {'course' : 'Software Engineering', 'sections' : '01012'},
  {'course' : 'Calculus', 'sections' : '01231'}];

  var init_state = function() {
    var data_html = '';
    for(var i in data) {
      var course = data[i].course;
      var sections = data[i].sections;
    }

    $('tbody').append();
  };

});
