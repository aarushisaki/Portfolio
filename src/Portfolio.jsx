import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Mail, Github, Linkedin, ChevronDown, Moon, Sun, Download } from 'lucide-react';

// ============================================================================
// DATA / CONFIG
// ============================================================================
const PORTFOLIO_DATA = {
  name: "Aarushi Saki",
  title: "Frontend Engineering · Research · Product & Ops",
  positioning: "I work across frontend engineering, research, and operational strategy — translating complex problems into scalable, human-centered solutions.",
  company: "GSoC Innovators Club",
  email: "aarushi.saki13@gmail.com",
  socials: {
    github: "https://github.com/aarushisaki",
    linkedin: "https://linkedin.com/in/aarushisaki"
  },
  projects: [
    {
      id: 1,
      title: "VIT Clubs",
      description: "Designed and implemented a platform to streamline discovery, communication, and engagement across university clubs. Focused on information architecture, user flows, and scalable data structures to support growing communities.",
      year: "2024",
      tags: ["Flask", "MySQL", "Bootstrap", "Full-Stack"],
      link: "https://github.com/aarushisaki/VIT-Clubs",
      color: "from-blue-500/20 to-purple-500/20",
      screenshot: "/public/vitclubs.png"
    },
    {
      id: 2,
      title: "Personal Portfolio",
      description: "Designed and engineered a personal web platform to explore interaction design, motion systems, and information hierarchy. Built with a focus on performance, accessibility, and maintainability as a living frontend system.",
      year: "2025",
      tags: ["HTML/CSS", "TailwindCSS", "Framer Motion", "React"],
      link: "#",
      color: "from-indigo-500/20 to-blue-500/20",
      screenshot: "/public/portfolio.png"
    },
    {
      id: 3,
      title: "Password Checker",
      description: "This project implements a password validation system that evaluates strength criteria and provides dynamic visual feedback as users type. The interface highlights unmet rules and updates in real time, demonstrating my ability to combine logic with interactive frontend behavior. The logic is modular and can be extended with additional validation rules.",
      year: "2025",
      tags: ["HTML/CSS", "JavaScript", "DOM Manipulation"],
      link: "https://github.com/aarushisaki/Password-Checker",
      color: "from-emerald-500/20 to-teal-500/20",
      screenshot: "/public/passwordchecker.png"
    }
  ],
  experience: [
    {
      id: 1,
      role: "President",
      company: "GSoC Innovators Club",
      period: "Sep 2025 – Present",
      impact: [
        "Led organizational scale-up from 14 to 57 members, designing team structures and workflows to support rapid growth.",
        "Owned digital growth initiatives, nearly doubling social media reach and improving engagement through targeted content.",
        "Designed and executed recurring expert-led knowledge sessions, improving member exposure to industry practices.",
        "Implemented a skill-development framework focused on consistent DSA practice to improve long-term member outcomes."
      ]
    },
    {
      id: 2,
      role: "Event Management Co-Lead",
      company: "Cisco Community",
      period: "Jul 2025 – Nov 2025",
      impact: [
        "Managed planning and execution workflows for large student initiatives, optimizing coordination, timelines, and onboarding processes."
      ]
    }
  ],
  stack: {
    Languages: ["Python", "C++", "JavaScript", "SQL (MySQL)", "HTML/CSS"],
    Technologies: ["Flask", "Bootstrap", "WordPress", "REST APIs"],
    Tools: ["VS Code", "GitHub", "Figma", "MATLAB", "Canva"]
  },
  about: [
    {
      text: "I don’t approach my work as a checklist of tasks — I think in systems.",
      hasLinks: false
    },
    {
      text: "I’m drawn to roles where structure matters: shaping interfaces, organizing information, and building processes that don’t collapse when things scale. Whether I’m engineering frontend components, mapping workflows, or supporting leadership initiatives, my focus stays the same — clarity, efficiency, and intent.",
      hasLinks: false
    },
    {
      text: "I’ve led fast-growing student communities, built interactive web platforms, and worked close to execution rather than theory. I care about how things feel to users, how they function behind the scenes, and whether they hold up under real-world use.",
      hasLinks: false
    },
    {
      text: "I’m most effective in environments that value ownership, thoughtful problem-solving, and people who can move between ideas and execution without losing precision.",
      hasLinks: false
    }
  ]
};

// ============================================================================
// THEME CONTEXT
// ============================================================================
const ThemeContext = React.createContext();

