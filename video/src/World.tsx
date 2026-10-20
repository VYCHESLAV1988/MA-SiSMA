import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

const P = {
  ivory: "#fff4df",
  peach: "#ffab8f",
  coral: "#f46976",
  teal: "#267c7b",
  plum: "#2f243a",
  olive: "#778866",
  paleTeal: "#cee3d7",
};

const Windows: React.FC<{
  x: number;
  y: number;
  cols: number;
  rows: number;
  dx?: number;
  dy?: number;
}> = ({ x, y, cols, rows, dx = 80, dy = 114 }) => (
  <g stroke={P.plum} strokeWidth={5} strokeLinejoin="round">
    {Array.from({ length: rows }, (_, row) =>
      Array.from({ length: cols }, (_, col) => (
        <g
          key={`${row}-${col}`}
          transform={`translate(${x + col * dx} ${y + row * dy})`}
        >
          <rect
            width={46}
            height={65}
            rx={6}
            fill={row % 2 ? "#f7d2b3" : "#e9eee0"}
          />
          <path d="M23 4V61" opacity={0.55} />
          <path d="M-6 67H52" strokeWidth={7} />
        </g>
      )),
    )}
  </g>
);

const ApartmentBlock: React.FC<{ x?: number }> = ({ x = 0 }) => (
  <g transform={`translate(${x} 0)`}>
    <g stroke={P.plum} strokeWidth={6} strokeLinejoin="round">
      <path d="M-70 1390V742L168 727V1390Z" fill="#e5d8b9" />
      <path d="M-78 742H177V773H-78Z" fill="#b7c6af" />
      <path d="M154 1400V547H453V1400Z" fill="#f5c2a8" />
      <path d="M138 544H468V580H138Z" fill={P.ivory} />
      <path d="M455 1400V835H700V1400Z" fill="#a8c6b8" />
      <path d="M441 817H711V854H441Z" fill="#dce4cc" />
      <path d="M694 1400V650H1008V1400Z" fill="#f7d88c" />
      <path d="M680 633H1022V673H680Z" fill="#e2b776" />
      <path d="M1000 1400V946H1165V1400Z" fill="#eeb8b1" />
      <path d="M212 544V504H304V544" fill="#e7dfcd" />
      <path d="M340 544V503H413V544" fill="#c6d6cd" />
      <path d="M350 503V469M338 470H362" fill="none" strokeWidth={4} />
      <path d="M779 631V593H867V631" fill="#dddcc6" />
    </g>
    <Windows x={-20} y={819} cols={2} rows={4} dx={86} />
    <Windows x={200} y={635} cols={3} rows={5} dx={82} dy={122} />
    <Windows x={490} y={918} cols={3} rows={3} dx={71} dy={120} />
    <Windows x={744} y={735} cols={3} rows={5} dx={88} dy={116} />
    <Windows x={1032} y={1017} cols={2} rows={3} dx={77} />
    <g fill={P.teal} stroke={P.plum} strokeWidth={6}>
      <path d="M206 1390V1266Q206 1214 260 1214Q314 1214 314 1266V1390Z" />
      <rect x={500} y={1290} width={108} height={110} rx={7} />
      <rect x={807} y={1301} width={91} height={100} rx={7} />
    </g>
    <g fill={P.ivory} opacity={0.7}>
      <rect x={228} y={1260} width={24} height={83} rx={7} />
      <rect x={270} y={1260} width={24} height={83} rx={7} />
      <rect x={517} y={1308} width={74} height={47} rx={5} />
    </g>
    <g stroke={P.plum} strokeWidth={5} strokeLinecap="round" fill="none">
      <path d="M178 897H448M178 902V949M448 902V949" />
      <path d="M722 998H983M722 998V1040M983 998V1040" />
      <path d="M477 1140H681" />
    </g>
    <g fill={P.coral}>
      <rect x={201} y={912} width={72} height={22} rx={5} />
      <rect x={339} y={912} width={72} height={22} rx={5} />
      <rect x={755} y={1010} width={76} height={20} rx={5} />
    </g>
    <g fill={P.olive}>
      <ellipse cx={219} cy={909} rx={10} ry={20} />
      <ellipse cx={246} cy={907} rx={12} ry={24} />
      <ellipse cx={361} cy={907} rx={12} ry={22} />
      <ellipse cx={389} cy={905} rx={11} ry={25} />
      <ellipse cx={779} cy={1005} rx={13} ry={23} />
      <ellipse cx={808} cy={1009} rx={11} ry={20} />
    </g>
  </g>
);

