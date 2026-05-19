import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface Profile {
  name: string;
  bio: string;
  avatar: string;
}

export interface Theme {
  bgGradientFrom: string;
  bgGradientTo: string;
  buttonColor: string;
  textColor: string;
  cardStyle: "solid" | "glass" | "outline";
  radius: "soft" | "rounded" | "pill";
}

export interface LinkItem {
  id: string;
  title: string;
  url: string;
  icon: string;
  enabled: boolean;
}

interface BuilderState {
  profile: Profile;
  theme: Theme;
  links: LinkItem[];
  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
  setProfile: (profile: Partial<Profile>) => void;
  setTheme: (theme: Partial<Theme>) => void;
  addLink: () => void;
  updateLink: (id: string, data: Partial<LinkItem>) => void;
  removeLink: (id: string) => void;
  reorderLinks: (links: LinkItem[]) => void;
  resetStore: () => void;
}

const defaultProfile: Profile = {
  name: "BioLink Pro",
  bio: "Todos os meus links importantes em um só lugar.",
  avatar: "",
};

const defaultTheme: Theme = {
  bgGradientFrom: "#0D2B4D",
  bgGradientTo: "#071A30",
  buttonColor: "#F2B705",
  textColor: "#FFFFFF",
  cardStyle: "solid",
  radius: "rounded",
};

const defaultLinks: LinkItem[] = [
  { id: "default-instagram", title: "Instagram", url: "https://instagram.com/", icon: "instagram", enabled: true },
  { id: "default-whatsapp", title: "WhatsApp", url: "https://wa.me/5585999999999", icon: "whatsapp", enabled: true },
  { id: "default-youtube", title: "YouTube", url: "https://youtube.com/", icon: "youtube", enabled: true },
];

function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `link-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export const useBuilderStore = create<BuilderState>()(
  persist(
    (set) => ({
      profile: defaultProfile,
      theme: defaultTheme,
      links: defaultLinks,
      hasHydrated: false,

      setHasHydrated: (value) => set({ hasHydrated: value }),
      setProfile: (partial) => set((state) => ({ profile: { ...state.profile, ...partial } })),
      setTheme: (partial) => set((state) => ({ theme: { ...state.theme, ...partial } })),
      addLink: () =>
        set((state) => ({
          links: [
            ...state.links,
            { id: createId(), title: "Novo link", url: "https://", icon: "link", enabled: true },
          ],
        })),
      updateLink: (id, data) =>
        set((state) => ({ links: state.links.map((link) => (link.id === id ? { ...link, ...data } : link)) })),
      removeLink: (id) => set((state) => ({ links: state.links.filter((link) => link.id !== id) })),
      reorderLinks: (links) => set({ links }),
      resetStore: () => set({ profile: defaultProfile, theme: defaultTheme, links: defaultLinks }),
    }),
    {
      name: "biolink-builder-v2",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ profile: state.profile, theme: state.theme, links: state.links }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
