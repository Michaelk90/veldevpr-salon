import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Calendar,
  ChevronRight,
  Clock,
  Flower2,
  Hand,
  Leaf,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Scissors,
  Sparkles,
  X,
} from "lucide-react";
import "./App.css";

const PHONE_RAW = "+17875281627";
const PHONE_DISPLAY = "(787) 528-1627";
const WHATSAPP_NUMBER = "17875281627";
const WHATSAPP = `https://wa.me/${WHATSAPP_NUMBER}`;
const ADDRESS = "Plaza del Mercado #8, Luquillo, PR";

const NAV_LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Filosofía", href: "#filosofia" },
  { label: "Servicios", href: "#servicios" },
  { label: "Galería", href: "#galeria" },
  { label: "Reservar", href: "#reservar" },
  { label: "Visitanos", href: "#visitanos" },
];

type Service = {
  name: string;
  description: string;
  price: number;
  duration: string;
};

type ServiceCategory = {
  id: string;
  label: string;
  intro: string;
  icon: typeof Sparkles;
  services: Service[];
};

const SERVICES: ServiceCategory[] = [
  {
    id: "unas",
    label: "Uñas",
    intro: "Manos cuidadas, pies cuidados. Cada cita es un ritual.",
    icon: Hand,
    services: [
      {
        name: "Manicure clásica",
        description: "Forma, cutícula y esmalte de la casa. Limpio y atemporal.",
        price: 25,
        duration: "30 min",
      },
      {
        name: "Manicure en gel",
        description: "Esmalte gel curado UV, dura 3 semanas sin perder brillo.",
        price: 40,
        duration: "45 min",
      },
      {
        name: "Pedicure spa",
        description: "Baño de hierbas, exfoliación, masaje de pierna y esmalte.",
        price: 45,
        duration: "60 min",
      },
      {
        name: "Nail art personalizado",
        description: "Diseño consultado contigo. Líneas, mármoles, cromo, lo que pidas.",
        price: 55,
        duration: "75 min",
      },
      {
        name: "Acrílicas escultor",
        description: "Extensión hecha a mano con acrílico, forma a tu gusto.",
        price: 70,
        duration: "90 min",
      },
      {
        name: "Removal y restauración",
        description: "Quitamos lo viejo, hidratamos, reparamos y dejamos limpio.",
        price: 20,
        duration: "25 min",
      },
    ],
  },
  {
    id: "estilismo",
    label: "Estilismo",
    intro: "El corte, el color y el cuidado del pelo, sin atajos.",
    icon: Scissors,
    services: [
      {
        name: "Corte y secado",
        description: "Consulta, lavado, corte y terminado a mano. Sin prisa.",
        price: 35,
        duration: "45 min",
      },
      {
        name: "Color completo",
        description: "Tinte de raíz a punta, paleta cuidada para tu tono.",
        price: 80,
        duration: "2 h",
      },
      {
        name: "Balayage / highlights",
        description: "Iluminación pintada a mano. Caída natural y mantenimiento bajo.",
        price: 120,
        duration: "3 h",
      },
      {
        name: "Tratamiento profundo",
        description: "Mascarilla reparadora, vapor y protocolo de hidratación.",
        price: 50,
        duration: "60 min",
      },
      {
        name: "Peinado para eventos",
        description: "Recogido, ondas o updo. Para boda, gala o lo que celebres.",
        price: 55,
        duration: "60 min",
      },
      {
        name: "Glaze de brillo",
        description: "Sellado de color y brillo extra. Pelo como espejo.",
        price: 40,
        duration: "30 min",
      },
    ],
  },
  {
    id: "spa",
    label: "Spa & Cuerpo",
    intro: "Pausa real. Salir de tu cabeza, volver al cuerpo.",
    icon: Flower2,
    services: [
      {
        name: "Masaje sueco",
        description: "Relajación profunda con presión media. Aceite tibio.",
        price: 75,
        duration: "60 min",
      },
      {
        name: "Masaje deep tissue",
        description: "Trabajo focalizado en nudos, hombros y zona lumbar.",
        price: 90,
        duration: "60 min",
      },
      {
        name: "Facial limpieza profunda",
        description: "Vapor, exfoliación, extracción y mascarilla a tu piel.",
        price: 80,
        duration: "75 min",
      },
      {
        name: "Facial anti-edad",
        description: "Sérum, masaje facial y mascarilla con activos clean.",
        price: 110,
        duration: "90 min",
      },
      {
        name: "Exfoliación corporal",
        description: "Café, sal del mar y aceites esenciales. Piel renovada.",
        price: 65,
        duration: "45 min",
      },
      {
        name: "Ritual cuerpo entero",
        description: "Exfoliación, mascarilla, masaje y baño aromático.",
        price: 95,
        duration: "75 min",
      },
    ],
  },
];

