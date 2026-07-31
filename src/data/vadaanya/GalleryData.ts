export interface GalleryEvent {
  id: string;
  title: string;
  date: string;
  coverImage: string;
  images: string[];
}

export const galleryEvents: GalleryEvent[] = [
  {
    id: "nov-2019",
    title: "Digital Teaching at High School - Hyderabad",
    date: "Nov 2019",
    coverImage: "/hero-1.jpg",
    images: [
      "/hero-1.jpg",
      "/hero-2.jpg",
      "/hero-3.jpg",
      "/vadaanya_team.jpeg",
      "/hero-4.jpg",
      "/hero-5.jpg"
    ]
  },
  {
    id: "jan-2018",
    title: "Borstal Event - Vishakhapatanam",
    date: "Jan 2018",
    coverImage: "/hero-2.jpg",
    images: [
      "/hero-2.jpg",
      "/hero-1.jpg",
      "/hero-4.jpg",
      "/hero-6.jpg",
      "/vadaanya_team.jpeg"
    ]
  },
  {
    id: "mar-2015",
    title: "Vadaanya T-Shirt Launch",
    date: "Mar 2015",
    coverImage: "/vadaanya_team.jpeg",
    images: [
      "/vadaanya_team.jpeg",
      "/hero-3.jpg",
      "/hero-5.jpg",
      "/hero-2.jpg"
    ]
  },
  {
    id: "feb-2015",
    title: "Mahatma Gandhi Museum Visit",
    date: "Feb 2015",
    coverImage: "/hero-4.jpg",
    images: [
      "/hero-4.jpg",
      "/hero-1.jpg",
      "/hero-6.jpg",
      "/vadaanya_team.jpeg",
      "/hero-2.jpg"
    ]
  },
  {
    id: "jan-2015",
    title: "Digital Teaching at Primary School - Hyderabad",
    date: "Jan 2015",
    coverImage: "/hero-5.jpg",
    images: [
      "/hero-5.jpg",
      "/hero-2.jpg",
      "/hero-3.jpg",
      "/vadaanya_team.jpeg"
    ]
  }
];
