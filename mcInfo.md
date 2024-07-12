# INFO

## Requirements

```bash
npm init -y
npm i express
npm i -D nodemon
npm i dotenv
npm i express-async-handler
npm i mongoose
npm i bcrypt


```bash
package.json:
main: server.js
start: node server.js
dev: nodemon server.js

```PAY-ATTENTION:
1. The router.route method requires a function to handle HTTP methods like GET or POST.
2. Since we use Mongoose for MongoDB, we need to handle asynchronous operations using promises, typically with async/await, before processing req and res.
3. Wrap async functions with asyncHandler(async (req, res) => {...})
4. Don't forget to use await for async functions.
5. Note that bcrypt and bcryptjs are different from each other.
