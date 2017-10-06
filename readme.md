#### GOOD PRACTICES ####

### DONT CHANGE IN THE /dist FOLDER  ###
### DONT USE !important STATEMENT ###
### DONT ADD INLINE STYLES TO CHANGE SOME SHIT, THERE IS FOLDER FOR IT ###
### IF YOU WANT TO ADD SOME SHIT CSS, ADD IT TO /src/scss/shame/_smth.scss ###


#### SCSS ####

Look into the /src/scss, there are few important folders to know.

/Base is for styling HTML TAGS
/Layout is for styling big page section like .header, .sidebar
/Module every entity of your project should have own file here. 
/State is every classes that change state like: .open, .closed, .is-active
/Shame is needed only when you have to add some shit code and it will be changed in future.


### How to do stuff ###

## Add new vendor js  ##

bower install package_name

go to gulpfile.js  

Add line to 

var jsSource = [
  HERE 
  "bower_components/jquery/dist/jquery.min.js",
  "src/js/*.js"
];


## Add new vendor css ##

