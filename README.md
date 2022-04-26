# Blog Application
Blog App is a full-stack application where you can explore other people's posts, post your own blogs and news, and like posts that are interesting to you. <br />

<b>Application Demo:</b> https://blog-mern-es.herokuapp.com/

# API Documentation
https://documenter.getpostman.com/view/18219208/UVsJvRpU

# How To Run
- Git clone repository
- Create your own .env file that should contain:
  - PORT = <YOUR_PORT>
  - MONGO_URI = <YOUR_MONGO_URI>
  - JWT_SECRET = <YOUR_JWT_SECRET>
- Run these commands in terminal/shell:
  -  <b>npm install</b> in backend folder
  -  <b>npm install</b> in frontend folder
  -  <b>npm run dev</b> at the root of the project

# Project Architecture

### Root
```   
└───backend
└───frontend
└───node_modules
│   .gitignore 
│   package-lock.json 
│   package.json 
│   README.md
```

### Backend Directory
```   
└───config
    │   db.js
└───controllers
    │   postController.js
    │   userController.js
└───middleware
    │   authMiddleware.js
    │   errorMiddleware.js
└───models
    │   postModel.js
    │   userModel.js
└───routes
    │   postRoutes.js
    │   userRoutes.js
└───validators
    │   userValidator.js
│   server.js 
```

### Frontend Directory
```   
└───public
└───src
│   .gitignore 
│   package-lock.json 
│   package.json
│   postcss.config.js
│   tailwind.config.js
└───node_modules
```

# Built With
- MERN stack (MongoDB, Express.js, React.js, Node.js)
- Redux Toolkit
- TailwindCSS

