@disable:vide @only
Feature: JQuery UI Menus

  Background: 
    Given I am on the "/jqueryui/menu" route

  Scenario: Disabled menu item
    Then the "Disabled" menu item should be disabled

  Scenario: Enabled menu item and submenus
    When I hover over the "Enabled" menu item
    Then I should see the submenu items "Downloads" and "Back to JQuery UI"
    When I hover over the "Downloads" submenu item
    Then I should see the submenu items "PDF", "CSV", and "Excel"

  Scenario Outline: Downloading files
    When I hover over the "Enabled" menu item
    And I hover over the "Downloads" submenu item
    And I click on the "<format>" submenu item
    Then the "<filename>" file should be downloaded

    Examples: 
      | format | filename |
      | PDF    | menu.pdf |
      | CSV    | menu.csv |
      | Excel  | menu.xls |

  Scenario: Navigating back to JQuery UI
    When I hover over the "Enabled" menu item
    And I click on the "Back to JQuery UI" submenu item
    Then I should be redirected to the "/jqueryui" route
    When I click on the "Menu" link
    Then I should be redirected to the "/jqueryui/menu" route
