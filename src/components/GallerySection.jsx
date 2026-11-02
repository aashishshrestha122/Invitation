import { motion } from 'framer-motion'

export default function GallerySection({ images, onOpen }) {
  return (
    <section className="border-t border-[#edd7c2] bg-[linear-gradient(150deg,#fff8f1,#ffefe7)] px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-[#7a4a38]">Gallery</p>
        <h3 className="mt-3 text-center font-display text-4xl text-[#5f2b27] md:text-5xl">Cinematic Memories</h3>
        <div className="mt-10 columns-1 gap-4 md:columns-3">
          {images.map((image, index) => (
            <motion.button
              type="button"
              onClick={() => onOpen(index)}
              key={image}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: index * 0.04 }}
              className="mb-4 block w-full overflow-hidden rounded-2xl border border-[#ebd3bf] bg-white p-2 text-left shadow-[0_10px_22px_rgba(72,38,23,0.1)]"
            >
              <img src={image} alt="Wedding memory" className="w-full rounded-xl object-cover" />
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )

}
