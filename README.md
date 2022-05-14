# QuestionsApp
Application to get people'opinions on different topics through voting.

**This application is not responsive. For best viewing, it should run on desktop devices.

This web application uses the following technologies: 
  
Front-end: Angular 12, HTML, CSS, Typescript

Back-end: C#, ASP.NET WEB API, SQL Server.

To run this project, you must have Angular 12, dotnet 5.0 and SQLServer installed. It would be better and easier if you install VS Code and SQL Server Management Studio.

After the above, clone this repository on your local machine and run the project.


**NOTE: This app uses a third party service to send emails (specifically SendGrid) for account confirmation and password reset, so please keep in mind this as a SendGrid account, SendGridApiKey and email account are required to set up the application to make use of these services. To avoid configuring these email services and getting access to the application without email confirmation, you can comment out lines 73 to 78 and also line 95 of the AccountController.cs file, and avoid using the password reset functionality in the client application.
