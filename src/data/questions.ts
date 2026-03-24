export interface Question {
  id: string;
  level: 'UPPER' | 'LOWER';
  subject: string;
  unit: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

export const subjects = {
  UPPER: ["SET", "SST", "MATHS", "ENGLISH"],
  LOWER: ["MATHEMATICS", "ENGLISH", "KINYARWANDA"]
};

export const questions: Question[] = [
  // UPPER PRIMARY - SET
  {
    id: "u-set-1",
    level: "UPPER",
    subject: "SET",
    unit: "CARPENTRY TOOLS",
    question: "Which tool is used to hit nails?",
    options: ["Saw", "Hammer", "Chisel", "Tape measure"],
    correctAnswer: "Hammer"
  },
  {
    id: "u-set-2",
    level: "UPPER",
    subject: "SET",
    unit: "CARPENTRY TOOLS",
    question: "Which tool measures wood?",
    options: ["Hammer", "Saw", "Tape measure", "Chisel"],
    correctAnswer: "Tape measure"
  },
  {
    id: "u-set-3",
    level: "UPPER",
    subject: "SET",
    unit: "CARPENTRY TOOLS",
    question: "Which tool is used to cut wood?",
    options: ["Chisel", "Saw", "Hammer", "Ruler"],
    correctAnswer: "Saw"
  },
  {
    id: "u-set-4",
    level: "UPPER",
    subject: "SET",
    unit: "CARPENTRY TOOLS",
    question: "What should you wear when using tools?",
    options: ["Gloves", "Sunglasses", "Cap", "Scarf"],
    correctAnswer: "Gloves"
  },
  {
    id: "u-set-5",
    level: "UPPER",
    subject: "SET",
    unit: "CARPENTRY TOOLS",
    question: "How should you store tools?",
    options: ["Anywhere", "In a safe place", "On the floor", "Outside"],
    correctAnswer: "In a safe place"
  },
  {
    id: "u-set-6",
    level: "UPPER",
    subject: "SET",
    unit: "CARPENTRY TOOLS",
    question: "Which tool shapes wood?",
    options: ["Saw", "Chisel", "Hammer", "Brush"],
    correctAnswer: "Chisel"
  },
  {
    id: "u-set-7",
    level: "UPPER",
    subject: "SET",
    unit: "CARPENTRY TOOLS",
    question: "Why should tools be maintained?",
    options: ["To look nice", "To prevent rust and work well", "To impress friends", "For fun"],
    correctAnswer: "To prevent rust and work well"
  },
  {
    id: "u-set-8",
    level: "UPPER",
    subject: "SET",
    unit: "CARPENTRY TOOLS",
    question: "Which of these can be dangerous if not careful?",
    options: ["Clothes", "Carpentry tools", "Books", "Pencils"],
    correctAnswer: "Carpentry tools"
  },
  {
    id: "u-set-9",
    level: "UPPER",
    subject: "SET",
    unit: "CARPENTRY TOOLS",
    question: "What should you do after using a tool?",
    options: ["Leave it", "Clean and store", "Throw it", "Break it"],
    correctAnswer: "Clean and store"
  },
  {
    id: "u-set-10",
    level: "UPPER",
    subject: "SET",
    unit: "CARPENTRY TOOLS",
    question: "Which tool is NOT used in carpentry?",
    options: ["Hammer", "Saw", "Trowel", "Chisel"],
    correctAnswer: "Trowel"
  },
  {
    id: "u-set-11",
    level: "UPPER",
    subject: "SET",
    unit: "MASONRY TOOLS",
    question: "Which tool spreads cement?",
    options: ["Hammer", "Trowel", "Saw", "Chisel"],
    correctAnswer: "Trowel"
  },
  {
    id: "u-set-12",
    level: "UPPER",
    subject: "SET",
    unit: "MASONRY TOOLS",
    question: "What is used to check if a wall is vertical?",
    options: ["Plumb bob", "Hammer", "Saw", "Ruler"],
    correctAnswer: "Plumb bob"
  },
  {
    id: "u-set-13",
    level: "UPPER",
    subject: "SET",
    unit: "MASONRY TOOLS",
    question: "Which tool is used to break bricks?",
    options: ["Trowel", "Brick hammer", "Saw", "Tape measure"],
    correctAnswer: "Brick hammer"
  },
  {
    id: "u-set-14",
    level: "UPPER",
    subject: "SET",
    unit: "LIGHT",
    question: "Light travels in:",
    options: ["Circles", "Straight lines", "Waves", "Curves"],
    correctAnswer: "Straight lines"
  },
  {
    id: "u-set-15",
    level: "UPPER",
    subject: "SET",
    unit: "LIGHT",
    question: "Which object is a source of light?",
    options: ["Moon", "Sun", "Mirror", "Wall"],
    correctAnswer: "Sun"
  },
  {
    id: "u-set-16",
    level: "UPPER",
    subject: "SET",
    unit: "COMPUTER MEMORY & STORAGE",
    question: "Which is an external storage?",
    options: ["RAM", "Flash disk", "ROM", "CPU"],
    correctAnswer: "Flash disk"
  },
  {
    id: "u-set-17",
    level: "UPPER",
    subject: "SET",
    unit: "COMPUTER MEMORY & STORAGE",
    question: "What does RAM stand for?",
    options: ["Read Access Memory", "Random Access Memory", "Real Access Memory", "Rapid Access Memory"],
    correctAnswer: "Random Access Memory"
  },
  {
    id: "u-set-18",
    level: "UPPER",
    subject: "SET",
    unit: "WRITING SKILLS",
    question: "A table in a document has:",
    options: ["Books", "Rows and columns", "Pens", "Slides"],
    correctAnswer: "Rows and columns"
  },
  {
    id: "u-set-19",
    level: "UPPER",
    subject: "SET",
    unit: "COMPUTER RESEARCH",
    question: "The Internet is a:",
    options: ["Computer", "Global network", "Phone", "Tablet"],
    correctAnswer: "Global network"
  },
  {
    id: "u-set-20",
    level: "UPPER",
    subject: "SET",
    unit: "PROGRAMMING",
    question: "A computer follows a set of:",
    options: ["Instructions", "Music", "Food", "Sleep"],
    correctAnswer: "Instructions"
  },
  {
    id: "u-set-21",
    level: "UPPER",
    subject: "SET",
    unit: "WATER POLLUTION",
    question: "Which of these is a cause of water pollution?",
    options: ["Planting trees", "Dumping waste in rivers", "Boiling water", "Filtering water"],
    correctAnswer: "Dumping waste in rivers"
  },
  {
    id: "u-set-22",
    level: "UPPER",
    subject: "SET",
    unit: "SOIL & CULTIVATION",
    question: "Which tool is used for digging hard soil?",
    options: ["Rake", "Pickaxe", "Trowel", "Secateurs"],
    correctAnswer: "Pickaxe"
  },
  {
    id: "u-set-23",
    level: "UPPER",
    subject: "SET",
    unit: "PLANTS & ENVIRONMENT",
    question: "Plants give us ___ which we need to breathe.",
    options: ["Carbon dioxide", "Oxygen", "Nitrogen", "Hydrogen"],
    correctAnswer: "Oxygen"
  },
  {
    id: "u-set-24",
    level: "UPPER",
    subject: "SET",
    unit: "CARPENTRY TOOLS",
    question: "Which tool is used to smooth wood surfaces?",
    options: ["Hammer", "Plane", "Saw", "Drill"],
    correctAnswer: "Plane"
  },
  {
    id: "u-set-25",
    level: "UPPER",
    subject: "SET",
    unit: "MASONRY TOOLS",
    question: "What is the mixture of cement, sand, and water called?",
    options: ["Paint", "Mortar", "Glue", "Clay"],
    correctAnswer: "Mortar"
  },
  {
    id: "u-set-26",
    level: "UPPER",
    subject: "SET",
    unit: "LIGHT",
    question: "An object that does not allow light to pass through is:",
    options: ["Transparent", "Opaque", "Translucent", "Shiny"],
    correctAnswer: "Opaque"
  },
  {
    id: "u-set-27",
    level: "UPPER",
    subject: "SET",
    unit: "COMPUTER MEMORY & STORAGE",
    question: "Which storage device has the largest capacity usually?",
    options: ["CD", "Hard Disk", "Floppy Disk", "Flash Disk"],
    correctAnswer: "Hard Disk"
  },
  {
    id: "u-set-28",
    level: "UPPER",
    subject: "SET",
    unit: "WRITING SKILLS",
    question: "To make text darker in a document, we use:",
    options: ["Italic", "Bold", "Underline", "Highlight"],
    correctAnswer: "Bold"
  },
  {
    id: "u-set-29",
    level: "UPPER",
    subject: "SET",
    unit: "COMPUTER RESEARCH",
    question: "A program used to view websites is called a:",
    options: ["Search engine", "Web browser", "Website", "Email"],
    correctAnswer: "Web browser"
  },
  {
    id: "u-set-30",
    level: "UPPER",
    subject: "SET",
    unit: "PROGRAMMING",
    question: "In Scratch, the characters are called:",
    options: ["Actors", "Sprites", "Players", "Icons"],
    correctAnswer: "Sprites"
  },
  {
    id: "u-set-31",
    level: "UPPER",
    subject: "SET",
    unit: "WATER POLLUTION",
    question: "Which disease can be caused by drinking polluted water?",
    options: ["Malaria", "Cholera", "Flu", "Headache"],
    correctAnswer: "Cholera"
  },
  {
    id: "u-set-32",
    level: "UPPER",
    subject: "SET",
    unit: "SOIL & CULTIVATION",
    question: "Adding ___ to soil makes it more fertile.",
    options: ["Sand", "Manure", "Stones", "Plastic"],
    correctAnswer: "Manure"
  },
  {
    id: "u-set-33",
    level: "UPPER",
    subject: "SET",
    unit: "PLANTS & ENVIRONMENT",
    question: "The process by which plants make their own food is:",
    options: ["Respiration", "Photosynthesis", "Digestion", "Evaporation"],
    correctAnswer: "Photosynthesis"
  },
  {
    id: "u-set-34",
    level: "UPPER",
    subject: "SET",
    unit: "CARPENTRY TOOLS",
    question: "Which tool is used to bore holes in wood?",
    options: ["Saw", "Brace and bit", "Hammer", "Chisel"],
    correctAnswer: "Brace and bit"
  },
  {
    id: "u-set-35",
    level: "UPPER",
    subject: "SET",
    unit: "MASONRY TOOLS",
    question: "A ___ is used to spread mortar on bricks.",
    options: ["Shovel", "Trowel", "Level", "Plumb bob"],
    correctAnswer: "Trowel"
  },
  {
    id: "u-set-36",
    level: "UPPER",
    subject: "SET",
    unit: "LIGHT",
    question: "When an object blocks light, it creates a:",
    options: ["Reflection", "Shadow", "Rainbow", "Beam"],
    correctAnswer: "Shadow"
  },
  {
    id: "u-set-37",
    level: "UPPER",
    subject: "SET",
    unit: "COMPUTER MEMORY & STORAGE",
    question: "Which memory is temporary and lost when power is off?",
    options: ["Hard drive", "RAM", "ROM", "DVD"],
    correctAnswer: "RAM"
  },
  {
    id: "u-set-38",
    level: "UPPER",
    subject: "SET",
    unit: "WRITING SKILLS",
    question: "To change the appearance of letters, we change the:",
    options: ["Size", "Font", "Colour", "All of the above"],
    correctAnswer: "All of the above"
  },
  {
    id: "u-set-39",
    level: "UPPER",
    subject: "SET",
    unit: "COMPUTER RESEARCH",
    question: "Google is an example of a:",
    options: ["Web browser", "Search engine", "Social media", "Operating system"],
    correctAnswer: "Search engine"
  },
  {
    id: "u-set-40",
    level: "UPPER",
    subject: "SET",
    unit: "PROGRAMMING",
    question: "A sequence of steps to solve a problem is an:",
    options: ["Algorithm", "Application", "Answer", "Action"],
    correctAnswer: "Algorithm"
  },
  {
    id: "u-set-41",
    level: "UPPER",
    subject: "SET",
    unit: "WATER POLLUTION",
    question: "Which of these helps to save water?",
    options: ["Leaving taps running", "Taking long showers", "Fixing leaking pipes", "Washing cars with a hose"],
    correctAnswer: "Fixing leaking pipes"
  },
  {
    id: "u-set-42",
    level: "UPPER",
    subject: "SET",
    unit: "SOIL & CULTIVATION",
    question: "Soil erosion is the washing away of:",
    options: ["Rocks", "Topsoil", "Subsoil", "Bedrock"],
    correctAnswer: "Topsoil"
  },
  {
    id: "u-set-43",
    level: "UPPER",
    subject: "SET",
    unit: "PLANTS & ENVIRONMENT",
    question: "Deforestation means:",
    options: ["Planting trees", "Cutting down forests", "Watering plants", "Studying leaves"],
    correctAnswer: "Cutting down forests"
  },
  {
    id: "u-set-44",
    level: "UPPER",
    subject: "SET",
    unit: "CARPENTRY TOOLS",
    question: "A ___ is used to hold wood pieces together while gluing.",
    options: ["Hammer", "Clamp", "Saw", "Drill"],
    correctAnswer: "Clamp"
  },
  {
    id: "u-set-45",
    level: "UPPER",
    subject: "SET",
    unit: "MASONRY TOOLS",
    question: "Which tool is used to check if a surface is horizontal?",
    options: ["Spirit level", "Plumb bob", "Tape measure", "Square"],
    correctAnswer: "Spirit level"
  },
  {
    id: "u-set-46",
    level: "UPPER",
    subject: "SET",
    unit: "LIGHT",
    question: "Bouncing of light off a surface is called:",
    options: ["Refraction", "Reflection", "Absorption", "Transmission"],
    correctAnswer: "Reflection"
  },
  {
    id: "u-set-47",
    level: "UPPER",
    subject: "SET",
    unit: "COMPUTER MEMORY & STORAGE",
    question: "Which of these is used to store data permanently?",
    options: ["RAM", "CPU", "Hard Disk", "Monitor"],
    correctAnswer: "Hard Disk"
  },
  {
    id: "u-set-48",
    level: "UPPER",
    subject: "SET",
    unit: "WRITING SKILLS",
    question: "To move text to another place, we use:",
    options: ["Copy and Paste", "Cut and Paste", "Delete and Type", "Save and Open"],
    correctAnswer: "Cut and Paste"
  },
  {
    id: "u-set-49",
    level: "UPPER",
    subject: "SET",
    unit: "COMPUTER RESEARCH",
    question: "A website's address is also known as its:",
    options: ["Name", "URL", "Email", "Code"],
    correctAnswer: "URL"
  },
  {
    id: "u-set-51",
    level: "UPPER",
    subject: "SET",
    unit: "CARPENTRY TOOLS",
    question: "Which tool is used to drive nails into wood?",
    options: ["Screwdriver", "Hammer", "Pliers", "Wrench"],
    correctAnswer: "Hammer"
  },
  {
    id: "u-set-52",
    level: "UPPER",
    subject: "SET",
    unit: "MASONRY TOOLS",
    question: "A ___ is used to check the verticality of a wall.",
    options: ["Spirit level", "Plumb bob", "Tape measure", "Square"],
    correctAnswer: "Plumb bob"
  },
  {
    id: "u-set-53",
    level: "UPPER",
    subject: "SET",
    unit: "LIGHT",
    question: "Which of these is a natural source of light?",
    options: ["Flashlight", "The Sun", "Electric bulb", "Candle"],
    correctAnswer: "The Sun"
  },
  {
    id: "u-set-54",
    level: "UPPER",
    subject: "SET",
    unit: "COMPUTER MEMORY & STORAGE",
    question: "What does RAM stand for?",
    options: ["Read Access Memory", "Random Access Memory", "Run Access Memory", "Real Access Memory"],
    correctAnswer: "Random Access Memory"
  },
  {
    id: "u-set-55",
    level: "UPPER",
    subject: "SET",
    unit: "WRITING SKILLS",
    question: "Which shortcut key is used to save a document?",
    options: ["Ctrl+S", "Ctrl+P", "Ctrl+C", "Ctrl+V"],
    correctAnswer: "Ctrl+S"
  },
  {
    id: "u-set-56",
    level: "UPPER",
    subject: "SET",
    unit: "COMPUTER RESEARCH",
    question: "The 'www' in a website address stands for:",
    options: ["World Wide Web", "World Web Wide", "Wide World Web", "Web World Wide"],
    correctAnswer: "World Wide Web"
  },
  {
    id: "u-set-57",
    level: "UPPER",
    subject: "SET",
    unit: "PROGRAMMING",
    question: "A mistake in a computer program is called a:",
    options: ["Virus", "Bug", "Error", "Glitch"],
    correctAnswer: "Bug"
  },
  {
    id: "u-set-58",
    level: "UPPER",
    subject: "SET",
    unit: "WATER POLLUTION",
    question: "Which of these is a way to prevent water pollution?",
    options: ["Using more fertilizers", "Building latrines near rivers", "Treating sewage before disposal", "Dumping plastic in lakes"],
    correctAnswer: "Treating sewage before disposal"
  },
  {
    id: "u-set-59",
    level: "UPPER",
    subject: "SET",
    unit: "SOIL & CULTIVATION",
    question: "Which type of soil holds the most water?",
    options: ["Sandy soil", "Clay soil", "Loamy soil", "Silty soil"],
    correctAnswer: "Clay soil"
  },
  {
    id: "u-set-60",
    level: "UPPER",
    subject: "SET",
    unit: "PLANTS & ENVIRONMENT",
    question: "Which part of the plant absorbs water from the soil?",
    options: ["Leaves", "Stem", "Roots", "Flowers"],
    correctAnswer: "Roots"
  },
  {
    id: "u-set-61",
    level: "UPPER",
    subject: "SET",
    unit: "CARPENTRY TOOLS",
    question: "Which tool is used to mark lines parallel to an edge?",
    options: ["Try square", "Marking gauge", "Tape measure", "Chisel"],
    correctAnswer: "Marking gauge"
  },
  {
    id: "u-set-62",
    level: "UPPER",
    subject: "SET",
    unit: "CARPENTRY TOOLS",
    question: "A ___ saw is used for fine, accurate cuts like joints.",
    options: ["Crosscut", "Rip", "Tenon", "Coping"],
    correctAnswer: "Tenon"
  },
  {
    id: "u-set-63",
    level: "UPPER",
    subject: "SET",
    unit: "CARPENTRY TOOLS",
    question: "What is the purpose of a mallet in carpentry?",
    options: ["To drive nails", "To strike chisels without damaging them", "To cut wood", "To measure angles"],
    correctAnswer: "To strike chisels without damaging them"
  },
  {
    id: "u-set-64",
    level: "UPPER",
    subject: "SET",
    unit: "MASONRY TOOLS",
    question: "Which tool is used to finish mortar joints into specific shapes?",
    options: ["Brick hammer", "Jointer", "Trowel", "Spirit level"],
    correctAnswer: "Jointer"
  },
  {
    id: "u-set-65",
    level: "UPPER",
    subject: "SET",
    unit: "MASONRY TOOLS",
    question: "Concrete is a mixture of cement, sand, water, and ___.",
    options: ["Clay", "Gravel", "Wood", "Oil"],
    correctAnswer: "Gravel"
  },
  {
    id: "u-set-66",
    level: "UPPER",
    subject: "SET",
    unit: "MASONRY TOOLS",
    question: "Why is a spirit level important in masonry?",
    options: ["To mix mortar", "To ensure walls are perfectly vertical or horizontal", "To break bricks", "To carry heavy loads"],
    correctAnswer: "To ensure walls are perfectly vertical or horizontal"
  },
  {
    id: "u-set-67",
    level: "UPPER",
    subject: "SET",
    unit: "LIGHT",
    question: "The bending of light as it moves from air to water is called:",
    options: ["Reflection", "Refraction", "Dispersion", "Absorption"],
    correctAnswer: "Refraction"
  },
  {
    id: "u-set-68",
    level: "UPPER",
    subject: "SET",
    unit: "LIGHT",
    question: "Which type of lens focuses light to a single point?",
    options: ["Concave", "Convex", "Flat", "Opaque"],
    correctAnswer: "Convex"
  },
  {
    id: "u-set-69",
    level: "UPPER",
    subject: "SET",
    unit: "LIGHT",
    question: "What is the separation of white light into colours called?",
    options: ["Refraction", "Reflection", "Dispersion", "Shadowing"],
    correctAnswer: "Dispersion"
  },
  {
    id: "u-set-70",
    level: "UPPER",
    subject: "SET",
    unit: "COMPUTER MEMORY & STORAGE",
    question: "Which of these is volatile memory?",
    options: ["ROM", "RAM", "Hard Disk", "Flash Drive"],
    correctAnswer: "RAM"
  },
  {
    id: "u-set-71",
    level: "UPPER",
    subject: "SET",
    unit: "COMPUTER MEMORY & STORAGE",
    question: "How many bits are in one byte?",
    options: ["4", "8", "16", "32"],
    correctAnswer: "8"
  },
  {
    id: "u-set-72",
    level: "UPPER",
    subject: "SET",
    unit: "COMPUTER MEMORY & STORAGE",
    question: "Which storage device uses lasers to read data?",
    options: ["Hard Disk", "SSD", "DVD", "RAM"],
    correctAnswer: "DVD"
  },
  {
    id: "u-set-73",
    level: "UPPER",
    subject: "SET",
    unit: "WRITING SKILLS",
    question: "Which shortcut key is used to Undo an action?",
    options: ["Ctrl+C", "Ctrl+V", "Ctrl+Z", "Ctrl+Y"],
    correctAnswer: "Ctrl+Z"
  },
  {
    id: "u-set-74",
    level: "UPPER",
    subject: "SET",
    unit: "WRITING SKILLS",
    question: "What is the purpose of 'Justified' alignment?",
    options: ["To centre text", "To align text to the right", "To spread text evenly between margins", "To make text bold"],
    correctAnswer: "To spread text evenly between margins"
  },
  {
    id: "u-set-75",
    level: "UPPER",
    subject: "SET",
    unit: "WRITING SKILLS",
    question: "Headers appear at the ___ of every page.",
    options: ["Top", "Bottom", "Middle", "Side"],
    correctAnswer: "Top"
  },
  {
    id: "u-set-76",
    level: "UPPER",
    subject: "SET",
    unit: "COMPUTER RESEARCH",
    question: "Which domain extension is usually for government websites?",
    options: [".com", ".org", ".gov", ".edu"],
    correctAnswer: ".gov"
  },
  {
    id: "u-set-77",
    level: "UPPER",
    subject: "SET",
    unit: "COMPUTER RESEARCH",
    question: "What does 'C' in the CRAAP test for evaluating websites stand for?",
    options: ["Colour", "Currency", "Computer", "Copy"],
    correctAnswer: "Currency"
  },
  {
    id: "u-set-78",
    level: "UPPER",
    subject: "SET",
    unit: "COMPUTER RESEARCH",
    question: "Using someone else's work without credit is called:",
    options: ["Research", "Plagiarism", "Copyright", "Browsing"],
    correctAnswer: "Plagiarism"
  },
  {
    id: "u-set-79",
    level: "UPPER",
    subject: "SET",
    unit: "PROGRAMMING",
    question: "Repeating a task in programming is called:",
    options: ["Sequence", "Selection", "Iteration (Looping)", "Input"],
    correctAnswer: "Iteration (Looping)"
  },
  {
    id: "u-set-80",
    level: "UPPER",
    subject: "SET",
    unit: "PROGRAMMING",
    question: "In Scratch, which block category is used for moving sprites?",
    options: ["Looks", "Sound", "Motion", "Events"],
    correctAnswer: "Motion"
  },
  {
    id: "u-set-81",
    level: "UPPER",
    subject: "SET",
    unit: "PROGRAMMING",
    question: "A ___ is a container that stores a value that can change.",
    options: ["Constant", "Variable", "Function", "Sprite"],
    correctAnswer: "Variable"
  },
  {
    id: "u-set-82",
    level: "UPPER",
    subject: "SET",
    unit: "WATER POLLUTION",
    question: "Eutrophication is caused by an excess of ___ in water.",
    options: ["Oxygen", "Nutrients (Nitrogen/Phosphorus)", "Plastic", "Salt"],
    correctAnswer: "Nutrients (Nitrogen/Phosphorus)"
  },
  {
    id: "u-set-83",
    level: "UPPER",
    subject: "SET",
    unit: "WATER POLLUTION",
    question: "Which of these is a non-point source of pollution?",
    options: ["A factory pipe", "Rainwater washing oil off streets", "A broken sewer line", "An oil tanker leak"],
    correctAnswer: "Rainwater washing oil off streets"
  },
  {
    id: "u-set-84",
    level: "UPPER",
    subject: "SET",
    unit: "WATER POLLUTION",
    question: "Pathogens in water are usually from:",
    options: ["Oil spills", "Untreated sewage", "Fertilizers", "Plastic"],
    correctAnswer: "Untreated sewage"
  },
  {
    id: "u-set-85",
    level: "UPPER",
    subject: "SET",
    unit: "SOIL & CULTIVATION",
    question: "Which soil layer is richest in organic matter?",
    options: ["Subsoil", "Topsoil", "Bedrock", "Parent material"],
    correctAnswer: "Topsoil"
  },
  {
    id: "u-set-86",
    level: "UPPER",
    subject: "SET",
    unit: "SOIL & CULTIVATION",
    question: "Planting trees to prevent soil erosion is called:",
    options: ["Deforestation", "Afforestation", "Mulching", "Terracing"],
    correctAnswer: "Afforestation"
  },
  {
    id: "u-set-87",
    level: "UPPER",
    subject: "SET",
    unit: "SOIL & CULTIVATION",
    question: "Which soil type has the largest particles?",
    options: ["Clay", "Silt", "Sand", "Loam"],
    correctAnswer: "Sand"
  },
  {
    id: "u-set-88",
    level: "UPPER",
    subject: "SET",
    unit: "PLANTS & ENVIRONMENT",
    question: "What is the green pigment in plants called?",
    options: ["Chloroplast", "Chlorophyll", "Stomata", "Xylem"],
    correctAnswer: "Chlorophyll"
  },
  {
    id: "u-set-89",
    level: "UPPER",
    subject: "SET",
    unit: "PLANTS & ENVIRONMENT",
    question: "The process of plants releasing water vapor is:",
    options: ["Photosynthesis", "Transpiration", "Respiration", "Pollination"],
    correctAnswer: "Transpiration"
  },
  {
    id: "u-set-90",
    level: "UPPER",
    subject: "SET",
    unit: "PLANTS & ENVIRONMENT",
    question: "Which part of the flower produces pollen?",
    options: ["Pistil", "Stamen", "Petal", "Sepal"],
    correctAnswer: "Stamen"
  },
  {
    id: "u-set-91",
    level: "UPPER",
    subject: "SET",
    unit: "CARPENTRY TOOLS",
    question: "What should you do if a tool is rusty?",
    options: ["Use it anyway", "Clean it and apply oil", "Throw it away", "Paint over the rust"],
    correctAnswer: "Clean it and apply oil"
  },
  {
    id: "u-set-92",
    level: "UPPER",
    subject: "SET",
    unit: "MASONRY TOOLS",
    question: "A ___ is used to carry mortar to the work area.",
    options: ["Wheelbarrow", "Mortar pan", "Shovel", "Bucket"],
    correctAnswer: "Mortar pan"
  },
  {
    id: "u-set-93",
    level: "UPPER",
    subject: "SET",
    unit: "LIGHT",
    question: "Which of these is a non-luminous object?",
    options: ["The Sun", "A burning candle", "The Moon", "A glowing bulb"],
    correctAnswer: "The Moon"
  },
  {
    id: "u-set-94",
    level: "UPPER",
    subject: "SET",
    unit: "COMPUTER MEMORY & STORAGE",
    question: "1 Gigabyte (GB) is equal to ___ Megabytes (MB).",
    options: ["100", "500", "1024", "2048"],
    correctAnswer: "1024"
  },
  {
    id: "u-set-95",
    level: "UPPER",
    subject: "SET",
    unit: "WRITING SKILLS",
    question: "Which tool helps find synonyms for words?",
    options: ["Spell check", "Thesaurus", "Grammar check", "Find and Replace"],
    correctAnswer: "Thesaurus"
  },
  {
    id: "u-set-96",
    level: "UPPER",
    subject: "SET",
    unit: "COMPUTER RESEARCH",
    question: "A ___ is a clickable link that takes you to another page.",
    options: ["URL", "Hyperlink", "Bookmark", "Browser"],
    correctAnswer: "Hyperlink"
  },
  {
    id: "u-set-97",
    level: "UPPER",
    subject: "SET",
    unit: "PROGRAMMING",
    question: "Breaking a big problem into smaller parts is called:",
    options: ["Abstraction", "Decomposition", "Pattern recognition", "Debugging"],
    correctAnswer: "Decomposition"
  },
  {
    id: "u-set-98",
    level: "UPPER",
    subject: "SET",
    unit: "WATER POLLUTION",
    question: "Which of these is a chemical pollutant?",
    options: ["Bacteria", "Lead", "Leaves", "Sand"],
    correctAnswer: "Lead"
  },
  {
    id: "u-set-99",
    level: "UPPER",
    subject: "SET",
    unit: "SOIL & CULTIVATION",
    question: "Mulching helps to ___.",
    options: ["Increase erosion", "Prevent water evaporation", "Kill plants", "Make soil harder"],
    correctAnswer: "Prevent water evaporation"
  },
  {
    id: "u-set-100",
    level: "UPPER",
    subject: "SET",
    unit: "PLANTS & ENVIRONMENT",
    question: "Which gas do plants absorb during photosynthesis?",
    options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Helium"],
    correctAnswer: "Carbon Dioxide"
  },

  // UPPER PRIMARY - SRS
  {
    id: "u-srs-1",
    level: "UPPER",
    subject: "SRS",
    unit: "HISTORY",
    question: "Who was the first President of Rwanda?",
    options: ["Grégoire Kayibanda", "Juvénal Habyarimana", "Paul Kagame", "Dominique Mbonyumutwa"],
    correctAnswer: "Grégoire Kayibanda"
  },
  {
    id: "u-srs-2",
    level: "UPPER",
    subject: "SRS",
    unit: "GEOGRAPHY",
    question: "Which is the longest river in Rwanda?",
    options: ["Nyabarongo", "Akagera", "Mukungwa", "Sebeya"],
    correctAnswer: "Nyabarongo"
  },
  {
    id: "u-srs-3",
    level: "UPPER",
    subject: "SRS",
    unit: "RELIGION",
    question: "Who is considered the father of faith in Christianity?",
    options: ["Moses", "Abraham", "David", "Noah"],
    correctAnswer: "Abraham"
  },
  {
    id: "u-srs-4",
    level: "UPPER",
    subject: "SRS",
    unit: "CIVICS",
    question: "What does the blue colour in the Rwandan flag represent?",
    options: ["Peace", "Happiness", "Work", "Prosperity"],
    correctAnswer: "Peace"
  },
  {
    id: "u-srs-5",
    level: "UPPER",
    subject: "SRS",
    unit: "CULTURE",
    question: "What is a traditional Rwandan dance called?",
    options: ["Umuhamirizo", "Amaraba", "Ikinimba", "All of the above"],
    correctAnswer: "All of the above"
  },
  {
    id: "u-srs-6",
    level: "UPPER",
    subject: "SRS",
    unit: "GEOGRAPHY",
    question: "Which is the highest mountain in Rwanda?",
    options: ["Kalisimbi", "Muhabura", "Bisoke", "Gahinga"],
    correctAnswer: "Kalisimbi"
  },
  {
    id: "u-srs-7",
    level: "UPPER",
    subject: "SRS",
    unit: "HISTORY",
    question: "When did Rwanda get independence?",
    options: ["July 1, 1962", "July 4, 1994", "January 28, 1961", "October 1, 1990"],
    correctAnswer: "July 1, 1962"
  },
  {
    id: "u-srs-8",
    level: "UPPER",
    subject: "SRS",
    unit: "CIVICS",
    question: "How many colours are in the Rwandan flag?",
    options: ["2", "3", "4", "5"],
    correctAnswer: "3"
  },
  {
    id: "u-srs-9",
    level: "UPPER",
    subject: "SRS",
    unit: "GEOGRAPHY",
    question: "Rwanda is known as the land of a thousand:",
    options: ["Lakes", "Hills", "Rivers", "Forests"],
    correctAnswer: "Hills"
  },
  {
    id: "u-srs-10",
    level: "UPPER",
    subject: "SRS",
    unit: "CULTURE",
    question: "What is the traditional Rwandan greeting?",
    options: ["Muraho", "Mwaramutse", "Mwiriwe", "All of the above"],
    correctAnswer: "All of the above"
  },

  // UPPER PRIMARY - MATHS
  {
    id: "u-maths-1",
    level: "UPPER",
    subject: "MATHS",
    unit: "FRACTIONS",
    question: "What is 1/2 + 1/4?",
    options: ["2/6", "3/4", "1/6", "1/2"],
    correctAnswer: "3/4"
  },
  {
    id: "u-maths-2",
    level: "UPPER",
    subject: "MATHS",
    unit: "GEOMETRY",
    question: "How many degrees are in a right angle?",
    options: ["45", "90", "180", "360"],
    correctAnswer: "90"
  },
  {
    id: "u-maths-3",
    level: "UPPER",
    subject: "MATHS",
    unit: "ALGEBRA",
    question: "If 2x = 10, what is x?",
    options: ["2", "5", "8", "20"],
    correctAnswer: "5"
  },
  {
    id: "u-maths-4",
    level: "UPPER",
    subject: "MATHS",
    unit: "MEASUREMENT",
    question: "How many centimetres are in 1 metre?",
    options: ["10", "100", "1000", "1"],
    correctAnswer: "100"
  },
  {
    id: "u-maths-5",
    level: "UPPER",
    subject: "MATHS",
    unit: "STATISTICS",
    question: "What is the average of 2, 4, and 6?",
    options: ["2", "4", "6", "12"],
    correctAnswer: "4"
  },
  {
    id: "u-maths-6",
    level: "UPPER",
    subject: "MATHS",
    unit: "NUMBERS",
    question: "What is the square root of 64?",
    options: ["6", "7", "8", "9"],
    correctAnswer: "8"
  },
  {
    id: "u-maths-7",
    level: "UPPER",
    subject: "MATHS",
    unit: "GEOMETRY",
    question: "How many sides does a hexagon have?",
    options: ["5", "6", "7", "8"],
    correctAnswer: "6"
  },
  {
    id: "u-maths-8",
    level: "UPPER",
    subject: "MATHS",
    unit: "PERCENTAGE",
    question: "What is 25% of 100?",
    options: ["20", "25", "50", "75"],
    correctAnswer: "25"
  },
  {
    id: "u-maths-9",
    level: "UPPER",
    subject: "MATHS",
    unit: "TIME",
    question: "How many minutes are in 2 hours?",
    options: ["60", "100", "120", "150"],
    correctAnswer: "120"
  },
  {
    id: "u-maths-10",
    level: "UPPER",
    subject: "MATHS",
    unit: "NUMBERS",
    question: "What is 15 x 3?",
    options: ["35", "40", "45", "50"],
    correctAnswer: "45"
  },

  // UPPER PRIMARY - ENGLISH
  {
    id: "u-eng-1",
    level: "UPPER",
    subject: "ENGLISH",
    unit: "GRAMMAR",
    question: "Which word is a verb?",
    options: ["Apple", "Run", "Beautiful", "Quickly"],
    correctAnswer: "Run"
  },
  {
    id: "u-eng-2",
    level: "UPPER",
    subject: "ENGLISH",
    unit: "VOCABULARY",
    question: "What is the synonym of 'Happy'?",
    options: ["Sad", "Joyful", "Angry", "Tired"],
    correctAnswer: "Joyful"
  },
  {
    id: "u-eng-3",
    level: "UPPER",
    subject: "ENGLISH",
    unit: "PUNCTUATION",
    question: "Which sentence is punctuated correctly?",
    options: ["Where are you going.", "Where are you going?", "Where are you going!", "where are you going"],
    correctAnswer: "Where are you going?"
  },
  {
    id: "u-eng-4",
    level: "UPPER",
    subject: "ENGLISH",
    unit: "TENSES",
    question: "I ___ to school every day.",
    options: ["go", "goes", "went", "going"],
    correctAnswer: "go"
  },
  {
    id: "u-eng-5",
    level: "UPPER",
    subject: "ENGLISH",
    unit: "PRONOUNS",
    question: "___ is my best friend.",
    options: ["He", "Him", "His", "He's"],
    correctAnswer: "He"
  },
  {
    id: "u-eng-6",
    level: "UPPER",
    subject: "ENGLISH",
    unit: "ADJECTIVES",
    question: "The elephant is a ___ animal.",
    options: ["small", "big", "fast", "tiny"],
    correctAnswer: "big"
  },
  {
    id: "u-eng-7",
    level: "UPPER",
    subject: "ENGLISH",
    unit: "PREPOSITIONS",
    question: "The book is ___ the table.",
    options: ["in", "on", "at", "by"],
    correctAnswer: "on"
  },
  {
    id: "u-eng-8",
    level: "UPPER",
    subject: "ENGLISH",
    unit: "CONJUNCTIONS",
    question: "I like tea ___ I don't like coffee.",
    options: ["and", "but", "or", "because"],
    correctAnswer: "but"
  },
  {
    id: "u-eng-9",
    level: "UPPER",
    subject: "ENGLISH",
    unit: "VOCABULARY",
    question: "What is the opposite of 'Hot'?",
    options: ["Warm", "Cold", "Dry", "Wet"],
    correctAnswer: "Cold"
  },
  {
    id: "u-eng-10",
    level: "UPPER",
    subject: "ENGLISH",
    unit: "GRAMMAR",
    question: "Which of these is a noun?",
    options: ["Jump", "Blue", "School", "Slowly"],
    correctAnswer: "School"
  },

  // LOWER PRIMARY - MATHEMATICS
  {
    id: "l-math-1",
    level: "LOWER",
    subject: "MATHEMATICS",
    unit: "NUMBERS",
    question: "What is 5 + 3?",
    options: ["7", "8", "9", "10"],
    correctAnswer: "8"
  },
  {
    id: "l-math-2",
    level: "LOWER",
    subject: "MATHEMATICS",
    unit: "SHAPES",
    question: "Which shape has 3 sides?",
    options: ["Square", "Circle", "Triangle", "Rectangle"],
    correctAnswer: "Triangle"
  },
  {
    id: "l-math-3",
    level: "LOWER",
    subject: "MATHEMATICS",
    unit: "COUNTING",
    question: "What comes after 19?",
    options: ["18", "20", "21", "22"],
    correctAnswer: "20"
  },
  {
    id: "l-math-4",
    level: "LOWER",
    subject: "MATHEMATICS",
    unit: "SUBTRACTION",
    question: "What is 10 - 4?",
    options: ["4", "5", "6", "7"],
    correctAnswer: "6"
  },
  {
    id: "l-math-5",
    level: "LOWER",
    subject: "MATHEMATICS",
    unit: "TIME",
    question: "How many days are in a week?",
    options: ["5", "6", "7", "8"],
    correctAnswer: "7"
  },
  {
    id: "l-math-6",
    level: "LOWER",
    subject: "MATHEMATICS",
    unit: "NUMBERS",
    question: "What is 2 x 5?",
    options: ["7", "10", "12", "15"],
    correctAnswer: "10"
  },
  {
    id: "l-math-7",
    level: "LOWER",
    subject: "MATHEMATICS",
    unit: "SHAPES",
    question: "A ball is shaped like a:",
    options: ["Square", "Circle", "Sphere", "Triangle"],
    correctAnswer: "Sphere"
  },
  {
    id: "l-math-8",
    level: "LOWER",
    subject: "MATHEMATICS",
    unit: "MEASUREMENT",
    question: "Which is longer?",
    options: ["1 cm", "1 m", "1 mm", "1 km"],
    correctAnswer: "1 km"
  },
  {
    id: "l-math-9",
    level: "LOWER",
    subject: "MATHEMATICS",
    unit: "NUMBERS",
    question: "What is half of 10?",
    options: ["2", "4", "5", "6"],
    correctAnswer: "5"
  },
  {
    id: "l-math-10",
    level: "LOWER",
    subject: "MATHEMATICS",
    unit: "COUNTING",
    question: "Count by 2s: 2, 4, 6, ___",
    options: ["7", "8", "9", "10"],
    correctAnswer: "8"
  },

  // LOWER PRIMARY - ENGLISH
  {
    id: "l-eng-1",
    level: "LOWER",
    subject: "ENGLISH",
    unit: "ALPHABET",
    question: "What is the first letter of the alphabet?",
    options: ["B", "A", "C", "D"],
    correctAnswer: "A"
  },
  {
    id: "l-eng-2",
    level: "LOWER",
    subject: "ENGLISH",
    unit: "ANIMALS",
    question: "Which animal says 'Moo'?",
    options: ["Dog", "Cat", "Cow", "Sheep"],
    correctAnswer: "Cow"
  },
  {
    id: "l-eng-3",
    level: "LOWER",
    subject: "ENGLISH",
    unit: "COLOURS",
    question: "What colour is the sky on a clear day?",
    options: ["Green", "Red", "Blue", "Yellow"],
    correctAnswer: "Blue"
  },
  {
    id: "l-eng-4",
    level: "LOWER",
    subject: "ENGLISH",
    unit: "FRUITS",
    question: "Which fruit is yellow and long?",
    options: ["Apple", "Banana", "Orange", "Grape"],
    correctAnswer: "Banana"
  },
  {
    id: "l-eng-5",
    level: "LOWER",
    subject: "ENGLISH",
    unit: "BODY PARTS",
    question: "What do we use to see?",
    options: ["Ears", "Nose", "Eyes", "Mouth"],
    correctAnswer: "Eyes"
  },
  {
    id: "l-eng-6",
    level: "LOWER",
    subject: "ENGLISH",
    unit: "ALPHABET",
    question: "How many vowels are there?",
    options: ["3", "5", "7", "10"],
    correctAnswer: "5"
  },
  {
    id: "l-eng-7",
    level: "LOWER",
    subject: "ENGLISH",
    unit: "ANIMALS",
    question: "Which animal is the king of the jungle?",
    options: ["Tiger", "Elephant", "Lion", "Giraffe"],
    correctAnswer: "Lion"
  },
  {
    id: "l-eng-8",
    level: "LOWER",
    subject: "ENGLISH",
    unit: "COLOURS",
    question: "What colour is a leaf?",
    options: ["Red", "Blue", "Green", "Yellow"],
    correctAnswer: "Green"
  },
  {
    id: "l-eng-9",
    level: "LOWER",
    subject: "ENGLISH",
    unit: "NUMBERS",
    question: "How do you spell '1'?",
    options: ["One", "Won", "On", "Own"],
    correctAnswer: "One"
  },
  {
    id: "l-eng-10",
    level: "LOWER",
    subject: "ENGLISH",
    unit: "GREETINGS",
    question: "What do you say in the morning?",
    options: ["Good night", "Good morning", "Good afternoon", "Goodbye"],
    correctAnswer: "Good morning"
  },

  // LOWER PRIMARY - KINYARWANDA
  {
    id: "l-kin-1",
    level: "LOWER",
    subject: "KINYARWANDA",
    unit: "IMYANDIKIRE",
    question: "Inyuguti itangira ijambo 'Ishuri' ni iyihe?",
    options: ["I", "S", "H", "U"],
    correctAnswer: "I"
  },
  {
    id: "l-kin-2",
    level: "LOWER",
    subject: "KINYARWANDA",
    unit: "IBINYABUZIMA",
    question: "Inka iduha iki?",
    options: ["Amata", "Amagi", "Ubuki", "Uruhu gusa"],
    correctAnswer: "Amata"
  },
  {
    id: "l-kin-3",
    level: "LOWER",
    subject: "KINYARWANDA",
    unit: "UMURYANGO",
    question: "Umubyeyi w'umugabo yitwa nde?",
    options: ["Mama", "Papa", "Musa", "Data"],
    correctAnswer: "Papa"
  },
  {
    id: "l-kin-4",
    level: "LOWER",
    subject: "KINYARWANDA",
    unit: "IBARA",
    question: "Ibara ry'amaraso ni irihe?",
    options: ["Ubururu", "Umutuku", "Umukara", "Umweru"],
    correctAnswer: "Umutuku"
  },
  {
    id: "l-kin-5",
    level: "LOWER",
    subject: "KINYARWANDA",
    unit: "IMIBRE",
    question: "Mwaramutse bivuga iki?",
    options: ["Good morning", "Good afternoon", "Good night", "Goodbye"],
    correctAnswer: "Good morning"
  },
  {
    id: "l-kin-6",
    level: "LOWER",
    subject: "KINYARWANDA",
    unit: "IMYANDIKIRE",
    question: "Inyuguti ya nyuma mu nyuguti z'ikinyarwanda ni iyihe?",
    options: ["A", "Z", "Y", "W"],
    correctAnswer: "Z"
  },
  {
    id: "l-kin-7",
    level: "LOWER",
    subject: "KINYARWANDA",
    unit: "IBINYABUZIMA",
    question: "Intama iduha iki?",
    options: ["Ubwoya", "Amagi", "Ubuki", "Amata gusa"],
    correctAnswer: "Ubwoya"
  },
  {
    id: "l-kin-8",
    level: "LOWER",
    subject: "KINYARWANDA",
    unit: "UMURYANGO",
    question: "Umwana w'umuhungu yitwa nde?",
    options: ["Umukobwa", "Umuhungu", "Umugabo", "Umugore"],
    correctAnswer: "Umuhungu"
  },
  {
    id: "l-kin-9",
    level: "LOWER",
    subject: "KINYARWANDA",
    unit: "IBARA",
    question: "Ibara ry'ijuru ni irihe?",
    options: ["Ubururu", "Umutuku", "Umukara", "Umweru"],
    correctAnswer: "Ubururu"
  },
  {
    id: "l-kin-10",
    level: "LOWER",
    subject: "KINYARWANDA",
    unit: "IMIBRE",
    question: "Murabeho bivuga iki?",
    options: ["Hello", "Goodbye", "Thank you", "Please"],
    correctAnswer: "Goodbye"
  },
  // UPPER PRIMARY - SST
  {
    id: "u-sst-1",
    level: "UPPER",
    subject: "SST",
    unit: "MAP OF OUR PROVINCE AND ITS LOCATION",
    question: "What is a map?",
    options: ["A picture of a person", "A representation of an area on a flat surface", "A story book", "A musical instrument"],
    correctAnswer: "A representation of an area on a flat surface"
  },
  {
    id: "u-sst-2",
    level: "UPPER",
    subject: "SST",
    unit: "MAP OF OUR PROVINCE AND ITS LOCATION",
    question: "Which element of a map explains the symbols used?",
    options: ["Title", "Scale", "Key or Legend", "Compass Rose"],
    correctAnswer: "Key or Legend"
  },
  {
    id: "u-sst-3",
    level: "UPPER",
    subject: "SST",
    unit: "MAP OF OUR PROVINCE AND ITS LOCATION",
    question: "What does the scale of a map show?",
    options: ["The height of mountains", "The relationship between map distance and real distance", "The names of rivers", "The direction of North"],
    correctAnswer: "The relationship between map distance and real distance"
  },
  {
    id: "u-sst-4",
    level: "UPPER",
    subject: "SST",
    unit: "MAP OF OUR PROVINCE AND ITS LOCATION",
    question: "Which cardinal point is at the top of most maps?",
    options: ["South", "East", "West", "North"],
    correctAnswer: "North"
  },
  {
    id: "u-sst-5",
    level: "UPPER",
    subject: "SST",
    unit: "MAP OF OUR PROVINCE AND ITS LOCATION",
    question: "What are the four cardinal points?",
    options: ["Up, Down, Left, Right", "North, South, East, West", "Red, Blue, Green, Yellow", "Spring, Summer, Autumn, Winter"],
    correctAnswer: "North, South, East, West"
  },
  {
    id: "u-sst-6",
    level: "UPPER",
    subject: "SST",
    unit: "MAP OF OUR PROVINCE AND ITS LOCATION",
    question: "Which direction is exactly between North and East?",
    options: ["South-West", "North-East", "South-East", "North-West"],
    correctAnswer: "North-East"
  },
  {
    id: "u-sst-7",
    level: "UPPER",
    subject: "SST",
    unit: "MAP OF OUR PROVINCE AND ITS LOCATION",
    question: "Why is a title important for a map?",
    options: ["To make it look pretty", "To tell what the map is about", "To show the colours", "To list the authors"],
    correctAnswer: "To tell what the map is about"
  },
  {
    id: "u-sst-8",
    level: "UPPER",
    subject: "SST",
    unit: "MAP OF OUR PROVINCE AND ITS LOCATION",
    question: "What is used to find directions on a map?",
    options: ["Ruler", "Compass Rose", "Eraser", "Pencil"],
    correctAnswer: "Compass Rose"
  },
  {
    id: "u-sst-9",
    level: "UPPER",
    subject: "SST",
    unit: "MAP OF OUR PROVINCE AND ITS LOCATION",
    question: "If you are facing North, what direction is behind you?",
    options: ["East", "West", "South", "North-East"],
    correctAnswer: "South"
  },
  {
    id: "u-sst-10",
    level: "UPPER",
    subject: "SST",
    unit: "MAP OF OUR PROVINCE AND ITS LOCATION",
    question: "Which of these is a secondary direction?",
    options: ["North", "East", "South-West", "West"],
    correctAnswer: "South-West"
  },
  {
    id: "u-sst-11",
    level: "UPPER",
    subject: "SST",
    unit: "COMPLEMENTARITY AND SOCIAL COHESION IN THE SOCIETY",
    question: "What does 'complementarity' mean in society?",
    options: ["Fighting with each other", "Working together and helping each other", "Living alone", "Ignoring others"],
    correctAnswer: "Working together and helping each other"
  },
  {
    id: "u-sst-12",
    level: "UPPER",
    subject: "SST",
    unit: "COMPLEMENTARITY AND SOCIAL COHESION IN THE SOCIETY",
    question: "What is social cohesion?",
    options: ["Dividing people", "The bond that holds a society together", "A type of food", "A sports game"],
    correctAnswer: "The bond that holds a society together"
  },
  {
    id: "u-sst-13",
    level: "UPPER",
    subject: "SST",
    unit: "COMPLEMENTARITY AND SOCIAL COHESION IN THE SOCIETY",
    question: "Who plays a role in the society?",
    options: ["Only adults", "Only leaders", "Everyone", "Only teachers"],
    correctAnswer: "Everyone"
  },
  {
    id: "u-sst-14",
    level: "UPPER",
    subject: "SST",
    unit: "COMPLEMENTARITY AND SOCIAL COHESION IN THE SOCIETY",
    question: "What is a sign of complementarity in a province?",
    options: ["People sharing resources", "People arguing", "Closed markets", "Empty schools"],
    correctAnswer: "People sharing resources"
  },
  {
    id: "u-sst-15",
    level: "UPPER",
    subject: "SST",
    unit: "COMPLEMENTARITY AND SOCIAL COHESION IN THE SOCIETY",
    question: "How do different roles help the society?",
    options: ["They cause confusion", "They make the society function better", "They are not helpful", "They make people tired"],
    correctAnswer: "They make the society function better"
  },
  {
    id: "u-sst-16",
    level: "UPPER",
    subject: "SST",
    unit: "COMPLEMENTARITY AND SOCIAL COHESION IN THE SOCIETY",
    question: "Which of these promotes social cohesion?",
    options: ["Discrimination", "Mutual respect", "Selfishness", "Hatred"],
    correctAnswer: "Mutual respect"
  },
  {
    id: "u-sst-17",
    level: "UPPER",
    subject: "SST",
    unit: "COMPLEMENTARITY AND SOCIAL COHESION IN THE SOCIETY",
    question: "What is the role of a teacher in society?",
    options: ["To build houses", "To educate students", "To treat sick people", "To grow crops"],
    correctAnswer: "To educate students"
  },
  {
    id: "u-sst-18",
    level: "UPPER",
    subject: "SST",
    unit: "COMPLEMENTARITY AND SOCIAL COHESION IN THE SOCIETY",
    question: "What is the role of a farmer in society?",
    options: ["To teach", "To provide food", "To make laws", "To drive buses"],
    correctAnswer: "To provide food"
  },
  {
    id: "u-sst-19",
    level: "UPPER",
    subject: "SST",
    unit: "COMPLEMENTARITY AND SOCIAL COHESION IN THE SOCIETY",
    question: "Why is unity important in our province?",
    options: ["For development and peace", "To win games", "To be famous", "It is not important"],
    correctAnswer: "For development and peace"
  },
  {
    id: "u-sst-20",
    level: "UPPER",
    subject: "SST",
    unit: "COMPLEMENTARITY AND SOCIAL COHESION IN THE SOCIETY",
    question: "What happens when there is no social cohesion?",
    options: ["More development", "Conflict and instability", "More happiness", "Better schools"],
    correctAnswer: "Conflict and instability"
  },
  // UNIT 3: HYGIENE AND SANITATION
  {
    id: "u-sst-21",
    level: "UPPER",
    subject: "SST",
    unit: "HYGIENE AND SANITATION",
    question: "What is personal hygiene?",
    options: ["Keeping the school clean", "Keeping our bodies and clothes clean", "Cleaning the market", "Planting trees"],
    correctAnswer: "Keeping our bodies and clothes clean"
  },
  {
    id: "u-sst-22",
    level: "UPPER",
    subject: "SST",
    unit: "HYGIENE AND SANITATION",
    question: "Why is it important to keep our province clean?",
    options: ["To prevent diseases", "To make it look bad", "To waste time", "To attract insects"],
    correctAnswer: "To prevent diseases"
  },
  {
    id: "u-sst-23",
    level: "UPPER",
    subject: "SST",
    unit: "HYGIENE AND SANITATION",
    question: "Which of these is an activity related to cleanliness?",
    options: ["Littering", "Sweeping the compound", "Leaving water stagnant", "Throwing trash in the river"],
    correctAnswer: "Sweeping the compound"
  },
  // UNIT 4: ECONOMY
  {
    id: "u-sst-24",
    level: "UPPER",
    subject: "SST",
    unit: "ECONOMY",
    question: "What is a budget?",
    options: ["A list of friends", "A plan for how to spend and save money", "A type of bank", "A market day"],
    correctAnswer: "A plan for how to spend and save money"
  },
  {
    id: "u-sst-25",
    level: "UPPER",
    subject: "SST",
    unit: "ECONOMY",
    question: "What is the importance of banks?",
    options: ["To play games", "To keep money safe and provide loans", "To sell food", "To watch movies"],
    correctAnswer: "To keep money safe and provide loans"
  },
  {
    id: "u-sst-26",
    level: "UPPER",
    subject: "SST",
    unit: "ECONOMY",
    question: "What are co-operatives?",
    options: ["Groups of people working together for common economic goals", "A type of school", "A government office", "A hospital"],
    correctAnswer: "Groups of people working together for common economic goals"
  },
  // UNIT 5: ENVIRONMENT AND CLIMATE IN OUR PROVINCE
  {
    id: "u-sst-27",
    level: "UPPER",
    subject: "SST",
    unit: "ENVIRONMENT AND CLIMATE IN OUR PROVINCE",
    question: "What are the components of the environment?",
    options: ["Only living things", "Only non-living things", "Both living and non-living things", "Only computers"],
    correctAnswer: "Both living and non-living things"
  },
  {
    id: "u-sst-28",
    level: "UPPER",
    subject: "SST",
    unit: "ENVIRONMENT AND CLIMATE IN OUR PROVINCE",
    question: "Which instrument is used to measure temperature?",
    options: ["Rain gauge", "Thermometer", "Wind vane", "Anemometer"],
    correctAnswer: "Thermometer"
  },
  {
    id: "u-sst-29",
    level: "UPPER",
    subject: "SST",
    unit: "ENVIRONMENT AND CLIMATE IN OUR PROVINCE",
    question: "How many seasons do we have in our province?",
    options: ["Two (Dry and Rainy)", "Four", "One", "Six"],
    correctAnswer: "Two (Dry and Rainy)"
  },
  // UNIT 6: SOCIAL SERVICES AND IMPORTANT PLACES IN OUR PROVINCE
  {
    id: "u-sst-30",
    level: "UPPER",
    subject: "SST",
    unit: "SOCIAL SERVICES AND IMPORTANT PLACES IN OUR PROVINCE",
    question: "Which service provides education to children?",
    options: ["Medical services", "Security services", "Educational services", "Banking services"],
    correctAnswer: "Educational services"
  },
  {
    id: "u-sst-31",
    level: "UPPER",
    subject: "SST",
    unit: "SOCIAL SERVICES AND IMPORTANT PLACES IN OUR PROVINCE",
    question: "Where do people go when they are sick?",
    options: ["Market", "Bank", "Hospital or Health Centre", "Police station"],
    correctAnswer: "Hospital or Health Centre"
  },
  // UNIT 7: POPULATION
  {
    id: "u-sst-32",
    level: "UPPER",
    subject: "SST",
    unit: "POPULATION",
    question: "What is a population census?",
    options: ["A type of food", "The official counting of people in a country", "A school test", "A market survey"],
    correctAnswer: "The official counting of people in a country"
  },
  {
    id: "u-sst-33",
    level: "UPPER",
    subject: "SST",
    unit: "POPULATION",
    question: "Why is it important to control population growth?",
    options: ["To have fewer friends", "To ensure resources are enough for everyone", "To make the country empty", "To stop schools"],
    correctAnswer: "To ensure resources are enough for everyone"
  },
  // UNIT 8: COLONIAL RWANDA
  {
    id: "u-sst-34",
    level: "UPPER",
    subject: "SST",
    unit: "COLONIAL RWANDA",
    question: "When did Rwanda get its independence?",
    options: ["1960", "1961", "1962", "1994"],
    correctAnswer: "1962"
  },
  {
    id: "u-sst-35",
    level: "UPPER",
    subject: "SST",
    unit: "COLONIAL RWANDA",
    question: "Who were the first colonialists in Rwanda?",
    options: ["British", "Germans", "French", "Americans"],
    correctAnswer: "Germans"
  },
  // UNIT 9: NOTION OF THE BIBLE AND QUR’AN
  {
    id: "u-sst-36",
    level: "UPPER",
    subject: "SST",
    unit: "NOTION OF THE BIBLE AND QUR’AN",
    question: "What is the holy book for Christians?",
    options: ["Qur'an", "Bible", "Dictionary", "Story book"],
    correctAnswer: "Bible"
  },
  {
    id: "u-sst-37",
    level: "UPPER",
    subject: "SST",
    unit: "NOTION OF THE BIBLE AND QUR’AN",
    question: "What is the holy book for Muslims?",
    options: ["Bible", "Qur'an", "Atlas", "Encyclopedia"],
    correctAnswer: "Qur'an"
  },
  // UNIT 10: ACTS OF CHARITY IN THE COMMUNITY AND FAITH
  {
    id: "u-sst-38",
    level: "UPPER",
    subject: "SST",
    unit: "ACTS OF CHARITY IN THE COMMUNITY AND FAITH",
    question: "What is an act of charity?",
    options: ["Stealing from others", "Helping those in need without expecting anything back", "Ignoring the poor", "Arguing with neighbors"],
    correctAnswer: "Helping those in need without expecting anything back"
  },
  // UNIT 11: SIN AND ITS CONSEQUENCES
  {
    id: "u-sst-39",
    level: "UPPER",
    subject: "SST",
    unit: "SIN AND ITS CONSEQUENCES",
    question: "What is a consequence of sin according to faith?",
    options: ["Getting rewards", "Separation from God and inner peace", "Becoming famous", "Winning a prize"],
    correctAnswer: "Separation from God and inner peace"
  },
  {
    id: "u-sst-40",
    level: "UPPER",
    subject: "SST",
    unit: "SIN AND ITS CONSEQUENCES",
    question: "How can one avoid sins?",
    options: ["By following moral and religious teachings", "By ignoring rules", "By being selfish", "By fighting"],
    correctAnswer: "By following moral and religious teachings"
  }
];
