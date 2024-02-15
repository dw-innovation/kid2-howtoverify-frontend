import {
  NODETYPESTYLES,
  ROOTNODES,
  PREFIX,
  LINKLENGTHS,
  LINKLENGTHFACTORS,
  RADIUSFACTORS,
} from '@/lib/const'
import axios from 'axios'
import tailwindConfig from 'tailwind.config'
import useSessionStore from './stores/useSessionStore'
import usePersistedStore from './stores/usePersistedStore'

export const addPrefix = (string) => `${PREFIX}${string}`

export const removePrefix = (string) => string.replace(PREFIX, '')

export const getNodeColor = (rootNode, type) => {
  let rootNodeColor = ROOTNODES.filter((node) => node.id === rootNode)[0]
    ?.color['name']
  if (rootNodeColor === undefined) {
    rootNodeColor = 'grey'
  }
  return tailwindConfig.theme.extend.colors[rootNodeColor][type]
}

export const getNodeRadius = (nodeType) =>
  NODETYPESTYLES.filter((style) => style.nodeType === removePrefix(nodeType))[0]
    ?.properties['radius'] * getFactor('RADIUS')

export const addNodeToPath = (nodeID, level, pathNodes) => {
  if (pathNodes.length <= level) {
    return [...pathNodes, nodeID]
  } else {
    const history = Object.assign([], pathNodes)
    history[level] = nodeID
    return history.slice(0, level + 1)
  }
}

export const fetchGraphData = async (pathNodes, setAppState) => {
  const result = await axios({
    method: 'post',
    url: `${process.env.NEXT_PUBLIC_API}graph`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify({ click_history: pathNodes }),
  })

  setAppState((prev) => ({
    ...prev,
    graph: {
      ...prev.graph,
      data: result.data,
    },
  }))
}

export const validateLink = (pathNodes, link) => {
  return (pathNodes.includes(link.source) && pathNodes.includes(link.target)) ||
    pathNodes[pathNodes.length - 1] === link.source
    ? true
    : false
}

export const getStrength = (graphHeight) => {
  return graphHeight * -1.2
}

export const getSizeFactor = (graphHeight) => {
  return graphHeight / 1200
}

export const trackAction = async (action, payload = '') => {
  const trackingEnabled = usePersistedStore.getState().trackingEnabled
  if (!trackingEnabled) return
  let params = {
    idsite: process.env.NEXT_PUBLIC_MATOMO_SITE_ID,
    rec: 1,
    rand: Math.floor(Math.random() * 10000000),
    res: `${window?.screen?.availWidth}x${window?.screen?.availHeight}`,
    ua: window?.navigator?.userAgent,
    action_name: action,
  }

  switch (action) {
    case 'search':
      params = {
        ...params,
        search: payload,
      }
      break

    case 'searchResultClick':
    case 'trailClick':
    case 'mediaTypeSelectorClick':
    case 'graphClick':
      params = {
        ...params,
        url: payload,
      }
      break

    case 'externalLink':
      params = {
        ...params,
        link: payload,
        url: payload,
      }
      break

    default:
      params = {
        ...params,
        url: window?.location?.href,
      }
  }

  await axios({
    method: 'get',
    url: process.env.NEXT_PUBLIC_MATOMO_URL,
    params,
  })
}

export const generateURL = (pathNodes) =>
  `${window?.location?.origin}${pathNodes
    .map((node) => `/${removePrefix(node)}`)
    .join('')}`

export const getLinkLength = (level, pathLength) =>
  (LINKLENGTHS[level]
    ? LINKLENGTHS[level]
    : LINKLENGTHS[LINKLENGTHS.length - 1]) *
  getFactor('LINKLENGTH') *
  (1 - 1 / (10 - pathLength))

export const handleSearch = async (queryString) => {
  let toggleShowResults = useSessionStore.getState().toggleShowResults
  let toggleIsLoading = useSessionStore.getState().toggleIsLoading
  let setSearchResults = useSessionStore.getState().setSearchResults

  toggleShowResults(true)
  toggleIsLoading(true)

  if (!queryString) {
    return null
  }

  trackAction('search', queryString)

  const result = await axios({
    method: 'post',
    url: `${process.env.NEXT_PUBLIC_API}search`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify({ query: queryString }),
  })

  setSearchResults(result.data)
  toggleIsLoading(false)
}

export const getIndex = async () => {
  let setSearchIndex = useSessionStore.getState().setSearchIndex
  const result = await axios({
    method: 'get',
    url: `${process.env.NEXT_PUBLIC_API}getIndex`,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  setSearchIndex(result.data.map((el) => ({ ...el, value: el.name })))
}

export const filterIndex = (index) =>
  index.map((el) => ({ ...el, value: el.name }))

const getFactor = (type) => {
  switch (type) {
    case 'LINKLENGTH':
      let lengths = LINKLENGTHFACTORS.filter(
        (item) => item.minWidth < window.innerWidth,
      )
      return lengths[lengths.length - 1].factor
    default:
      let factors = RADIUSFACTORS.filter(
        (item) => item.minWidth < window.innerWidth,
      )
      return factors[factors.length - 1].factor
  }
}

export const getNodeColorShade = (isInClickHistory, isMaxLevel) => {
  let shade = 0.6
  if (isInClickHistory) {
    shade = 0
  }
  if (isMaxLevel) {
    shade = 0.3
  }
  return shade
}

export const groupByLevel = (data) => {
  const groupedData = {}

  for (const item of data) {
    if (!groupedData[item.level]) {
      groupedData[item.level] = []
    }
    groupedData[item.level].push(item)

    for (const level in groupedData) {
      groupedData[level].sort((a, b) => a.name.localeCompare(b.name))
    }
  }

  return groupedData
}

export const mapToRange = (value, x1, y1, x2, y2) =>
  ((value - x1) * (y2 - x2)) / (y1 - x1) + x2
