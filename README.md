# Business News 4 all

The idea behind this project was to create a business newspaper site which has a positive influnce amongs it's users. Very often when i read newspapers i see a combined way of reporting news with negative storys and positive storys. With Business News 4 all we aim to focus on positive storys only where the user can learn something new directly or indirectly through storys, events, people and many other examples. With this added value for the user for each post we aim to gain more revisits since our target market audience are entreprenuers who wants to expand their knowledge in entreprenuership and business.

## Features

The navigation bar contains:

* A home page link button which is the BN4|all logo.

* An about page link button which takes the user to the about page where the user can see a bit more precisely on what areas we focus on in our news reporting and submit a form if they want to collaborate.

* A register link button if the user wants to sign up for an account.

* A login link button if the user wants to login to their existing account.

* On the right corner of the navigation bar the user will see a small text quote which says: Business News 4 all - The best buiness newspaper for you! This quote disappears for screens under 576px in the navbar.

If the user is already logged in they will see:

* The home page link button which is the BN4|all logo.

* The about page link button which takes the user to the about page where the user can see a bit more precisely on what areas we focus on in our news reporting and submit a form if they want to collaborate.

* A logout link button which makes the user able to log out from the page.

* On the right corner of the navigation bar the user will see a small text quote which says: Business News 4 all - The best buiness newspaper for you! This quote disappears for screens under 576px in the navbar.

## News article posts outlook(Homepage)

The posts are shaped in a rectangular form similar to an "Ipad" wihout the sharp edges. Each post contains a picture in regards to the subject and a small rectangular yellow form with the title of the author who wrote the artice. The name of the author is a also a link which the user can click on to see more info about the author and other posts the author has uploaded.

Below the news post image the user can see a title about the post and a small description to catch their attention more. All this text is a clickable field and will convert the text to a yellow color when the mouse is hovered over it. When the user clicks on the text they will be forwarded into a new page which contains the full info about the news article post.

At the bottom of the post the user can see a timestamp of when the post was created and how many likes the post has achieved.

When the user scrolls down in the page then more and more news article posts will come up and the project has an infinity scroll so the user doesn't have to press any buttons to see more posts since they come up automatically.

## Deeper dive into the news article post

When the user has clicked on the news article they will be forwarded to a new page which is the full news article post. Inside the news article the user will see a big rectangular form which contains the the title, news article picture, timestamp of when the post was created and a link to the authors profile.

When the user scrolls down they will see the full news article text in regards to the subject. At the bottom of the page the user will be able to see how many likes the post has and comments that has been made by other users. If the user is logged in they will be able to like or comment on the post or reply to other comments that other users has done. The user can also click on the others users profiles that has made comments and see more details about the users.

## Sidebar(Homepage)

To the right side of the news article posts the user will see a sidebar where they can see the most liked posts. On a computer screen the sidebar will always follow the users scroll movements and still be stuck to the right side. In the sidebar the user can see five posts in total and timestamps of the posts. If the users clicks on any of these posts they will be forwarded to the full news article post. On a mobile screen the sidebar will only be visable at the bottom of the page since it would otherwise cover to much of the small screen sizes.

## Footer

The footer is visable on all pages and contains:

* Clickable icons of social medias such as: Facebook, Youtube, Twitter and Instagram.

* A text which says: Copyright 2025 Business News 4 all.

* A yellow background which is the bootstrap class: bg-warning.

## Deployment

* The deployment was made through github and Heroku. The step by step process where the following on github: Settings --> Pages --> Source --> Deploy from a branch --> Main --> /(root) --> Save.

![github_deployment](./assets/images/github_deployment.png)

The depoyment though Heroku was made using the following steps: 

1. I clicked on the New button, then create app, choosed a unique name, picked Europe as a region and then pressed the button create app.

![heroku_create_app](./assets/images/battleships_heroku_create_app.png)


2. I clicked on the settings tab, scrolled down, added buildpacks for python first and node.js as the secondary buildpack and clicked save changes for each buildpack.

![battleships_buildpacks](./assets/images/battleships_buildpacks.png)

3. I clicked on the deploy tab, then pressed to connect with github, after that i searched for my repository and clicked on the connect button in order to link up the Heroku app with the repository code.

![github_deployment_connect](./assets/images/github_deployment_connect.png)

4. As a last step i scrolled down to the bottom of the deploy tab and pressed deploy branch which is a manually deployment process through Heroku.

![battleships_heroku_deploy](./assets/images/battleships_deploy_heroku.png)

# Credits
* The majority of this code was inspired by Code Institute's love running project. Here is a link to Code Institute's website: https://codeinstitute.net/
