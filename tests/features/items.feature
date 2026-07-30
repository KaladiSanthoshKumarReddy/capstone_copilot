Feature: Item Management
  As a logged-in user
  I want to manage items
  So that I can track work across the application

  Background:
    Given I am logged in as "test@example.com"
    And I am on the dashboard

  Scenario: Create a new item
    When I click "Add Item"
    And I fill in title "My First Item"
    And I submit the form
    Then the item "My First Item" should appear in the list

  Scenario: Delete an item
    Given an item "Test Item" exists
    When I click delete on "Test Item"
    Then "Test Item" should be removed from the list

  Scenario: View empty state
    Given no items exist
    Then I should see the empty state message

  Scenario: Create a new item with tags
    When I click "Add Item"
    And I fill in title "Tagged Item"
    And I fill in tags "work, urgent"
    And I submit the form
    Then the item "Tagged Item" should appear in the list
    And the item "Tagged Item" should show tags "work" and "urgent"

  Scenario: Filter items by tag
    Given an item "Work Item" exists with tags "work"
    When I filter the list by tag "work"
    Then the item "Work Item" should appear in the list
    When I clear the tag filter
    Then the tag filter should show "All Tags"
