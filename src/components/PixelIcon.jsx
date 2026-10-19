// Íconos pixel-art dibujados con <rect>. Cada letra del mapa es un color de la paleta, '.' = vacío.
const ICONS = {
  crown: {
    map: ['..........', '.y..y...y.', '.yy.yy.yy.', '.yyyyyyyy.', '.yryyyyby.', '.yyyyyyyy.', '.oooooooo.', '..........'],
    pal: { y: '#f2c14e', o: '#b7832f', r: '#d64545', b: '#4aa3df' },
  },
  skull: {
    map: ['..wwwwww..', '.wwwwwwww.', '.wkkwwkkw.', '.wkkwwkkw.', '.wwwwwwww.', '..ww.ww...', '..wwwwww..', '..w.w.w...'],
    pal: { w: '#e8e2cf', k: '#7a3fb0' },
  },
  flame: {
    map: ['....r.....', '...rr..r..', '..rro.rr..', '.rrooorr..', '.rooyyorr.', '.royyyyor.', '.rooyyoor.', '..rrooor..'],
    pal: { r: '#d6452b', o: '#f08a24', y: '#ffd84a' },
  },
  snow: {
    map: ['....c.....', '.c..c..c..', '..c.c.c...', '...ccc....', 'cccc.cccc.', '...ccc....', '..c.c.c...', '.c..c..c..'],
    pal: { c: '#9fe3ff' },
  },
  crystal: {
    map: ['...t...', '..ttl..', '.tttll.', '.tttll.', '.tttll.', '..ttl..', '...t...'],
    pal: { t: '#3fc9c0', l: '#a7f3ee' },
  },
};

export default function PixelIcon({ name, size = 48, title }) {
  const { map, pal } = ICONS[name];
  const w = map[0].length;
  const h = map.length;
  const rects = [];
  map.forEach((row, y) =>
    [...row].forEach((ch, x) => {
      if (pal[ch]) rects.push(<rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={pal[ch]} />);
    }),
  );
  return (
    <svg
      className="pixel-icon"
      viewBox={`0 0 ${w} ${h}`}
      width={size}
      height={(size * h) / w}
      shapeRendering="crispEdges"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {rects}
    </svg>
  );
}
