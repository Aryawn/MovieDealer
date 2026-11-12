/**
 * Movie API Service for MovieDealer
 *
 * NOTE: Initial architecture and API normalization utilities were developed with
 * assistance from an LLM (Gemini) as acknowledged in Milestone 3 guidelines.
 *
 * Uses the public, keyless iTunes Movie Search API for real-time movie fetching,
 * paired with a curated local fallback dataset to ensure zero-downtime operation
 * even offline or under strict network restrictions.
 */

export const GENRES = [
  { id: 'all', label: 'All Genres', query: 'cinema' },
  { id: 'Action & Adventure', label: 'Action & Adventure', query: 'action' },
  { id: 'Comedy', label: 'Comedy', query: 'comedy' },
  { id: 'Drama', label: 'Drama', query: 'drama' },
  { id: 'Sci-Fi & Fantasy', label: 'Sci-Fi & Fantasy', query: 'sci-fi' },
  { id: 'Thriller', label: 'Thriller', query: 'thriller' },
  { id: 'Horror', label: 'Horror', query: 'horror' },
  { id: 'Romance', label: 'Romance', query: 'romance' },
  { id: 'Documentary', label: 'Documentary', query: 'documentary' },
  { id: 'Animation', label: 'Animation', query: 'animation' },
];

export const LANGUAGES = [
  { id: 'all', label: 'Any Language' },
  { id: 'English', label: 'English' },
  { id: 'Hindi', label: 'Hindi' },
  { id: 'Japanese', label: 'Japanese' },
  { id: 'Korean', label: 'Korean' },
  { id: 'Spanish', label: 'Spanish' },
  { id: 'French', label: 'French' },
];

export const MOODS = [
  { id: 'all', label: 'Any Mood', keywords: ['best', 'award', 'classic', 'hit', 'story'] },
  { id: 'adrenaline', label: 'High Adrenaline', keywords: ['mission', 'chase', 'war', 'heist', 'fast'] },
  { id: 'feel-good', label: 'Feel-Good & Light', keywords: ['love', 'friend', 'happy', 'magic', 'summer'] },
  { id: 'mind-bending', label: 'Mind-Bending', keywords: ['time', 'space', 'dream', 'secret', 'future'] },
  { id: 'chill', label: 'Late-Night Chill', keywords: ['night', 'city', 'music', 'life', 'road'] },
  { id: 'intense', label: 'Dark & Intense', keywords: ['dark', 'shadow', 'crime', 'murder', 'blood'] },
];

const FALLBACK_MOVIES = [
  {
    id: 'fb-1',
    title: 'Inception',
    year: 2010,
    genre: 'Sci-Fi & Fantasy',
    language: 'English',
    mood: 'mind-bending',
    rating: '8.8',
    runtime: '148 min',
    director: 'Christopher Nolan',
    poster: '',
    synopsis: 'A skilled thief who steals corporate secrets through dream-sharing technology is offered a chance to have his criminal history erased as payment for implanting an idea into a CEO’s subconscious.',
    suit: '♠',
  },
  {
    id: 'fb-2',
    title: 'Parasite',
    year: 2019,
    genre: 'Thriller',
    language: 'Korean',
    mood: 'intense',
    rating: '8.5',
    runtime: '132 min',
    director: 'Bong Joon-ho',
    poster: '',
    synopsis: 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
    suit: '♣',
  },
  {
    id: 'fb-3',
    title: 'Spirited Away',
    year: 2001,
    genre: 'Animation',
    language: 'Japanese',
    mood: 'feel-good',
    rating: '8.6',
    runtime: '125 min',
    director: 'Hayao Miyazaki',
    poster: '',
    synopsis: 'During her family’s move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, where humans are changed into beasts.',
    suit: '♥',
  },
  {
    id: 'fb-4',
    title: 'The Grand Budapest Hotel',
    year: 2014,
    genre: 'Comedy',
    language: 'English',
    mood: 'feel-good',
    rating: '8.1',
    runtime: '99 min',
    director: 'Wes Anderson',
    poster: '',
    synopsis: 'A writer encounters the owner of an aging high-class hotel, who tells him of his early years serving as a lobby boy in the hotel’s glorious years under an exceptional concierge.',
    suit: '♦',
  },
  {
    id: 'fb-5',
    title: 'Mad Max: Fury Road',
    year: 2015,
    genre: 'Action & Adventure',
    language: 'English',
    mood: 'adrenaline',
    rating: '8.1',
    runtime: '120 min',
    director: 'George Miller',
    poster: '',
    synopsis: 'In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the aid of a group of female prisoners and a drifter named Max.',
    suit: '♠',
  },
  {
    id: 'fb-6',
    title: '3 Idiots',
    year: 2009,
    genre: 'Comedy',
    language: 'Hindi',
    mood: 'feel-good',
    rating: '8.4',
    runtime: '170 min',
    director: 'Rajkumar Hirani',
    poster: '',
    synopsis: 'Two friends are searching for their long-lost companion. They revisit their college days and recall the memories of their friend who inspired them to think differently.',
    suit: '♥',
  },
  {
    id: 'fb-7',
    title: 'Interstellar',
    year: 2014,
    genre: 'Sci-Fi & Fantasy',
    language: 'English',
    mood: 'mind-bending',
    rating: '8.7',
    runtime: '169 min',
    director: 'Christopher Nolan',
    poster: '',
    synopsis: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity’s survival as Earth becomes uninhabitable.',
    suit: '♦',
  },
  {
    id: 'fb-8',
    title: 'Amélie',
    year: 2001,
    genre: 'Romance',
    language: 'French',
    mood: 'chill',
    rating: '8.3',
    runtime: '122 min',
    director: 'Jean-Pierre Jeunet',
    poster: '',
    synopsis: 'Amélie is an innocent and naive girl in Paris with her own sense of justice. She decides to help those around her and, along the way, discovers love.',
    suit: '♥',
  },
  {
    id: 'fb-9',
    title: 'Pan’s Labyrinth',
    year: 2006,
    genre: 'Sci-Fi & Fantasy',
    language: 'Spanish',
    mood: 'intense',
    rating: '8.2',
    runtime: '118 min',
    director: 'Guillermo del Toro',
    poster: '',
    synopsis: 'In the Falangist Spain of 1944, the bookish young stepdaughter of a sadistic army officer escapes into an eerie but captivating fantasy world.',
    suit: '♣',
  },
  {
    id: 'fb-10',
    title: 'Blade Runner 2049',
    year: 2017,
    genre: 'Sci-Fi & Fantasy',
    language: 'English',
    mood: 'chill',
    rating: '8.0',
    runtime: '164 min',
    director: 'Denis Villeneuve',
    poster: '',
    synopsis: 'Young Blade Runner K’s discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard, who’s been missing for thirty years.',
    suit: '♠',
  },
];

