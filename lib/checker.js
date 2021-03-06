var http = require('http');
var querystring = require('querystring');


var isOpen = function(subject, courses, callFunc){
  const hostUrl = 'http://sis.rutgers.edu/soc/courses.json?';
  var data = {
    'campus' : 'NB',
    'semester' : 92016,
    'level' : 'U,G',
    'subject' : subject
  };
  var url = null;
  endFunc = callFunc;
  numCourses = courses.length;

  var checkOpenInp = {'endFunc' : endFunc, 'courses' : courses};
  url = hostUrl + querystring.stringify(data);
  getJSONData(url, checkOpen, checkOpenInp);
}

var getJSONData = function(url, endFunc, endFuncInp){
  http.get(url, function(res){
    var e = "";
    res.setEncoding();
    res.on('data', function(data){
      e += data.toString();
    });

    res.on('error', function(error){
      console.log(error.toString());
    });

    res.on('end', function(end){
      console.log('got data');
      checkOpen(JSON.parse(e), endFuncInp);
    });
  });
}

var checkOpen = function(data, inp){
  var courses = inp.courses;

  console.log('in checkopen');
  var filCourses = data.filter(function(course){
    return courses.indexOf(Number(course.courseNumber)) !== -1
              && course.openSections;
  });

  var ret = {};
  console.log(filCourses);
  filCourses.forEach(function(openCourse, ind){
    var openSections = [];

    openCourse.sections.forEach(function(section){
      if(section.openStatus){
        openSections.push(section.index);
        if(openSections.length === openCourse.openSections)
          return;
      }
    });

    var courseId = openCourse.subject + ':' + openCourse.courseNumber;
    ret[courseId] = openSections;
  });
  endFunc(ret);
}

module.exports = isOpen;
