import create from "zustand";
import { persist } from "zustand/middleware";

const usePersistedStore = create(
  persist(
    (set, get) => ({
      trackingEnabled: get()?.trackingEnabled ? get().trackingEnabled : true,
      showCookieBanner: get()?.showCookieBanner ? get().showCookieBanner : true,
      toggleCookieBanner: (state) =>
        set(() => ({
          showCookieBanner:
            state === undefined ? !get().showCookieBanner : state,
        })),
      toggleTracking: (state) =>
        set(() => ({
          trackingEnabled: state === undefined ? !get().trackingEnabled : state,
        })),
    }),
    {
      name: "dw-kid2-howtoverify-storage",
      getStorage: () => localStorage,
    }
  )
);
export default usePersistedStore;
