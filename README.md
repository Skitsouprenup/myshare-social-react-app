# myshare-social-react-app
My simple social media app created using React.  
View demo video in this [link](https://youtu.be/NI8sUjzLVhE).

Technologies used:  
[Tailwind](https://tailwindcss.com/)  
[React](https://reactjs.org/)  
[Sanity.io](https://www.sanity.io/)  
[Google OAuth2](https://github.com/MomenSherif/react-oauth)

Before testing this app, you need to create a .env file and then put these properties:  
APP_GOOGLE_API_TOKEN  
APP_SANITY_PROJECT_ID  
APP_SANITY_USER_TOKEN  
APP_SANITY_USER_EDITOR_TOKEN

You can get __APP_GOOGLE_API_TOKEN__ from your google API in the __credentials__ section. Setup your google API [here](https://console.cloud.google.com/apis/dashboard).

You can view __APP_SANITY_PROJECT_ID__ from your sanity client (via "sanity manage" command).  
You can get __APP_SANITY_USER_TOKEN__ and __APP_SANITY_USER_EDITOR_TOKEN__ from __API__ section in your sanity client (via "sanity manage" command). Also put your domain in the __CORS origins__ section from __API__ section to allow your domain to access your sanity database.

In __src/schemas__ folder, put the schemas in the __schemas__ folder in your locally compiled sanity client. e.g. sanity-project/schemas
