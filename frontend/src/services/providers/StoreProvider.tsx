'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/services/stores/authStore';

export function StoreProvider({ children }: { children: React.ReactNode }) {
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        // Hydrate the store
        useAuthStore.persist.rehydrate();
        setIsHydrated(true);
    }, []);

    if (!isHydrated) {
        return null; // or a loading spinner
    }

    return <>{children}</>;
} 