const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// ============================================================================
// UTILITY COMPONENTS
// ============================================================================
const NoiseOverlay = () => (
  <div 
    className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay"
    style={{ 
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
    }}
  />
);

const signaturePathData = "M273.846313,248.952026 C269.847656,251.455139 266.003784,253.437256 261.700653,254.325058 C252.506592,256.221924 245.908173,251.455521 244.712082,242.157639 C243.662872,234.001602 244.327652,225.868958 245.299103,217.791245 C248.634293,190.058685 261.332306,165.824509 274.114716,141.643387 C275.042908,139.887436 276.097992,138.198532 277.265045,136.183197 C273.386963,133.202667 268.799561,132.159088 264.650543,130.291367 C262.653381,129.392303 261.870331,131.703171 260.879791,132.882629 C252.956955,142.316589 245.870178,152.465454 236.956436,161.049973 C230.958969,166.825882 224.932205,172.579453 218.722656,178.123642 C215.658005,180.859924 214.208496,183.752304 214.233688,188.032074 C214.359192,209.350143 214.170334,230.666077 215.874832,251.947327 C216.137756,255.230087 215.601517,258.592377 215.276672,261.902405 C214.940445,265.328461 212.881378,267.482971 209.537155,267.849365 C206.195023,268.215485 203.853073,266.434967 202.517761,263.340668 C201.558411,261.117584 201.705597,258.773590 201.672607,256.447510 C201.391495,236.624039 201.119873,216.800430 200.829895,196.977081 C200.813477,195.853104 200.661392,194.731125 200.528412,193.052231 C193.552383,197.415283 186.912048,201.427017 180.423981,205.671509 C175.341248,208.996658 169.846878,211.378876 164.067459,212.985794 C160.921555,213.860519 159.358658,215.549973 158.445404,218.546188 C154.999191,229.852585 151.428726,241.121628 147.831238,252.381180 C145.996628,258.123199 143.434662,263.549347 139.947311,268.479919 C134.321014,276.434662 125.635170,276.181091 120.328896,268.108704 C115.649956,260.990692 113.368439,253.035919 111.836105,244.812210 C111.250114,241.667328 111.599297,238.506775 115.369141,237.608551 C119.084709,236.723251 121.282509,238.672699 122.366928,242.259476 C124.345703,248.804382 126.959450,255.056564 131.950302,261.182281 C145.368576,248.779205 147.813431,231.990036 152.816681,216.521240 C150.407272,214.568176 148.099518,214.991043 146.038589,214.621475 C131.838516,212.074966 122.979683,201.077545 123.679459,186.658844 C124.687508,165.888428 142.404953,146.711945 162.900620,144.233475 C164.050323,144.094467 165.295258,143.857040 166.369324,144.142136 C169.765549,145.043549 170.910049,143.147842 171.449829,140.375549 C174.782013,123.261192 181.251297,107.205750 187.957718,91.223015 C189.970947,86.425079 192.461746,81.954773 195.802734,77.948875 C199.218674,73.853111 203.993683,73.473755 207.968002,77.157578 C211.846695,80.752769 213.529434,85.540535 214.093918,90.531418 C216.268250,109.756012 216.722076,129.039185 215.742386,148.376175 C215.350723,156.106888 215.677979,163.874039 215.677979,172.603821 C232.223755,159.378357 244.992752,143.805328 257.335083,127.476448 C254.764725,124.921570 251.461853,124.058937 248.624069,122.455429 C232.323410,113.244667 224.786972,97.176338 230.429749,82.462830 C235.154327,70.143501 243.123779,60.171551 254.456665,53.263523 C260.720367,49.445435 267.327026,46.117245 275.078156,46.707230 C276.239105,46.795601 277.411621,46.836483 278.554901,47.036140 C290.522949,49.126141 295.397766,55.641811 293.773956,67.794540 C291.909454,81.748558 286.216003,94.282387 278.951416,106.173752 C276.543793,110.114784 274.016144,113.982521 271.467010,118.004265 C275.114014,120.717041 279.006073,121.727409 282.683044,123.172218 C285.346558,124.218819 286.160980,121.991089 287.190277,120.343178 C296.945435,104.724884 308.519867,90.587608 321.620605,77.659439 C326.483032,72.861046 332.267426,69.653717 338.550385,67.321129 C346.266541,64.456451 355.247314,67.950180 359.670258,75.241219 C362.197540,79.407356 364.033539,83.886436 365.139984,88.598083 C366.190338,93.070740 366.823914,97.641266 368.032867,102.308586 C371.217407,93.365715 375.738403,85.099152 379.885406,76.654045 C382.548065,71.231705 385.776733,66.235023 390.079926,61.933647 C399.506744,52.510780 412.065002,53.190029 420.460846,63.717560 C427.860077,72.995392 430.572357,84.223595 433.279633,95.392540 C434.786896,101.610840 435.788361,107.951729 437.452423,114.278923 C442.763245,101.519707 448.697693,89.252327 456.427307,77.961624 C461.976318,69.856140 467.574707,61.713482 476.384766,56.618786 C488.085419,49.852512 498.591614,52.242233 506.239655,63.480564 C509.652313,68.495270 511.569031,74.175476 513.355042,79.915672 C517.980896,94.782578 518.815002,110.303932 521.333313,125.534958 C522.931641,135.201538 523.572327,145.036957 526.203674,154.519531 C527.790527,160.238129 529.572021,161.046585 534.807556,158.246292 C540.559265,155.169861 544.221741,149.861328 547.959900,144.775360 C554.028564,136.518646 557.808594,127.041817 561.899414,117.739304 C562.566040,116.223396 562.663635,114.955460 561.668396,113.550774 C545.053040,90.099998 548.759888,66.542931 561.436584,43.012245 C565.407166,35.641872 570.526733,29.078749 576.287537,23.003183 C580.003784,19.083864 584.685669,17.028950 589.814209,15.955978 C595.040833,14.862488 598.164001,17.577995 598.166016,23.003853 C598.167419,26.904003 596.721252,30.507854 595.592041,34.151646 C588.692383,56.415764 581.865295,78.704231 574.686768,100.878609 C573.181580,105.528008 574.046753,108.657433 577.353271,111.986511 C590.482178,125.205276 606.811768,133.624817 622.720459,142.692795 C633.285156,148.714661 643.896179,154.656219 654.418152,160.751709 C657.732910,162.671997 660.750977,165.069244 663.356567,167.924683 C669.031311,174.143646 668.796997,180.671585 662.463196,186.257980 C657.276184,190.832855 651.074951,193.686768 644.695190,196.242325 C608.697449,210.661896 570.976318,219.096802 533.478333,228.284409 C517.001221,232.321579 500.664154,236.985184 483.911835,239.840561 C482.121094,240.145798 480.245300,240.352768 478.454254,240.167480 C475.268524,239.837967 472.713776,238.319351 471.755737,235.035660 C470.385345,230.338608 473.642609,227.510590 476.394196,224.696228 C478.550262,222.491028 481.255798,222.632202 483.628326,224.571182 C485.767151,226.319229 488.003784,225.763382 490.269135,225.199951 C530.150940,215.280762 570.307007,206.401611 609.692505,194.591949 C622.267334,190.821396 634.682129,186.341690 646.573669,180.638229 C648.620300,179.656647 650.962708,178.956497 652.230713,176.479477 C650.667358,173.545593 647.708435,172.246918 645.039673,170.708755 C627.721436,160.727280 610.347717,150.842270 593.024475,140.869553 C584.760071,136.111862 577.249634,130.317139 570.222961,123.882309 C569.396973,123.125893 568.755615,122.017639 566.828796,122.123619 C563.860229,128.855118 560.895691,135.874695 557.430420,142.664856 C552.599243,152.131760 546.083191,160.329941 539.093689,168.149628 C531.334412,176.830505 519.843689,174.337296 515.071045,163.144455 C511.631287,155.077408 511.191406,146.332138 509.686462,137.828720 C506.329468,118.860367 505.849091,99.390411 499.742401,80.900604 C497.955536,75.490242 495.451965,70.397881 492.488220,65.581390 C488.948303,59.828602 484.232056,58.883141 478.438568,62.279034 C472.209839,65.930046 468.005188,71.614601 463.991974,77.307320 C452.170044,94.076675 443.028839,112.281059 439.000305,132.442352 C437.512054,139.890442 439.302582,147.987030 439.546875,155.789429 C439.969238,169.279465 439.954620,182.750137 437.138031,196.043137 C436.796204,197.656494 436.320831,199.313828 435.534058,200.745621 C433.882141,203.751785 431.275513,205.664459 427.749390,204.891220 C424.197144,204.112244 422.695068,201.399475 422.643494,197.825195 C422.527985,189.818573 422.400940,181.736160 424.491821,173.988968 C427.612213,162.427032 426.007233,150.822723 425.576233,139.241806 C424.937531,122.079666 422.861511,105.091110 417.715179,88.606445 C415.624176,81.908562 413.127167,75.403748 409.066895,69.585609 C404.511658,63.058266 399.658936,62.563053 393.837708,68.195496 C385.846771,75.927307 381.408508,85.847832 377.187561,95.824059 C371.548401,109.152191 368.604736,122.939362 369.235657,137.619904 C370.310425,162.627609 367.393921,187.490906 365.339722,212.369873 C364.886871,217.854340 361.970184,220.781708 357.761047,220.280304 C353.677063,219.793808 351.413422,216.158447 351.976746,210.769073 C354.695679,184.756561 356.346710,158.694214 356.025543,132.520935 C355.849487,118.174599 354.865936,103.929527 351.790283,89.878578 C350.927490,85.936790 349.367188,82.261848 347.586945,78.680862 C345.284363,74.049133 341.627075,72.659332 336.819885,74.637062 C333.265381,76.099419 329.892517,77.947983 327.075409,80.623520 C314.210358,92.842178 303.135834,106.543510 293.476410,121.402748 C292.595367,122.758072 291.373871,124.030426 291.594849,126.347931 C295.334229,128.289749 299.279144,130.343094 303.228271,132.388245 C321.899719,142.057663 328.986359,156.818069 324.790527,177.445328 C321.205505,195.069794 312.008148,209.862000 300.999451,223.635071 C293.289490,233.281097 285.053680,242.467819 273.846313,248.952026 M252.650986,209.083389 C251.518066,216.641449 249.912735,224.190247 250.469040,231.867599 C251.159897,241.401901 255.784790,243.729172 264.127594,239.131317 C273.461060,233.987488 280.931519,226.770874 287.723297,218.651260 C297.960205,206.412903 306.862000,193.394196 311.014496,177.809891 C315.008728,162.819733 311.870697,153.123154 301.369202,146.605560 C297.003418,143.895996 292.190216,141.914383 287.626587,139.514053 C284.469360,137.853439 282.524658,138.699066 280.796387,141.809967 C273.518616,154.909744 266.647308,168.208206 260.994568,182.091736 C257.544586,190.565125 254.585556,199.227158 252.650986,209.083389 M276.465881,98.934883 C278.021210,95.809105 279.802887,92.773270 281.087646,89.539978 C284.389709,81.229851 288.296082,73.086082 287.919739,63.746391 C287.578064,55.267357 283.407898,52.142830 275.528076,55.512512 C261.617249,61.461250 250.854919,71.095528 244.033630,84.726967 C240.338867,92.110481 241.709137,98.914604 247.611725,104.760262 C251.794312,108.902512 256.691223,111.966019 262.095306,114.319527 C264.670532,115.441063 266.320435,115.233826 267.833191,112.639145 C270.427338,108.189682 273.325073,103.917198 276.465881,98.934883 M185.753052,150.631104 C192.357086,155.262772 196.131943,162.397491 201.433853,169.025604 C202.952347,139.902283 203.958603,111.556953 200.282669,82.667595 C197.206009,85.121544 195.883453,87.987450 194.644623,90.822853 C188.375534,105.171387 182.340286,119.598282 178.693802,134.912689 C176.253784,145.160202 176.101089,145.123840 185.753052,150.631104 M196.005402,188.525208 C197.674088,186.880188 201.193085,186.204071 200.192169,183.039734 C196.662537,171.881241 191.564575,161.658508 180.698334,155.762192 C175.839111,153.125458 174.336777,153.882187 173.047226,159.196899 C170.380096,170.189026 167.782135,181.199570 165.333542,192.241989 C164.679153,195.193130 163.160172,198.121414 164.105804,201.647873 C175.764389,199.960464 185.826736,195.045944 196.005402,188.525208 M147.200668,165.699860 C142.820496,171.008041 138.895386,176.568192 137.546249,183.513351 C135.300110,195.075958 141.025055,201.957413 152.766434,202.003433 C155.714203,202.014984 157.234406,201.082565 157.916992,197.963974 C160.833145,184.641068 164.011444,171.375534 167.095764,158.089447 C167.354004,156.977097 167.923874,155.844894 166.400055,154.394470 C159.041092,155.658676 153.112000,159.953781 147.200668,165.699860 M582.868896,35.351040 C575.100342,44.872883 568.967529,55.281746 565.757263,67.239876 C562.877686,77.966003 563.148132,88.429161 568.937622,99.958015 C576.817017,74.631927 584.278870,50.647739 592.126526,25.423527 C587.691956,28.553778 585.705872,31.864660 582.868896,35.351040 z";

