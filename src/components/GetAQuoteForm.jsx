
import React, { useState } from "react";

export default function GetAQuoteForm({ onClose }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    guards: 1,
    hours: 8,
    armed: false,
    message: ""
  });
  const [quote, setQuote] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Demo quote calculation
    const baseRate = form.armed ? 35 : 25; // $/hour per guard
    const total = baseRate * Number(form.guards) * Number(form.hours);
    setQuote(total);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="p-6 bg-slate-900 rounded-xl shadow-2xl max-w-md mx-auto border border-slate-700">
        <h2 className="text-xl font-bold mb-2 text-blue-400">Thank you!</h2>
        {quote !== null && (
          <div className="mb-4">
            <p className="text-slate-200">Estimated Quote:</p>
            <p className="text-2xl font-bold text-blue-400">${quote.toLocaleString()} USD</p>
            <p className="text-xs text-slate-400 mt-1">(This is a demo estimate for {form.guards} guard(s), {form.hours} hour(s), {form.armed ? 'armed' : 'unarmed'})</p>
          </div>
        )}
        <p className="text-slate-400">Your quote request has been submitted.</p>
        <button className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded" onClick={onClose}>Close</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-slate-900 rounded-xl shadow-2xl max-w-md mx-auto border border-slate-700">
      <h2 className="text-xl font-bold mb-4 text-blue-400">Get a Quote</h2>
      <div className="mb-3">
        <label className="block mb-1 font-medium text-slate-200">Name</label>
        <input type="text" name="name" value={form.name} onChange={handleChange} required className="w-full border border-slate-700 bg-slate-800 text-slate-100 px-3 py-2 rounded focus:outline-none focus:border-blue-500" />
      </div>
      <div className="mb-3">
        <label className="block mb-1 font-medium text-slate-200">Email</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full border border-slate-700 bg-slate-800 text-slate-100 px-3 py-2 rounded focus:outline-none focus:border-blue-500" />
      </div>
      <div className="mb-3">
        <label className="block mb-1 font-medium text-slate-200">Phone</label>
        <input type="tel" name="phone" value={form.phone} onChange={handleChange} className="w-full border border-slate-700 bg-slate-800 text-slate-100 px-3 py-2 rounded focus:outline-none focus:border-blue-500" />
      </div>
      <div className="mb-3 grid grid-cols-2 gap-3">
        <div>
          <label className="block mb-1 font-medium text-slate-200">Number of Guards</label>
          <input type="number" name="guards" min="1" max="20" value={form.guards} onChange={handleChange} required className="w-full border border-slate-700 bg-slate-800 text-slate-100 px-3 py-2 rounded focus:outline-none focus:border-blue-500" />
        </div>
        <div>
          <label className="block mb-1 font-medium text-slate-200">Hours Needed</label>
          <input type="number" name="hours" min="1" max="24" value={form.hours} onChange={handleChange} required className="w-full border border-slate-700 bg-slate-800 text-slate-100 px-3 py-2 rounded focus:outline-none focus:border-blue-500" />
        </div>
      </div>
      <div className="mb-3 flex items-center gap-2">
        <input type="checkbox" name="armed" checked={form.armed} onChange={handleChange} id="armed" className="accent-blue-600" />
        <label htmlFor="armed" className="text-slate-200">Armed Guards</label>
      </div>
      <div className="mb-3">
        <label className="block mb-1 font-medium text-slate-200">Message</label>
        <textarea name="message" value={form.message} onChange={handleChange} required className="w-full border border-slate-700 bg-slate-800 text-slate-100 px-3 py-2 rounded focus:outline-none focus:border-blue-500" />
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <button type="button" className="px-4 py-2 bg-slate-700 text-slate-200 rounded hover:bg-slate-600" onClick={onClose}>Cancel</button>
        <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">Get Quote</button>
      </div>
      <div className="mt-4 text-xs text-slate-400">
        <span className="font-semibold text-blue-400">Demo:</span> Estimate is based on ${form.armed ? 35 : 25}/hr per guard.
      </div>
    </form>
  );
}
