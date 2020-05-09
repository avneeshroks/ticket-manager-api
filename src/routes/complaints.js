const router = require('express-promise-router')();
const ComplaintsController = require('../controller/complaints');

router
.route('/')
.get(ComplaintsController.index);

router
.route('/create')
.post(ComplaintsController.create)

router
.route('/')
.put(ComplaintsController.update)

router
.route('/:id')
.delete(ComplaintsController.delete)

module.exports = router;