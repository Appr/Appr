const chalk = require('chalk');
const express = require('express');
const addMiddlewareTo = require('./middleware/decorate.middleware');
const delegateRoutesFor = require('./routers/delegate.routers');

const app = express();

addMiddlewareTo(app);
delegateRoutesFor(app);

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(chalk.green(`Server is listening on port ${chalk.cyan(port)}.`));
});


// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
  }
  