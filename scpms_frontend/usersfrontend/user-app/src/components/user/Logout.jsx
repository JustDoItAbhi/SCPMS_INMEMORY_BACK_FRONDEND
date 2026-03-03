// logout.js - Comprehensive logout function

// Make sure to declare the function with export keyword or export it at the end

    

async function logout() {
    console.log('Starting logout process...');
    
    try {
        // 1. Call backend logout endpoint
        const response = await fetch('/logout', {
            method: 'POST',
            credentials: 'include', // Important: include cookies in request
            headers: {
                'Content-Type': 'application/json',
            }
        });

        // 2. Clear ALL browser storage
        clearAllBrowserStorage();
        
        // 3. Clear cookies programmatically (frontend can only clear non-httpOnly cookies)
        clearNonHttpOnlyCookies();
        
        if (response.ok) {
            console.log('Logout successful');
            
            // 4. Redirect to login page
            window.location.href = '/login';
        } else {
            console.error('Logout failed:', await response.text());
            // Still clear storage and redirect
            window.location.href = '/login?error=logout_failed';
        }
    } catch (error) {
        console.error('Logout error:', error);
        // Even if backend call fails, clear frontend storage
        clearAllBrowserStorage();
        clearNonHttpOnlyCookies();
        window.location.href = '/login?error=logout_error';
    }
}

// Function to clear ALL browser storage
function clearAllBrowserStorage() {
    try {
        // Clear localStorage
        localStorage.clear();
        console.log('localStorage cleared');
        
        // Clear sessionStorage
        sessionStorage.clear();
        console.log('sessionStorage cleared');
        
        // Clear IndexedDB (if used)
        clearIndexedDB();
        
        // Clear Cache Storage (if used)
        clearCacheStorage();
        
        // Clear Service Worker registrations (if any)
        clearServiceWorkers();
        
    } catch (error) {
        console.error('Error clearing storage:', error);
    }
}

// Function to clear non-httpOnly cookies
function clearNonHttpOnlyCookies() {
    try {
        const cookies = document.cookie.split(';');
        
        for (let cookie of cookies) {
            const eqPos = cookie.indexOf('=');
            const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
            
            // Delete cookie by setting expired date
            document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
            document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=' + window.location.hostname;
            document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.' + window.location.hostname;
            
            console.log('Attempted to clear cookie:', name);
        }
    } catch (error) {
        console.error('Error clearing cookies:', error);
    }
}

// Clear IndexedDB if used
async function clearIndexedDB() {
    try {
        const databases = await indexedDB.databases?.() || [];
        for (const db of databases) {
            if (db.name) {
                indexedDB.deleteDatabase(db.name);
                console.log('Deleted IndexedDB:', db.name);
            }
        }
    } catch (error) {
        console.error('Error clearing IndexedDB:', error);
    }
}

// Clear Cache Storage if used
async function clearCacheStorage() {
    if ('caches' in window) {
        try {
            const cacheNames = await caches.keys();
            await Promise.all(
                cacheNames.map(cacheName => {
                    caches.delete(cacheName);
                    console.log('Deleted cache:', cacheName);
                })
            );
        } catch (error) {
            console.error('Error clearing cache:', error);
        }
    }
}

// Clear Service Workers
async function clearServiceWorkers() {
    if ('serviceWorker' in navigator) {
        try {
            const registrations = await navigator.serviceWorker.getRegistrations();
            await Promise.all(
                registrations.map(registration => {
                    registration.unregister();
                    console.log('Service worker unregistered');
                })
            );
        } catch (error) {
            console.error('Error clearing service workers:', error);
        }
    }
}
// Export for use in components
export {logout, clearAllBrowserStorage, clearNonHttpOnlyCookies };