import create from "zustand";
import { persist } from "zustand/middleware";

const usePersistedStore = create(
  persist(
    (set, get) => ({
      trackingEnabled: true,
      toggleTracking: () =>
        set(() => ({ trackingEnabled: !get().trackingEnabled })),
      showCookieBanner: true,
      toggleCookieBanner: () =>
        set(() => ({ showCookieBanner: !get().showCookieBanner })),
    }),
    {
      name: "kid-howtoverify-storage",
      getStorage: () => localStorage,
    }
  )
);
export default usePersistedStore;
