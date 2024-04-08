@only @disable:video
Feature: Elements
  Scenario: Add/Remove Elements
    Given I am on the "/add_remove_elements" route
    When I click on the "Add Element" button
    Then I should see a new "Delete" button appear
    When I click on the "Delete" button
    Then the "Delete" button should disappear

  Scenario: Checkboxes
    Given I am on the "/checkboxes" route
    When I check checkbox 1
    Then checkbox 1 should be checked
    When I uncheck checkbox 2
    Then checkbox 2 should be unchecked

  Scenario: Inputs
    Given I am on the "/inputs" route
    When I enter the value "42" into the input field
    Then the input field should display "42"
    When I clear the input field
    Then the input field should be empty

  Scenario: JQuery UI Menus
    Given I am on the "/jqueryui/menu" route
    When I hover over the "Enabled" menu item
    And I click on the "Downloads" submenu item
    Then I should be redirected to the "/download" route

  Scenario: Large & Deep DOM
    Given I am on the "/large" route
    Then the page should contain 50 rows in the table

  Scenario: Shadow DOM
    Given I am on the "/shadowdom" route
    Then I should see the text "Let's have some different text!" in the shadow DOM