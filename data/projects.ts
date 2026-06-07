import { nyanHeroesProject } from "./characters/nyan-heroes";

export { experience, testimonials } from "./experience";
export { services, servicePages } from "./services";

export const productions = [
  {
    slug: "vorkarn-creature-rig",
    title: "Vorkarn Creature Rig",
    type: "Creature Rigging",
    target: "/projects/vorkarn-creature-rig",
  },
  {
    slug: "nyan-heroes",
    title: "Nyan Heroes",
    type: "Production Character Rigging",
    target: "/projects/nyan-heroes",
  },
  {
    slug: "unga-land",
    title: "Unga Land",
    type: "Game Character Rigging",
    target: "/projects/unga-land",
  },
  {
    slug: "dungeon-of-undernest",
    title: "Dungeon of Undernest",
    type: "Production Rigging",
    target: "/projects/dungeon-of-undernest",
  },
];

export const additionalProductions = [
  {
    slug: "sarah-rig",
    title: "Sarah Rig",
    type: "Character Rigging",
    target: "/projects/sarah-rig",
  },
  {
    slug: "terror-impostor-rig",
    title: "Terror Impostor Rig",
    type: "Freelance Rigging",
    target: "/projects/terror-impostor-rig",
  },
  {
    slug: "berta-rig",
    title: "Berta Rig",
    type: "Freelance Rigging",
    target: "/projects/berta-rig",
  },
];

