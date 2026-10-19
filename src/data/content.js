import { shot } from '../config/assets.js';

// Crónicas de Mancos — texto tal cual aparece en el juego (9 capítulos)
export const STORY = [
  {
    n: 'I', title: 'El Corazón de Cristal', sub: 'Antes del tiempo', dragon: 'gold',
    text: 'Antes de que existiera el tiempo, en el vacío latía una única luz: el Corazón de Cristal. De su pulso nació la tierra, de su brillo el agua y de su calor la vida. Sus raíces atravesaron el mundo de punta a punta, y donde asomaban a la superficie se alzaron los obeliscos. Por eso todavía hoy su luz turquesa cierra las heridas de quien se acerca: es el Corazón, que sigue cuidando lo que creó.',
  },
  {
    n: 'II', title: 'Los dos guardianes', sub: 'Aurelion y Umbra', dragon: 'dark',
    text: 'El Corazón dio a luz a dos dragones para custodiarlo. Aurelion, de escamas doradas, que amaba la luz del día. Y Umbra, de escamas negras como el fondo del mar, que reinaba sobre la noche. Durante mil años volaron juntos alrededor del Corazón. Pero Umbra miraba su brillo cada noche y empezó a desearlo para él solo.',
  },
  {
    n: 'III', title: 'La Guerra de los Dragones', sub: 'El cielo en llamas', dragon: 'gold',
    text: 'Una noche sin luna, Umbra se lanzó sobre el Corazón para devorarlo. Aurelion se interpuso. El fuego dorado chocó contra el fuego violeta y el cielo ardió durante cuarenta días. Sus garras desgarraron la tierra: los continentes se partieron en islas, los mares se abrieron y las montañas se hundieron. Las islas que hoy recorrés son las cicatrices de aquella guerra.',
  },
  {
    n: 'IV', title: 'El último aliento', sub: 'El oro de las montañas', dragon: 'dark',
    text: 'Herido de muerte, Aurelion arrastró a Umbra hasta el abismo y lo encadenó con cuatro sellos de cristal. Con su último aliento cubrió el mundo de luz y cayó. Sus escamas llovieron sobre las montañas y se volvieron oro; su sangre se hizo hierro y sus lágrimas, cristal. Cada veta que picás en la roca es un pedazo del dragón dorado. Pero Umbra no murió: duerme en el fondo, y cada noche su aliento sube por las grietas del mundo.',
  },
  {
    n: 'V', title: 'Los Cuatro Reyes', sub: 'Cien pisos hacia la oscuridad', dragon: 'gold',
    text: 'Cuatro reyes juraron vigilar los sellos. Sobre cada uno alzaron un castillo que se hunde cien pisos hacia el abismo: el Castillo del Bosque, la Cripta de Huesos, la Fortaleza de Lava y la Ciudadela Helada. Cada diez pisos dejaron un guardián y una puerta de regreso, porque sabían que nadie baja cien pisos de una sola vez. Los enanos que los ayudaron escondieron bóvedas secretas detrás de paredes agrietadas, con tesoros para los valientes que supieran buscar.',
  },
  {
    n: 'VI', title: 'La codicia de los mineros', sub: 'El sello se quiebra', dragon: 'dark',
    text: 'Pasaron los siglos y los reyes se olvidaron del juramento. Los mineros, enloquecidos por el oro de Aurelion, cavaron cada vez más hondo. Una mañana, un pico golpeó una veta violeta que latía como un corazón. La roca gritó. El primer sello se quebró, y por la grieta salieron goblins, esqueletos, fantasmas y cosas sin nombre. Los mineros que sobrevivieron dejaron trampas en los pasillos para frenarlos: pinchos, flechas y losas que se hunden.',
  },
  {
    n: 'VII', title: 'La Noche Larga', sub: 'La caída de los reyes', dragon: 'gold',
    text: 'La oscuridad se derramó sobre el reino. Los ejércitos de los cuatro reyes pelearon durante una noche que duró un año entero. Uno por uno, los castillos cayeron. Y los reyes, tocados por el aliento de Umbra, se convirtieron en sus monstruos: el Rey Goblin, el Liche, el Demonio de Lava y el Demonio de Escarcha. Desde entonces, cuando cae la noche, los monstruos salen a cazar, y solo dormir bajo un techo propio protege del amanecer que no llega.',
  },
  {
    n: 'VIII', title: 'La profecía', sub: 'Los que caen con el rayo', dragon: 'dark',
    text: 'Los sabios que quedaron escribieron una profecía en las piedras del último obelisco: «Cuando la tormenta parta el cielo, caerán del rayo los Mancos. No serán reyes ni magos. Serán torpes, distintos y valientes. Y con sus manos volverán a forjar los cuatro sellos.» Así llegaron Gabriel, el panda guerrero del dragón; Trebord, de cabeza fría; el Pibe, rápido y sonriente; Willito, el pajarito que vuela bajito; Ñañan, el de las alas cósmicas; Fabiño, la lagartija veloz; y la estirpe de Trus, Sutrus y Sucutrus, hijos del mismo cristal que late en el Corazón.',
  },
  {
    n: 'IX', title: 'Tu camino', sub: 'Lo que está por venir', dragon: 'gold',
    text: 'Construí tu casa para pasar las noches. Talá, minería y cociná para hacerte fuerte. Forjá armas con el oro del dragón. Bajá los cien pisos de cada castillo, vencé a los reyes caídos y recuperá los cuatro sellos. Dicen que cuando los cuatro castillos sean conquistados, en el fondo del abismo se abrirá un último camino… y que Umbra, por primera vez en mil años, abrirá los ojos.',
  },
];

