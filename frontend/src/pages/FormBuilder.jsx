import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

export default function FormBuilder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (id) {
      api.get(`/forms/${id}`).then(res => {
        setTitle(res.data.title);
        setQuestions(res.data.questions);
      });
    }
  }, [id]);

  const addQuestion = () => {
    setQuestions(prev => [...prev, { type: 'text', label: '', options: [] }]);
  };

  const updateQuestion = (idx, field, value) => {
    setQuestions(prev =>
      prev.map((q, i) => (i === idx ? { ...q, [field]: value } : q))
    );
  };

  const saveForm = async () => {
    const payload = { title, questions };
    if (id) await api.post(`/forms/${id}`, payload);
    else await api.post('/forms', payload);
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-teal-600 mb-6 text-center">
          {id ? 'Edit Feedback Form' : 'Create Feedback Form'}
        </h1>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Form Title
          </label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Enter your form title"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {questions.map((q, idx) => (
          <div key={idx} className="mb-6 bg-gray-100 p-4 rounded-lg shadow-inner">
            <div className="flex justify-between items-center mb-3">
              <span className="font-medium text-gray-800">
                Question {idx + 1}
              </span>
              <select
                value={q.type}
                onChange={e => updateQuestion(idx, 'type', e.target.value)}
                className="border border-gray-300 rounded-lg p-2"
              >
                <option value="text">Text</option>
                <option value="multiple-choice">Multiple Choice</option>
              </select>
            </div>

            <input
              type="text"
              value={q.label}
              onChange={e => updateQuestion(idx, 'label', e.target.value)}
              placeholder="Enter question label"
              className="w-full mb-3 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />

            {q.type === 'multiple-choice' && (
              <div className="space-y-2">
                {q.options.map((opt, j) => (
                  <input
                    key={j}
                    type="text"
                    value={opt}
                    onChange={e => {
                      const opts = [...q.options];
                      opts[j] = e.target.value;
                      updateQuestion(idx, 'options', opts);
                    }}
                    placeholder={`Option ${j + 1}`}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                ))}
                <button
                  type="button"
                  onClick={() => updateQuestion(idx, 'options', [...q.options, ''])}
                  className="mt-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  + Add Option
                </button>
              </div>
            )}
          </div>
        ))}

        <div className="flex justify-between">
          <button
            type="button"
            onClick={addQuestion}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg"
          >
            + Add Question
          </button>
          <button
            type="button"
            onClick={saveForm}
            className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-2 rounded-lg transition-colors"
          >
            Save Form
          </button>
        </div>
      </div>
    </div>
  );
}
