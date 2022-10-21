Welcome to the Klickr_Clone wiki!

Klickr Project is a clone of Flickr that is centered around sharing images and looking at images relatable to you. Users can browse images to find inspiration for themselves or to use images for personal projects.

Link to test out website: https://klickr-group.herokuapp.com/

## Tech Stack
 Frontend:
* React
* Redux
* JS
* HTML
* CSS
* DB: SQLAlchemy  



## How to run Klickr Locally

* Clone/download the repo https://github.com/ChzFlvrHrse/Klickr-Group.git

* cd into Klickr-group folder and run pipenv install

* Open two terminal paths for both Klickr-group and react-app.
* Under Klickr run pipenv shell ``` then flask run, for react-app run npm install```
* Create a .env file under the root of the backend folder with the following contents:

  ``` REACT_APP_BASE_URL=http://localhost:5000 ```

In the terminal under Klickr-group , migrate and seed files as follows:
flask db upgrade
flask seed all


# Environment Info
```
PORT=8000
DB_FILE=db/dev.db
JWT_SECRET=«generate_strong_secret_here» 
JWT_EXPIRES_IN=604800
```
## Database Setup
```
 npx dotenv sequelize db:migrate
 npx dotenv sequelize db:seed:all

```

## Login Page

![Screen Shot 2022-10-21 at 5 52 31 PM](https://user-images.githubusercontent.com/99216902/197294204-48e3d1f5-e45c-4893-bdfd-f1ce4739d9f2.png)

## Log in

![Screen Shot 2022-10-21 at 6 03 41 PM](https://user-images.githubusercontent.com/99216902/197295312-bb32e0f2-5b3d-4f6e-97d7-d1dba1ecb81e.png)




## Signup Page

![Screen Shot 2022-10-21 at 5 53 56 PM](https://user-images.githubusercontent.com/99216902/197294324-cee1a67b-967c-48fa-be0b-9476d412ce12.png)

## Splash Page

![Screen Shot 2022-10-21 at 5 54 55 PM](https://user-images.githubusercontent.com/99216902/197294420-0d89b645-f8e5-41ff-af00-a4eaa3dae4fa.png)

## Explore / AllImages Page

![Screen Shot 2022-10-21 at 5 47 21 PM](https://user-images.githubusercontent.com/99216902/197294477-12efc6c4-4b72-4aa6-9c66-2e6a18d64e85.png)

## Image Detail's Page


![Screen Shot 2022-10-21 at 5 56 41 PM](https://user-images.githubusercontent.com/99216902/197294682-345f93eb-41c8-4e07-b475-862118b05ab4.png)


![Screen Shot 2022-10-21 at 5 57 00 PM](https://user-images.githubusercontent.com/99216902/197294646-d052091b-b3a2-4487-aaa7-10c28b7ac4d1.png)


## Upload/Create Image Page

![Screen Shot 2022-10-21 at 5 58 22 PM](https://user-images.githubusercontent.com/99216902/197294766-524a546d-ff4b-4c5f-94e3-8c7a31e57de0.png)

## Edit Image Page

![Screen Shot 2022-10-21 at 6 01 05 PM](https://user-images.githubusercontent.com/99216902/197295089-ca7e370a-9ecd-484e-b906-6ccb09be577e.png)



## You /User Detail's Page

![Screen Shot 2022-10-21 at 5 59 40 PM](https://user-images.githubusercontent.com/99216902/197294869-4e34ebc3-dbfd-4f57-b5ad-dee378baaef9.png)

## SearchBar
![Screen Shot 2022-10-21 at 6 00 14 PM](https://user-images.githubusercontent.com/99216902/197294922-f9e10978-e979-444e-9dfa-78b0602b9e75.png)


## Carasoul Images on Details/ Additional Feature tags

![Screen Shot 2022-10-21 at 6 02 31 PM](https://user-images.githubusercontent.com/99216902/197295213-f5a2d2bb-0b48-42df-8323-6426cb659e61.png)




