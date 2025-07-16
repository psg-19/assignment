const { Form } = require('../models.jsx');

exports.createForm = async (req, res) => {
  const form = new Form({
    title: req.body.title,
    questions: req.body.questions,
    createdBy: req.user.id
  });
  await form.save();
  res.json(form);
};

exports.getForms = (req, res) => Form.find({ createdBy: req.user.id }).then(forms => res.json(forms));
exports.getFormById = (req, res) => Form.findById(req.params.id).then(f=>f?res.json(f):res.status(404).send());
exports.deleteForm = (req, res) => Form.findByIdAndDelete(req.params.id).then(()=>res.json({ msg: 'Deleted' }));
