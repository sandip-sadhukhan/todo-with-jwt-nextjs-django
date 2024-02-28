# About

This is a simple todo application with JWT authentication built using NextJs and Django.

This can be a reference repo to setup your simple authentication system in NextJs with any backend system.

You can see how to use protected route. For example todo page only accessible when you are authenticated.

If you are not logged-in, and you go to todo page, it will redirect you to the login page.

Similarly if you are already authenticated, and go to login/register router you will be redirected to todo page.

## Demo of the app

https://github.com/sandip-sadhukhan/todo-with-jwt-nextjs-django/assets/44361140/07fabe28-3bb4-4247-82e9-abac81c0eec8

## How to run this project locally.

1. Go to /backend folder.
1. rename .env.example to .env and change any value if you want.
1. Create a virtual env and install `requirements.txt` packages.
1. Then run `python manage.py migrate` and `python manage.py runserver`
1. Open second terminal and go to /frontend folder.
1. rename .env.example to .env and change any value if you want.
1. Run `npm i` to install dependencies
1. Run `npm run dev` to run the development server.
1. Open `localhost:3000` to see the web app.
