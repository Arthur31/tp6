const app = require('./app/app');
const { logger } = require('./app/common/logger');

const port = process.env.PORT || 3000;
app.listen(port, () => logger.info(`Example app listening on port ${port}!`));
