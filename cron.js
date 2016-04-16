var checker = require('./checker.js');
var fs = require('fs');
var exec = require('child_process').exec;

const coursefileLoc = './courses.txt';
var courses;

var initCourses = function(loc){
  var str = fs.readFileSync(loc).toString();
  var allCourses = str.split('\n').sort();
  allCourses.shift(); // remove the empty string in the beginning

  var courses = {};
  var prevSubject = null; var arr = [];
  for(var i = 0; i < allCourses.length; i++){
    var subject = allCourses[i].split(':')[0];
    var course = allCourses[i].split(':')[1];
    if(prevSubject && subject === prevSubject)
      arr.push(Number(course)); // keep adding the courses in the same subject to arr
    else{ //we got different subject,push prev subject's courses into courses
      if(prevSubject) // only push if prevSubject is defined (not when i = 0)
        courses[prevSubject] = arr;

      // add the new course
      arr = []; arr.push(Number(course));
      prevSubject = subject;
    }
  }
  //add the last course
  courses[prevSubject] = arr;
  return courses;
};

var output = function(ret){
  if(ret){
    var url = "https://sims.rutgers.edu/webreg/editSchedule.htm?login=cas&semesterSelection=92016";
    var indexList = "&indexList=";
    var subjects = Object.keys(ret);
    subjects.forEach(function(course){
      indexList += (ret[course])[0] + ',';
    });
    url+=indexList;
    console.log(url);

    var command = 'casperjs sniper.js ' + url;
    exec(command, function(error, stdout, stderr){
      console.log(stderr);
      console.log(stdout);
      if(error) console.log('cronjs failed to execute : ' + error);
    });
  }
}

courses = initCourses(coursefileLoc);
var subjects = Object.keys(courses);
subjects.forEach(function(subject){
  checker(subject, courses[subject], output);
});
