import { ReactNode } from 'react';
import { useAdmin } from '../hooks/useAdmin';
import { LoadingSpinner } from './LoadingSpinner';

interface AdminRouteProps {
  children: ReactNode;
}

export function AdminRoute({ children }: AdminRouteProps) {
  const { isAdmin, loading } = useAdmin();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!isAdmin) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">Access Denied</h3>
        <p className="mt-2 text-sm text-gray-500">
          You need administrator privileges to view this page.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}