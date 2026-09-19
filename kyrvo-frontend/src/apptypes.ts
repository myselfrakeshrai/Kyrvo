import { CSSProperties } from 'react';

export interface MenuSubItem {
  text: string;
  icon: any;
  link: string;
  feature?: string;
  level?: number;
}
export interface MenuParent {
  text: string;
  icon: any;
  link?: string;
  features?: string[];
  level?: number;
  subItems?: MenuSubItem[];
  style?: CSSProperties;
  target?: string;
}

export interface UserMenuType {
  cart?: boolean;
  notification?: boolean;
  profile?: boolean;
  promo?: {
    text?: string;
    link?: string;
    target?: string;
  };
}
