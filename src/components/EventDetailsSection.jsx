import { motion } from 'framer-motion'

export default function EventDetailsSection() {
  return (
    <section className="border-t border-[#edd7c2] bg-[linear-gradient(150deg,#fff9f2,#fff3e8)] px-6 py-20">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="rounded-2xl border border-[#ecd8c6] bg-white/85 p-7 shadow-[0_14px_30px_rgba(85,47,28,0.08)]"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7a4a38]">Event Details</p>
          <h3 className="mt-2 font-display text-4xl text-[#5f2b27]">The Big Day</h3>
          <ul className="mt-5 space-y-3 text-[#70564f]">
            <li>Wedding Ceremony: 5:30 PM</li>
            <li>Reception: 8:00 PM onwards</li>
            <li>Venue: Ashok Party Palace, Kathmandu</li>
            <li>Dress Code: Elegant Traditional / Modern Formal</li>
          </ul>
          <a
            className="mt-6 inline-flex rounded-full bg-gradient-to-r from-[#7b1f2f] to-[#ca8b3a] px-5 py-3 text-sm font-semibold text-white shadow-lg"
            href="#rsvp"
          >
            RSVP Now
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="overflow-hidden rounded-2xl border border-[#ecd8c6] shadow-[0_14px_30px_rgba(85,47,28,0.08)]"
        >
          <iframe
            title="Wedding venue map"
            src="https://maps.google.com/maps?q=Gokarna%20Forest%20Resort%20Kathmandu&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className="h-full min-h-[360px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>
    </section>
  )

}