const Palm: React.FC<{ x: number; y: number; scale?: number }> = ({
  x,
  y,
  scale = 1,
}) => (
  <g
    transform={`translate(${x} ${y}) scale(${scale})`}
    stroke={P.plum}
    strokeWidth={6}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M-23 423Q-12 214 16 3L46 6Q22 223 20 423Z" fill="#c88f6d" />
    <path
      d="M-14 357L21 371M-10 307L25 321M-4 255L30 269M2 201L35 216M9 146L40 162M17 87L44 103"
      opacity={0.4}
    />
    <path d="M31 8Q-84-127-201-16Q-84-40 31 8Z" fill={P.olive} />
    <path d="M31 8Q-37-179 112-178Q57-97 31 8Z" fill="#7f9b73" />
    <path d="M31 8Q152-137 235-45Q126-53 31 8Z" fill={P.teal} />
    <path d="M31 8Q147-20 198 116Q101 37 31 8Z" fill="#769a72" />
    <path d="M31 8Q-73-27-145 111Q-105 19 31 8Z" fill={P.teal} />
    <path d="M31 8Q2-116-113-151Q-45-52 31 8Z" fill="#9cb582" />
    <circle cx={19} cy={22} r={16} fill="#9e7058" />
    <circle cx={47} cy={26} r={17} fill="#b2825e" />
  </g>
);

export const CityBackground: React.FC<{ moving?: boolean }> = ({
  moving = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const shift = moving ? -(((frame / fps) * 85) % 1080) : 0;
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1080 1920"
      preserveAspectRatio="xMidYMid slice"
      aria-label="Warm Israeli city street"
    >
      <rect width={1080} height={1920} fill={P.ivory} />
      <circle cx={885} cy={359} r={158} fill="#f8d985" />
      <circle
        cx={885}
        cy={359}
        r={181}
        fill="none"
        stroke="#f8d985"
        strokeWidth={3}
      />
      <g fill="#fffdf4" stroke="#e8ddc5" strokeWidth={3}>
        <path d="M-40 393Q-40 352 3 348Q20 298 69 327Q102 307 124 350Q171 345 177 386Q177 401 153 401H-18Q-40 401-40 393Z" />
        <path d="M386 266Q386 230 421 227Q442 177 487 206Q521 185 543 226Q584 228 584 260Q584 276 561 276H407Q386 276 386 266Z" />
      </g>
      <g fill="#dce1cd" opacity={0.7}>
        <rect x={-20} y={677} width={205} height={704} rx={8} />
        <rect x={170} y={477} width={220} height={920} rx={8} />
        <rect x={531} y={714} width={191} height={684} rx={8} />
        <rect x={853} y={555} width={274} height={843} rx={8} />
      </g>
      <g transform={`translate(${shift} 0)`}>
        <ApartmentBlock x={-1080} />
        <ApartmentBlock />
        <ApartmentBlock x={1080} />
      </g>
      <rect x={0} y={1395} width={1080} height={525} fill="#ebd7bd" />
      <path d="M0 1400H1080" stroke={P.plum} strokeWidth={7} />
      <path
        d="M0 1565H1080M0 1705H1080M0 1855H1080"
        stroke="#d9c6ae"
        strokeWidth={4}
      />
      <g stroke="#d9c6ae" strokeWidth={4}>
        <path d="M83 1400L14 1920M367 1400L331 1920M652 1400L679 1920M938 1400L1033 1920" />
      </g>
      <g transform={`translate(${moving ? shift * 1.15 : 0} 0)`}>
        <Palm x={970} y={940} scale={1.08} />
        {moving ? <Palm x={2050} y={940} scale={1.08} /> : null}
      </g>
      <g fill={P.teal} stroke={P.plum} strokeWidth={5}>
        <path d="M26 1389L43 1304H118L135 1389Z" />
        <path
          d="M43 1304Q24 1268 42 1239Q64 1259 75 1299Q69 1233 98 1214Q123 1242 90 1303Q130 1267 148 1285Q139 1309 118 1314"
          fill={P.olive}
        />
      </g>
    </svg>
  );
};

