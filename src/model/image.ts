export type Language =
  | 'cs'
  | 'da'
  | 'de'
  | 'en'
  | 'es'
  | 'fr'
  | 'id'
  | 'it'
  | 'hu'
  | 'nl'
  | 'no'
  | 'pl'
  | 'pt'
  | 'ro'
  | 'sk'
  | 'fi'
  | 'sv'
  | 'tr'
  | 'vi'
  | 'th'
  | 'bg'
  | 'ru'
  | 'el'
  | 'ja'
  | 'ko'
  | 'zh';

export enum LanguageValue {
  cs = 'cs',
  da = 'da',
  de = 'de',
  en = 'en',
  es = 'es',
  fr = 'fr',
  id = 'id',
  it = 'it',
  hu = 'hu',
  nl = 'nl',
  no = 'no',
  pl = 'pl',
  pt = 'pt',
  ro = 'ro',
  sk = 'sk',
  fi = 'fi',
  sv = 'sv',
  tr = 'tr',
  vi = 'vi',
  th = 'th',
  bg = 'bg',
  ru = 'ru',
  el = 'el',
  ja = 'ja',
  ko = 'ko',
  zh = 'zh',
}

export type ImageType = 'all' | 'photo' | 'illustration' | 'vector';

export enum ImageTypeValue {
  all = 'all',
  photo = 'photo',
  illustration = 'illustration',
  vector = 'vector',
}

export type Orientation = 'all' | 'horizontal' | 'vertical';

export enum OrientationValue {
  all = 'all',
  horizontal = 'horizontal',
  vertical = 'vertical',
}

export type Category =
  | 'backgrounds'
  | 'fashion'
  | 'nature'
  | 'science'
  | 'education'
  | 'feelings'
  | 'health'
  | 'people'
  | 'religion'
  | 'places'
  | 'animals'
  | 'industry'
  | 'computer'
  | 'food'
  | 'sports'
  | 'transportation'
  | 'travel'
  | 'buildings'
  | 'business'
  | 'music';

export enum CategoryValue {
  backgrounds = 'backgrounds',
  fashion = 'fashion',
  nature = 'nature',
  science = 'science',
  education = 'education',
  feelings = 'feelings',
  health = 'health',
  people = 'people',
  religion = 'religion',
  places = 'places',
  animals = 'animals',
  industry = 'industry',
  computer = 'computer',
  food = 'food',
  sports = 'sports',
  transportation = 'transportation',
  travel = 'travel',
  buildings = 'buildings',
  business = 'business',
  music = 'music',
}

export type ImageColor =
  | 'grayscale'
  | 'transparent'
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'turquoise'
  | 'blue'
  | 'lilac'
  | 'pink'
  | 'white'
  | 'gray'
  | 'black'
  | 'brown';

export enum ImageColorValue {
  grayscale = 'grayscale',
  transparent = 'transparent',
  red = 'red',
  orange = 'orange',
  yellow = 'yellow',
  green = 'green',
  turquoise = 'turquoise',
  blue = 'blue',
  lilac = 'lilac',
  pink = 'pink',
  white = 'white',
  gray = 'gray',
  black = 'black',
  brown = 'brown',
}

export type Order = 'popular' | 'latest';

export enum OrderValue {
  popular = 'popular',
  latest = 'latest',
}

export const imageAvailableParams = new Map([
  ['q', null],
  [
    'lang',
    [
      'cs',
      'da',
      'de',
      'en',
      'es',
      'fr',
      'id',
      'it',
      'hu',
      'nl',
      'no',
      'pl',
      'pt',
      'ro',
      'sk',
      'fi',
      'sv',
      'tr',
      'vi',
      'th',
      'bg',
      'ru',
      'el',
      'ja',
      'ko',
      'zh',
    ],
  ],
  ['id', null],
  ['image_type', ['all', 'photo', 'illustration', 'vector']],
  ['orientation', ['all', 'horizontal', 'vertical']],
  ['category', ['all', 'horizontal', 'vertical']],
  ['min_width', null],
  ['min_height', null],
  [
    'colors',
    [
      'grayscale',
      'transparent',
      'red',
      'orange',
      'yellow',
      'green',
      'turquoise',
      'blue',
      'lilac',
      'pink',
      'white',
      'gray',
      'black',
      'brown',
    ],
  ],
  ['safesearch', ['true', 'false']],
  ['order', ['popular', 'latest']],
  ['page', null],
  ['per_page', null],
  ['callback', null],
]);

export interface ImageSearchRequest {
  key: string;
  q?: string;
  lang?: Language; // default: en
  id?: string;
  image_type?: ImageType; // default: all
  orientation?: Orientation; // default: all
  category?: Category;
  min_width?: number; // default: 0
  min_height?: number; // default: 0
  colors?: ImageColor;
  editors_choice?: boolean; // default false
  safesearch?: boolean; // default false
  order?: Order; // default: popular
  page?: number;
  per_page?: number; // default: 20; // Limit: 3 - 200;
  callback?: string;
  pretty?: boolean; // default: false
}

export type ImageSearchParams = Omit<ImageSearchRequest, 'key'>;

export interface Hit {
  id: number;
  pageURL: string;
  type: string;
  tags: string;
  previewURL: string;
  previewWidth: number;
  previewHeight: number;
  webformatURL: string;
  webformatWidth: number;
  webformatHeight: number;
  largeImageURL: string;
  imageWidth: number;
  imageHeight: number;
  imageSize: number;
  views: number;
  downloads: number;
  favorites: number;
  likes: number;
  comments: number;
  user_id: number;
  user: string;
  userImageURL: string;
}

export interface ImageSearchResponse {
  total: number;
  totalHits: number;
  hits: Hit[];
}
