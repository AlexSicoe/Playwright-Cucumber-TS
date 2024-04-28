Feature: The Internet Herokuapp Tests

  Background:
    Given I am on the homepage

  Rule: Perform actions on specific pages

    Background:
      Given I click on the "Add/Remove Elements" link

    Scenario: Add and remove elements
      When I click on the "Add Element" button 5 times
      Then I should see 5 "Delete" buttons
      When I click on the first "Delete" button
      Then I should see 4 "Delete" buttons

  Rule: Verify form interactions

    Background:
      Given I click on the "Form Authentication" link

    Scenario: Successful login
      When I enter username "tomsmith"
      And I enter password "SuperSecretPassword!"
      And I click on the "Login" button
      Then I should be greeted with the following message:
        | message                       |
        | You logged into a secure area |

    Scenario: Failed login
      When I enter username "invaliduser"
      And I enter password "invalidpassword"
      And I click on the "Login" button
      Then I should be greeted with the following message:
        | message                   |
        | Your username is invalid! |
