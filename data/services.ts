export const services = [
  {
    slug: "pipeline-tools",
    title: "Pipeline Setup\n& Tooling",
    shortTitle: "Pipeline Setup & Tooling",
    href: "/services/pipeline-tools",
    description:
      "Python automation, Maya tooling and asset validation workflows designed to improve production efficiency, consistency and delivery.",
    mediaLoop: "/videos/services/pipeline-tools-reel.mp4",
    points: [
      "Python automation for Maya tools and production pipeline workflows.",
      "Validation, naming, export and scene organization systems.",
      "Pipeline TD support for scalable asset delivery inside and outside Maya.",
    ],
  },
  {
    slug: "character-td-rigging",
    title: "Character Rigging\n& Skinning",
    shortTitle: "Character Rigging & Skinning",
    href: "/services/character-td-rigging",
    description:
      "Production-ready character and creature rigs built with Maya, mGear and custom rigging workflows focused on deformation quality, animator-friendly controls and scalable production pipelines.",
    mediaLoop: "/videos/services/character-rigging-reel.mp4",
    points: [
      "Production-ready rigs for characters, creatures and game assets.",
      "Maya, mGear and Python workflows focused on animator-friendly controls.",
      "Skinning, deformation quality, rig testing and technical breakdowns.",
    ],
  },
  {
    slug: "technical-animator",
    title: "Technical\nAnimation",
    shortTitle: "Technical Animation",
    href: "/services/technical-animator",
    description:
      "Bridging rigging, animation and engine implementation through Control Rig, animation systems and production-ready technical animation workflows.",
    mediaLoop: "/videos/services/technical-animation-reel.mp4",
    points: [
      "Character skeletal meshes imported and implemented into engine.",
      "Control Rig, IK Rig, retargeting and gameplay animation workflows.",
      "Animation Blueprints, state machines, montages and Sequencer workflows.",
    ],
  },
];

export const servicePages = [
  {
    slug: "pipeline-tools",
    eyebrow: "Service 01",
    title: "Pipeline Setup & Tooling",
    description:
      "Python automation, Maya tooling and asset validation workflows designed to improve production efficiency, consistency and delivery.",
    heroVideo: "/videos/services/pipeline-tools-reel.mp4",
    pillars: [
      "Python & PyMel tools",
      "Validation workflows",
      "Dynamic folders",
      "GLB viewer ready",
    ],
    projectSlugs: [],
    customSections: [
      {
        title: "Batch Export Workflows",
        label: "Tools Development",
        description:
          "Python tools designed to process large numbers of assets efficiently and consistently across production-ready export workflows.",
        mediaLoop: "/videos/pipeline/pipeline-reel.mp4",
        points: [
          "Batch processing for repeated production tasks.",
          "Export automation for consistent delivery.",
          "Prepared for GLB, USD and FBX workflows.",
        ],
      },
    ],
  },
  {
    slug: "character-td-rigging",
    eyebrow: "Service 02",
    title: "Character Rigging & Skinning",
    description:
      "Production-ready character and creature rigs built with Maya, mGear and custom rigging workflows focused on deformation quality, animator-friendly controls and scalable production pipelines.",
    heroVideo: "/videos/services/character-rigging-reel.mp4",
    pillars: [
      "mGear, Red9 and rig building systems",
      "Custom and bespoke manual rigging",
      "Rig testing with animator feedback",
      "Smooth production-ready pipelines",
    ],
    projectSlugs: [
      "nyan-heroes",
      "vorkarn-creature-rig",
      "dungeon-of-undernest",
    ],
    customSections: [
      {
        title: "Character Rigging",
        label: "Character TD",
        description:
          "Rig building systems prepared for production characters, custom controls and animator-friendly workflows.",
        mediaLoop: "/videos/rigging/production-character-rig.mp4",
        points: [
          "mGear, Red9 and other rig building systems.",
          "Custom and bespoke manual rigging.",
          "Thorough rig testing and feedback loop with animators.",
        ],
      },
      {
        title: "Skinning & Deformation",
        label: "Rig Quality",
        description:
          "Skinning and deformation work focused on clean motion, technical reliability and animation-ready results.",
        mediaLoop: "/videos/rigging/skinning-deform.mp4",
        points: [
          "Skinning quality review.",
          "Deformation checks during motion.",
          "Production-ready rig validation.",
        ],
      },
      {
        title: "Character Renders",
        label: "Final Presentation",
        description:
          "Rendered character presentation used to show the final visual quality of selected production projects.",
        mediaLoop: "/videos/rigging/character-renders.mp4",
        points: [
          "Final rendered character presentation.",
          "Selected production project visuals.",
          "Clean portfolio-ready showcase.",
        ],
      },
    ],
  },
  {
    slug: "technical-animator",
    eyebrow: "Service 03",
    title: "Technical Animation",
    description:
      "Bridging rigging, animation and engine implementation through Control Rig, animation systems and production-ready technical animation workflows.",
    heroVideo: "/videos/services/technical-animation-reel.mp4",
    pillars: [
      "Control Rig",
      "Animation Blueprints",
      "Retargeting",
      "Gameplay animation systems",
    ],
    projectSlugs: [],
    customSections: [
      {
        title: "Control Rig Workflows",
        label: "Unreal Engine",
        description:
          "Procedural rigging and animation systems implemented directly inside Unreal Engine for technical animation review.",
        mediaLoop: "/videos/technical-animation/control-rig.mp4",
        points: [
          "Control Rig studies and setup.",
          "In-engine rig logic.",
          "Prepared for animation system implementation.",
        ],
      },
      {
        title: "Animation Blueprint",
        label: "Animation Systems",
        description:
          "Animation Blueprint, state machines and gameplay animation logic prepared for real-time character animation workflows.",
        mediaLoop: "/videos/technical-animation/animation-blueprint.mp4",
        points: [
          "Animation Blueprint setup.",
          "State-machine organization.",
          "Animation montages and events.",
        ],
      },
      {
        title: "Retargeting Pipelines",
        label: "IK Rig / Retargeting",
        description:
          "Body and facial retargeting workflows designed for production-ready animation transfer inside Unreal Engine.",
        mediaLoop: "/videos/technical-animation/retargeting.mp4",
        points: [
          "IK Rig and IK Retargeter workflow.",
          "Body and face retargeting path.",
          "Production-ready animation transfer.",
        ],
      },
    ],
  },
];
