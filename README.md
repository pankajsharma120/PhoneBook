# PhoneBook
Node js CRUD web application.

**dependencies**

    body-parser 1.19.0
    express 4.17.1
    express-handlebars 4.0.4
    mongoose 5.9.16
    nodemon 2.0.4

**Front End**

    Bootstrap
    Jquery
    

- Operations User can do
    - Add a contact
    - Remove a contact
    - Update a contact

- Search contact
    - By name (partial name can also be searched)
    - By phone number
    - By email
    
- Pagination with default 4 results per page
- Search results be sorts alphabetically (by name).

- Contact
    - Will have a Name (required)
    - Will/Can have multiple phone numbers (should have at least 1 phone number)
    - Will/Can have multiple emails
    - Will/Can have single Date of birth (not mandatory)
    
- Constraints
    - Two contacts cannot have same phone numbers
    - Two contacts can have the same emails.