const PHILOSOPHY = [
  {
    icon: Leaf,
    title: "Cuidado consciente.",
    body:
      "Productos clean beauty, sin sulfatos agresivos ni ftalatos. Cuidamos tu piel y el espacio que compartimos.",
  },
  {
    icon: Sparkles,
    title: "Sin prisa.",
    body:
      "No reservamos tres clientas a la misma hora. Cada cita tiene su tiempo. Llegas y eres la única.",
  },
  {
    icon: Hand,
    title: "Equipo de oficio.",
    body:
      "Estilistas y terapeutas con años de carrera, formación constante y manos que saben lo que hacen.",
  },
];

const GALLERY = [
  {
    src: "https://images.unsplash.com/photo-1591343395082-e120087004b4?w=900&q=85&auto=format&fit=crop",
    alt: "Detalle de spa",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=700&q=85&auto=format&fit=crop",
    alt: "Estilista trabajando",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1604948501466-4e9c339b9c24?w=700&q=85&auto=format&fit=crop",
    alt: "Manicure terminada",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=900&q=85&auto=format&fit=crop",
    alt: "Facial spa",
    span: "md:col-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=700&q=85&auto=format&fit=crop",
    alt: "Mesa de masajes",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1463320726281-696a485928c7?w=700&q=85&auto=format&fit=crop",
    alt: "Espacio con plantas",
    span: "",
  },
];

const SCHEDULE = [
  { day: "Lunes", hours: "Cerrado", closed: true },
  { day: "Martes", hours: "9:00 AM — 7:00 PM", closed: false },
  { day: "Miércoles", hours: "9:00 AM — 7:00 PM", closed: false },
  { day: "Jueves", hours: "9:00 AM — 8:00 PM", closed: false },
  { day: "Viernes", hours: "9:00 AM — 8:00 PM", closed: false },
  { day: "Sábado", hours: "9:00 AM — 6:00 PM", closed: false },
  { day: "Domingo", hours: "10:00 AM — 3:00 PM", closed: false },
];

const STATS = [
  { value: "7", label: "Años cuidándote" },
  { value: "4.8", label: "Rating en Google" },
  { value: "200+", label: "Reseñas reales" },
  { value: "18", label: "Servicios" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-paper/80 backdrop-blur-xl border-b border-paper-line/70"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10 md:py-5">
        <a
          href="#inicio"
          className="flex items-baseline gap-1 font-display text-2xl tracking-tight text-ink md:text-[28px]"
        >
          <span className="italic text-sage-deep">Bella</span>
          <span className="ml-1 inline-block h-1.5 w-1.5 rounded-full bg-sage" />
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-[13px] uppercase tracking-[0.2em] text-ink-soft transition-colors hover:text-sage-deep"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#reservar"
          className="hidden items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-xs font-medium uppercase tracking-[0.18em] text-paper transition-all hover:bg-sage-deep md:inline-flex"
        >
          Reservar
          <ChevronRight className="h-4 w-4" />
        </a>

        <button
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          className="grid h-11 w-11 place-items-center rounded-full border border-paper-line bg-paper-soft text-ink md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="overflow-hidden border-t border-paper-line bg-paper/95 backdrop-blur-xl md:hidden"
      >
        <ul className="flex flex-col gap-1 px-5 py-4">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-3 text-base text-ink hover:bg-paper-mute"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="mt-2 px-1">
            <a
              href="#reservar"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-xs font-medium uppercase tracking-wider text-paper"
            >
              Reservar mi cita
              <ChevronRight className="h-4 w-4" />
            </a>
          </li>
        </ul>
      </motion.div>
    </header>
  );
}

const HERO_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=85&auto=format&fit=crop",
    label: "Uñas",
  },
  {
    src: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=85&auto=format&fit=crop",
    label: "Estilismo",
  },
  {
    src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=85&auto=format&fit=crop",
    label: "Spa",
  },
];

