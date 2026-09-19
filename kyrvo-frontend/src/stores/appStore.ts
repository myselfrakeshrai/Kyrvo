import {
  BlogPost,
  CollectionData,
  Feature,
  Permission,
  Reservation,
  Role,
  User,
  Variable,
  VehicleTypes,
  Web,
} from 'src/models';
import { BlogCategory } from 'src/models/BlogCategory';
import { BlogTag } from 'src/models/BlogTag';
import { Event } from 'src/models/Event';
import { TitleUrl } from 'src/models/TitleUrl';
import { tryParseJSON } from 'src/utils/helpers';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AppStore {
  user: User | undefined;
  config: Web;
  permissions: Permission[] | [];
  reservation: Reservation;
  vehicleTypes: VehicleTypes[];
  blogPost: BlogPost[];
  eventPost: Event[];
  eventTitleUrl: TitleUrl[];
  blogCategory: BlogCategory[];
  blogTag: BlogTag[];
  features: Feature[];
  roles: Role[];
  variables: Variable[];
  modules: string[];
  collections: CollectionData[];
}

interface Action {
  setConfig: (config: Web) => void;
  setPermissions: (permissions: Permission[]) => void;
  delPermissions: () => void;
  setReservation: (reservation: Reservation) => void;
  delReservation: () => void;
  setUser: (user: User) => void;
  delUser: () => void;
  setVehicleTypes: (vechileTypes: VehicleTypes[]) => void;
  setBlogPost: (blogPost: BlogPost[]) => void;
  setEventPost: (eventPost: Event[]) => void;
  setEventTitleUrl: (eventTitleUrl: TitleUrl[]) => void;
  setBlogCategory: (blogCategory: BlogCategory[]) => void;
  setBlogTag: (blogTag: BlogTag[]) => void;
  setFeatures: (features: Feature[]) => void;
  setRoles: (roles: Role[]) => void;
  setVariables: (variables: Variable[]) => void;
  getVariable: (variableId: string) => string;
  setModules: (modules: string[]) => void;
  getModules: () => string[];
  setCollections: (collections: CollectionData[]) => void;
  getCollection: (collectionId: string) => any | null | undefined;
  getCollectionValue: (collectionId: string, variableId: string) => any;
}

export const useAppStore = create<AppStore & Action>()(
  persist(
    (set, get) => ({
      config: {} as Web,
      setConfig: (config) => {
        set(() => ({ config: config }));
      },
      permissions: [],
      setPermissions: (permissions) => {
        set(() => ({ permissions }));
      },
      delPermissions: () => {
        set(() => ({ permissions: [] }));
      },
      reservation: {} as Reservation,
      setReservation: (reservation) => {
        set(() => ({ reservation }));
      },
      delReservation: () => {
        set(() => ({ reservation: {} as Reservation }));
      },
      user: undefined,
      setUser: (user) => {
        set(() => ({ user }));
      },
      delUser: () => {
        set(() => ({ user: undefined }));
      },
      vehicleTypes: [] as VehicleTypes[],
      setVehicleTypes: (vechileTypes) => {
        set(() => ({ vehicleTypes: vechileTypes }));
      },
      blogPost: [] as BlogPost[],
      setBlogPost: (blogPost) => {
        set(() => ({ blogPost: blogPost }));
      },
      eventPost: [] as Event[],
      setEventPost: (eventPost) => {
        set(() => ({ eventPost: eventPost }));
      },
      eventTitleUrl: [] as TitleUrl[],
      setEventTitleUrl: (eventTitleUrl) => {
        set(() => ({ eventTitleUrl: eventTitleUrl }));
      },
      blogCategory: [] as BlogCategory[],
      setBlogCategory: (blogCategory) => {
        set(() => ({ blogCategory: blogCategory }));
      },
      blogTag: [] as BlogTag[],
      setBlogTag: (blogTag) => {
        set(() => ({ blogTag: blogTag }));
      },
      features: [] as Feature[],
      setFeatures: (features) => {
        set(() => ({ features }));
      },
      roles: [] as Role[],
      setRoles: (roles) => {
        set(() => ({ roles }));
      },
      variables: [] as Variable[],
      setVariables: (variables) => {
        set(() => ({ variables }));
      },
      getVariable: (variableId) => {
        return get()?.variables?.find((x) => x.Id === variableId)?.Value || '';
      },
      modules: [],
      setModules: (modules) => {
        set(() => ({ modules }));
      },
      getModules: () => {
        return get()?.modules || [];
      },
      collections: [] as CollectionData[],
      setCollections: (collections) => {
        set(() => ({ collections }));
      },
      getCollection: (collectionId) => {
        return tryParseJSON(
          get()?.collections?.find((x) => x.Id === collectionId)?.Data
        );
      },
      getCollectionValue: (collectionId, variableId) => {
        const collectionData = get()?.collections?.find(
          (x) => x.Id === collectionId,
        )?.Data;
        if (collectionData) {
          return tryParseJSON(collectionData)?.[variableId];
        } else {
          return undefined;
        }
      },
    }),
    {
      name: 'kyrvo_services_app_store',
      storage: createJSONStorage(() => localStorage),
      version: import.meta.env.VITE_APP_VERSION,
    },
  ),
);
