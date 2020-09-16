# GoLogic Coding Challenge - Results

## Problem Description

Design a booking platform for users to rent a room. Users should see a list of rooms available for rent and be able to click into them to see details about that room. A room at a minimum should have the following details:

Title
Images
Price
Description
Address
Capacity of room

Users should then be able book that room using their email address, the dates they require and how many people will be staying. They should not be able to book a room on a date that has already been booked or doesn't have the capacity for the amount of people they require.

## Solution Technologies

- I have implemented the front end software using Angular 10. The back end software was build using .NET Core 3.1.

## Dev Installation Instructions

# Backend

- Download the files from https://github.com/scott-everett/BookingPlatformAPI and clone to the desired local install location.
- Open the BookingPlatformAPI\BookingPlatformAPI.sln file in Visual Studio (2019).
- Open appsettings.json and change the "BookingPlatformCodeChallenge" connection string to point to the desired SQL Server instance.
- Select Build / Rebuild Solution.
- Open the Package Manager Console (Tools / Nuget Package Manager / Package Manager Console).
- Type "Update-Database" and press enter.

You can now run the API.

# Frontend

- Download the files from https://github.com/scott-everett/booking-platform-client and clone to the desired local install location.
- Run 'npm install' in the solution directory
- Run 'ng serve -o' to execute the application.

## Basic User Instructions

Access the application in dev environment on http://localhost:4200/.

You can register with your email address by clicking the 'Register' button on the top toolbar. If you are already registered you can click 'Sign In' to sign in.

Browse the rooms list and click on a room to view details. At the bottom of each room details page there is a section where you can book the room. To go back to the rooms list click on 'Rooms List' on the top toolbar.

If you are signed in you can view your bookings by clicking on 'My Bookings' on the top toolbar.

If you are signed in you may sign out by clicking on your name on the toolbar and selecting 'Sign Out' from the top toolbar menu.

## Notes

- In the back end, I used .NET Core's default DI. I designed the application to be easily testable using IoC principles.

- I did not get time to add full coverage testing for the back end. I added one test (NUnit) for one method to give a very brief demonstration of my testing style. This is for the RoomBookingsForAccount method of the RoomsBookingService. I would have liked to have implemented full coverage.

- I did not add any front end testing. I would have liked to have included this if time permitted. I must admit, my Jasmine skills are a bit rusty.

- I addded some very basic backend console logging using Microsoft.Extensions.Logging.Console. The logging provider may be easily changed due to the ILogging interface used. In the real world, I would add settings to enrich the logging to include details such as method name, user name etc.

- I did not get time to implement front end logging. To do so, I would create a logging service and design in such a way to make it simple to change logging providers if neccessary.

- I added authentication using JWT access tokens. To keep things simple, I have set things up so that the access token never expires. In the real world, I would implement tokens that have an expiry - both access and refresh tokens.

- The CORS policy would need to be set for a production environment.

- In the front end project I included ConfigService for holding global settings. In the real world, I would populate these settings from a file so they can be changed without code change if necessary. I would follow something like https://aclottan.wordpress.com/2016/12/30/load-configuration-from-external-file/.

- My css skills are a little rusty (at Ambrose we had designers that took care of the css), but if I had more time I would have built a more responsive UI.
