import type { PatternTuple, Scope } from "@/models/jargon";


export const SIMPLE_PATTERN: PatternTuple[] = [
  [1, "We had to $1."],
  [2, "Then we $1 to $2."],
  [2, "After that we $1 and $2."],
  [2, "Finally we $1 and $2."],
];

export const ADVANCED_PATTERN: PatternTuple[] = [
  [3, "We had to $1 alongside $2 and $3."],
  [3, "However because of $1 we needed to $2 so that we could $3."],
  [
    3,
    "Thanks to that we were able to $1 and that lead us to $2 which also resulted in $3.",
  ],
  [
    3,
    "Finally we $1 and resolved the issue. Thanks to that we were able to $2 and $3.",
  ],
];

export const COMPLEX_PATTERN: PatternTuple[] = [
  [
    3,
    "We discovered that due to the latests IEEE changes in the $1 we had to $2 and $3.",
  ],
  [3, "After a long discussion about the $1 we decided to $2 and $3."],
  [3, "We had to $1 and $2 in order to $3."],
  [3, "However because of an unexpected $1 we had to $2 and $3."],
  [
    3,
    "Luckly we were able to $1 and $2 which lead us to $3 and finally resolving the issue.",
  ],
];

export const SUBSTITUTIONS: Record<Scope | "general", string[]> = {
  frontend: [
    "dehydrate the virtual nodes during server-side rendering",
    "quantum-compress the JavaScript heap",
    "inherit from its own styled components",
    "fractalize into autonomous bundles reversed trough the service worker",
    "transcend its service worker limitations",
    "entangle with the view layer",
    "render the DOM using DDOM with SEC DOS DOM algorithm",
    "run an ast on the CSS grid",
    "deconstruct the URL matrix and its firmware",
    "heap allocate the garbage collector",
  ],
  backend: [
    "shard the sharding strategy",
    "dump the fragmented matrix out of the patriarchy",
    "defragment the hsd database trough a graph theory",
    "quantum-entagle the encryption protocols",
    "decouple the entangled message queue",
    "collapse the GraphQL resolver tree",
    "invalidate the validation pipeline time-space continuum",
    "cache the universed within the L1 cache",
    "level 3 authorize the jwt container",
    "index the /etc/hosts/hosted/systems",
  ],
  devops: [
    "orchestrate an attempt at a federal deployment",
    "recursively terraform the aws state of the gcp console",
    "monitor the three way splitted mirror of the containerized registry",
    "quantum-encrypt the encryption protocols",
    "manually deliver the network packets",
    "replace the OSI layer with the ISO layer",
    "automate the whale to spin up docker containers",
    "call prometheus to have him reach out to the internal sources",
    "scaled the matrix by 1.999999x",
    "re-route the DHCP to use RHCP and strike a chord with the NATionaly database",
  ],
  design: [
    "inherit from its own component library",
    "experience the user experience",
    "reverse the colors from hsl to lsh",
    "use the Gutenberg principle to design the layout",
    "recreate figma from scratch",
    "go shopping in photo shop",
    "have adobe create a new user-centric,multi-demensional, pentagon approved design tool",
    "interface with the users",
    "build a workshop to make new canvases for Canva",
    "use the bronze ratio to get the silver ratio to get the golden ratio to design the layout",
  ],
  management: [
    "jira the tickets",
    "accumulate the story so the hero has enough points to go on the jurney",
    "destabilize the meeting schedule to make sure the team is on their toes",
    "reserve the bar for the daily stand up",
    "master scrum foo",
    "use the agile sword to cut the waterfall rope",
    "build a bridge between the kanban and the scrum",
    "use the agile shield to protect the team from the waterfall",
    "use the agile hammer to break the waterfall",
    "use the agile axe to cut the waterfall",
  ],
  other: [
    "turn it on and off again",
    "bypass the mainframe's firewall protocols",
    "reroute the energy from the mainframe to the auxiliary power unit",
    "upload a deez.nxts file to the database core",
    "reboot the system using the konami code",
    "use the backdoor to access the frontdoor.xml",
    "use visual basic to create visual advanced and hack the gui",
    "use the polymorphic engine to start the crypto miner",
    "implement BI to use the AI to create the CI and deploy to CD with the help of the ML",
    "use blockchain to keep the records in the database from escaping",
  ],
  general: [
    "quantum-triangulate the IPv6 matrix through the blockchain firewall",
    "recompile the neural network using machine learning algorithms written in COBOL",
    "synchronize the RAM cache with the cloud-based JSON parser",
    "defragment the recursive binary tree using blockchain validators",
    "initialize the quantum-encrypted SSL handshake protocol via the mainframe",
    "reverse-engineer the API endpoints using hyperspace routing tables",
    "optimize the GUI interface by deconstructing the HTML5 blockchain",
    "reconfigure the DNS matrix through the decentralized proxy server",
    "deploy microservices to the quantum cloud using blockchain smart contracts",
    "debug the neural network by implementing recursive machine learning algorithms",
  ],
};

export const TERMS: Record<string, string[]> = {
  semicolon: [
    "boot the lexical terminator",
    "code a new dot-comma operator",
    "initialize the semicolon parser",
    "recompile the semicolon lexer",
    "reconfigure the semicolon interpreter",
  ],
  database: [
    "have beavers reconfigure the database schema",
    "dump the database drivers and replace java cdc protocol with pd11dy",
    "recompile the database kernel",
    "hide the public schema because it is shy",
    "store the database in a database to make it meta",
  ],
};
