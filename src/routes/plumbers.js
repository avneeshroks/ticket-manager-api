const router = require('express-promise-router')();
const PlumbersComtroller = require('../controller/plumbers');

router
.route('/')
.get(PlumbersComtroller.index);

router
.route('/create')
.post(PlumbersComtroller.create)

router
.route('/')
.put(PlumbersComtroller.update)

router
.route('/:id')
.delete(PlumbersComtroller.delete)

module.exports = router;