[![CI](https://github.com/niyojuste/my-brand-server/actions/workflows/node.js.yml/badge.svg)](https://github.com/niyojuste/my-brand-server/actions/workflows/node.js.yml)
[![Test Coverage](https://api.codeclimate.com/v1/badges/fc30fb85c2b6000d9ef9/test_coverage)](https://codeclimate.com/github/niyojuste/my-brand-server/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/fc30fb85c2b6000d9ef9/maintainability)](https://codeclimate.com/github/niyojuste/my-brand-server/maintainability)

# My Brand Server

This application serves API endpoints to [my-brand](https://juste-my-brand.herokuapp.com) project, my personal portfolio and blog website. You can find find and try out the documentation [here](https://juste-my-brand.herokuapp.com/docs).

## Specifications

### Tools used

#### Build

The application is built in ES6 Node.js and compiled with Babel. Other dependencies used include:

- ExpressJs
- MongooseJs
- Joi
- Bcrypt
- JsonWebToken
- Cloudinary
- Swagger

#### Testing

Tools used for testing include:

- Mocha
- Chai
- c8 (for coverage)

#### Development mode

- I used **dotenv** to require secret keys.
- I used nodemon for automatically restarting the server.


### Usage

#### Install dependencies first

```bash
npm install
```
#### Run the following scripts:

- Build and compile to ES5
```bash
npm run build
```

- Start the server
```bash
npm start
```

- Run the test suite
```bash
npm test
````

- Run the test suite with code coverage reports
```bash
npm run coverage
```

#### ES6 mode (For development):

**Note:** You will need to set "type":"module" in package.json first

```package.json
{
    ...
    "type":"module"
}
```

- Start the server and automatically restart after changes
    - Create .env file and insert environmnet variables
    - Run in the terminal
    ```bash
    npm run dev
    ```

- Run the test suite
    - Create test.env file and insert test environmnet variables
    - Run in the terminal
    ```bash
    npm run dev-test
    ```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

Licensed under MIT