// Personajes (todos GRATIS por ahora). Descripciones tomadas de la profecía.
export const CHARACTERS = [
  { id: 'gabriel', name: 'Gabriel', desc: 'Panda guerrero del dragón · +20% vida' },
  { id: 'trebord', name: 'Trebord', desc: 'De cabeza fría' },
  { id: 'el-pibe', name: 'El Pibe', desc: 'Rápido y sonriente' },
  { id: 'willito', name: 'Willito', desc: 'El pajarito que vuela bajito' },
  { id: 'nanan', name: 'Ñañan', desc: 'El de las alas cósmicas' },
  { id: 'fabino', name: 'Fabiño', desc: 'La lagartija veloz' },
  { id: 'trus', name: 'Trus', desc: 'Hijo del cristal del Corazón' },
  { id: 'sutrus', name: 'Sutrus', desc: 'De la estirpe de Trus' },
  { id: 'sucutrus', name: 'Sucutrus', desc: 'De la estirpe de Trus, con alas' },
  { id: 'gabriel-rojo', name: 'Gabriel Rojo', desc: 'Variante de Gabriel' },
  { id: 'trebord-ninja', name: 'Trebord Ninja', desc: 'Variante de Trebord' },
  { id: 'pibe-rojo', name: 'Pibe Rojo', desc: 'Variante del Pibe' },
  { id: 'willito-dorado', name: 'Willito Dorado', desc: 'Variante de Willito' },
];

// Castillos y reyes caídos
export const BOSSES = [
  { castle: 'Castillo del Bosque', boss: 'Rey Goblin', icon: 'crown', tone: 'forest', text: 'El primer rey en caer. Gobierna entre raíces, telarañas y trampas de pinchos.' },
  { castle: 'Cripta de Huesos', boss: 'El Liche', icon: 'skull', tone: 'bone', text: 'Un rey que se negó a morir. Sus pasillos están llenos de esqueletos y fantasmas.' },
  { castle: 'Fortaleza de Lava', boss: 'Demonio de Lava', icon: 'flame', tone: 'lava', text: 'Cien pisos de calor y piedra fundida. Forjá buenas armas antes de bajar.' },
  { castle: 'Ciudadela Helada', boss: 'Demonio de Escarcha', icon: 'snow', tone: 'ice', text: 'El último sello duerme bajo el hielo. Nadie volvió del piso cien… todavía.' },
];

export const FEATURES = [
  { title: 'Cada mapa es distinto', text: 'Las islas se generan de nuevo en cada partida: bosques, desiertos, nieve, ríos y obeliscos de cristal que curan.', shot: shot(1), color: 'green' },
  { title: 'Cien pisos por castillo', text: 'Bajá escaleras, esquivá trampas y encontrá bóvedas secretas. Cada diez pisos te espera un guardián.', shot: shot(4), color: 'orange' },
  { title: 'Talá, picá, forjá', text: 'Juntá madera, piedra y oro del dragón. Cociná, equipá armas y armaduras y llená la mochila.', shot: shot(3), color: 'gold' },
  { title: 'Sobreviví la noche', text: 'Cuando oscurece salen los monstruos. Construí tu casa y dormí bajo tu propio techo.', shot: shot(5), color: 'purple' },
];

export const GALLERY = [1, 2, 3, 4, 5].map((n) => ({
  ...shot(n),
  alt: [
    'Gabriel explorando las Tierras de Mancos, con casa, castillo y bosque nevado',
    'Pantalla de selección de personajes con los 13 Mancos',
    'Mochila con armas, gemas y equipo',
    'Castillo del Bosque, piso 6 de 100, con escalera para bajar',
    'Menú principal de Mancos Land',
  ][n - 1],
}));
