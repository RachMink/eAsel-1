![easel logo](client/src/img/logo.png)
<br>
## A digital fine art marketplace designed to help artists expand their following and sell their art safely and easily
[Check out our Pitch Video](https://drive.google.com/file/d/1l93j8azAIsNLu3HwGAwmUuUfp3DMiSnm/view?usp=sharing)<br>
[Check out our deployed app](https://easelapp.herokuapp.com)
<br>
<br>
*Team Members:*<br>
 [@leeran7](https://github.com/leeran7)<br>
 [@RachMink](https://github.com/RachMink)<br>
 [@JuZNyC](https://github.com/JuZNyC)

## Inspiration
The motivation behind our project is to create a platform that gives artists the ability to broaden their buyer market and make residual income from selling their art at the same time.

Aside for it being difficult to make it big in the art scene, one of the most common issues for artists in the traditional fine art marketplace is the production of counterfeit products. 

This hit Leeran personally, as one of these artists is his grandfather. People would counterfit his art which caused Mr. Farin to lose lots of profit from his work. 

To prevent this, our CUNY Tech Prep project was created with artists and buyers in mind. Easel allows an artist to easily track their sales, make direct residual income and gain a following at the same time. It also allows art enthusists to find new artist and buy authentic artwork directly from the creators.  

## Demo

![IMG_9A2A2DD492D4-1](https://user-images.githubusercontent.com/82296790/148714177-ddde1b75-228c-47e0-856a-df47d22c9892.jpeg)
![IMG_128B2E10EB19-1](https://user-images.githubusercontent.com/82296790/148705342-0e946987-74c8-44e4-8cef-ab1819889dfa.jpeg)
![IMG_13798F998124-1](https://user-images.githubusercontent.com/82296790/148705501-b63f308d-60ca-4812-85da-90c475645417.jpeg)
![IMG_973D2F4F9075-1](https://user-images.githubusercontent.com/82296790/148713896-f6f2059a-d38c-4948-aa14-16023e0b7d61.jpeg)
![IMG_C99D7C127DCD-1](https://user-images.githubusercontent.com/82296790/148713831-51e6cb83-996d-404e-822c-666897231616.jpeg)
![IMG_6EF71639F22A-1](https://user-images.githubusercontent.com/82296790/148714308-effbe568-5e1b-4f7f-b370-56937ad68273.jpeg)
![IMG_A3555E8CA43E-1](https://user-images.githubusercontent.com/82296790/148713976-a76a6d5a-e216-47a4-a805-6486400b5189.jpeg)
![IMG_3BB0E1B4BA90-1](https://user-images.githubusercontent.com/82296790/148714088-a507b020-33be-42a9-ab06-763e8d74caa9.jpeg)


## Features
- login / signup 
- easy to use upload art for sale form
- list of artists Page 
- Individual artist profile including artist gallery and social media links
- Browse artwork for sale
- Add to cart / delete from cart
- "Like" artworks
- user profile includes artworks sold/bought/liked
- edit user profile information
- user authentication

## Stack

*API backend*

- express.js
- sequelize.js

*React client*

- React Router
- Material-UI for a clean Material Design

*Deployed on Heroku*

## Project Structure

<pre>
.
├── README.md
├── <strong>api</strong>
│   ├── app.js
│   ├── <strong>config</strong>
│   │   └── config.json
│   ├── <strong>controllers</strong>
│   │   ├── appConfig.js
│   │   ├── index.js
│   │   ├── artwork.js
│   │   ├── auth.js
│   │   ├── cart.js
│   │   ├── checkout.js
│   │   ├── liked.js
│   │   ├── sampleartworks.js
│   │   ├── socials.js
│   │   ├── user.js
│   │   └── posts.js
│   ├── <strong>models</strong>
│   |   ├── artwork.js
│   │   ├── cart.js
│   │   ├── cartitem.js
│   │   ├── index.js
│   │   ├── liked.js
│   │   ├── post.js
│   │   ├── sampleArtworks.js
│   │   ├── transaction.js
│   |   └── user.js
│   └── <strong>middlewares</strong>
│       └── auth.js
├── <strong>client</strong>
│   ├── README.md
│   ├── package-lock.json
│   ├── package.json
│   ├── <strong>public</strong>
│   │   ├── easel5.png
│   │   ├── index.html
│   │   ├── logo.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   └── <strong>src</strong>
│       ├── <strong>components</strong>
│       │   ├── AboutTheArtist.js
│       │   ├── ArtistName.js
│       │   ├── AuthButton.js
│       │   ├── AuthForm.js
│       │   ├── CartForm.js
│       │   ├── CloudinaryUploadWidget.js
│       │   ├── CustomDialog.js
│       │   ├── CustomSnackBar.js
│       │   ├── Loading.js
│       │   ├── LoginForm.js
│       │   ├── NavBar.js
│       │   ├── PhotoGallery.js
│       │   ├── SellForm.js
│       │   ├── SignUpForm.js
│       │   └── Post.js
│       ├── <strong>context</strong>
│       │   └── AuthContext.js
│       ├── <strong>img</strong>
│       │   └── logo.png
│       ├── App.css
│       ├── App.js
│       ├── App.test.js
│       ├── index.css
│       ├── index.js
│       ├── <strong>pages</strong>
│       │   ├── AboutUsPage.js
│       │   ├── ArtistList.js
│       │   ├── ArtistPage.js
│       │   ├── BuyHomePage.js
│       │   ├── Cart.js
│       │   ├── PostFormPage.js
│       │   ├── PostsListPage.js
│       │   ├── ProfilePage.js
│       │   ├── Register.js
│       │   ├── SellArtPage.js
│       │   └── ShowPostPage.js
│       └── serviceWorker.js
├── package-lock.json
└── package.json
</pre>
