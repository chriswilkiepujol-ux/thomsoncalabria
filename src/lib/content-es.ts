import type {
  AboutContent,
  BlogContent,
  CategoryContent,
  CategoryKey,
  CategoryText,
  ConsultancyContent,
  HomeContent,
  LocationContent,
} from "./content";

export const CATEGORY_TEXT_ES: Record<CategoryKey, CategoryText> = {
  hotel: { label: "Hoteles", singular: "Hotel", nounPlural: "hoteles" },
  restaurant: { label: "Restaurantes", singular: "Restaurante", nounPlural: "restaurantes y locales" },
  residential: { label: "Residencial", singular: "Residencia", nounPlural: "villas y apartamentos" },
  rental: { label: "Alquileres de lujo", singular: "Alquiler de lujo", nounPlural: "alquileres de lujo" },
};

export const LOCATIONS_ES: Record<string, LocationContent> = {
  sotogrande: {
    name: "Sotogrande",
    country: "España",
    kicker: "Sotogrande · Cádiz",
    title: "Discreción, polo y el Mediterráneo.",
    intro:
      "Sotogrande es donde las familias más discretas de Europa tienen su segunda residencia, y un mercado en auge para la hostelería boutique. Aquí gestionamos en privado hoteles, restaurantes y las mejores fincas, junto a una selección de viviendas en venta.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80",
    seoTitle: "Hoteles, restaurantes y propiedades de lujo en Sotogrande | Thomson Calabria",
    seoDescription:
      "Hoteles, restaurantes y fincas de lujo off-market en Sotogrande, además de una selección de villas y apartamentos en venta.",
    body: [
      "Sotogrande ocupa el extremo oriental de la Costa del Sol: 2.000 hectáreas de urbanizaciones privadas, dos de los mejores campos de golf de Europa (Valderrama y el Real Club de Golf Sotogrande), el Santa María Polo Club y un puerto deportivo de aguas profundas. Está a cuarenta minutos del aeropuerto de Gibraltar y a una hora de Málaga.",
      "Los mejores activos — restaurantes en el puerto, hostelería boutique y las grandes parcelas de Kings & Queens y La Reserva — suelen estar en manos de propietarios que prefieren no anunciarse. Sabemos quién está abierto a una conversación discreta y la llevamos al comprador adecuado.",
    ],
  },
  marbella: {
    name: "Marbella",
    country: "España",
    kicker: "Marbella · Milla de Oro",
    title: "La Milla de Oro, Puente Romano y el Marbella Club.",
    intro:
      "Nuestras raíces están en la Milla de Oro de Marbella. En más de quince años hemos creado una red de propietarios de hoteles, restaurantes y viviendas que prefieren vender con discreción, y ofrecemos nuestros propios alquileres de lujo en el Marbella Club.",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=2000&q=80",
    seoTitle: "Hoteles, restaurantes y propiedades de lujo en Marbella | Thomson Calabria",
    seoDescription:
      "Hoteles y restaurantes off-market en la Milla de Oro de Marbella, consultoría hotelera, una selección de villas y apartamentos y alquileres de lujo en el Marbella Club.",
    body: [
      "La Milla de Oro de Marbella va del casco antiguo a Puerto Banús y tiene dos grandes referentes: el Marbella Club y Puente Romano. Es uno de los mercados de hostelería de lujo más activos de Europa, y nuestros alquileres vacacionales en el Marbella Club sitúan a los huéspedes en su corazón.",
      "Más allá de la Milla, trabajamos con propietarios de hoteles y restaurantes de todo el municipio que valoran una salida sin que se sepa, y con propietarios en Sierra Blanca, La Zagaleta, Guadalmina Baja y Los Monteros.",
    ],
  },
  international: {
    name: "Internacional",
    country: "Internacional",
    kicker: "Internacional · Off-market",
    title: "Una selección de oportunidades off-market fuera de España.",
    intro:
      "Más allá de Marbella y Sotogrande, presentamos una pequeña selección de hoteles y propiedades off-market a nivel internacional — a través de propietarios y socios que conocemos desde hace años, y siempre con total confidencialidad.",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=2000&q=80",
    seoTitle: "Hoteles y propiedades off-market internacionales en venta | Thomson Calabria",
    seoDescription:
      "Una selección confidencial de hoteles y propiedades off-market en venta a nivel internacional. Trato directo con los propietarios y detalles completos bajo acuerdo de confidencialidad.",
    body: [
      "Algunos de los mejores hoteles y residencias cambian de manos sin anunciarse nunca. Gracias a relaciones de muchos años podemos presentar una selección de estas oportunidades a compradores, inversores y fondos cualificados.",
      "Los detalles se comparten en privado, bajo acuerdo de confidencialidad. Cuéntenos qué busca y dónde, y le diremos con franqueza qué podemos ofrecerle.",
    ],
  },
};