const SUITS = ['♠', '♥', '♦', '♣'];

function deriveScore(seedId) {
  const numeric = Number(seedId) || 42;
  const score = 7.1 + ((numeric % 21) * 0.1);
  return score.toFixed(1);
}

/**
 * Fetches movies from the public iTunes Search API based on filters or random mode.
 */
export async function fetchMoviesFromApi({
  genre = 'all',
  language = 'all',
  mood = 'all',
  searchQuery = '',
  isRandom = false,
} = {}) {
  const randomTerms = [
    'star', 'night', 'love', 'king', 'secret', 'world', 'last', 'dark',
    'red', 'blue', 'man', 'city', 'dream', 'time', 'game', 'shadow'
  ];

  let term = searchQuery.trim();
  if (!term) {
    if (isRandom) {
      term = randomTerms[Math.floor(Math.random() * randomTerms.length)];
    } else {
      const genreObj = GENRES.find((g) => g.id === genre);
      const moodObj = MOODS.find((m) => m.id === mood);
      const parts = [];
      if (genre !== 'all' && genreObj) parts.push(genreObj.query);
      if (language !== 'all') parts.push(language);
      if (mood !== 'all' && moodObj) {
        const kw = moodObj.keywords[Math.floor(Math.random() * moodObj.keywords.length)];
        parts.push(kw);
      }
      term = parts.length > 0 ? parts.join(' ') : randomTerms[Math.floor(Math.random() * randomTerms.length)];
    }
  }

  const endpoint = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&media=movie&entity=movie&limit=40`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 7000);

    const response = await fetch(endpoint, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    let results = Array.isArray(data.results) ? data.results : [];

    let normalized = results
      .filter((item) => item.trackName && (item.longDescription || item.shortDescription))
      .map((item, idx) => {
        const year = item.releaseDate ? new Date(item.releaseDate).getFullYear() : 2020;
        const runtimeMins = item.trackTimeMillis
          ? `${Math.round(item.trackTimeMillis / 60000)} min`
          : '115 min';
        const highResPoster = item.artworkUrl100
          ? item.artworkUrl100.replace('100x100bb', '600x600bb')
          : '';

        return {
          id: `itunes-${item.trackId || idx}`,
          title: item.trackName,
          year,
          genre: item.primaryGenreName || 'Drama',
          language: language !== 'all' ? language : 'English',
          mood: mood !== 'all' ? mood : 'chill',
          rating: deriveScore(item.trackId),
          runtime: runtimeMins,
          director: item.artistName || 'Unknown Director',
          poster: highResPoster,
          synopsis: item.longDescription || item.shortDescription || 'No synopsis available.',
          contentRating: item.contentAdvisoryRating || 'PG-13',
          previewUrl: item.previewUrl || null,
          suit: SUITS[idx % SUITS.length],
        };
      });

    if (!isRandom && genre !== 'all') {
      const genreMatches = normalized.filter((m) =>
        m.genre.toLowerCase().includes(genre.split(' ')[0].toLowerCase())
      );
      if (genreMatches.length >= 5) {
        normalized = genreMatches;
      }
    }

    normalized = shuffleDeck(normalized);

    if (normalized.length > 0) {
      return { movies: normalized, source: 'Live iTunes Movie API' };
    }
    throw new Error('Empty API result set');
  } catch (err) {
    let fallback = [...FALLBACK_MOVIES];
    if (!isRandom) {
      if (genre !== 'all') {
        const filtered = fallback.filter((m) => m.genre === genre);
        if (filtered.length > 0) fallback = filtered;
      }
      if (language !== 'all') {
        const filtered = fallback.filter((m) => m.language === language);
        if (filtered.length > 0) fallback = filtered;
      }
      if (mood !== 'all') {
        const filtered = fallback.filter((m) => m.mood === mood);
        if (filtered.length > 0) fallback = filtered;
      }
    }
    return {
      movies: shuffleDeck(fallback),
      source: 'Offline Fallback Deck',
    };
  }
}

export function shuffleDeck(deck) {
  const copy = [...deck];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
