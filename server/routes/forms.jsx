const router = require('express').Router();
const auth = require('../middleware/auth.jsx');
const { createForm, getForms, getFormById, deleteForm } = require('../middleware/formController.jsx');
router.post('/', auth, createForm);
router.get('/', auth,getForms);
router.get('/:id', getFormById);  
router.delete('/:id', auth, deleteForm);
module.exports = router;