const SignatureSVG = ({ animate = false, onComplete, className }) => {
  const pathVariants = {
    hidden: { 
      pathLength: 0, 
      opacity: 0,
      fillOpacity: 0 
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      fillOpacity: 1,
      transition: {
        pathLength: { duration: 2.5, ease: "easeInOut" },
        fillOpacity: { delay: 2.2, duration: 0.8 },
        opacity: { duration: 0.1 }
      }
    }
  };

  return (
    <motion.svg
      viewBox="0 0 720 304"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <motion.path
        d={signaturePathData}
        variants={animate ? pathVariants : undefined}
        initial={animate ? "hidden" : undefined}
        animate={animate ? "visible" : undefined}
        onAnimationComplete={onComplete}
        stroke="currentColor"
        strokeWidth="1"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </motion.svg>
  );
};

// ============================================================================
// SECTION COMPONENTS
// ============================================================================

const Hero = () => {
  const { scrollY } = useScroll();
  
  const yImg = useTransform(scrollY, [0, 500], [0, 100]);
  const opacityImg = useTransform(scrollY, [0, 500], [1, 0.2]);
  const yText = useTransform(scrollY, [0, 500], [0, -50]);
  const opacityText = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.98]);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center pt-20 md:pt-24">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 animate-gradient" />
      
      <motion.div 
        style={{ y: yImg, opacity: opacityImg }}
        className="absolute right-[-10%] md:right-0 bottom-0 h-[85vh] w-auto md:w-[45vw] z-0 select-none pointer-events-none"
      >
        <div className="relative w-full h-full overflow-hidden">
        {/* Background fill so transparency doesn’t show */}
        <div className="absolute inset-0 bg-bg-primary" />

        <img
            src="/public/aarushi.jpg"
            alt="Aarushi Saki"
            className="
            absolute bottom-0 right-[-10%]
            h-[115%] w-auto
            object-cover
            contrast-125
            brightness-100
            opacity-100
            transition-all duration-700
            "
            style={{
            maskImage: 'linear-gradient(to left, black 85%, transparent)',
            WebkitMaskImage: 'linear-gradient(to left, black 85%, transparent)',
            }}
        />

        {/* Depth & blending */}
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-bg-primary/40 to-bg-primary" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent" />
        </div>
      </motion.div>

      <motion.div 
        style={{ y: yText, opacity: opacityText, scale }}
        className="relative z-10 px-6 md:px-20 max-w-4xl w-full"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-serif text-text-primary leading-[0.85] tracking-tight mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {PORTFOLIO_DATA.name}
          </motion.h1>
        </motion.div>
        
        <motion.div 
          className="space-y-8 max-w-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className="text-xl md:text-2xl font-sans font-light text-text-secondary leading-relaxed">
            {PORTFOLIO_DATA.positioning}
          </p>
          
          <div className="flex flex-col gap-6 pt-2">
            <div className="flex flex-col gap-2">
              <motion.div 
                className="h-px w-12 bg-accent"
                initial={{ width: 0 }}
                animate={{ width: 48 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              />
              <p className="text-sm font-mono text-text-tertiary uppercase tracking-widest">
                {PORTFOLIO_DATA.title}
              </p>
            </div>

            <motion.a
              href="/public/resume.pdf"
              download="Aarushi_Saki_Resume.pdf"
              className="inline-flex w-fit items-center gap-3 px-6 py-3 bg-accent text-bg-primary font-mono text-sm uppercase tracking-wider rounded-full hover:bg-primary hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Download size={18} className="group-hover:animate-bounce" />
              Download Resume
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

const Projects = () => {
  return (
    <section id="work" className="py-32 px-6 md:px-20 bg-bg-secondary relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-baseline justify-between mb-20 border-b border-border pb-4">
          <h2 className="text-sm font-mono text-text-tertiary uppercase tracking-widest">[01] Selected Works</h2>
          <motion.div
            className="h-1 w-20 bg-accent rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />
        </div>

        <div className="grid grid-cols-1 gap-y-32">
          {PORTFOLIO_DATA.projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group relative grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start"
            >
              <div className="hidden md:block md:col-span-1 text-4xl font-serif text-text-tertiary/30 group-hover:text-accent transition-colors duration-500">
                {`0${index + 1}`}
              </div>

              <div className="md:col-span-6 space-y-6 z-10">
                <motion.h3 
                  className="text-3xl md:text-5xl font-serif text-text-primary"
                  whileHover={{ x: 8 }}
                  transition={{ duration: 0.3 }}
                >
                  {project.title}
                </motion.h3>
                <p className="text-lg font-sans font-light text-text-secondary leading-relaxed max-w-md">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  {project.tags.map(tag => (
                    <motion.span 
                      key={tag} 
                      className="px-4 py-2 bg-bg-tertiary border border-border text-text-tertiary text-xs tracking-wider uppercase rounded-full hover:border-accent hover:text-accent transition-all cursor-default"
                      whileHover={{ scale: 1.05, y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
                <div className="pt-4">
                  <motion.a 
                    href={project.link} 
                    className="inline-flex items-center gap-2 text-sm font-mono text-text-primary hover:text-accent transition-colors border-b border-text-primary hover:border-accent pb-0.5 group/link"
                    whileHover={{ x: 4 }}
                  >
                    VIEW IN GITHUB 
                    <ArrowUpRight size={14} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                  </motion.a>
                </div>
              </div>
              
              <motion.div 
                className="md:col-span-5 relative aspect-[4/3] bg-bg-tertiary border border-border overflow-hidden rounded-xl group-hover:border-accent/50 transition-all duration-700"
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ duration: 0.4 }}
              >
                {project.screenshot ? (
                  <img
                    src={project.screenshot}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <>
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.color} group-hover:scale-110 transition-transform duration-700`} />
                    <div className="absolute inset-0 flex items-center justify-center text-text-tertiary/50 font-mono text-xs backdrop-blur-sm">
                      [PROJECT PREVIEW – {project.title.toUpperCase()}]
                    </div>
                  </>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center pt-20 border-t border-border mt-20">
          <motion.a 
            href="https://github.com/aarushisaki" 
            className="inline-flex items-center gap-2 text-sm font-sans text-text-secondary hover:text-accent transition-colors border-b border-text-secondary hover:border-accent pb-0.5 group/link"
            whileHover={{ x: 2 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            More on GitHub
            <ArrowUpRight size={14} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
          </motion.a>
        </div>
      </div>
    </section>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="py-32 px-6 md:px-20 bg-bg-primary relative z-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
        <div>
          <div className="flex items-baseline justify-between mb-12 border-b border-border pb-4">
            <h2 className="text-sm font-mono text-text-tertiary uppercase tracking-widest">[02] Experience</h2>
            <motion.div
              className="h-1 w-12 bg-primary rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
          </div>
          <div className="space-y-16">
            {PORTFOLIO_DATA.experience.map((role) => (
              <motion.div 
                key={role.id} 
                className="group relative pl-6 border-l-2 border-border hover:border-accent transition-colors duration-500"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="absolute -left-[9px] top-0 w-4 h-4 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex justify-between items-baseline mb-2 flex-wrap gap-2">
                  <h4 className="text-xl font-serif text-text-primary group-hover:text-accent transition-colors">{role.company}</h4>
                  <span className="text-xs font-mono text-text-tertiary bg-bg-tertiary px-3 py-1 rounded-full">{role.period}</span>
                </div>
                <div className="text-base text-text-secondary font-medium mb-4">{role.role}</div>
                <ul className="space-y-3">
                  {role.impact.map((item, i) => (
                    <motion.li 
                      key={i} 
                      className="text-sm font-sans font-light text-text-tertiary leading-relaxed flex items-start gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                    >
                      <span className="text-accent mt-1.5 text-xs">▸</span>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-baseline justify-between mb-12 border-b border-border pb-4">
            <h2 className="text-sm font-mono text-text-tertiary uppercase tracking-widest">[03] Capabilities</h2>
            <motion.div
              className="h-1 w-12 bg-primary rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
          </div>
          <div className="grid grid-cols-1 gap-10">
            {Object.entries(PORTFOLIO_DATA.stack).map(([category, tools], idx) => (
              <motion.div 
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-bg-tertiary p-6 rounded-xl border border-border hover:border-accent/50 transition-all duration-500"
              >
                <h4 className="text-sm font-bold text-accent uppercase mb-4 tracking-wider">{category}</h4>
                <div className="flex flex-wrap gap-2">
                  {tools.map(tool => (
                    <motion.span 
                      key={tool} 
                      className="px-3 py-1.5 bg-bg-secondary text-text-secondary text-xs rounded-lg hover:bg-accent/10 hover:text-accent transition-colors cursor-default"
                      whileHover={{ scale: 1.05, y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      {tool}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-32 px-6 md:px-20 bg-bg-secondary text-text-primary relative z-10 overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-[200px]" />
      
      <div className="max-w-6xl mx-auto">
        <div className="flex items-baseline justify-between mb-20 border-b border-border pb-4">
          <h2 className="text-sm font-mono text-text-tertiary uppercase tracking-widest">[04] About Me</h2>
          <motion.div
            className="h-1 w-20 bg-accent rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.0, ease: "easeOut" }}
          className="max-w-[720px] mx-auto space-y-12 relative"
        >
          {PORTFOLIO_DATA.about.map((paragraph, index) => (
            <motion.p 
              key={index} 
              className="text-xl md:text-2xl font-serif leading-relaxed text-text-primary"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              {paragraph.text}
              {paragraph.hasLinks === undefined && paragraph.links && paragraph.links.map((link, i) => (
                <React.Fragment key={i}>
                  <a 
                    href={link.url} 
                    className="border-b-2 border-accent/30 hover:border-accent transition-colors cursor-pointer text-accent hover:text-primary font-medium"
                  >
                    {link.text}
                  </a>
                  {link.prefix}
                </React.Fragment>
              ))}
              {paragraph.suffix}
            </motion.p>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <footer id="contact" className="py-20 px-6 md:px-20 bg-bg-primary text-text-secondary relative z-10 border-t border-border">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        <motion.h2 
          className="text-5xl md:text-7xl font-serif text-text-primary"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Let's build something <span className="text-accent">enduring</span>.
        </motion.h2>
        
        <motion.div 
          className="flex justify-center gap-12 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <a href={`mailto:${PORTFOLIO_DATA.email}`} className="flex flex-col items-center gap-2 group">
            <motion.div 
              className="p-4 rounded-full border-2 border-border group-hover:border-accent group-hover:bg-accent/10 transition-all"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <Mail size={24} className="text-text-tertiary group-hover:text-accent transition-colors" />
            </motion.div>
            <span className="text-xs font-mono uppercase tracking-widest text-text-tertiary group-hover:text-accent transition-colors">Email</span>
          </a>
          <a href={PORTFOLIO_DATA.socials.github} className="flex flex-col items-center gap-2 group">
            <motion.div 
              className="p-4 rounded-full border-2 border-border group-hover:border-primary group-hover:bg-primary/10 transition-all"
              whileHover={{ scale: 1.1, rotate: -5 }}
              transition={{ duration: 0.3 }}
            >
              <Github size={24} className="text-text-tertiary group-hover:text-primary transition-colors" />
            </motion.div>
            <span className="text-xs font-mono uppercase tracking-widest text-text-tertiary group-hover:text-primary transition-colors">GitHub</span>
          </a>
          <a href={PORTFOLIO_DATA.socials.linkedin} className="flex flex-col items-center gap-2 group">
            <motion.div 
              className="p-4 rounded-full border-2 border-border transition-all"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <Linkedin size={24} className="text-text-tertiary transition-colors" />
            </motion.div>
            <span className="text-xs font-mono uppercase tracking-widest text-text-tertiary transition-colors">LinkedIn</span>
          </a>
        </motion.div>

        <motion.div 
          className="pt-24 flex justify-between items-end border-t border-border text-xs font-mono text-text-tertiary flex-wrap gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div>&copy; {new Date().getFullYear()} {PORTFOLIO_DATA.name}</div>
          <div className="text-right">
            This website was overthought.<br/>
            On purpose.
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

// ============================================================================
// NAVIGATION
// ============================================================================

const Navigation = () => {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 md:py-5 backdrop-blur-xl border-b transition-all duration-500 ${
        scrolled 
          ? 'bg-bg-primary/80 border-border shadow-lg' 
          : 'bg-transparent border-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="flex-1 flex justify-start gap-8 text-[11px] font-bold tracking-[0.2em] uppercase text-text-tertiary">
        <motion.a 
          href="#work" 
          className="hover:text-accent transition-colors relative group"
          whileHover={{ y: -2 }}
        >
          Work
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
        </motion.a>
        <motion.a 
          href="#experience" 
          className="hover:text-accent transition-colors relative group"
          whileHover={{ y: -2 }}
        >
          Experience
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
        </motion.a>
      </div>

      <div className="flex-1 flex justify-center">
        <motion.div 
          layoutId="signature-brand"
          className="w-20 md:w-28 h-auto cursor-pointer text-text-primary hover:text-accent transition-colors"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          layout
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.1 }}
        >
          <SignatureSVG />
        </motion.div>
      </div>

      <div className="flex-1 flex justify-end gap-8 text-[11px] font-bold tracking-[0.2em] uppercase text-text-tertiary items-center">
        <motion.a 
          href="#about" 
          className="hover:text-accent transition-colors relative group"
          whileHover={{ y: -2 }}
        >
          About Me
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
        </motion.a>
        <motion.a 
          href="#contact" 
          className="hover:text-accent transition-colors relative group"
          whileHover={{ y: -2 }}
        >
          Contact
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
        </motion.a>
        
        {/* Theme Toggle */}
        <motion.button
          onClick={toggleTheme}
          className="p-2 rounded-full border-2 border-border hover:border-accent hover:bg-accent/10 transition-all"
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun size={16} className="text-text-tertiary hover:text-accent" />
          ) : (
            <Moon size={16} className="text-text-tertiary hover:text-accent" />
          )}
        </motion.button>
      </div>
    </motion.nav>
  );
};

// ============================================================================
// INTRO SEQUENCE
// ============================================================================

const IntroSequence = ({ onComplete }) => {
  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <motion.div 
        className="absolute inset-0 bg-bg-primary"
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />
      
      <motion.div 
        layoutId="signature-brand"
        className="relative z-10 w-48 md:w-80 text-text-primary"
        layout
      >
        <SignatureSVG 
          animate={true} 
          onComplete={() => {
            setTimeout(() => onComplete(), 800);
          }} 
        />
      </motion.div>
    </motion.div>
  );
};

// ============================================================================
// MAIN APP
// ============================================================================

export default function Portfolio() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-bg-primary text-text-primary selection:bg-accent/30 selection:text-text-primary font-sans overflow-x-hidden transition-colors duration-300">
        <NoiseOverlay />

        <div style={{ opacity: introComplete ? 1 : 0, pointerEvents: introComplete ? 'auto' : 'none' }}>
          <Navigation />
        </div>
        
        <AnimatePresence>
          {!introComplete && (
            <IntroSequence onComplete={() => setIntroComplete(true)} />
          )}
        </AnimatePresence>

        <motion.main 
          className="relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: introComplete ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <Hero />
          <Projects />
          <Experience />
          <About />
          <Contact />
        </motion.main>

        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Geist:wght@300;400;500&display=swap');
          
          :root {
            --bg-primary: #0E0E11;
            --bg-secondary: #1F2933;
            --bg-tertiary: #2A3441;
            --text-primary: #E5E7EB;
            --text-secondary: #9CA3AF;
            --text-tertiary: #6B7280;
            --border: #374151;
            --accent: #3B82F6;
            --primary: #3B82F6;
          }

          [data-theme="light"] {
            --bg-primary: #E5E7EB;
            --bg-secondary: #F3F4F6;
            --bg-tertiary: #F9FAFB;
            --text-primary: #0E0E11;
            --text-secondary: #1F2933;
            --text-tertiary: #4B5563;
            --border: #D1D5DB;
            --accent: #3B82F6;
            --primary: #3B82F6;
          }

          .bg-bg-primary { background-color: var(--bg-primary); }
          .bg-bg-secondary { background-color: var(--bg-secondary); }
          .bg-bg-tertiary { background-color: var(--bg-tertiary); }
          .text-text-primary { color: var(--text-primary); }
          .text-text-secondary { color: var(--text-secondary); }
          .text-text-tertiary { color: var(--text-tertiary); }
          .border-border { border-color: var(--border); }
          .text-accent { color: var(--accent); }
          .bg-accent { background-color: var(--accent); }
          .border-accent { border-color: var(--accent); }
          .text-primary { color: var(--primary); }
          .bg-primary { background-color: var(--primary); }
          .border-primary { border-color: var(--primary); }
          
          .font-serif { font-family: 'Playfair Display', serif; }
          .font-sans { font-family: 'Geist', sans-serif; }
          
          html { scroll-behavior: smooth; }

          @keyframes gradient {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }

          .animate-gradient {
            animation: gradient 8s ease-in-out infinite;
          }

          /* Scrollbar Styling */
          ::-webkit-scrollbar {
            width: 10px;
          }

          ::-webkit-scrollbar-track {
            background: var(--bg-secondary);
          }

          ::-webkit-scrollbar-thumb {
            background: var(--accent);
            border-radius: 5px;
          }

          ::-webkit-scrollbar-thumb:hover {
            background: var(--primary);
          }
        `}</style>
      </div>
    </ThemeProvider>
  );
}