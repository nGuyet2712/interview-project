# Web Developer Interview

## Background

You are to develop a simple single page web application designed to allow users to search for information on our website.

Assumptions: You may assume that login and access control have already been handled.

## Tasks

Develop a frontend web application, listed under User Stories below, to search for content.

- Fetch and display search results according to mockup
- Provide typeahead suggestions dropdown for searchbar

---

## Mock Ups

https://www.figma.com/file/mjn0tcgy7dU9iQTfE3uvYe/Developer-Application?node-id=0%3A1

## User Stories

### Task 1: As a user, I want to see results displayed when i search in the search bar

Refer to screenshots provided to style your application UI accordingly.

```
1a)     Perform Search and Display Results
        -------------------------------------
        Given user is focused on search bar
        When user click on search button OR press enter
        Then search results should be fetched
        AND results should be displayed in correct format
        AND matching terms in results content should be highlighted
```

\*\* Use the following Search API endpoint to fetch mocked search result data to complete your task.

- HTTP GET https://gist.githubusercontent.com/yuhong90/b5544baebde4bfe9fe2d12e8e5502cbf/raw/e026dab444155edf2f52122aefbb80347c68de86/queryResult.json
- Note that above mocked api response will be static.

### Task 2: As a user, I want to see suggestions in the search bar

Refer to screenshots provided to style your application UI accordingly.

```
2a)     Typeahead Suggestion Dropdown
        -------------------------------------
        Given user is focused on search bar
        When user types > 2 character in search bar
        Then suggestion dropdown should appear showing top 6 results
```

```
2b)     Select Suggestion
        -------------------------------------
        Given user is focused on search bar,
        When up or down keyboard button is pressed to select any suggestion and enter is pressed
        OR any suggestion is clicked
        Then suggestion dropdown should disappear
        AND selected suggestion search term should appear in search bar
        AND search results should be updated according to selected term
```

```
2c)     'X' Button in SearchBar
        -------------------------------------
        Given user is focused on search bar,
        When >= 1 character is typed in search bar
        Then 'X' button should appear
```

```
2d)     Click 'X' Button in SearchBar
        -------------------------------------
        Given user is focused on search bar,
        When 'X' is clicked
        Then suggestion dropdown should disappear
        AND searchbar textfield should be cleared but retain focused
        AND 'X' option should disappear
```

\*\* Use the following suggestion API endpoint to fetch mocked suggestion data to complete your task.

- HTTP GET https://gist.githubusercontent.com/yuhong90/b5544baebde4bfe9fe2d12e8e5502cbf/raw/e026dab444155edf2f52122aefbb80347c68de86/suggestion.json
- Note that above mocked api response will be static.

---

## Requirements/Expectations

- Please use ReactJS to complete this technical assessment.
- Your code repository should contain a `README.md` that includes the following:

  - Setup instructions on how to build / run your application; we need to minimally be able to launch and test your solution locally
  - Instructions on how to run your automated tests

- Include unit tests for application logic that should be tested.
- You may state any assumptions made on requirements.

## Important!

We will assess your submission holistically (i.e. not just in terms of functionality), including factors such as:

- Readability and code cleanliness
- Naming / Coding conventions as per your language of choice
- Code structure/design, e.g. modularity, testability
- Designing for user experience / performance
- Sound approach to handle responsive layout and styling within the application to support different devices
- Adequate error handling, eg. network failure

You should be able to complete this assessment within 8-10 hours.

When you have completed your assignment, before the given deadline, please upload your solution to a public git respository and submit to us (at d3hiring@gmail.com) a link to your code repository.

If you have any queries, feel free to post them to d3hiring@gmail.com.
