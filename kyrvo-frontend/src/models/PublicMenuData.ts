export interface PublicMenuItem {
  Text: string;
  Icon: string;
  Link: string;
  Level: number;
  Target: string | null;
  Style: string | null;
}

export interface TitleItem {
  [key: string]: string;
}

export interface PublicMenuData {
  PublicMenu: PublicMenuItem[];
  Title: TitleItem[];
}

export default PublicMenuData;
