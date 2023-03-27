# BulgarianDrivers
You can visit the app from here https://bulgarian-drivers.vercel.app/

You can use this account:

| Email | Password |
| ----------- | ----------- |
| test@bgdrivers.bg | Test1234 |

Or create your own.

## About the project
This web app is designed to allow users to write reviews for drivers based on their license plate number. The app provides a simple interface where users can enter the license plate number of the driver they want to review and then submit their review. Users can write a review, describing their experience with the driver, and provide a title for their review.

The app is intended to help people share information about good and bad drivers in their area. The app allows users to browse through existing reviews and search for drivers by their license plate number. 

Overall, the web app provides a simple and easy-to-use platform for sharing and accessing information about drivers based on their license plate number, allowing users to share their experiences and help others stay safe on the road.

# How to run the app locally
- First, create .env file in the bulgarian-drivers folder
- Then add these entries to the .env file.

REACT_APP_AUTH_BACKEND="https://rose-frantic-butterfly.cyclic.app/auth"
REACT_APP_APP_BACKEND="https://better-lime-waders.cyclic.app/api"

- Still, in the bulgarian-drivers folder open your terminal, and type in.
- `npm i` this will install all the dependencies
- `npm start` this will start the app on `http://localhost:3000/`

# Features
- Authentication
  - Login
  - Register
- Drivers list
  - Comments about driver
  - Add comment (Logged in)
  - Edit comment (creator)
  - Delete comment (creator)
- Profile
  - User comments
  - Delete profile
- Search
  - Search by plate number