export const Car: React.FC<{ color?: string; driver?: boolean }> = ({
  color = P.coral,
  driver = false,
}) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 700 400"
    aria-label="Coral compact hatchback"
  >
    <ellipse cx={352} cy={348} rx={287} ry={21} fill={P.plum} opacity={0.12} />
    <g
      stroke={P.plum}
      strokeWidth={7}
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      <path
        d="M65 215L98 181L149 164L203 92Q218 75 245 75H423Q457 75 482 102L544 171L606 186Q636 196 646 225L655 282Q655 301 635 306H74Q51 304 51 283V243Q51 224 65 215Z"
        fill={color}
      />
      <path d="M178 167L220 111Q228 100 246 100H321V167Z" fill="#cae4db" />
      <path d="M344 100H420Q441 100 457 118L499 167H344Z" fill="#c0ddd7" />
      <path
        d="M219 107L194 157M361 106L345 137"
        stroke="#f7fcf2"
        strokeWidth={9}
        opacity={0.8}
      />
      {driver ? (
        <g strokeWidth={3}>
          <path
            d="M397 166Q392 146 394 132Q398 110 419 112Q444 114 440 149L437 167Z"
            fill={P.plum}
          />
          <path
            d="M405 167V152Q397 138 403 127Q409 115 424 121Q436 127 431 143Q430 151 420 153V167"
            fill="#e9aa8b"
          />
          <path
            d="M398 132Q394 112 414 110Q434 109 440 128Q423 122 418 115Q410 131 398 132Z"
            fill={P.plum}
          />
          <path d="M389 168Q404 153 421 157L444 167" fill="#d9bc89" />
          <circle cx={425} cy={134} r={2.2} fill={P.plum} stroke="none" />
          <path d="M429 141L436 144L429 147" fill="none" strokeWidth={2} />
        </g>
      ) : null}
      <path
        d="M329 181V281M514 182L529 270M169 186L150 253"
        fill="none"
        strokeWidth={4}
        opacity={0.7}
      />
      <path d="M348 196H381M203 196H234" strokeWidth={8} />
      <path
        d="M77 236H106V269H58M616 218H642L648 246H618Z"
        fill="#fff1be"
        strokeWidth={5}
      />
      <path d="M95 181L72 205H98L120 184Z" fill="#ea6776" strokeWidth={4} />
      <path
        d="M487 169L501 151Q509 145 521 153L525 165Q524 174 514 174H491"
        fill={color}
        strokeWidth={5}
      />
      <path d="M63 286H101M604 286H652" stroke="#dbe6df" strokeWidth={10} />
      <path d="M229 277H481" stroke="#fff0e5" strokeWidth={5} opacity={0.65} />
      <path d="M149 174H510" stroke="#ffe8d5" strokeWidth={5} opacity={0.8} />
      <path
        d="M114 306V289Q116 245 165 245Q214 245 219 289V306M486 306V289Q489 245 539 245Q588 245 592 289V306"
        fill={P.plum}
      />
      <g fill={P.plum}>
        <circle cx={168} cy={302} r={48} />
        <circle cx={539} cy={302} r={48} />
      </g>
      <g fill="#dce4dc" strokeWidth={6}>
        <circle cx={168} cy={302} r={27} />
        <circle cx={539} cy={302} r={27} />
      </g>
      <g fill={P.teal} strokeWidth={3}>
        <circle cx={168} cy={302} r={9} />
        <circle cx={539} cy={302} r={9} />
      </g>
      <path d="M610 260H630" strokeWidth={4} />
      <rect
        x={57}
        y={270}
        width={42}
        height={13}
        rx={4}
        fill="#f7d573"
        strokeWidth={3}
      />
    </g>
  </svg>
);

