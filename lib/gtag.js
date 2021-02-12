import { IS_PRODUCTION } from './constants'

export const GA_TRACKING_ID = 'G-QKTJM6MS1W' // This is your GA Tracking ID

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageSetup = (url) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
    send_page_view: false,
  })
}

export const pageview = (pageType) => {
  if (IS_PRODUCTION && process.browser) {
    window.gtag('config', GA_TRACKING_ID, {
      page_type: pageType,
    })
  }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}