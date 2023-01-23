import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const usePersistedStore = create(
  persist(
    (set, get) => ({
      trackingEnabled:
        get()?.trackingEnabled !== undefined ? get().trackingEnabled : false,
      showCookieBanner:
        get()?.showCookieBanner !== undefined ? get().showCookieBanner : true,
      showFeatureTour:
        get()?.showFeatureTour !== undefined ? get().showFeatureTour : true,
      toggleCookieBanner: (state) => {
        set(() => ({
          showCookieBanner:
            state === undefined ? !get().showCookieBanner : state,
        }));
      },
      toggleFeatureTour: (state) =>
        set(() => ({
          showFeatureTour: state === undefined ? !get().showFeatureTour : state,
        })),
      toggleTracking: (state) =>
        set(() => ({
          trackingEnabled: state === undefined ? !get().trackingEnabled : state,
        })),
    }),
    {
      name: "dw-kid2-howtoverify-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
export default usePersistedStore;
