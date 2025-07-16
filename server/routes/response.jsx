const router = require('express').Router({ mergeParams:true });
const auth = require('../middleware/auth.jsx');
const { submit, list, summary } = require('../middleware/responseController.jsx');
router.post('/:id/responses', submit);
router.get('/:id/responses', auth, list);
router.get('/:id/summary', auth, summary);
module.exports = router;