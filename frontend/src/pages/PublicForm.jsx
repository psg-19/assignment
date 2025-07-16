import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

export default function PublicForm() {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    console.log(id,"------------")
    api.get(`/forms/${id}`).then(res => setForm(res.data));
  }, [id]);

  const handleChange = (qid, val) => {
    setAnswers(prev => ({ ...prev, [qid]: val }));
  };

  const submit = async () => {
    const payload = {
      answers: Object.entries(answers).map(([questionId, answer]) => ({ questionId, answer })),
    };
    await api.post(`/forms/${id}/responses`, payload);
    setSubmitted(true);
  };

  if (!form)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        Loading form...
      </div>
    );

  if (submitted)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Thank you!</h2>
          <p className="text-gray-700">Your feedback has been submitted.</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-indigo-600 mb-6 text-center">{form.title}</h1>

        {form.questions.map(q => (
          <div key={q._id} className="mb-6">
            <label className="block mb-2 font-medium text-gray-800">{q.label}</label>
            {q.type === 'text' ? (
              <textarea
                onChange={e => handleChange(q._id, e.target.value)}
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            ) : (
              <div className="space-y-2">
                {q.options.map(opt => (
                  <label key={opt} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={q._id}
                      value={opt}
                      onChange={() => handleChange(q._id, opt)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-gray-700">{opt}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}

        <button
          onClick={submit}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          Submit Feedback
        </button>
      </div>
    </div>
  );
}
