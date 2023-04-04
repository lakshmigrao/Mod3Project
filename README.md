# Mod3Project

# Introduction

Recipe App is a full stack application using MERN stack. It uses two usermodels, UserModel and RecipeModel. Recipe App has a HomePage where the user get to search for recipes and recipes are fetched from API. The User can login and add the recipes to their respective favorite list, edit it and remove it. The User can also create a new recipe in the favorite list. If not logged in, the user get to browse through the search results without an option to save it to favorite list.

![ER Diagram](/client/src/images/ERdiagram.png)


This is the HomePage of the app where you get to search for recipes.

![HomePage](/client/src/images/HomePage.jpg)


This is the LoginPage where the user get to login. After logging in, the user can edit, view or delete his profile.

![LoginPage](/client/src/images/LoginPage.jpg)


This is the RegisterPage where the user get to register.

![RegisterPage](/client/src/images/RegisterPage.jpg)


This is the MyRecipes Page a user can open when he is logged in. The user can create/edit/view/delete the recipes.

![MyRecipesPage](/client/src/images/MyRecipesPage.jpg)


# Technologies Used

Recipe App is developed using MongoDB, Express Server, React JS and Node.JS. For the CSS, Bootstrap and Fontawesome is being used.
## Libraries used on the Client Side are 
- react
- react-dom
- react-router-dom
- react-bootstrap
- axios
- fontawesome

## Libraries used on the Server Side are
- mongoose
- express
- dotenv
- bcrypt
- cors
- jsonwebtoken

## The API being used is,
https://www.themealdb.com/api.php

# Project Planning

Trello board is used for project planning.
https://trello.com/b/gfTDgO45/mod3-recipe-app

# Unsolved Problems

# Future Enhancements

### introducing a new model, commentmodel to comment on each recipe.
### modifying the project to use Redux.




