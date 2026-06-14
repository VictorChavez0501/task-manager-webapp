# SQL Relational Databases Project

## Overview

As a software engineer, I am continuously improving my understanding of full stack development and database management. This project helped me learn how relational databases interact with web applications and how data can be stored permanently using SQL.

This software is a Task Manager web application built with Node.js, Express, SQLite, HTML, CSS, and JavaScript.

The application allows users to create, view, update, and delete tasks. All task information is stored in a SQLite relational database instead of temporary memory, allowing data to persist between sessions.

The purpose of creating this software was to learn how to connect a relational database to a web application and implement CRUD (Create, Read, Update, Delete) operations using SQL queries.

[Software Demo Video] https://www.loom.com/share/417ad8581d17496c9050475a7200c28c


---

## Relational Database

This project uses SQLite as the relational database management system.

Database Table:

**tasks**

| Column | Type                              |
| ------ | --------------------------------- |
| id     | INTEGER PRIMARY KEY AUTOINCREMENT |
| name   | TEXT NOT NULL                     |

The database stores task information and supports CRUD operations through SQL queries.

---

## Development Environment

Tools used:

* Visual Studio Code
* Node.js
* Express.js
* SQLite3
* Git
* GitHub

Programming Languages:

* JavaScript
* SQL
* HTML
* CSS

---

## Useful Websites

* https://nodejs.org/en/docs
* https://expressjs.com/
* https://www.sqlite.org/docs.html
* https://developer.mozilla.org/
* https://github.com/

---

## Future Work

Possible improvements for future versions include:

* Add task completion status.
* Add due dates for tasks.
* Add task categories.
* Improve user authentication and security.
* Deploy the application online.
