import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const usePersistedStore = create(
  persist(
    (set, get) => ({
      showCookieBanner:
        get()?.showCookieBanner !== undefined ? get().showCookieBanner : true,
      showFeatureTour:
        get()?.showFeatureTour !== undefined ? get().showFeatureTour : true,
      toggleCookieBanner: (state) => {
        set(() => ({
          showCookieBanner:
            state === undefined ? !get().showCookieBanner : state,
        }))
      },
      toggleTracking: (newState) => {
        set(() => ({
          trackingEnabled:
            newState === undefined ? !get().trackingEnabled : newState,
        }))
      },
      trackingEnabled: true,
      toggleFeatureTour: (state) =>
        set(() => ({
          showFeatureTour: state === undefined ? !get().showFeatureTour : state,
        })),
    }),
    {
      name: 'dw-kid2-howtoverify-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
export default usePersistedStore
