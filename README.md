# autosniper
Course Sniper for Rutgers that alerts and adds the course on WebReg automatically

## outline
- checker.js: node module that interfaces with the schedule of classes api
- cron.js: responsible for checking the courses and scheduling sniper.js
- sniper.js: web scraper that actually adds the courses
- courses.txt: text file with the courses user wants to snipe

## Usage Instructions
1. courses.txt has a specific format: courses should be inputted:
    ```
    <school name>:<course name>
    ```
    Ex: 198:112
    Each course must be inputted on a new line.
    