export const productionProjects = [
  {
      slug: "vorkarn-creature-rig",
      title: "Vorkarn Creature Rig",
      category: "Creature Rigging",
      description:
        "Production-ready creature rig focused on deformation quality, animator-friendly controls and technical rigging presentation.",
      tags: ["Maya", "mGear", "Python", "PyMel", "Creature Rigging"],
      heroVideo: "/videos/projects/vorkarn-creature-rig/hero-loop.mp4",
      heroImage: "/images/projects/vorkarn-creature-rig/hero.webp",
      overview:
        "This production page is prepared to show the complete Vorkarn rigging case study: final rig, rig controls, mGear workflow, animation tests, breakdown videos, images and optional GLB viewer.",
      responsibilities: [
        "Creature rigging",
        "Control system setup",
        "Skinning and deformation support",
        "Animation-ready rig structure",
        "Technical breakdown presentation",
      ],
      tools: ["Maya", "mGear", "Python", "PyMel"],
      mediaLoop: "/videos/projects/vorkarn-creature-rig/hero-loop.mp4",
      gallery: [
        "/images/projects/vorkarn-creature-rig/01.webp",
        "/images/projects/vorkarn-creature-rig/02.webp",
        "/images/projects/vorkarn-creature-rig/03.webp",
      ],
      glb: "/glb/projects/vorkarn-creature-rig/vorkarn.glb",
      sections: [
        {
          slug: "final-animation-rig",
          title: "Final Animation & Rig",
          label: "Final Result",
          description:
            "Final presentation of the creature rig, showing animation quality, deformation behavior and production-ready results.",
          mediaLoop: "/videos/projects/vorkarn-creature-rig/hero-loop.mp4",
          videos: [
            {
              title: "Final Animation & Rig",
              description:
                "Full YouTube breakdown reference for the final rig and animation presentation.",
              youtube: "https://www.youtube.com/watch?v=J5ZiiFZ8WiY",
            },
          ],
        },
        {
          slug: "rigging-breakdown",
          title: "Rigging Breakdown",
          label: "Technical Breakdown",
          description:
            "Technical breakdown showing rig controls, hierarchy structure, deformation workflow and animator-facing systems.",
          mediaLoop: "/videos/projects/vorkarn-creature-rig/vorkarn-rigging.mp4",
          videos: [
            {
              title: "Rigging Breakdown",
              description:
                "Full YouTube breakdown reference for rig controls and technical setup.",
              youtube: "https://www.youtube.com/watch?v=9rU6Tqu1Vtc",
            },
          ],
        },
        {
          slug: "behind-the-scenes",
          title: "Behind The Scenes",
          label: "Workflow",
          description:
            "Behind-the-scenes look at the rig setup, controls, deformation systems and production workflow.",
          mediaLoop: "/videos/projects/vorkarn-creature-rig/behind-scenes-loop.mp4",
          videos: [
            {
              title: "Behind The Scenes",
              description:
                "Full YouTube reference for the behind-the-scenes rigging workflow.",
              youtube: "https://www.youtube.com/watch?v=rbbQI9AYWWg",
            },
          ],
        },
      ],
    },
  nyanHeroesProject,
  {
      slug: "unga-land",
      title: "Unga Land",
      category: "Game Character Rigging",
      description:
        "Game production rigging work prepared for a short trailer, gameplay and technical breakdown presentation.",
      tags: ["Maya", "mGear", "Python", "Game Rigging"],
      heroVideo: "/videos/projects/unga-land/hero-loop.mp4",
      heroImage: "/images/projects/unga-land/hero.webp",
      overview:
        "This production page is prepared to highlight character rigging support, game-ready workflows and animation integration for Unga Land.",
      responsibilities: [
        "Character rigging",
        "Game-ready setup",
        "Animation support",
      ],
      tools: ["Maya", "mGear", "Python"],
      mediaLoop: "/videos/projects/unga-land/main-loop.mp4",
      gallery: [
        "/images/projects/unga-land/01.webp",
        "/images/projects/unga-land/02.webp",
        "/images/projects/unga-land/03.webp",
      ],
      glb: "",
      sections: [
        {
          slug: "trailer-reference",
          title: "Unga Land Trailer",
          label: "Production Context",
          description:
            "External trailer reference. A short optimized loop can be added later for the website.",
          mediaLoop: "/videos/projects/unga-land/trailer-loop.mp4",
          videos: [
            {
              title: "Unga Land Trailer",
              description:
                "External trailer reference for production context.",
              youtube: "https://www.youtube.com/watch?v=1Ggi8kcWmOA",
            },
          ],
        },
        {
          slug: "rigging-breakdown",
          title: "Rigging Breakdown",
          label: "Technical Work",
          description:
            "Reserved section for rig controls, deformation tests and game-ready setup media.",
          mediaLoop: "/videos/projects/unga-land/rigging-breakdown-loop.mp4",
          videos: [],
        },
      ],
    },
  {
      slug: "dungeon-of-undernest",
      title: "Dungeon of Undernest: The Pink Plague",
      category: "Production Rigging",
      description:
        "Character rigging contribution during Blue Panda Studio production work.",
      tags: ["Maya", "mGear", "Python", "Production Rigging"],
      heroVideo: "/videos/projects/dungeon-of-undernest/hero-loop.mp4",
      heroImage: "/images/projects/dungeon-of-undernest/hero.webp",
      overview:
        "Reserved section for optimized Instagram-derived clips, screenshots, character previews and rigging responsibilities.",
      responsibilities: [
        "Character rigging",
        "Production support",
        "Animation-ready setup",
      ],
      tools: ["Maya", "mGear", "Python"],
      mediaLoop: "/videos/projects/dungeon-of-undernest/main-loop.mp4",
      gallery: [
        "/images/projects/dungeon-of-undernest/01.webp",
        "/images/projects/dungeon-of-undernest/02.webp",
        "/images/projects/dungeon-of-undernest/03.webp",
      ],
      glb: "",
      sections: [
        {
          slug: "character-rigs",
          title: "Character Rigging Work",
          label: "Production Rigging",
          description:
            "Reserved space for character rig clips, screenshots and final animation previews.",
          mediaLoop: "/videos/projects/dungeon-of-undernest/character-rigs-loop.mp4",
          videos: [],
        },
        {
          slug: "production-media",
          title: "Production Media",
          label: "Gallery",
          description:
            "Area prepared for downloaded and optimized Instagram media.",
          mediaLoop: "/videos/projects/dungeon-of-undernest/production-media-loop.mp4",
          videos: [],
        },
      ],
    },
  {
      slug: "sarah-rig",
      title: "Sarah Rig",
      category: "Character Rigging",
      description:
        "Character rigging case study prepared for animation-focused presentation and future media breakdowns.",
      tags: ["Maya", "mGear", "Python", "Character Rigging"],
      heroVideo: "/videos/projects/sarah-rig/hero-loop.mp4",
      heroImage: "/images/projects/sarah-rig/hero.webp",
      overview:
        "A character rigging showcase area reserved for rig controls, skinning tests, deformation previews and animation-ready setup documentation.",
      responsibilities: [
        "Character rigging",
        "Skinning support",
        "Animator controls",
      ],
      tools: ["Maya", "mGear", "Python"],
      mediaLoop: "/videos/projects/sarah-rig/main-loop.mp4",
      gallery: [
        "/images/projects/sarah-rig/01.webp",
        "/images/projects/sarah-rig/02.webp",
        "/images/projects/sarah-rig/03.webp",
      ],
      glb: "",
      sections: [
        {
          slug: "rig-breakdown",
          title: "Rig Breakdown",
          label: "Character Rig",
          description:
            "Reserved area for Sarah Rig controls, guide previews and animation-ready setup.",
          mediaLoop: "/videos/projects/sarah-rig/rig-breakdown-loop.mp4",
          videos: [],
        },
      ],
    },
  {
      slug: "terror-impostor-rig",
      title: "Terror Impostor Rig",
      category: "Freelance Rigging / REKiNDLED",
      description:
        "Freelance character rigging project prepared for a focused rig breakdown and animation showcase.",
      tags: ["Maya", "mGear", "Python", "Freelance Rigging"],
      heroVideo: "/videos/projects/terror-impostor-rig/hero-loop.mp4",
      heroImage: "/images/projects/terror-impostor-rig/hero.webp",
      overview:
        "This section is reserved for a clean rigging breakdown, control previews and animation tests once media files are ready.",
      responsibilities: [
        "Character rigging",
        "Control setup",
        "Freelance production support",
      ],
      tools: ["Maya", "mGear", "Python"],
      mediaLoop: "/videos/projects/terror-impostor-rig/main-loop.mp4",
      gallery: [
        "/images/projects/terror-impostor-rig/01.webp",
        "/images/projects/terror-impostor-rig/02.webp",
        "/images/projects/terror-impostor-rig/03.webp",
      ],
      glb: "",
      sections: [
        {
          slug: "rig-breakdown",
          title: "Rig Breakdown",
          label: "Freelance Rig",
          description:
            "Reserved area for Terror Impostor Rig controls, deformation tests and final animation loop.",
          mediaLoop: "/videos/projects/terror-impostor-rig/rig-breakdown-loop.mp4",
          videos: [],
        },
      ],
    },
  {
      slug: "berta-rig",
      title: "Berta Rig",
      category: "Freelance Rigging / REKiNDLED",
      description:
        "Freelance character rigging project prepared for portfolio presentation and technical breakdowns.",
      tags: ["Maya", "mGear", "Python", "Freelance Rigging"],
      heroVideo: "/videos/projects/berta-rig/hero-loop.mp4",
      heroImage: "/images/projects/berta-rig/hero.webp",
      overview:
        "This section is reserved for rig controls, deformation tests, animation loops and final production notes.",
      responsibilities: [
        "Character rigging",
        "Skinning support",
        "Animation-ready controls",
      ],
      tools: ["Maya", "mGear", "Python"],
      mediaLoop: "/videos/projects/berta-rig/main-loop.mp4",
      gallery: [
        "/images/projects/berta-rig/01.webp",
        "/images/projects/berta-rig/02.webp",
        "/images/projects/berta-rig/03.webp",
      ],
      glb: "",
      sections: [
        {
          slug: "rig-breakdown",
          title: "Rig Breakdown",
          label: "Freelance Rig",
          description:
            "Reserved area for Berta Rig controls, deformation tests and final animation loop.",
          mediaLoop: "/videos/projects/berta-rig/rig-breakdown-loop.mp4",
          videos: [],
        },
      ],
    },
];