function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-32"
    >
      <div className="absolute inset-0 -z-10 opacity-50">
        <div className="absolute -left-32 top-1/4 h-[420px] w-[420px] animate-drift rounded-full bg-sage/15 blur-3xl" />
        <div className="absolute -right-32 bottom-1/4 h-[380px] w-[380px] animate-drift rounded-full bg-clay/15 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="grid grid-cols-3 gap-3 md:gap-5"
        >
          {HERO_IMAGES.map((img, i) => (
            <motion.figure
              key={i}
              variants={fadeUp}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className={`relative aspect-[3/4] overflow-hidden rounded-3xl border border-paper-line bg-paper-soft md:aspect-[4/5] ${
                i === 1 ? "translate-y-6 md:translate-y-12" : ""
              }`}
            >
              <img
                src={img.src}
                alt={img.label}
                className="h-full w-full object-cover"
              />
              <figcaption className="absolute bottom-3 left-3 rounded-full bg-paper/90 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-ink backdrop-blur md:bottom-4 md:left-4 md:text-[11px]">
                {img.label}
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="mt-16 grid grid-cols-1 gap-10 md:mt-24 lg:grid-cols-12 lg:gap-12"
        >
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="lg:col-span-8"
          >
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-sage/40 bg-sage/8 px-4 py-1.5">
              <Leaf className="h-3.5 w-3.5 text-sage-deep" />
              <span className="text-[11px] uppercase tracking-[0.28em] text-sage-deep">
                Salón & Spa boutique · Luquillo, PR
              </span>
            </div>

            <h1 className="font-display text-[56px] font-normal leading-[0.95] tracking-tight text-ink sm:text-[80px] md:text-[104px] lg:text-[120px]">
              Cuidarte
              <br />
              <span className="italic text-sage-deep">es un ritual.</span>
            </h1>

            <p className="mt-7 max-w-md text-lg leading-relaxed text-ink-mute md:text-xl">
              Uñas, estilismo y rituales de spa con manos expertas y productos
              clean. Una pausa real en tu semana, no un trámite más.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <a
                href="#reservar"
                className="group inline-flex min-h-[54px] items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] text-paper transition-all hover:bg-sage-deep"
              >
                Reservar mi cita
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="#servicios"
                className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-full border border-ink/20 px-7 py-3.5 text-xs font-medium uppercase tracking-[0.22em] text-ink transition-all hover:border-ink hover:bg-paper-mute"
              >
                Ver servicios
              </a>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="grid grid-cols-2 gap-6 self-end border-t border-paper-line pt-7 lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0"
          >
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="font-display text-3xl text-sage-deep md:text-4xl">
                  {s.value}
                </div>
                <div className="mt-2 text-[10px] uppercase tracking-[0.22em] text-ink-mute md:text-xs">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: "left" | "center";
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={stagger}
      className={`mb-14 max-w-2xl md:mb-20 ${
        align === "center" ? "mx-auto text-center" : ""
      }`}
    >
      <motion.div
        variants={fadeUp}
        transition={{ duration: 0.6 }}
        className="mb-5 inline-flex items-center gap-3"
      >
        <span className="h-px w-10 bg-sage" />
        <span className="text-[10px] uppercase tracking-[0.3em] text-sage-deep">
          {eyebrow}
        </span>
      </motion.div>
      <motion.h2
        variants={fadeUp}
        transition={{ duration: 0.7 }}
        className="font-display text-4xl leading-[1.05] tracking-tight text-ink sm:text-5xl md:text-6xl lg:text-7xl"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.7 }}
          className="mt-5 max-w-xl text-base leading-relaxed text-ink-mute md:text-lg"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}

