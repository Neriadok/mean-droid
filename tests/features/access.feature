Feature: Access

  Scenario: Access as new User
    Given app "access" page is visible
    When user get registrated
    Then app "home" page is visible

  @techdebt
    # It is not worth it.
    # Detecting preexisting users it's complex
    # and endpoints has been covered by unit test
  Scenario: Access as existing User
    Given app "access" page is visible
    When user get logged
    Then app "home" page is visible
