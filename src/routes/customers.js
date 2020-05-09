const router = require('express-promise-router')();
const CustomersController = require('../controller/customers');

router
.route('/')
.get(CustomersController.index);

router
.route('/create')
.post(CustomersController.create)

router
.route('/')
.put(CustomersController.update)

router
.route('/:id')
.delete(CustomersController.delete)

module.exports = router;