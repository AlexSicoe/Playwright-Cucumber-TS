@only
Feature: Heroku Form Authentication Test
    As a user
    I want to test the form authentication on the Herokuapp
    So that I can verify the login functionality

  Scenario Outline: Test form login
    Given I am on the login page
    When I enter username "<username>"
    And I enter password "<password>"
    And I click on the login button
    Then I should be greeted with "<auth_message>"

    Examples: 
      | username    | password             | auth_message                  |
      | tomsmith    | SuperSecretPassword! | You logged into a secure area |
      | invalidUser | SuperSecretPassword! | Your username is invalid!     |
      | tomsmith    | invalidPass          | Your password is invalid!     |
      |             |                      | Your username is invalid!     |
