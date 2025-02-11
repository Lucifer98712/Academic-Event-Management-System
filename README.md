# FEATURES OF THIS PROJECT:

i) Login and Signup features. 

ii) Event management crud operation for organizers and admin.

iii) Role based authorization.

iv) JWT access token.

v) Admin dashboard.

vi) Recommendation system using Cosine similarity which recommends events to users based on their past history(i.e. the events that they liked) or based on their interest(i.e. the category that new users enter).

vii) Notification system that notifies all users if new event is created.

viii) Event registration system for users.

ix) Event rating for users that have registered in that particular event. 

x) User and event management for in admin dashboard.

xi) Stats for users, events, and event status in admin dashboard.

# Flow of project:

i) Home page accessible for all i.e. registered or unregistered users.

ii) Only notification page and recommendation generating tab is accessible to registered users.

iii) Admin dashboard only available for users with role 'admin' or 'organizer'.

# To run the project:

i) Install all dependencies seperately for both Backend and Frontend by using **npm install** in the console.

ii) To upload images make sure you make a uploads/events folder in Backend **Path:** *'Backend/uploads/events'*.

iii) Make a **.env** file in the Backend that includes your database information in *mongo_connect* and jwt secret key in *jwt_salt*.

iv) Make a **.env** file in the Frontend that includes your server side connection  information in *REACT_APP_API_URL*.

v) Enter **npm start** in seperate consoles for both Backend and Frontend.
