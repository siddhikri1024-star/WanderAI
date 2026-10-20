export const destinations = [
  {
    id: 1, name: "Kyoto", country: "Japan", category: "Culture", price: "$920",
    days: "5 days", rating: "4.9", image: "photo-1493976040374-85c8e12f0c0e",
    description: "Quiet temples, lantern-lit lanes and the art of slowing down."
  },
  {
    id: 2, name: "Amalfi Coast", country: "Italy", category: "Coast", price: "$1,280",
    days: "6 days", rating: "4.8", image: "photo-1533105079780-92b9be482077",
    description: "Sun-drenched villages perched above the Mediterranean."
  },
  {
    id: 3, name: "Bali", country: "Indonesia", category: "Nature", price: "$760",
    days: "7 days", rating: "4.9", image: "photo-1537996194471-e657df975ab4",
    description: "Jungle mornings, ocean sunsets and a little island magic."
  },
  {
    id: 4, name: "Marrakech", country: "Morocco", category: "Culture", price: "$680",
    days: "4 days", rating: "4.7", image: "photo-1539020140153-e479b8c22e70",
    description: "Colorful souks, hidden courtyards and unforgettable flavors."
  },
  {
    id: 5, name: "Swiss Alps", country: "Switzerland", category: "Adventure", price: "$1,450",
    days: "5 days", rating: "4.9", image: "photo-1531366936337-7c912a4589a7",
    description: "Alpine trails, crisp air and train rides through the clouds."
  },
  {
    id: 6, name: "Lisbon", country: "Portugal", category: "City", price: "$840",
    days: "4 days", rating: "4.8", image: "photo-1555881400-74d7acaacd8b",
    description: "Golden-hour viewpoints, tiled streets and late-night fado."
  },
  {
    id: 7, name: "Reykjavík", country: "Iceland", category: "Adventure", price: "$1,190",
    days: "5 days", rating: "4.8", image: "photo-1476610182048-b716b8518aae",
    description: "Volcanic landscapes, hot springs and skies that steal the show."
  },
  {
    id: 8, name: "Ubud", country: "Indonesia", category: "Nature", price: "$620",
    days: "5 days", rating: "4.8", image: "photo-1518548419970-58e3b4079ab2",
    description: "Rice terraces, rainforest paths and restorative island rituals."
  },
  {
    id: 9, name: "Paris", country: "France", category: "City", price: "$980",
    days: "4 days", rating: "4.8", image: "photo-1502602898657-3e91760cbb34",
    description: "Neighborhood cafés, art-filled afternoons and riverside evenings."
  },
  {
    id: 10, name: "Petra", country: "Jordan", category: "Culture", price: "$890",
    days: "4 days", rating: "4.9", image: "photo-1579606032821-4e6161c81bd3",
    description: "Ancient rose-red architecture and desert silence under the stars."
  },
  {
    id: 11, name: "Banff", country: "Canada", category: "Nature", price: "$1,260",
    days: "6 days", rating: "4.9", image: "photo-1503614472-8c93d56cd0b3",
    description: "Turquoise lakes, pine forests and big mountain breathing room."
  },
  {
    id: 12, name: "Cape Town", country: "South Africa", category: "Coast", price: "$1,050",
    days: "6 days", rating: "4.8", image: "photo-1580060839134-75a5edca2e99",
    description: "Ocean drives, bold food and mountain views at every turn."
  }
];

export const imageUrl = (id, width = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;