export const OfficeBackground: React.FC = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 1080 1920"
    preserveAspectRatio="xMidYMid slice"
    aria-label="Office entrance with glass door and intercom"
  >
    <rect width={1080} height={1920} fill={P.ivory} />
    <rect y={224} width={1080} height={1322} fill="#e7ddc6" />
    <path
      d="M0 393H1080M0 731H1080M0 1069H1080M0 1407H1080"
      stroke="#d1c8b2"
      strokeWidth={4}
    />
    <path d="M64 224V1547M1019 224V1547" stroke="#d1c8b2" strokeWidth={4} />
    <rect
      x={126}
      y={366}
      width={686}
      height={1191}
      rx={24}
      fill={P.plum}
      opacity={0.12}
    />
    <g stroke={P.plum} strokeWidth={7} strokeLinejoin="round">
      <rect x={109} y={343} width={686} height={1191} rx={22} fill={P.olive} />
      <rect x={142} y={377} width={620} height={1128} rx={11} fill={P.teal} />
      <path d="M162 398H742V1443H162Z" fill="#aac8ba" />
      <path d="M166 933H739M465 398V1443" fill="none" strokeWidth={12} />
      <path d="M173 415H446V915H173Z" fill="#bfd8c7" stroke="none" />
      <path d="M485 415H727V915H485Z" fill="#aac8ba" stroke="none" />
      <path d="M177 949H446V1427H177Z" fill="#b5cdbb" stroke="none" />
      <path d="M486 949H726V1427H486Z" fill="#97b9ac" stroke="none" />
      <path
        d="M213 419L175 556M333 419L175 883M546 419L489 575M727 634L634 915"
        stroke="#f8fbeb"
        strokeWidth={20}
        opacity={0.38}
      />
      <path d="M494 1017V1198" stroke={P.plum} strokeWidth={17} />
      <path d="M494 1017V1198" stroke="#f9ddb0" strokeWidth={9} />
      <rect x={298} y={490} width={301} height={104} rx={15} fill={P.ivory} />
    </g>
    <text
      x={450}
      y={557}
      textAnchor="middle"
      fill={P.plum}
      fontSize={42}
      fontWeight={800}
      fontFamily="Arial, sans-serif"
      direction="rtl"
    >
      בוקר טוב
    </text>
    <g stroke={P.plum} strokeWidth={6}>
      <rect x={844} y={797} width={145} height={332} rx={25} fill="#aab4a6" />
      <rect x={858} y={811} width={117} height={305} rx={15} fill="#f4ebd8" />
      <rect x={875} y={831} width={82} height={58} rx={7} fill={P.plum} />
      <circle cx={916} cy={858} r={14} fill="#7cafa8" strokeWidth={3} />
      <circle cx={916} cy={858} r={5} fill="#d5e5c7" stroke="none" />
      <path d="M882 925H951M882 939H951M882 953H951" strokeWidth={4} />
      <circle cx={917} cy={1033} r={29} fill={P.coral} />
      <circle cx={917} cy={1033} r={15} fill={P.peach} strokeWidth={3} />
    </g>
    <g fill={P.olive} stroke={P.plum} strokeWidth={6} strokeLinejoin="round">
      <path d="M854 1545L830 1394H1016L991 1545Z" fill="#d89c7d" />
      <path d="M925 1396Q846 1332 835 1239Q901 1248 925 1396Z" />
      <path d="M924 1392Q910 1262 951 1173Q1003 1243 924 1392Z" fill={P.teal} />
      <path d="M929 1393Q961 1301 1035 1278Q1045 1348 929 1393Z" />
      <path d="M923 1391Q866 1379 833 1339Q873 1318 923 1391Z" fill="#a3b17d" />
    </g>
    <path d="M0 1547H1080V1920H0Z" fill="#edcfb2" />
    <path d="M0 1547H1080" stroke={P.plum} strokeWidth={7} />
    <path
      d="M0 1740H1080M171 1549L48 1920M492 1549L467 1920M808 1549L937 1920"
      stroke="#d6b89f"
      strokeWidth={4}
    />
    <path
      d="M105 1549H798V1581H105Z"
      fill="#8b977b"
      stroke={P.plum}
      strokeWidth={6}
    />
    <rect
      x={220}
      y={1633}
      width={446}
      height={126}
      rx={14}
      fill={P.teal}
      opacity={0.92}
    />
    <g stroke="#7caf9f" strokeWidth={4} opacity={0.6}>
      <path d="M242 1660H644M242 1684H644M242 1708H644M242 1732H644" />
    </g>
  </svg>
);

