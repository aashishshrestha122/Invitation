'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

const initialForm = {
  name: '',
  email: '',
  attendance: 'yes',
  meal: 'veg',
  message: '',
}

export default function RsvpSection() {
  const [formData, setFormData] = useState(initialForm)
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!formData.name.trim()) {
      setError('Please enter your name.')
      return
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      setError('Please enter a valid email address.')
      return
    }

    setError('')
    setSubmitted(true)
    setFormData(initialForm)
  }

  return (
    <section id="rsvp" className="border-t border-[#edd7c2] bg-[#fffdf9] px-6 py-20">
      <div className="mx-auto max-w-3xl rounded-3xl border border-[#ecd8c6] bg-white/85 p-8 shadow-[0_16px_32px_rgba(75,38,23,0.1)] md:p-10">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-[#7a4a38]">RSVP</p>
        <h3 className="mt-3 text-center font-display text-4xl text-[#5f2b27] md:text-5xl">Confirm Your Presence</h3>

        <form className="mt-8 grid gap-4" onSubmit={handleSubmit} noValidate>
          <input
            name="name"
            placeholder="Guest name"
            value={formData.name}
            onChange={handleChange}
            className="rounded-xl border border-[#e6d3c3] bg-white px-4 py-3 outline-none ring-[#be8362] focus:ring-2"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="rounded-xl border border-[#e6d3c3] bg-white px-4 py-3 outline-none ring-[#be8362] focus:ring-2"
            required
          />

          <div className="grid gap-4 md:grid-cols-2">
            <select
              name="attendance"
              value={formData.attendance}
              onChange={handleChange}
              className="rounded-xl border border-[#e6d3c3] bg-white px-4 py-3 outline-none ring-[#be8362] focus:ring-2"
            >
              <option value="yes">Attending with joy</option>
              <option value="no">Regretfully unable to attend</option>
            </select>
            <select
              name="meal"
              value={formData.meal}
              onChange={handleChange}
              className="rounded-xl border border-[#e6d3c3] bg-white px-4 py-3 outline-none ring-[#be8362] focus:ring-2"
            >
              <option value="veg">Vegetarian</option>
              <option value="non-veg">Non-vegetarian</option>
              <option value="vegan">Vegan</option>
            </select>
          </div>

          <textarea
            name="message"
            placeholder="Optional message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="rounded-xl border border-[#e6d3c3] bg-white px-4 py-3 outline-none ring-[#be8362] focus:ring-2"
          />

          <button
            type="submit"
            className="rounded-full bg-gradient-to-r from-[#7b1f2f] to-[#ca8b3a] px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white shadow-lg"
          >
            Send RSVP
          </button>

          <AnimatePresence>
            {!!error && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="text-sm text-[#a33235]"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {submitted && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="rounded-xl border border-[#d9c1aa] bg-[#fff5e8] px-4 py-3 text-sm text-[#6c4d42]"
              >
                Thank you. Your RSVP has been received beautifully.
              </motion.p>
            )}
          </AnimatePresence>
        </form>
      </div>
    </section>
  )
}
