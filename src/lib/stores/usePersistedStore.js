import create from "zustand";
import { persist } from "zustand/middleware";

const usePersistedStore = create(
  persist(
    (set, get) => ({
      trackingEnabled: get()?.trackingEnabled ? get().trackingEnabled : true,
      showFeatureTour: get()?.showFeatureTour ? get().showFeatureTour : true,
      toggleFeatureTour: (state) =>
        set(() => ({
          showFeatureTour:
            state === undefined ? !get().showFeatureTour : state,
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
