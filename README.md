Angles Handle is One Page Project made by Aleksander Bejma, AbreSolutions company CEO&owner.
On this WebSite You find GitHub Angular repositories Contributors.

Live WebSite is working on: http://github.abresolutions.com/

GitHub Clone URL: https://github.com/aleksanderbejma/AnglesHandle.git

IMPORTANT:
The App need the GitHub Access Token which allow You to send more than 60 requests per our and authorize them.
Without it the App wouldn't be work. I get the Access Token from the database lokalize on my own server. You can import the database (DataBaseCopy.sql.gz file) and config Your connection in the file App/helpers/gitAccessToken.php or define Your own fixed Access Token (yourAccessToken variable) in the init function of App file: App/GitHubApp.js

curiosity:
If You generate Your API Access Token and define it in string variable in the code, it will be automaticly remove after send Your code on GitHub.
GitHub check all files and match it with generated Access Tokens, and when it find any, it will remove it in the GitHub Accounts settings for safety resons.

Posible Actions:
- View All Angular Unique Contributors.
- Order Angular Contributors by:
- Number of Angular Contributions
- Number of public Repositories
- Number of public Gists
- Number of Followers
3. Search user by his login
4. Change contributors displayed per page from 10 to 100.
5. View each Angular Contributor details with his repositories.
6. View each repositories details with its contributors.
7. View all Angular repositories.
8. View Angular Organization inforimation.
9. View Contact and About SubPage.

Things that still need (by ran out of time):
1. Back button back only to the previous View - it should be an array with all steps made by user.
2. GitHub API allows to ask only 100 requests per page. Others pages are in the headers. We should get all Links from headers and for each of them get the http requests.

Things easy to do, but nice to have:
1. Go to the View with user followers and Gists.
2. Map of the User location (if it is defined of course) and form to contact (if user e-mail address is defined).
3. Contact form and map in the Contact SubPage.

Things to improve:
1. Layout - For mobile devices. It is implemented but should be polished.
2. Animations. I focused on the easy to use and functional project but a little bit animations could be fine.

Summary:
1. Project is based on JavaScript with Angular library. Template is based on Bootstrap and my own clear HTML and CSS.
2. The idea for the layout is mine (OK, my Girlfriend too).
3. In project I used 2 external modules: for pagination and for loader while requests are loading. I changed in them styles and in loader module I added one variable witch I use.
