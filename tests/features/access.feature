Feature: Access

  Scenario: Access as new User
    Given app "access" page is visible
    When user get registrated
    Then app "home" page is visible

  Scenario: Access as new User
    Given app "access" page is visible
    When user get logged
    Then app "home" page is visible
