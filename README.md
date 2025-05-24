<h1>🧶 Crochet Ecommerce Backend</h1>

<p>This is the backend of a crochet-themed ecommerce platform built using <strong>Node.js</strong>, <strong>Express</strong>, <strong>MongoDB</strong>, and <strong>JWT authentication</strong>.</p>

<h2>🚀 Features</h2>
<ul>
  <li>User Registration & Login</li>
  <li>JWT Authentication</li>
  <li>Role-based Authorization (admin, customer)</li>
  <li>Password hashing using bcrypt</li>
  <li>Forgot Password & Reset Password via Email (Nodemailer)</li>
  <li>Email formatting with store branding</li>
  <li>Product CRUD API endpoints</li>
</ul>

<h2>📁 Project Structure</h2>
<pre><code>
📦 backend
 ┣ 📂controllers
 ┣ 📂config
 ┣ 📂helpers
 ┣ 📂models
 ┣ 📂routes
 ┣ 📂schemas
 ┣ 📂node_modules
 ┣ 📄.env
 ┣ 📄.gitignore
 ┣ 📄app.js
 ┣ 📄package.json
</code></pre>

<h2>⚙️ Installation</h2>
<pre><code class="language-bash">
# Clone the repo
git clone https://github.com/Jeann1809/crochet-ecommerce-backend.git

# Install dependencies
cd crochet-ecommerce-backend
npm install

# Set environment variables in .env
PORT=1234
DB_USER=your_MongoDB_user
DB_PASSWORD=your_MongoDB_password
DB_LINK=your_mongo_connection_link
JWT_SECRET_KEY=your_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password

# Start the server
node app.js
</code></pre>

<h2>📫 API Endpoints</h2>

<h3>🔐 Auth</h3>
<pre><code class="language-json">
POST /users/register        - Register new user
POST /users/login           - Login and receive JWT
PUT  /users/update/:id      - Update profile
PUT  /users/updatepass/:id  - Update password (manual)
PUT /users/forgotpass      - Send reset email
PUT  /users/resetpass/:token - Reset password via token
GET  /users/profile/:id     - Get user profile
DELETE /users/delete/:id    - Delete user
</code></pre>

<h3>🧵 Products</h3>
<pre><code class="language-json">
GET    /products          - Get all products
GET    /products/:id        - Get a product by ID
POST   /products/           - Create a new product (admin only)
PUT    /products/:id        - Update a product (admin only)
DELETE /products/:id        - Delete a product (admin only)
</code></pre>

<h3>🧾 Orders</h3>
<pre><code class="language-json">
GET    /orders            - Get all orders (admin only)
GET    /orders/:id        - Get an order by ID (admin only)
GET    /orders/user/:id   - Get an order by User
POST   /orders/           - Create a new order
PUT    /orders/:id        - Update an order 
DELETE /orders/:id        - Delete an order (admin only)
</code></pre>

<h2>🔐 Notes on Security</h2>
<ul>
  <li>Passwords are hashed using bcrypt</li>
  <li>Tokens expire and are validated during reset</li>
  <li>Email service uses app-specific password (use Gmail App Passwords)</li>
</ul>

<h2>🛠 Technologies Used</h2>
<ul>
  <li>Node.js</li>
  <li>Express.js</li>
  <li>MongoDB & Mongoose</li>
  <li>JWT</li>
  <li>Bcrypt</li>
  <li>Nodemailer</li>
</ul>

<h2>💻 Frontend</h2>
<p>Frontend is expected to be built with Angular and should handle routing for login, registration, and reset password pages.</p>

<h2>📜 License</h2>
<p>
    This project is licensed under the
    <a href="https://www.gnu.org/licenses/gpl-3.0.html" target="_blank">
      GNU General Public License v3.0 (GPLv3)
    </a>.
  </p>
  <p>
    You are free to use, modify, and distribute this code under the same license.
    Any distributed version must remain open-source and under the same GPLv3 terms.
  </p>

<h2>🙋 Author</h2>
<p><a href="https://github.com/Jeann1809">Jean Almario</a></p>


