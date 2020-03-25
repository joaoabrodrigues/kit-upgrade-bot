#Environment

- Creating elasticbeanstalk application
```sh
aws elasticbeanstalk create-application --application-name kit-upgrade-bot
```

- Creating elasticbeanstalk environment
```sh
aws elasticbeanstalk create-environment --application-name kit-upgrade-bot --environment-name production --solution-stack-name "64bit Amazon Linux 2018.03 v2.14.2 running Docker 18.09.9-ce"
```