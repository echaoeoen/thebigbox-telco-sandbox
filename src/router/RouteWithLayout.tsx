import React, { FC } from 'react'
import { Route, RouteComponentProps } from 'react-router-dom'
import { ContainerProps } from '../layout/Container'

export interface RouteWithLayoutProps {
  component: FC<RouteComponentProps>
  layout: FC<ContainerProps>
  path: string | string[]
}
const RouteWithLayout: FC<RouteWithLayoutProps> = props => {
  const { layout: Layout, component: Component, ...rest } = props
  return (
    <Route
      {...rest}
      render={matchProps => (
        <Layout>
          <Component {...matchProps} />
        </Layout>
      )}
    />
  )
}

export default RouteWithLayout
