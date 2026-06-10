import React, { useState } from 'react'
import Header from '../Components/Header'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'

const Queries = () => {
  const [Name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [statas, setStatus] = useState("");
  const Navigate = useNavigate();

  async function handlesubmit(e) {
    e.preventDefault();
    if (!Name.trim() || !email.trim() || !subject.trim() || !priority.trim() || !category.trim() || !description.trim()) {
      toast.error('Please fill in all required details!');
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_TICKET_API_URL}/get_Tickets`, {
        Name, email, subject, priority, category, statas, description
      });

      toast.success('Created successfully!');
      Navigate('/Home');
    } catch (e) {
      toast.error('Submission failed.');
      console.error(e);
      if (e.response?.status === 429) {
        toast.error('Slow down! Too many requests.');
      }
    }
  }

  return (
    <div data-theme="forest" className="min-h-screen  flex flex-col">
      <Header />
      <br></br>
      <br></br>
      <br></br>
      <div className="flex flex-1 justify-center items-center px-10 py-10">
        <form
          onSubmit={handlesubmit}
          className="w-full max-w-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-3xl p-8 space-y-6 bg-gradient-to-br from-slate-900 via-blue-900 to-amber-800 text-white transition-all duration-500"
        >
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-amber-400 to-blue-300 bg-clip-text text-transparent">
            Submit Your Query
          </h2>

          <div className="grid md:grid-cols-2 gap-5">
            {/* Passenger Name */}
            <div>
              <label className="label font-medium text-white/90">Passenger Name *</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={Name}
                onChange={(e) => setName(e.target.value)}
                required
                className="input input-bordered w-full rounded-xl bg-white/20 text-white placeholder:text-white/70 focus:ring-2 focus:ring-amber-400 focus:outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="label font-medium text-white/90">Email *</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input input-bordered w-full rounded-xl bg-white/20 text-white placeholder:text-white/70 focus:ring-2 focus:ring-amber-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Subject */}
          <div>
            <label className="label font-medium text-white/90">Subject *</label>
            <input
              type="text"
              placeholder="Enter the subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              className="input input-bordered w-full rounded-xl bg-white/20 text-white placeholder:text-white/70 focus:ring-2 focus:ring-amber-400 focus:outline-none"
            />
          </div>

          {/* Priority & Category */}
          <div className="grid md:grid-cols-2 gap-5">
            {/* Priority */}
            <div>
              <label className="label font-medium text-white/90">Priority *</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                required
                className="select select-bordered w-full rounded-xl bg-white/20 text-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
              >
                <option  value="">Select option</option>
                <option className="bg-slate-800 text-white hover:bg-slate-700">High</option>
                <option className="bg-slate-800 text-white hover:bg-slate-700">Medium</option>
                <option className="bg-slate-800 text-white hover:bg-slate-700">Low</option>
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="label font-medium text-white/90">Category *</label>
              <select
                name="category"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="select select-bordered w-full rounded-xl bg-white/20 text-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
              >
                <option value="" disabled>Select issue category</option>

                <optgroup className="bg-slate-800 text-white" label="Service Related">
                  <option className="bg-slate-800 text-white hover:bg-slate-700" value="Delayed Bus">Delayed Bus</option>
                  <option className="bg-slate-800 text-white hover:bg-slate-700" value="Overcrowding">Overcrowding</option>
                  <option className="bg-slate-800 text-white hover:bg-slate-700" value="Bus Condition">Bus Condition</option>
                  <option className="bg-slate-800 text-white hover:bg-slate-700" value="Cleanliness">Cleanliness</option>
                </optgroup>

                <optgroup className="bg-slate-800 text-white" label="Staff Related">
                  <option className="bg-slate-800 text-white hover:bg-slate-700" value="Rude Staff">Rude Staff</option>
                  <option className="bg-slate-800 text-white hover:bg-slate-700" value="Driver Behavior">Driver Behavior</option>
                </optgroup>

                <optgroup className="bg-slate-800 text-white" label="Passenger Related">
                  <option className="bg-slate-800 text-white" value="Lost Belongings">Lost Belongings</option>
                  <option className="bg-slate-800 text-white" value="Overcharging">Overcharging</option>
                  <option className="bg-slate-800 text-white" value="Safety Concern">Safety Concern</option>
                </optgroup>

                <optgroup className="bg-slate-800 text-white" label="Technical / Other">
                  <option className="bg-slate-800 text-white" value="Ticketing Issue">Ticketing Issue</option>
                  <option className="bg-slate-800 text-white" value="App or Website Issue">App or Website Issue</option>
                  <option className="bg-slate-800 text-white" value="Accessibility Issue">Accessibility Issue</option>
                  <option className="bg-slate-800 text-white" value="Other">Other</option>
                </optgroup>
              </select>
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="label font-medium text-white/90">Status *</label>
            <select
              value={statas}
              onChange={(e) => setStatus(e.target.value)}
              required
              className="select select-bordered w-full rounded-xl bg-white/20 text-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
            >
              <option className="bg-slate-800 text-white" value="" disabled>Select status</option>
              <option className="bg-slate-800 text-white" value="Opened">Opened</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="label font-medium text-white/90">Description *</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your issue... Mention Route and time"
              rows="4"
              required
              className="textarea textarea-bordered w-full rounded-xl bg-white/20 text-white placeholder:text-white/70 focus:ring-2 focus:ring-amber-400 focus:outline-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button
              type="submit"
              className="btn bg-gradient-to-r from-amber-500 to-orange-600 text-white w-full sm:w-auto px-8 border-none hover:scale-105 transition-transform duration-300"
            >
              Submit Query
            </button>
            <button
              type="button"
              className="btn border border-white/40 text-white w-full sm:w-auto hover:bg-white/20 transition-all duration-300"
              onClick={() => {
                setName("");
                setEmail("");
                setSubject("");
                setPriority("");
                setCategory("");
                setDescription("");
              }}
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Queries
