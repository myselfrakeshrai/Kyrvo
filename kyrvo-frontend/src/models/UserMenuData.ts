export interface UserMenuItem {
  Text: string;
  Link: string;
  Target: string;
}

export interface UserMenuData {
  Promo?: UserMenuItem | UserMenuItem[];
  Notification: boolean;
  Profile: boolean;
  Cart: boolean;
}
