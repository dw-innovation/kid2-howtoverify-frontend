import React, { Fragment } from 'react'
import { ROOTNODES } from '@/lib/const'
import Button from '@/components/button'
import { generateURL, getNodeColor, removePrefix, trackAction } from '@/lib/lib'
import clsx from 'clsx'
import Color from 'color'
import useSessionStore from '@/lib/stores/useSessionStore'

const MediaTypeSelector = ({ header = false }) => {
  const pathNodes = useSessionStore((state) => state.pathNodes)
  const resetRootNode = useSessionStore((state) => state.resetRootNode)
  const clearSearchQueryString = useSessionStore(
    (state) => state.clearSearchQueryString,
  )
  return (
    <div
      className={clsx(
        'flex items-center justify-center flex-row',
        !header && 'w-full mx-1',
        header && pathNodes.length === 0 && 'invisible',
      )}
    >
      <div
        id={!header ? 'featureTour-2' : undefined}
        className="flex flex-wrap gap-4"
      >
        {ROOTNODES.map(({ id, name }, index) => (
          <Fragment key={index}>
            {id !== pathNodes[0] && (
              <div
                className={clsx(
                  'flex items-center flex-1  col-span-1 justify-evenly',
                  !header ? 'h-36' : 'h-20',
                )}
                style={{
                  flex: !header && '1 0 25%;',
                }}
              >
                <Button
                  onClick={() => {
                    resetRootNode(id)
                    clearSearchQueryString()
                    trackAction('mediaTypeSelectorClick', generateURL([id]))
                  }}
                  id={!header ? removePrefix(id) : undefined}
                  dangerouslySetInnerHTML={{ __html: name }}
                  className={clsx(
                    'hover:brighter aspect--1-1 rounded-full font-noto font-bold text-white flex justify-center items-center p-6 !leading-none',
                    header
                      ? `w-18 xl:w-24 h-20 xl:h-24 text-md xl:text-lg`
                      : `2xl:p-5 max-w-[72rem] h-full text-md xl:text-xl 2xl:text-2xl `,
                  )}
                  style={{
                    backgroundColor: Color(getNodeColor(id, 'primary')).alpha(
                      pathNodes?.length === 0 ? 1 : 0.6,
                    ),
                  }}
                />
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  )
}

export default MediaTypeSelector
