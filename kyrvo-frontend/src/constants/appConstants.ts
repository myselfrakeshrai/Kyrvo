import { MenuParent } from 'src/apptypes';

export const PAGE_ACTIONS = {
  view: 'view',
  edit: 'edit',
  create: 'create',
  manage: 'manage',
  delete: 'delete',
};

export const RESERVATION_TYPES = {
  hire_dis: 'HIRE_CAR_DISTANCE',
  hire_hour: 'HIRE_CAR_HOURLY',
  rental: 'RENTAL_CAR',
};

export const ROLES = {
  SYSTEM_ADMIN: 'system_admin',
  ADMIN: 'admin',
  HELP_DESK: 'help_desk',
  AGENCY: 'agency',
  AGENT: 'agent',
  USER: 'user',
};

export const FEATURES = {
  DASHBOARD: 'dashboard',
  VEHICLES: 'vehicles',
  VEHICLETYPES: 'vehicletypes',
  USERS: 'users',
  PERMISSION: 'permissions',
  ROLES: 'roles',
  FEATURES: 'features',
  PRICING: 'pricing',
  AGENCIES: 'agencies',
  AGENTS: 'agents',
  RESERVATIONS: 'reservations',
  CMS: 'cms',
  WEBHEADER: 'webheader',
  MEDIA: 'media',
  BLOG: 'blogs',
  MENU: 'menu',
  ORDER: 'order',
  EVENTS: 'events',
  EVENTTICKETS: 'eventtickets',
  EVENTTYPES: 'eventtypes',
  EVENTTAGS: 'eventtags',
  CATEGORIES: 'categories',
  MENUITEMS: 'menuItems',
  CONTACTUS: 'contactus',
  NEWSLETTERS: 'newsletters',
  COLLECTION: 'collections',
  PHOTOALBUM: 'photoalbums',
};
export const PERMISSION = {
  view: 1,
  write: 2,
  update: 3,
  delete: 4,
};

export const VARIBLETYPE = {
  TEXT: 'text',
  JSON: 'json',
  NUMBER: 'number',
  IMAGE: 'image',
  COLOR: 'color',
  DATE: 'date',
};

export const MENUITEMS: MenuParent[] = [
  {
    text: 'Dashboard',
    icon: 'home',
    link: '/manage',
    features: [FEATURES.DASHBOARD],
    level: 1,
  },
  {
    text: 'Fleet Management',
    icon: 'car_rental',
    features: [FEATURES.VEHICLES, FEATURES.VEHICLETYPES],
    subItems: [
      {
        text: 'Vehicles',
        icon: 'directions_car',
        link: '/manage/vehicles',
        feature: FEATURES.VEHICLES,
        level: 1,
      },
      {
        text: 'Vehicle Types',
        icon: 'commute',
        link: '/manage/vehicletypes',
        feature: FEATURES.VEHICLETYPES,
        level: 1,
      },
    ],
  },
  {
    text: 'Agencies & Agents',
    icon: 'work',
    features: [FEATURES.AGENCIES, FEATURES.AGENTS],
    subItems: [
      {
        text: 'Agencies',
        icon: 'business',
        link: '/manage/agencies',
        feature: FEATURES.AGENCIES,
      },
      {
        text: 'Agents',
        icon: 'peopleAlt',
        link: '/manage/agents',
        feature: FEATURES.AGENTS,
      },
    ],
  },
  {
    text: 'Pricing',
    icon: 'request_quote',
    link: '/manage/pricings',
    features: [FEATURES.PRICING],
  },
  {
    text: 'Media',
    icon: 'perm_media',
    link: '/manage/media',
    features: [FEATURES.MEDIA],
  },
  {
    text: 'Blogs',
    icon: 'article',
    features: [FEATURES.BLOG],
    subItems: [
      {
        text: 'Blog',
        icon: 'article',
        link: '/manage/blog',
        feature: FEATURES.BLOG,
      },
      {
        text: 'Category',
        icon: 'category',
        link: '/manage/blogcategory',
        feature: FEATURES.BLOG,
      },
      {
        text: 'Tag',
        icon: 'tag',
        link: '/manage/blogtags',
        feature: FEATURES.BLOG,
      },
    ],
  },
  {
    text: 'Menu and Orders',
    icon: 'article',
    features: [FEATURES.MENUITEMS],
    subItems: [
      {
        text: 'Menu',
        icon: 'article',
        link: '/manage/menu',
        feature: FEATURES.MENUITEMS,
      },
      {
        text: 'Category',
        icon: 'category',
        link: '/manage/eventcategory',
        feature: FEATURES.CATEGORIES,
      },
    ],
  },
  {
    text: 'Photo AlbumS',
    icon: 'article',
    link: '/manage/photoalbum',
    features: [FEATURES.PHOTOALBUM],
  },
  {
    text: 'Events',
    icon: 'event',
    features: [FEATURES.EVENTS],
    subItems: [
      {
        text: 'Event',
        icon: 'event',
        link: '/manage/event',
        feature: FEATURES.EVENTS,
      },
      {
        text: 'Category',
        icon: 'category',
        link: '/manage/eventcategory',
        feature: FEATURES.EVENTS,
      },
      {
        text: 'Tag',
        icon: 'tag',
        link: '/manage/eventtag',
        feature: FEATURES.EVENTS,
      },
      {
        text: 'EventType',
        icon: 'difference',
        link: '/manage/eventtype',
        feature: FEATURES.EVENTS,
      },
    ],
  },

  {
    text: 'Content Management',
    icon: 'web',
    features: [FEATURES.COLLECTION],
    link: '/manage/collections',
  },
  {
    text: 'Reservation',
    icon: 'bookmark_added',
    link: '/manage/reservations',
    features: [FEATURES.RESERVATIONS],
  },
  {
    text: 'Menu',
    icon: 'request_quote',
    link: '/manage/menu',
    features: [FEATURES.BLOG],
  },
  {
    text: 'Users & Permission',
    icon: 'manage_accounts',
    features: [
      FEATURES.USERS,
      FEATURES.PERMISSION,
      FEATURES.ROLES,
      FEATURES.FEATURES,
    ],
    subItems: [
      {
        text: 'Users',
        icon: 'person',
        link: '/manage/users',
        feature: FEATURES.USERS,
      },
      {
        text: 'Roles',
        icon: 'shield',
        link: '/manage/roles',
        feature: FEATURES.ROLES,
      },
      {
        text: 'Features',
        icon: 'category',
        link: '/manage/features',
        feature: FEATURES.FEATURES,
      },
      {
        text: 'Permission',
        icon: 'key',
        link: '/manage/permissions',
        feature: FEATURES.PERMISSION,
      },
    ],
  },
];

export const PUBLICMENUITEMS: MenuParent[] = [
  {
    text: 'Home',
    icon: 'home',
    link: '/',
    level: 1,
  },
  {
    text: 'About Us',
    icon: 'info',
    link: '/#about-us',
    level: 1,
  },
  {
    text: 'Menu',
    icon: 'category',
    link: '/#our-menu',
    level: 1,
  },
  {
    text: 'OurChef',
    icon: 'info',
    link: '/#meet-our-chefs',
    level: 1,
  },
];
