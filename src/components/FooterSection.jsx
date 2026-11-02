import { motion } from 'framer-motion'

export default function FooterSection() {
  return (
    <footer className="relative overflow-hidden border-t border-[#edd7c2] bg-[linear-gradient(170deg,#fff9f1,#ffeedb)] px-6 py-16 text-center">
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.9),transparent_68%)]"
        animate={{ opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 4.5, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
      />

      <p className="relative text-xs font-semibold uppercase tracking-[0.2em] text-[#7a4a38]">With Love</p>
      <h4 className="relative mt-3 font-display text-4xl text-[#5f2b27] md:text-5xl">Thank You for Celebrating With Us</h4>
      <p className="relative mt-4 text-[#7b5850]">Aashish & Subbechya · Families and Friends Forever</p>

      <div className="relative mt-8 flex justify-center gap-5 text-sm text-[#8a5f56]">
        <a href="mailto:hello@aashisubbe.com" className="underline-offset-4 hover:underline">
          Contact
        </a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">
          Instagram
        </a>
        <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">
          Venue Map
        </a>
      </div>
    </footer>
  )
}