export const DEFAULT_HOME_ES: HomeContent = {
  heroKicker: "Hoteles · Restaurantes · Consultoría · Residencias",
  heroTitle: "Hostelería y propiedades de lujo, con total discreción.",
  heroSubtitle:
    "Venta off-market de hoteles y restaurantes, consultoría hotelera y branding — además de una selección de villas y apartamentos, y residencias privadas de lujo dentro del Marbella Club.",
  heroImage: "https://kfgzhurkaybmuxkuolxc.supabase.co/storage/v1/object/public/media/site/hero-villa-sharp.jpg",
  introKicker: "Qué hacemos",
  introTitle: "Hoteles y restaurantes off-market. Asesoramiento hotelero experto.",
  introBody:
    "Thomson Calabria pone en contacto a compradores, inversores y fondos con propietarios de hoteles y restaurantes que prefieren vender en privado. En cada operación asesoramos sobre la estrategia hotelera — desde la valoración y el reposicionamiento hasta la incorporación de una marca hotelera internacional. También ofrecemos una pequeña selección de villas y apartamentos en venta, y residencias privadas de lujo en alquiler dentro del Marbella Club.",
  pillars: [
    {
      title: "Hoteles y restaurantes off-market",
      body: "La mayor parte de lo que gestionamos nunca se publica. Tratamos en privado y directamente con compradores, inversores y fondos.",
    },
    {
      title: "Consultoría hotelera",
      body: "Valoración, reposicionamiento, contacto con operadores y branding hotelero — el consejo de quien conoce el sector.",
    },
    {
      title: "Residencias y alquileres",
      body: "Una selección de villas y apartamentos, y residencias privadas de lujo en alquiler dentro del Marbella Club.",
    },
  ],
  processTitle: "Cuatro pasos sencillos.",
  process: [
    { step: "01", title: "Cuéntenos su búsqueda", body: "Qué busca: el activo, la zona, el presupuesto y los plazos." },
    { step: "02", title: "Confidencialidad", body: "En las oportunidades off-market confirmamos que es parte interesada y firmamos un breve acuerdo de confidencialidad." },
    { step: "03", title: "Información completa", body: "Compartimos el dosier — ubicación, fotografías, cifras — y organizamos las visitas." },
    { step: "04", title: "Hasta el cierre", body: "Negociamos y coordinamos abogados, notarios y asesores hasta cerrar la operación." },
  ],
  testimonials: [
    {
      quote:
        "Linda fue clave en la compra de nuestro ático en Puente Romano. Discreta, directa y de nuestro lado de principio a fin.",
      name: "D. Speakman",
      place: "Mónaco",
    },
    {
      quote:
        "Recomendaría a Linda sin dudarlo. Nos encontró un apartamento en Puente Romano que nunca salió al mercado y se ocupó de todo.",
      name: "D. Falzoni",
      place: "Ginebra",
    },
    {
      quote:
        "Villa Magna fue perfecta y la atención personal durante toda la estancia, excepcional. Hemos vuelto cada año desde entonces.",
      name: "N. Parry",
      place: "Praga",
    },
  ],
};

