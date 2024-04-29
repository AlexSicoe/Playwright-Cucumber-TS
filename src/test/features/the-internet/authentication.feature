@disable:video @focus
Feature: Authentication
    As a user
    I want to test the authentication methods on the-internet app
    So that I can verify the login functionality

  Scenario Outline: Form Authentication
    Given I am on the "/login" route
    When I enter username "<username>"
    And I enter password "<password>"
    And I click on the login button
    Then I should be greeted with the following login message: "<message>"

    Examples:
      | username | password             | message                       |
      | tomsmith | SuperSecretPassword! | You logged into a secure area |
      | wrong    | wrong                | Your username is invalid!     |
    # tests common for all clients

    @client:A
    Examples:
      | username    | password             | message                   |
      | invalidUser | SuperSecretPassword! | Your username is invalid! |

    @client:B
    Examples:
      | username | password    | message                   |
      | tomsmith | invalidPass | Your password is invalid! |
      |          |             | Your username is invalid! |

  Scenario Outline: Basic Auth
    Given I am on the "/basic_auth" route with credentials "<username>" and "<password>"
    Then I should be greeted with the following login message: "<message>"

    Examples:
      | username | password | message                                                |
      | admin    | admin    | Congratulations! You must have the proper credentials. |
      | admin    | wrong    | Not authorized                                         |
      | wrong    | admin    | Not authorized                                         |
      | wrong    | wrong    | Not authorized                                         |

  Scenario Outline: Digest Authentication
    Given I am on the "/digest_auth" route with credentials "<username>" and "<password>"
    Then I should be greeted with the following login message: "<message>"

    Examples:
      | username | password | message                                                |
      | admin    | admin    | Congratulations! You must have the proper credentials. |
      | admin    | wrong    |                                                        |
      | wrong    | admin    |                                                        |
      | wrong    | wrong    |                                                        |
