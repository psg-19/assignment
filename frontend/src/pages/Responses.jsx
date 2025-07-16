import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

export default function Responses() {
  const { id } = useParams();
  const [summary, setSummary] = useState([]);
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    api.get(`/forms/${id}/summary`).then(res => setSummary(res.data));
    api.get(`/forms/${id}/responses`).then(res => setResponses(res.data));
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-purple-600 mb-6 text-center">Form Results</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Summary</h2>
          <div className="space-y-8">
            {summary.map((q, i) => (
              <div key={i} className="bg-gray-100 rounded-lg p-4">
                <h3 className="text-xl font-medium mb-3 text-gray-800">{q.question}</h3>
                {q.type === 'multiple-choice' && (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={Object.entries(q.counts).map(([name, value]) => ({ name, value }))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#7c3aed" />
                    </BarChart>
                  </ResponsiveContainer>
                )}
                {q.type === 'text' && (
                  <ul className="list-disc list-inside mt-2">
                    {q.answers.map((ans, idx) => (
                      <li key={idx} className="text-gray-700">{ans}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Raw Responses</h2>
          <div className="space-y-4">
            {responses.map(r => (
              <div key={r._id} className="bg-gray-100 rounded-lg p-4">
                <div className="text-sm text-gray-500 mb-2">
                  Submitted at: {new Date(r.submittedAt).toLocaleString()}
                </div>
                <ul className="list-decimal list-inside">
                  {r.answers.map((a, idx) => (
                    <li key={idx} className="text-gray-800">{a.answer}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
