import * as React from 'react'
import { useGridApiContext } from '@mui/x-data-grid'
import { randomNumberBetween } from '@mui/x-data-grid/utils/utils'
import { Box, LinearProgress, Skeleton, styled } from '@mui/material'

const SkeletonTableLoader = () => {
  const apiRef = useGridApiContext()

  const rowHeight = apiRef.current.unstable_getRowHeight(0)

  const columns = apiRef.current.getVisibleColumns()

  const SkeletonCell = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottom: `1px solid ${theme.palette.divider}`,
  }))

  const children = React.useMemo(() => {
    const random = randomNumberBetween(12345, 40, 100)
    const array: React.ReactNode[] = []

    for (let i = 0; i < 10; i += 1) {
      for (const column of columns) {
        const width = Math.round(random())
        array.push(
          <SkeletonCell
            key={`column-${i}-${column.field}`}
            sx={{ justifyContent: column.align }}
          >
            <Skeleton
              sx={{ mx: 1, backgroundColor: 'gray.300' }}
              width={`${
                [
                  'student_id',
                  'email',
                  'classification',
                  'predected_by',
                  'action',
                  'prediction_time',
                ].includes(column.field)
                  ? width
                  : width * 0.5
              }%`}
            />
          </SkeletonCell>
        )
      }
      array.push(<SkeletonCell key={`fill-${i}`} />)
    }
    return array
  }, [columns])

  const rowsCount = apiRef.current.getRowsCount()

  return rowsCount > 0 ? (
    <LinearProgress />
  ) : (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `${columns
          .map(({ computedWidth }) => `${computedWidth}px`)
          .join(' ')} 1fr`,
        gridAutoRows: rowHeight,
      }}
    >
      {children}
    </div>
  )
}

export default SkeletonTableLoader
