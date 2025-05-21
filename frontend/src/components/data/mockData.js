// mockData.js

export const mockSuppliers = [
    {
      id: 1,
      name: "Digital Arts Co.",
      description: "Premium digital art and design assets for professionals.",
      transactions: 128,
      rating: 4.9,
      category: "Graphics & Design",
      joinedDate: "2023-01-15"
    },
    {
      id: 2,
      name: "CodeMasters",
      description: "High quality code templates and development resources.",
      transactions: 95,
      rating: 4.8,
      category: "Programming & Tech",
      joinedDate: "2023-02-22"
    },
    {
      id: 3,
      name: "AudioWave",
      description: "Professional sound effects and music tracks for creators.",
      transactions: 87,
      rating: 4.7,
      category: "Music & Audio",
      joinedDate: "2023-03-10"
    },
    {
      id: 4,
      name: "VideoExpress",
      description: "Video templates and effects for content creators.",
      transactions: 76,
      rating: 4.6,
      category: "Video & Animation",
      joinedDate: "2023-04-05"
    },
    {
      id: 5,
      name: "E-Learning Pro",
      description: "Educational content and course materials.",
      transactions: 65,
      rating: 4.5,
      category: "Education & Training",
      joinedDate: "2023-05-12"
    },
    {
      id: 6,
      name: "MarketingGenius",
      description: "Marketing templates and strategy resources.",
      transactions: 58,
      rating: 4.4,
      category: "Marketing",
      joinedDate: "2023-06-20"
    }
  ];
  
  export const mockDigitalItems = [
    {
      id: 1,
      title: "Professional UI Kit",
      description: "A comprehensive UI kit with 500+ components for web and mobile applications.",
      price: 0.05,
      supplier: mockSuppliers[0],
      category: "UI Kits",
      tags: ["design", "UI", "interface"],
      previewImage: "/placeholder.svg",
      featured: true,
      createdAt: "2023-06-15"
    },
    {
      id: 2,
      title: "React Component Library",
      description: "A collection of 200+ reusable React components with TypeScript support.",
      price: 0.08,
      supplier: mockSuppliers[1],
      category: "Code",
      tags: ["react", "typescript", "components"],
      previewImage: "/placeholder.svg",
      featured: true,
      createdAt: "2023-07-10"
    },
    {
      id: 3,
      title: "Cinematic Music Pack",
      description: "20 royalty-free cinematic tracks for film and video projects.",
      price: 0.03,
      supplier: mockSuppliers[2],
      category: "Audio",
      tags: ["music", "soundtrack", "cinematic"],
      previewImage: "/placeholder.svg",
      featured: false,
      createdAt: "2023-08-22"
    },
    {
      id: 4,
      title: "Video Transitions Pack",
      description: "50 professional video transitions for content creators.",
      price: 0.04,
      supplier: mockSuppliers[3],
      category: "Video",
      tags: ["transitions", "effects", "video"],
      previewImage: "/placeholder.svg",
      featured: true,
      createdAt: "2023-09-05"
    },
    {
      id: 5,
      title: "Digital Marketing Course",
      description: "Complete digital marketing course with 40+ hours of content.",
      price: 0.1,
      supplier: mockSuppliers[4],
      category: "Education",
      tags: ["marketing", "course", "education"],
      previewImage: "/placeholder.svg",
      featured: false,
      createdAt: "2023-10-15"
    },
    {
      id: 6,
      title: "SEO Strategy Templates",
      description: "10 templates for creating effective SEO strategies.",
      price: 0.02,
      supplier: mockSuppliers[5],
      category: "Marketing",
      tags: ["SEO", "templates", "strategy"],
      previewImage: "/placeholder.svg",
      featured: false,
      createdAt: "2023-11-08"
    }
  ];
  