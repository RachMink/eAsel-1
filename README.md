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

### Inspiration
Aside for it being difficult to make it big in the art scene, one of the most common issues for artists in the traditional fine art marketplace is the production of counterfeit products. 

This hit Leeran personally, as one of these artists was his grandfather. People would counterfit his art which caused Mr. Farin to lose lots of profit on his artwork. 

To prevent this, our CUNY Tech Prep project was created with artists and buyers in mind. Easel allows an artist to easily track their sales, make direct residual income and gain a following at the same time. It also allows art enthusists to find new artist and buy artwork directly from the creators.  

[![Alternate Text]({image-url})]({video-url} "Link Title")
## Features
- login / signup 
 ![IMG_128B2E10EB19-1](https://user-images.githubusercontent.com/82296790/148703824-b7d1719a-40e1-4b9b-80c4-c523363ccdb1.jpeg)

- easy to use upload art for sale form
- list of artists Page 
- Individual artist profile including artist gallery and social media links
- Browse artwork for sale
- Add to cart / delete from cart
- "Like" artworks



- user profile includes artworks sold/bought/liked
- edit user profile information
- user authorization

## Stack

*API backend*

- express.js
- sequelize.js

*React client*

- Material-UI for a clean Material Design
- React Router

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
