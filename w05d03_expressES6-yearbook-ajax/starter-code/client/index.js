const express = require('express');
const app     = express();
const port    = process.env.PORT || 3000;

app.use(express.static(`${__dirname}/bower_components`));
app.use(express.static(`${__dirname}/public`));

app.get('/*', (req, res) => res.sendFile(`${__dirname}/index.html`));

app.listen(port, () => console.log(`Express has started on port: ${port}`));
