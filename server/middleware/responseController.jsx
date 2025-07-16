const { Response, Form } = require('../models.jsx');

exports.submit = async (req, res) => {
  const form = await Form.findById(req.params.id);
  if (!form) return res.status(404).json({});
  const resp = new Response({ formId: form.id, answers: req.body.answers });
  await resp.save();
  res.json({ msg: 'Submitted' });
};

exports.list = (req, res) => Response.find({ formId: req.params.id }).then(r=>res.json(r));

exports.summary = async (req, res) => {
  const form = await Form.findById(req.params.id);
  const responses = await Response.find({ formId: req.params.id });
  const summary = form.questions.map(q => {
    if (q.type==='multiple-choice') {
      const counts = q.options.reduce((a,o)=>({ ...a, [o]:0 }),{});
      responses.forEach(r=>{
        const a = r.answers.find(x=>x.questionId.equals(q._id));
        if(a) counts[a.answer]++;
      });
      return { question:q.label, counts };
    } else {
      return { question:q.label, answers: responses.map(r=>r.answers.find(x=>x.questionId.equals(q._id))?.answer).filter(Boolean) };
    }
  });
  res.json(summary);
};