export const DEFAULT_ABOUT_ES: AboutContent = {
  kicker: "Linda Thomson · Fundadora",
  title: "Quince años en la Milla de Oro.",
  photo: "https://kfgzhurkaybmuxkuolxc.supabase.co/storage/v1/object/public/media/site/linda-thomson.jpg",
  body: [
    "Linda Thomson fundó LT Properties Marbella en 2009 y pronto se ganó una reputación de profesionalidad en el mercado inmobiliario de lujo de Marbella, especialmente en Puente Romano y el Marbella Club, en la Milla de Oro. Thomson Calabria es el siguiente capítulo: Linda, ahora junto a su equipo, aporta las mismas relaciones y la misma exigencia a la venta off-market de hoteles y restaurantes y a la consultoría hotelera, incluido el branding hotelero.",
    "Cada cliente recibe una atención personal. Nuestro enfoque se adapta a cada persona — sus objetivos, sus plazos y la forma en que desea tener un activo — y se apoya en un profundo conocimiento local, una larga trayectoria y una reputación de integridad y discreción.",
    "Junto a nuestro trabajo en hostelería, seguimos ofreciendo una selección de villas y apartamentos en venta, y nuestras propias residencias privadas de lujo en alquiler dentro del Marbella Club.",
  ],
  quote: "Cada cliente merece el mismo cuidado, tanto si alquila una semana como si compra un hotel.",
};

export const DEFAULT_CATEGORY_ES: Record<CategoryKey, CategoryContent> = {
  hotel: {
    notice:
      "Tenga en cuenta que normalmente no publicamos los hoteles. La mayoría de las oportunidades hoteleras se ofrecen en privado a compradores, inversores y fondos cualificados. Registre su búsqueda más abajo y le contactaremos, con total confidencialidad, cuando surja algo adecuado.",
    kicker: "Hoteles",
    title: "Hoteles en venta, con total confidencialidad.",
    intro:
      "Una selección de hoteles off-market en Marbella, Sotogrande y a nivel internacional. Los propietarios acuden a nosotros cuando buscan un comprador serio y no un proceso de venta público, y los inversores, por hoteles que no encontrarán en el mercado.",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=2000&q=80",
    seoTitle: "Hoteles en venta off-market — Marbella, Sotogrande e internacional",
    seoDescription:
      "Acceso confidencial a una selección de hoteles off-market en Marbella, Sotogrande y a nivel internacional. Cifras completas bajo NDA y carta de intenciones, para inversores, fondos y operadores.",
    highlights: [
      { title: "Hoteles en funcionamiento", body: "Hoteles de 20 a más de 300 habitaciones, con cifras completas bajo acuerdo de confidencialidad (NDA) y carta de intenciones (LOI)." },
      { title: "Reconversión y desarrollo", body: "Parcelas con licencia aptas para uso hotelero." },
      { title: "Branding y gestión", body: "Le asesoramos para conseguir la marca u operador adecuados, antes o después de la compra." },
    ],
  },
  restaurant: {
    kicker: "Restaurantes y locales",
    title: "La ubicación, la licencia, la terraza.",
    intro:
      "Beach clubs, restaurantes de alta cocina y locales de hostelería en ubicaciones prime. Vendidos con discreción.",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=2000&q=80",
    seoTitle: "Restaurantes y beach clubs en venta off-market — Marbella y Sotogrande",
    seoDescription:
      "Venta discreta de restaurantes, beach clubs y locales de hostelería en ubicaciones prime de Marbella, Sotogrande y a nivel internacional. Directamente con los propietarios.",
    highlights: [
      { title: "Negocios en marcha", body: "Restaurantes y beach clubs consolidados, con historial, licencias y equipo." },
      { title: "Locales en propiedad", body: "Locales en primera línea y ubicaciones prime, donde el inmueble es el verdadero valor." },
      { title: "Conceptos en busca de ubicación", body: "También asesoramos a operadores y grupos que buscan el local adecuado para crecer." },
    ],
  },
  residential: {
    kicker: "Residencial",
    title: "Una selección de villas y apartamentos.",
    intro:
      "Una pequeña y cuidada selección de viviendas en Marbella — en la Milla de Oro, Puente Romano, el Marbella Club y La Zagaleta — y en Sotogrande, incluido Kings & Queens. Algunas publicadas, otras ofrecidas en privado.",
    image: "/images/residential-la-zagaleta.jpg",
    seoTitle: "Villas y apartamentos de lujo en venta — Marbella, Milla de Oro, La Zagaleta, Sotogrande",
    seoDescription:
      "Una selección de villas, áticos y apartamentos de lujo en venta en Marbella, la Milla de Oro, Puente Romano, el Marbella Club, La Zagaleta y Sotogrande.",
    highlights: [
      { title: "Residencias en resorts", body: "La Milla de Oro, Puente Romano, el Marbella Club y Sotogrande — las direcciones que mejor conocemos." },
      { title: "Fincas y parcelas", body: "Parcelas en La Zagaleta, Kings & Queens y La Reserva para quien desee construir." },
      { title: "Cuéntenos qué busca", body: "Si no ve lo que desea, pregúntenos: muchas viviendas se venden antes de publicarse." },
    ],
  },
  rental: {
    kicker: "Alquileres de lujo",
    title: "Su residencia privada de lujo en el Marbella Club Hotel Resort.",
    intro:
      "Nuestra propia colección de residencias privadas de lujo en alquiler dentro del recinto del Marbella Club Hotel. Disponibles por semanas o temporadas — atendidas personalmente, con la playa, el spa y los restaurantes del resort a la puerta.",
    image: "/images/rental-casa-tanya.jpg",
    seoTitle: "Alquileres de lujo dentro del Marbella Club — villas y apartamentos | Thomson Calabria",
    seoDescription:
      "Alquileres vacacionales de lujo en el Marbella Club, en la Milla de Oro de Marbella. Villas y apartamentos atendidos personalmente, por semanas o temporadas.",
    highlights: [
      { title: "Dentro del recinto del Marbella Club Hotel", body: "Residencias privadas en el propio resort, con acceso a su beach club, spa y restaurantes." },
      { title: "Atención personal", body: "Limpieza, servicio doméstico y chef privado, todo bajo petición." },
      { title: "Pruebe antes de comprar", body: "Muchos de nuestros compradores primero alquilaron con nosotros. Si necesita un alquiler mientras busca comprar, le encontramos el alojamiento adecuado en la zona." },
    ],
  },
};

