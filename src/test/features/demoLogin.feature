@only
Feature: 

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