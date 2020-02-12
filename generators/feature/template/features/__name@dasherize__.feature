Feature: <%= classify(name) %>

    Scenario: <%= classify(name) %> stuff
        Given access to app "<%= dasherize(name) %>" page
        When app "<%= dasherize(name) %>" page is visible
        Then <%= dasherize(name) %> stuff
