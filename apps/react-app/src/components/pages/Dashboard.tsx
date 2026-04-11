import { ErrorBoundary } from 'react-error-boundary'
import DashboardFallback from '../FallbackUI/Dashboard-fallback'

function DashboardWrapper(){
  return (
    //@ts-ignore
    <ErrorBoundary FallbackComponent={DashboardFallback}>
      <Dashboard/>
    </ErrorBoundary>
  )
}

function Dashboard() {
  return (
    <div>Dashboard</div>
  )
}

export default DashboardWrapper