/**
 * MountainClicks Wedding Stories Data
 * -------------------------------------------------------------
 * Ab har wedding story me sirf IMAGES aayengi (no descriptions).
 * Nayi story add karne ke liye bas couple ka naam, location,
 * coverImage aur images ki list de dijiye!
 * -------------------------------------------------------------
 */

const storiesData = {
  // Story 1: Aarav & Meera (Lake Palace, Udaipur)
  "aarav-meera": {
    couple: "Aarav & Meera",
    location: "LAKE PALACE, UDAIPUR",
    coverImage: "Public/final/optimized/wedding3.jpg",
    images: [
      "Public/final/optimized/wedding1.jpg",
      "Public/final/optimized/wedding2.jpg",
      "Public/final/optimized/wedding3.jpg",
      "Public/final/optimized/wedding4.jpg"
    ]
  },

  // Story 2: Kabir & Ananya (Himalayan Heights, Manali)
  "kabir-ananya": {
    couple: "Kabir & Ananya",
    location: "HIMALAYAN HEIGHTS, MANALI",
    coverImage: "Public/final/optimized/prewedding2.jpg",
    images: [
      "Public/final/optimized/prewedding1.jpg",
      "Public/final/optimized/prewedding2.jpg",
      "Public/final/optimized/wedding5.jpg"
    ]
  },

  // Story 3: Rohan & Priya (Goa Coastal Estate)
  "rohan-priya": {
    couple: "Rohan & Priya",
    location: "GOA COASTAL ESTATE",
    coverImage: "Public/final/optimized/wedding3.jpg",
    images: [
      "Public/final/optimized/wedding3.jpg",
      "Public/final/optimized/wedding5.jpg"
    ]
  },

  // Story 4: Vikram & Pooja (Wildenflower Estate, Shimla)
  "vikram-pooja": {
    couple: "Vikram & Pooja",
    location: "WILDENFLOWER ESTATE, SHIMLA",
    coverImage: "Public/final/optimized/wedding4.jpg",
    images: [
      "Public/final/optimized/wedding1.jpg",
      "Public/final/optimized/wedding2.jpg"
    ]
  },

  // Story 5 (Placeholder): Dev & Ishita
  "story-4": {
    couple: "Dev & Ishita",
    location: "NEEMRANA FORT PALACE",
    coverImage: "Public/final/optimized/gallery4.jpg",
    images: [
      "Public/final/optimized/gallery4.jpg",
      "Public/final/optimized/gallery1.jpg"
    ]
  },

  // Story 6 (Placeholder): Arjun & Tara
  "story-5": {
    couple: "Arjun & Tara",
    location: "VALLEY VIEW ESTATE, MUSSOORIE",
    coverImage: "Public/final/optimized/gallery2.jpg",
    images: [
      "Public/final/optimized/gallery2.jpg",
      "Public/final/optimized/gallery5.jpg"
    ]
  },

  // Story 7 (Placeholder): Aditya & Sanjana
  "story-6": {
    couple: "Aditya & Sanjana",
    location: "LAKESIDE RETREAT, ALIBAG",
    coverImage: "Public/final/optimized/gallery3.jpg",
    images: [
      "Public/final/optimized/gallery3.jpg",
      "Public/final/optimized/gallery6.jpg"
    ]
  }
};

// Aliases for easy URL linking
storiesData["wedding-a"] = storiesData["aarav-meera"];
storiesData["wedding-b"] = storiesData["kabir-ananya"];
storiesData["wedding-4"] = storiesData["story-4"];
storiesData["wedding-5"] = storiesData["story-5"];
storiesData["wedding-6"] = storiesData["story-6"];

window.weddingStories = storiesData;
