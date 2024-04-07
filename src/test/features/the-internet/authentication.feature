@only @disable:video
Feature: Authentication
    As a user
    I want to test the authentication methods on the-internet app
    So that I can verify the login functionality

  Scenario Outline: Form Authentication
    Given I am on the "/login" page
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

  Scenario Outline: Basic Auth
    Given I am on the "/basic_auth" page with credentials "<username>" and "<password>"
    Then I should see a "<auth_message>" message

    Examples: 
      | username | password | auth_message                                           |
      | admin    | admin    | Congratulations! You must have the proper credentials. |
      | admin    | wrong    | Unauthorized                                           |
      | wrong    | admin    | Unauthorized                                           |
      | wrong    | wrong    | Unauthorized                                           |

  Scenario Outline: Digest Authentication
    Given I am on the "/digest_auth" page with credentials "<username>" and "<password>"
    Then I should see a "<auth_message>" message

    Examples: 
      | username | password | auth_message                                           |
      | admin    | admin    | Congratulations! You must have the proper credentials. |
      | admin    | wrong    | Unauthorized                                           |
      | wrong    | admin    | Unauthorized                                           |
      | wrong    | wrong    | Unauthorized                                           |
