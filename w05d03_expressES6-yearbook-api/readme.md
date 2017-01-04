---
title: Yearbook API
type: lab
duration: "1:25"
creator:
    name: Alex Chin
    city: London
competencies: Server Applications
---

# Yearbook API

## Introduction

> ***Note:*** _This can be a pair programming activity or done independently._

Your task is to create an API for a WDI yearbook. This API will have no front-end but will render JSON so that we might consume it later.

## Exercise

#### Requirements

- Create an express API that has two models, `User` and `Projects`

The User model should have these fields:

- name
- twitter (String link to twitter profile)
- github (String link to Github)
- image (String)
- bio (String)
- portfolio (String for website)
- projects (referenced array of Projects)

The Project model should have these fields:

- title (String, required)
- description (String)
- github (String)
- website (String)

The API should have RESTful routes for both objects.

**Note:** You must use populate to output the correct JSON.

#### Starter code

There is no starter-code.
