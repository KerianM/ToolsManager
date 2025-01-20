import { useState, useEffect } from 'react';
import { checkIsAdmin } from '../services/adminService';

export function useAdmin() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAdmin() {
      try {
        const isAdminUser = await checkIsAdmin();
        setIsAdmin(isAdminUser);
      } catch (error) {
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    }
    
    checkAdmin();
  }, []);

  return { isAdmin, loading };
}