function Filosofia() {
  return (
    <section
      id="filosofia"
      className="relative overflow-hidden bg-paper-soft py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <SectionHeading
          eyebrow="Filosofía"
          title={
            <>
              No es un servicio,
              <br />
              <span className="italic text-sage-deep">es un cuidado.</span>
            </>
          }
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid gap-6 md:grid-cols-3 md:gap-8"
        >
          {PHILOSOPHY.map((p) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                variants={fadeUp}
                transition={{ duration: 0.7 }}
                className="rounded-3xl border border-paper-line bg-paper p-8 transition-all hover:border-sage/40 hover:shadow-[0_24px_48px_-24px_rgba(31,42,35,0.18)] md:p-10"
              >
                <Icon className="mb-7 h-7 w-7 text-sage-deep" strokeWidth={1.5} />
                <h3 className="font-display text-2xl text-ink md:text-3xl">
                  {p.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-ink-mute md:text-base">
                  {p.body}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function Servicios({
  onReserve,
}: {
  onReserve: (service: string) => void;
}) {
  const [activeCategory, setActiveCategory] = useState(SERVICES[0].id);
  const active = SERVICES.find((c) => c.id === activeCategory) ?? SERVICES[0];

  return (
    <section id="servicios" className="relative bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-10">
        <SectionHeading
          eyebrow="Servicios"
          title={
            <>
              Tres mundos,
              <br />
              <span className="italic text-sage-deep">una misma casa.</span>
            </>
          }
          subtitle="Manos, pelo y cuerpo bajo un solo techo. Reserva el servicio que necesites — el sistema te lo guarda y se confirma por WhatsApp en minutos."
        />

        {/* Category tabs */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mb-12 flex flex-wrap gap-3 md:mb-16"
        >
          {SERVICES.map((cat) => {
            const Icon = cat.icon;
            const isActive = cat.id === activeCategory;
            return (
              <motion.button
                key={cat.id}
                variants={fadeUp}
                onClick={() => setActiveCategory(cat.id)}
                className={`group inline-flex items-center gap-2.5 rounded-full border px-5 py-3 text-sm transition-all ${
                  isActive
                    ? "border-ink bg-ink text-paper"
                    : "border-paper-line bg-paper-soft text-ink hover:border-ink/40"
                }`}
              >
                <Icon
                  className="h-4 w-4"
                  strokeWidth={isActive ? 2 : 1.7}
                />
                <span className="font-medium">{cat.label}</span>
                <span
                  className={`ml-1 text-xs ${
                    isActive ? "text-paper/70" : "text-ink-mute"
                  }`}
                >
                  {cat.services.length}
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Active category description */}
        <motion.div
          key={active.id + "-intro"}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10 max-w-xl"
        >
          <p className="font-display text-2xl italic text-ink-soft md:text-3xl">
            {active.intro}
          </p>
        </motion.div>

        {/* Service cards grid */}
        <motion.div
          key={active.id + "-grid"}
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="grid gap-px overflow-hidden rounded-3xl border border-paper-line bg-paper-line md:grid-cols-2"
        >
          {active.services.map((s) => (
            <motion.article
              key={s.name}
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="group flex flex-col bg-paper p-7 transition-colors hover:bg-paper-soft md:p-8"
            >
              <div className="mb-5 flex items-baseline justify-between gap-4">
                <h4 className="font-display text-2xl tracking-tight text-ink md:text-3xl">
                  {s.name}
                </h4>
                <span className="whitespace-nowrap font-display text-2xl text-sage-deep md:text-3xl">
                  ${s.price}
                </span>
              </div>
              <p className="mb-6 text-sm leading-relaxed text-ink-mute md:text-[15px]">
                {s.description}
              </p>
              <div className="mt-auto flex items-center justify-between gap-3 border-t border-paper-line pt-5">
                <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] text-ink-mute">
                  <Clock className="h-3.5 w-3.5" strokeWidth={1.7} />
                  {s.duration}
                </span>
                <button
                  type="button"
                  onClick={() => onReserve(s.name)}
                  className="group/btn inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-paper transition-all hover:bg-sage-deep"
                >
                  Reservar este
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </button>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-12 max-w-xl text-sm text-ink-mute md:text-[15px]"
        >
          ¿Buscas algo distinto? Escríbenos por{" "}
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            className="text-sage-deep underline-offset-4 hover:underline"
          >
            WhatsApp
          </a>{" "}
          y diseñamos un servicio a tu medida.
        </motion.p>
      </div>
    </section>
  );
}

function Galeria() {
  return (
    <section
      id="galeria"
      className="relative overflow-hidden bg-paper-soft py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <SectionHeading
          eyebrow="La casa"
          title={
            <>
              Un espacio que respira.
              <br />
              <span className="italic text-sage-deep">Y te deja respirar.</span>
            </>
          }
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid auto-rows-[180px] grid-cols-2 gap-4 md:auto-rows-[230px] md:grid-cols-4 md:gap-5"
        >
          {GALLERY.map((g, i) => (
            <motion.figure
              key={i}
              variants={fadeUp}
              transition={{ duration: 0.7 }}
              className={`group relative overflow-hidden rounded-2xl bg-paper-mute ${g.span}`}
            >
              <img
                src={g.src}
                alt={g.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/15 via-transparent opacity-50 transition-opacity group-hover:opacity-20" />
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Reservar({
  preselected,
  clear,
}: {
  preselected: string;
  clear: () => void;
}) {
  const [name, setName] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  // Sync with preselected from catalog
  useEffect(() => {
    if (preselected) {
      setService(preselected);
    }
  }, [preselected]);

  const allServiceNames = useMemo(
    () =>
      SERVICES.flatMap((c) =>
        c.services.map((s) => ({
          category: c.label,
          value: s.name,
          price: s.price,
          duration: s.duration,
        }))
      ),
    []
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = [
      "Hola Bella, me gustaría reservar una cita.",
      "",
      `• Nombre: ${name || "—"}`,
      `• Servicio: ${service || "—"}`,
      `• Fecha: ${date || "—"}`,
      `• Hora: ${time || "—"}`,
    ];
    if (phone) lines.push(`• Teléfono: ${phone}`);
    if (notes) lines.push(`• Notas: ${notes}`);
    lines.push("", "Gracias.");
    const text = encodeURIComponent(lines.join("\n"));
    window.open(`${WHATSAPP}?text=${text}`, "_blank", "noopener,noreferrer");
  };

  const handleClearService = () => {
    setService("");
    clear();
  };

  return (
    <section
      id="reservar"
      className="relative overflow-hidden bg-paper py-24 md:py-32"
    >
      <div className="absolute inset-0 -z-0 opacity-40">
        <div className="absolute right-0 top-0 h-[400px] w-[400px] animate-drift rounded-full bg-sage/15 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-5xl px-5 md:px-10">
        <SectionHeading
          eyebrow="Reservaciones"
          title={
            <>
              Tu cita,
              <br />
              <span className="italic text-sage-deep">a un mensaje.</span>
            </>
          }
          subtitle="Llena los detalles y te devolvemos confirmación por WhatsApp en minutos. Si vienes desde el catálogo, ya te seleccionamos el servicio."
        />

        <motion.form
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          onSubmit={handleSubmit}
          className="grid gap-5 rounded-3xl border border-paper-line bg-paper-soft p-6 md:grid-cols-2 md:gap-6 md:p-10"
        >
          <motion.label variants={fadeUp} className="block md:col-span-2">
            <span className="mb-2 block text-[10px] uppercase tracking-[0.22em] text-ink-mute">
              Nombre completo
            </span>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre"
              className="input-base"
            />
          </motion.label>

          <motion.label variants={fadeUp} className="block md:col-span-2">
            <span className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-ink-mute">
              <span>Servicio</span>
              {service && (
                <button
                  type="button"
                  onClick={handleClearService}
                  className="text-sage-deep underline-offset-2 hover:underline"
                >
                  Limpiar
                </button>
              )}
            </span>
            <select
              required
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="input-base appearance-none"
            >
              <option value="" className="bg-paper text-ink">
                Selecciona un servicio
              </option>
              {SERVICES.map((cat) => (
                <optgroup key={cat.id} label={cat.label}>
                  {allServiceNames
                    .filter((s) => s.category === cat.label)
                    .map((s) => (
                      <option
                        key={s.value}
                        value={s.value}
                        className="bg-paper text-ink"
                      >
                        {s.value} — ${s.price} · {s.duration}
                      </option>
                    ))}
                </optgroup>
              ))}
            </select>
          </motion.label>

          <motion.label variants={fadeUp} className="block">
            <span className="mb-2 block text-[10px] uppercase tracking-[0.22em] text-ink-mute">
              Fecha
            </span>
            <input
              type="date"
              required
              min={today}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="input-base"
            />
          </motion.label>

          <motion.label variants={fadeUp} className="block">
            <span className="mb-2 block text-[10px] uppercase tracking-[0.22em] text-ink-mute">
              Hora preferida
            </span>
            <input
              type="time"
              required
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="input-base"
            />
          </motion.label>

          <motion.label variants={fadeUp} className="block md:col-span-2">
            <span className="mb-2 block text-[10px] uppercase tracking-[0.22em] text-ink-mute">
              Teléfono <span className="text-ink-mute/50">(opcional)</span>
            </span>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(787) 555-0000"
              className="input-base"
            />
          </motion.label>

          <motion.label variants={fadeUp} className="block md:col-span-2">
            <span className="mb-2 block text-[10px] uppercase tracking-[0.22em] text-ink-mute">
              Notas <span className="text-ink-mute/50">(alergias, preferencias, ocasión)</span>
            </span>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Cuéntanos lo que necesites..."
              className="input-base resize-none"
            />
          </motion.label>

          <motion.div
            variants={fadeUp}
            className="md:col-span-2 mt-2 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <p className="text-xs text-ink-mute sm:max-w-sm">
              Enviar abre WhatsApp con tu pedido pre-escrito. Tú confirmas con
              un toque.
            </p>
            <button
              type="submit"
              className="group inline-flex min-h-[54px] items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] text-paper transition-all hover:bg-sage-deep"
            >
              <MessageCircle className="h-4 w-4" />
              Reservar por WhatsApp
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </motion.div>
        </motion.form>
      </div>
    </section>
  );
}

function Visitanos() {
  return (
    <section id="visitanos" className="relative bg-paper-soft py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <SectionHeading
          eyebrow="Visítanos"
          title={
            <>
              En el corazón
              <br />
              <span className="italic text-sage-deep">de Luquillo.</span>
            </>
          }
        />

        <div className="grid gap-8 lg:grid-cols-5 lg:gap-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="lg:col-span-2"
          >
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="rounded-3xl border border-paper-line bg-paper p-8 md:p-10"
            >
              <div className="mb-6 flex items-center gap-3">
                <Clock className="h-5 w-5 text-sage-deep" strokeWidth={1.7} />
                <h3 className="font-display text-xl text-ink md:text-2xl">
                  Horario
                </h3>
              </div>
              <ul className="divide-y divide-paper-line">
                {SCHEDULE.map((s) => (
                  <li
                    key={s.day}
                    className="flex items-center justify-between py-3 text-sm md:text-base"
                  >
                    <span className="text-ink/85">{s.day}</span>
                    <span
                      className={
                        s.closed ? "text-ink/35" : "font-medium text-ink"
                      }
                    >
                      {s.hours}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
            >
              <a
                href={`tel:${PHONE_RAW}`}
                className="group flex items-center gap-4 rounded-2xl border border-paper-line bg-paper p-5 transition-colors hover:border-sage/40"
              >
                <span className="grid h-11 w-11 place-items-center rounded-full bg-sage/12 text-sage-deep">
                  <Phone className="h-5 w-5" strokeWidth={1.7} />
                </span>
                <span>
                  <span className="block text-[10px] uppercase tracking-[0.22em] text-ink-mute">
                    Teléfono
                  </span>
                  <span className="block text-sm font-medium text-ink">
                    {PHONE_DISPLAY}
                  </span>
                </span>
              </a>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-paper-line bg-paper p-5 transition-colors hover:border-sage/40"
              >
                <span className="grid h-11 w-11 place-items-center rounded-full bg-sage/12 text-sage-deep">
                  <MessageCircle className="h-5 w-5" strokeWidth={1.7} />
                </span>
                <span>
                  <span className="block text-[10px] uppercase tracking-[0.22em] text-ink-mute">
                    WhatsApp
                  </span>
                  <span className="block text-sm font-medium text-ink">
                    Chat directo
                  </span>
                </span>
              </a>
            </motion.div>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="mt-6 flex items-start gap-4 rounded-2xl border border-paper-line bg-paper p-6"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-sage/12 text-sage-deep">
                <MapPin className="h-5 w-5" strokeWidth={1.7} />
              </span>
              <div>
                <span className="block text-[10px] uppercase tracking-[0.22em] text-ink-mute">
                  Dirección
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-ink">
                  {ADDRESS}
                </span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="overflow-hidden rounded-3xl border border-paper-line lg:col-span-3"
          >
            <iframe
              title="Ubicación de Bella en Luquillo"
              src="https://www.google.com/maps?q=Luquillo,+Puerto+Rico&output=embed"
              loading="lazy"
              className="h-[420px] w-full md:h-full md:min-h-[520px]"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ filter: "grayscale(0.4)" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CTAFinal() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-paper via-paper-soft to-paper py-24 md:py-32">
      <div className="absolute inset-0 -z-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 animate-drift rounded-full bg-sage/15 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-3xl px-5 text-center md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-sage/40 bg-sage/8 px-4 py-1.5 text-[10px] uppercase tracking-[0.28em] text-sage-deep">
            <Calendar className="h-3.5 w-3.5" strokeWidth={1.7} />
            Pocas citas, mucho cuidado
          </span>
          <h2 className="mt-7 font-display text-4xl leading-[1.05] tracking-tight text-ink sm:text-5xl md:text-6xl lg:text-7xl">
            Tu pausa
            <br />
            <span className="italic text-sage-deep">empieza aquí.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink-mute md:text-lg">
            Reserva tu cita en menos de un minuto. Te confirmamos por WhatsApp.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <a
              href="#reservar"
              className="group inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full bg-ink px-8 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-paper transition-all hover:bg-sage-deep"
            >
              <Calendar className="h-4 w-4" />
              Reservar mi cita
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href={`tel:${PHONE_RAW}`}
              className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full border border-ink/20 px-8 py-4 text-xs font-medium uppercase tracking-[0.22em] text-ink transition-all hover:border-ink hover:bg-paper-mute"
            >
              <Phone className="h-4 w-4" />
              {PHONE_DISPLAY}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function IconInstagram(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconFacebook(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-paper-line bg-paper">
      <div className="mx-auto max-w-7xl px-5 py-14 md:px-10 md:py-20">
        <div className="grid gap-10 md:grid-cols-4 md:gap-12">
          <div className="md:col-span-2">
            <a
              href="#inicio"
              className="flex items-baseline gap-1 font-display text-3xl tracking-tight text-ink"
            >
              <span className="italic text-sage-deep">Bella</span>
              <span className="ml-1 inline-block h-1.5 w-1.5 rounded-full bg-sage" />
            </a>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-mute">
              Salón & spa boutique en Luquillo, PR. Uñas, estilismo y rituales
              de cuidado consciente desde 2019.
            </p>
            <div className="mt-7 flex items-center gap-3">
              {[
                { icon: IconInstagram, href: "https://instagram.com" },
                { icon: IconFacebook, href: "https://facebook.com" },
                { icon: MessageCircle, href: WHATSAPP },
              ].map((s, i) => {
                const Icon = s.icon;
                return (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="grid h-11 w-11 place-items-center rounded-full border border-paper-line text-ink-mute transition-colors hover:border-sage/40 hover:text-sage-deep"
                    aria-label="Red social"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-ink-mute/70">
              Navegación
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-ink/75 transition-colors hover:text-sage-deep"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-ink-mute/70">
              Contacto
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              <li className="flex items-start gap-2 text-ink/75">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sage-deep" strokeWidth={1.7} />
                {ADDRESS}
              </li>
              <li>
                <a
                  href={`tel:${PHONE_RAW}`}
                  className="flex items-start gap-2 text-ink/75 hover:text-sage-deep"
                >
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-sage-deep" strokeWidth={1.7} />
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-2 text-ink/75 hover:text-sage-deep"
                >
                  <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-sage-deep" strokeWidth={1.7} />
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-paper-line pt-8 text-xs text-ink-mute sm:flex-row sm:items-center">
          <span>© {year} Bella. Todos los derechos reservados.</span>
          <a
            href="https://veldevpr.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-sage-deep"
          >
            Desarrollado por{" "}
            <span className="font-medium text-ink">VelDev PR</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [preselected, setPreselected] = useState("");

  const handleReserveService = (serviceName: string) => {
    setPreselected(serviceName);
    // small delay to let state propagate before scroll
    requestAnimationFrame(() => {
      document
        .getElementById("reservar")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <div className="paper-tex min-h-screen bg-paper text-ink antialiased">
      <Navbar />
      <main>
        <Hero />
        <Filosofia />
        <Servicios onReserve={handleReserveService} />
        <Galeria />
        <Reservar
          preselected={preselected}
          clear={() => setPreselected("")}
        />
        <Visitanos />
        <CTAFinal />
      </main>
      <Footer />
    </div>
  );
}
