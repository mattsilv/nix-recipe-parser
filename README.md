Simple project to test nix api
==============================

Step 1: Set up your dev environment
-----------------------------------

### Install prerequisites

To deploy locally you need to have

+   NodeJS v0.10.x+
+   npm (which comes bundled with Node) v1.4.3+
+   Git

You can check if you have Node and npm installed by typing:

    $ node --version && npm --version

If you need to upgrade or install Node, the easiest way is to use an installer for your platform. 
Download the .msi for Windows or .pkg for Mac from the [NodeJS website](http://nodejs.org/download/).

For Ubuntu it's best to use [PPA from Chris Lea](http://www.ubuntuupdates.org/ppa/chris_lea_nodejs)

    $ sudo add-apt-repository ppa:chris-lea/node.js 
    $ sudo apt-get update
    $ sudo apt-get install nodejs
    
For other linux distributions you may refer to 
[this](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager) page or any other manual in the WEB

You can check if you have Git installed by typing:

    $ git --version
    
If you don't have Git, grab the installers from the [Git website](http://git-scm.com/) 
or install via your distribution package manager.

For Ubuntu it would be
    
    $ sudo apt-get install git
    
### Install the Yeoman toolset

Once you’ve got Node installed, install the Yeoman toolset:
    
    $ npm install --global yo
    
_If you see permission or access errors, you will need to prepend_ __sudo__ _to the above command, like so:_

    $ sudo npm install --global yo
    
### Confirm installation

It is a good idea to check that everything is installed as expected by running commonly used Yeoman commands
like yo, bower, and grunt with the --version flag as follows:

    $ yo --version && bower --version && grunt --version
    
Running the above should output three separate version numbers:

+   Yeoman
+   Bower
+   Grunt CLI (the command-line interface for Grunt)


Step 2: Install a Yeoman generator
----------------------------------

As this project was originally scaffolded with 
[AngularJS Full-Stack generator](https://github.com/DaftMonk/generator-angular-fullstack)
it is a good idea to have it in your system.
It should be used to create new application components (controllers, services, directives, filters)

Install [generator-angular-fullstack](https://github.com/DaftMonk/generator-angular-fullstack) using this command:
        
    $ npm install --global generator-angular-fullstack
    
_If you see permission or access errors, you will need to prepend_ __sudo__ _to the above command, like so:_

    $ sudo npm install --global generator-angular-fullstack
    

Step 3: Clone an application sources
------------------------------------

After your environment is ready you may checkout the project in any desired location.
Application is self-hosted so does not need to be located in particular location, and does not depend on anything more 
than was described above 
(in contrary to php projects which need to be located under htdocs root and served with apache or nginx).

To clone the project from repository you may use your favourite git client.
 
    $ git clone git@github.com:mattsilv/nix-recipe-parser.git
    
_If you have problems with setting up_ __ssh__ _access to github you may use_ __https__ _url instead_

    $ git clone https://github.com/mattsilv/nix-recipe-parser.git
 
    
Step 4: Fetch application's dependencies
----------------------------------------

The last step before run would be to fetch application's __npm__ and __bower__ dependencies.
Do it like so
        
    $ cd nix-recipe-parser
    $ npm install
    $ bower install


_If you are a Windows user at some point you may get an error which includes similar text_
    
    error: error setting certificate verify locations:
     CAfile: /bin/curl-ca-bundle.crt
     CApath: none
    while accessing ...

_The easiest way to fix it is running_
    
    git config --global http.sslverify false
   
Step 5: Create local configuration
----------------------------------

Copy sample file and fill it with proper values.

    $ cp server/config/local.env.sample.js server/config/local.env.js
        
Step 6: Run the application
---------------------------

At this point everything should be ready to launch an application.
To run development version use this command:

    $ grunt serve
    
In short time this will open new window in your browser with application's index page.

Livereload should be working, so any changes to project's files will automatically refresh the page.

### Build

To create application build you also need to use grunt
 
    $ grunt build
    
This will create distribution application version under _dist_ subdirectory.
Which includes: minified css, html, minified and concatenated js, optimised images.

To check how distribution version works you may run

    $ grunt serve:dist
    
This will open new window in your browser with distribution version of the application. 
Please note, that in this mode changes to application's sources won't be reflected until 
next __grunt build__ or __grunt serve:dist__ 


Development process
-------------------

To create new application components you should use 
[yeoman generators](https://github.com/DaftMonk/generator-angular-fullstack#generators) 

To add _JS_ and _CSS_ libraries you should use [bower](http://bower.io/) if possible.

Use command below to automatically add dependency into bower.json 

    $ bower install --save <package>

Heroku Deploy
-------------

To deploy to heroku you have first to set up your app

```
heroku git:remote -a app_name
```

Set up custom buildpack

```
heroku config:set BUILDPACK_URL=https://github.com/mathisonian/heroku-buildpack-nodejs-grunt-compass-bower
```

Set production environment for node

```
heroku config:set NODE_ENV=production
```

Add nutritionix api credentials

```
heroku config:set API_APP_ID=...
heroku config:set API_APP_SECRET=...
```

Scale to 1 web dyno

```
heroku ps:scale web=1
```

And push the app to heroku

```
git push heroku master
```
