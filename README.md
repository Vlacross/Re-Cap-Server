<h1> <a href="https://learn-to-dance.herokuapp.com/">Dance-School - API docs</a> </h1>

<a id="backToTop"></a>

<p>Applied Technologies: Javascript, Express, Mongoose</p>

<p>Simple platform allows users to enroll in dance school and register for dance courses.</p>
<ul>

<li><a href="#apiRoutes">API Routes</a></li>
</ul>
<section>


</section>


<section id="apiRoutes">

<h1>API Routes</h1>
<a href="#backToTop">Back to the Top</a>

<p>The api for the app has 3 main routes from the server root</p>
<h2>Root(/)</h2>

<h3>accounts</h3>
  <p>/remove(allows users delete their accounts)</p>

<h3>courses</h3>
  <p>details:id(allows the app-client query details for a specific course)</p>
  <p>remove:id(allows a user to drop out of a specific course)</p>
  <p>signup:id(allows a user tosign up for a specific course)</p>

<h3>login</h3>
  <p>newUser(allows users to create an account)</p>
  <p>refresh(refreshes the users jwt which hyrdates the clients user-state data)</p>



<h3>API Routes Tree</h3>

<img src="https://github.com/Vlacross/Re-Cap-Client/blob/master/siteImages/dance-school-api.png?raw=true" alt="api-routes-in-terminal-tree-diagram">

<a href="#backToTop">Back to the Top</a>
</section>



















