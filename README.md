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