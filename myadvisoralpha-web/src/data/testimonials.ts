export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  rating: number;
  quote: string;
}

export const TESTIMONIALS_RATING_PROOF = {
  averageRating: 4.8,
  ratingDisplay: '4.8',
  totalReviews: '800+ verified reviews',
  appStoreRating: '4.8 / 5.0 Rating',
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Ayush',
    rating: 5,
    quote: 'Replaced my scattered investment approach with MyAdvisorAlpha. Now everything’s centralized and well-researched. Returns improved, stress reduced.',
  },
  {
    id: 't-2',
    name: 'Sanjaya Pradhan',
    rating: 5,
    quote: 'Excellent app for stock market and mutual fund learning. The interface is clean, easy to use, and very informative.',
  },
  {
    id: 't-3',
    name: 'Shubra Agarwal',
    rating: 5,
    quote: 'Choosing MyAdvisorAlpha has been one of my best financial decisions. The growth, consistency, and trust I’ve experienced is a proof of the team’s excellent fund management.',
  },
  {
    id: 't-4',
    name: 'Ritu Poddar',
    role: 'Product Head, Nirmal Bang',
    rating: 5,
    quote: 'I tried the AdvisorAlpha platform and found the overall journey to be extremely smooth and intuitive.',
  },
  {
    id: 't-5',
    name: 'Rishabh',
    rating: 5,
    quote: 'At first I was cautious, but after seeing how steadily my portfolio kept compounding, I only wish I had invested earlier.',
  },
];