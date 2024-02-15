import usePersistedStore from '@/lib/stores/usePersistedStore'
import React from 'react'
import SettingsSwitch from './settingsSwitch'
import useTranslation from 'next-translate/useTranslation'
import ReactMarkdown from 'react-markdown'

const SettingsManager = () => {
  const toggleTracking = usePersistedStore((state) => state.toggleTracking)
  const trackingEnabled = usePersistedStore((state) => state.trackingEnabled)
  const { t } = useTranslation('common')

  return (
    <div>
      <h2>{t('privacyManagerTitle')}</h2>
      <div className="pb-5 pl-5">
        <ReactMarkdown children={t('privacyManagerText')} />
        <SettingsSwitch
          currentState={trackingEnabled}
          label="Anonymous analytics"
          toggleState={() => toggleTracking()}
        />
      </div>
    </div>
  )
}

export default SettingsManager