export const DEFAULT_CONSULTANCY_ES: ConsultancyContent = {
  kicker: "Consultoría",
  title: "Consultoría hotelera y branding hotelero.",
  intro:
    "Asesoramiento para propietarios de hoteles y restaurantes, inversores y operadores — desde la valoración y el reposicionamiento hasta la incorporación de una marca hotelera internacional — con la misma discreción que aplicamos a cada venta off-market.",
  image: "/images/consultancy-la-villa.jpg",
  services: [
    { title: "Branding hotelero", body: "Conseguir la marca internacional, colección soft-brand o contrato de gestión adecuados para su hotel." },
    { title: "Compra y venta", body: "Estrategia, precio y un proceso confidencial, tanto si compra como si vende." },
    { title: "Valoración y reposicionamiento", body: "Una visión clara del valor y de cómo aumentarlo: concepto, posicionamiento e inversión." },
    { title: "Operadores y socios", body: "Contacto con operadores, financiadores, abogados y asesores en cada país." },
  ],
  body: [
    "Cada encargo es a medida y confidencial. Cuéntenos qué quiere conseguir y le diremos, con franqueza, cómo podemos ayudarle.",
  ],
  author: "",
  seoTitle: "Consultoría hotelera y branding hotelero — Marbella, Sotogrande | Thomson Calabria",
  seoDescription:
    "Consultoría para propietarios de hoteles y restaurantes e inversores: branding hotelero, valoración, reposicionamiento, compras y ventas en Marbella, Sotogrande y más allá.",
};

export const DEFAULT_BLOG_ES: BlogContent = {
  kicker: "Blog",
  title: "Agenda y actualidad inmobiliaria.",
  intro: "Próximos eventos, lugares que merece la pena conocer y el mercado inmobiliario de lujo.",
  seoTitle: "Blog — Eventos en Marbella y Sotogrande y noticias inmobiliarias | Thomson Calabria",
  seoDescription:
    "Próximos eventos y los mejores restaurantes de Marbella, Sotogrande y Londres, además de noticias del mercado inmobiliario de lujo.",
};
