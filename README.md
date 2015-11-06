# Adopt-a-Rack

Claim responsibility for shoveling out a bike rack

##Screenshot
![Adopt-a-Rack](https://github.com/billyfung/van-racks/raw/master/screenshot.png "Adopt-a-Rack")

## Demo
You can see a running version of the application at
[http://vanracks.herokuapp.com][demo].

[demo]: http://vanracks.herokuapp.com/


Bike rack data obtained from the City of Vancouver. Put into the db/seeds.rb file.

## Installation
This application requires [Postgres](http://www.postgresql.org/) to be installed

    git clone git:https://github.com/billyfung/van-racks
    cd van-racks
    bundle install

    bundle exec rake db:create
    bundle exec rake db:schema:load

## Usage
    rails server

## Seed Data
    bundle exec rake db:seed

## Deploying to Heroku
A successful deployment to Heroku requires a few setup steps:

1. Generate a new secret token:

    ```
    rake secret
    ```

2. Set the token on Heroku:

    ```
    heroku config:set SECRET_TOKEN=the_token_you_generated
    ```

3. [Precompile your assets](https://devcenter.heroku.com/articles/rails3x-asset-pipeline-cedar)

    ```
    RAILS_ENV=production bundle exec rake assets:precompile

    git add public/assets

    git commit -m "vendor compiled assets"
    ```

4. Add a production database to config/database.yml

5. Seed the production db:

    `heroku run bundle exec rake db:seed`

Keep in mind that the Heroku free Postgres plan only allows up to 10,000 rows,
so if your city has more than 10,000 fire hydrants (or other thing to be
adopted), you will need to upgrade to the $9/month plan.


If you run into troubles with the database:

`heroku pg:reset`

then migrate the db and seed again


## Supported Ruby Version
This library aims to support and is [tested against][travis] Ruby version 2.1.2.

If something doesn't work on this version, it should be considered a bug.

This library may inadvertently work (or seem to work) on other Ruby
implementations, however support will only be provided for the version above.

If you would like this library to support another Ruby version, you may
volunteer to be a maintainer. Being a maintainer entails making sure all tests
run and pass on that implementation. When something breaks on your
implementation, you will be personally responsible for providing patches in a
timely fashion. If critical issues for a particular implementation exist at the
time of a major release, support for that Ruby version may be dropped.

## Copyright
Copyright (c) 2014 Code for America. See [LICENSE][] for details.