export const GuardPortrait: React.FC<{ shouting?: boolean }> = ({
  shouting = false,
}) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 400 400"
    aria-label="Mustached office security guard"
  >
    <g
      stroke={P.plum}
      strokeWidth={6}
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      <path
        d="M53 400L69 335Q76 308 128 294L174 284H230L281 296Q331 309 341 339L355 400Z"
        fill={P.teal}
      />
      <path d="M173 253V289L202 320L230 288V253" fill="#dc9b75" />
      <path d="M174 283L201 321L163 346L134 296Z" fill="#d7dfcb" />
      <path d="M230 283L201 321L239 346L268 296Z" fill="#d7dfcb" />
      <path d="M201 322L190 343L195 400H211L216 343Z" fill={P.plum} />
      <path
        d="M132 144Q111 139 110 161Q109 184 129 188M273 145Q294 139 295 161Q296 184 275 188"
        fill="#e8b28b"
      />
      <path
        d="M128 126Q124 86 164 67Q197 50 235 68Q277 90 276 130L271 204Q269 238 238 259Q205 280 172 259Q136 238 132 204Z"
        fill="#edb892"
      />
      <path
        d="M128 137Q119 94 144 74Q180 40 235 63Q279 81 278 138L259 119Q258 86 228 83Q177 94 142 114L142 144Z"
        fill={P.plum}
      />
      <path
        d={
          shouting
            ? "M146 134L179 147M226 147L260 134"
            : "M146 143Q161 131 179 140M226 140Q246 130 260 141"
        }
        fill="none"
        strokeWidth={9}
      />
      <path
        d="M156 158Q167 147 177 158M232 158Q242 148 253 158"
        fill="none"
        strokeWidth={5}
      />
      <circle cx={168} cy={160} r={4} fill={P.plum} stroke="none" />
      <circle cx={243} cy={160} r={4} fill={P.plum} stroke="none" />
      <path
        d="M201 154L192 184Q204 192 217 184"
        fill="#e3a27b"
        strokeWidth={4}
      />
      <path
        d="M154 205Q170 182 198 196Q209 185 229 192Q246 195 255 211Q228 218 205 207Q178 223 154 205Z"
        fill={P.plum}
        strokeWidth={3}
      />
      {shouting ? (
        <ellipse
          cx={204}
          cy={230}
          rx={21}
          ry={16}
          fill="#6a3145"
          strokeWidth={4}
        />
      ) : (
        <path d="M183 226Q203 239 226 225" fill="#a55e5a" strokeWidth={4} />
      )}
      <path
        d="M178 239Q205 250 231 238"
        fill="none"
        stroke="#da9774"
        strokeWidth={3}
      />
      <path
        d="M120 108L119 70Q123 47 159 36Q199 23 246 36Q278 46 283 69L282 108Z"
        fill={P.teal}
      />
      <path d="M119 94H282V112H119Z" fill={P.plum} />
      <path
        d="M114 110Q203 94 291 110Q274 130 202 132Q136 132 114 110Z"
        fill="#315d5a"
      />
      <path
        d="M202 47L222 59L217 81L202 91L187 81L181 59Z"
        fill="#f3d278"
        strokeWidth={4}
      />
      <path
        d="M202 57L205 66L215 66L207 72L210 82L202 76L194 82L197 72L189 66L199 66Z"
        fill={P.ivory}
        strokeWidth={2}
      />
      <path
        d="M92 316L122 303L145 315L112 329Z"
        fill="#d7dfcb"
        strokeWidth={4}
      />
      <path
        d="M270 305L301 316L280 331L254 315Z"
        fill="#d7dfcb"
        strokeWidth={4}
      />
      <rect
        x={247}
        y={346}
        width={50}
        height={38}
        rx={5}
        fill="#234b4b"
        strokeWidth={4}
      />
      <path
        d="M253 347L255 323L265 323L266 347"
        fill={P.plum}
        strokeWidth={3}
      />
      <path d="M98 354H151V385H98Z" fill="#427f77" strokeWidth={4} />
      <path d="M103 364H146" stroke="#bad3bd" strokeWidth={3} />
      <path d="M83 357L74 400M325 356L333 400" fill="none" strokeWidth={4} />
      <circle cx={224} cy={365} r={4} fill="#d8d4a6" stroke="none" />
      <circle cx={224} cy={391} r={4} fill="#d8d4a6" stroke="none" />
    </g>
  </svg>
);