export const projects = [
  {
    slug: "character-rigging",
    title: "Character Rigging",
    category: "Rigging / Character TD",
    description:
      "Production-ready rigs for characters, creatures and game assets, focused on clean deformation, animator-friendly controls and scalable workflows.",
    tags: ["Maya", "mGear", "Python", "IK/FK", "Deformation"],
    heroVideo: "/videos/hero/portfolio-overview-loop.mp4",
    heroImage: "/images/hero/character-rigging-hero.webp",
    items: productionProjects.map((production) => ({
      slug: production.slug,
      title: production.title,
      label: production.category,
      description: production.description,
      overview: production.overview,
      responsibilities: production.responsibilities,
      tools: production.tools,
      mediaLoop: production.mediaLoop,
      target: `/projects/${production.slug}`,
      videos: [],
    })),
  },
  {
    slug: "pipeline-tools",
    title: "Pipeline & Tools",
    category: "Pipeline / Tools Development",
    description:
      "Python, Maya tools and game-ready asset workflows for automation, validation, export and scalable production support.",
    tags: ["Python", "PyMel", "Qt", "GLB", "USD", "Automation"],
    heroVideo: "/videos/hero/portfolio-overview-loop.mp4",
    heroImage: "/images/hero/pipeline-tools-hero.webp",
    items: [
      {
        slug: "maya-rigging-tools",
        title: "Maya Rigging Tools",
        label: "Python / PyMel Tools",
        description:
          "Custom tools designed to speed up repetitive rigging tasks and reduce manual setup time.",
        overview:
          "A Maya toolset focused on reducing repetitive rigging work, improving consistency and supporting production efficiency.",
        responsibilities: [
          "Python scripting",
          "Maya automation",
          "Workflow design",
          "Rigging support tools",
        ],
        tools: ["Python", "PyMel", "Maya", "Qt"],
        mediaLoop: "/videos/projects/maya-rigging-tools-loop.mp4",
        videos: [],
      },
      {
        slug: "asset-validation-export",
        title: "Asset Validation & Export Workflow",
        label: "Pipeline Validation",
        description:
          "Utility workflows for checking naming conventions, scene organization and export consistency.",
        overview:
          "A validation workflow designed to support cleaner scenes, more reliable asset delivery and scalable production review.",
        responsibilities: [
          "Validation logic",
          "Naming checks",
          "Scene organization",
          "Export support",
        ],
        tools: ["Python", "Maya", "FBX", "GLB"],
        mediaLoop: "/videos/projects/asset-validation-loop.mp4",
        videos: [],
      },
      {
        slug: "game-ready-asset-pipeline",
        title: "Automated Game Ready Asset Pipeline",
        label: "Game Asset Pipeline",
        description:
          "Technical workflow for organizing, preparing, validating and exporting assets for real-time game production.",
        overview:
          "A workflow focused on preparing assets for lightweight web-based 3D visualization and real-time game asset pipelines.",
        responsibilities: [
          "GLB export",
          "USD workflow planning",
          "Asset preparation",
          "Pipeline automation",
        ],
        tools: ["Python", "Maya", "GLB", "USD", "Unreal Engine"],
        mediaLoop: "/videos/projects/game-ready-pipeline-loop.mp4",
        videos: [],
      },
    ],
  },
  {
    slug: "technical-animation",
    title: "Technical Animation & Unreal Engine",
    category: "Realtime Animation",
    description:
      "A growing section focused on Unreal Engine animation systems, Control Rig, IK Rig, retargeting and real-time technical animation workflows.",
    tags: [
      "Unreal Engine",
      "Control Rig",
      "IK Rig",
      "Retargeting",
      "Animation Blueprint",
    ],
    heroVideo: "/videos/hero/portfolio-overview-loop.mp4",
    heroImage: "/images/hero/technical-animation-hero.webp",
    items: [
      {
        slug: "control-rig-learning-path",
        title: "Control Rig Learning Path",
        label: "Technical Animation Lab",
        description:
          "Technical animation studies focused on building rig logic directly inside Unreal Engine.",
        overview:
          "This section documents the learning process and future production experiments using Unreal Control Rig, IK Rig, retargeting and real-time animation systems.",
        responsibilities: [
          "Control Rig studies",
          "IK Rig exploration",
          "Retargeting workflow practice",
          "Real-time animation setup",
        ],
        tools: ["Unreal Engine", "Control Rig", "IK Rig"],
        mediaLoop: "/videos/projects/control-rig-learning-loop.mp4",
        videos: [],
      },
    ],
  },
];
