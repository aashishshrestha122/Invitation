import { motion } from 'framer-motion'

const timeline = [
  {
    title: 'First Hello',
    text: 'A random meeting turned into endless conversations and warm chai evenings.',
    year: '2018',
  },
  {
    title: 'Promise of Forever',
    text: 'Years of friendship and laughter brought us to this beautiful chapter.',
    year: '2023',
  },
  {
    title: 'Wedding Bells',
    text: 'With blessings and love, we begin our new journey together.',
    year: '2027',
  },
]

const photos = [
  'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1542042161784-26ab9e041e89?auto=format&fit=crop&w=900&q=80',
]

export default function StorySection() {
  return (
    <section className="border-t border-[#edd7c2] bg-[#fffdf8] px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-[#7a4a38]">Our Story</p>
        <h3 className="mt-3 text-center font-display text-4xl text-[#5f2b27] md:text-5xl">A Love Timeline</h3>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {timeline.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="rounded-2xl border border-[#ecd8c6] bg-white/80 p-6 shadow-[0_14px_30px_rgba(85,47,28,0.08)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9d6b54]">{item.year}</p>
              <h4 className="mt-2 font-display text-3xl text-[#61302b]">{item.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-[#7a5a52]">{item.text}</p>
            </motion.article>
          ))}
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {photos.map((photo, index) => (
            <motion.div
              key={photo}
              initial={{ opacity: 0, rotate: index % 2 ? 2 : -2, y: 24 }}
              whileInView={{ opacity: 1, rotate: index % 2 ? 1 : -1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="rounded-2xl border border-[#ecd8c6] bg-[#fffaf4] p-3 shadow-[0_14px_28px_rgba(85,47,28,0.08)]"
            >
              <img src={photo} alt="Couple memory" className="h-64 w-full rounded-xl object-cover" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
