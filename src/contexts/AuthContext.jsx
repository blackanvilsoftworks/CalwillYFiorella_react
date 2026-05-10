import { createContext, useState, useEffect } from 'react';
import { supabase } from '../config/supabase';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user     , setUser]      = useState(null);
    const [profile  , setProfile]   = useState(null);
    const [role     , setRole]      = useState(null);
    const [loading  , setLoading]   = useState(true);

    const setStatesNull = () => {
        setUser(null);
        setProfile(null);
        setRole(null);
    };

    useEffect(() => {
        setLoading(true);
        // Verificar sesión inicial
        checkUser();

        // Escuchar cambios de auth
        const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (session?.user) {
                await loadUserProfile(session.user);
            } else {
                setStatesNull();
            }
            setLoading(false);
        });

        return () => {
            authListener?.subscription?.unsubscribe();
        };
    }, []);

    const checkUser = async () => {
        setLoading(true);
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user) await loadUserProfile(session.user);
        } catch (error) {
            console.error('Error checking user:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadUserProfile = async (authUser) => {
        try {
            const { data: profileData, error } = await supabase
                .from('user_profiles')
                .select(`
                    *,
                    roles (
                        id_role,
                        name,
                        description
                    )
                `)
                .eq('id', authUser.id)
                .single();

            if (error) throw error;

            setUser(authUser);
            setProfile(profileData);
            setRole(profileData.roles?.name || null);
        } catch (error) {
            console.error('Error loading profile:', error);
        }
    };

    // ── AUTH ACTIONS ─────────────────────────────────────────────────────────

    const signUp = async (email, password, metadata = {}) => {
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: metadata  // full_name, phone, etc.
                }
            });

            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            return { data: null, error };
        }
    };

    const signIn = async (email, password) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            return { data: null, error };
        }
    };

    const signInWithGoogle = async () => {
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: "http://localhost:5173/productos"
                }
            });

            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            return { data: null, error };
        }
    };

    const signOut = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;

            setStatesNull();

            return { error: null };
        } catch (error) {
            return { error };
        }
    };

    const updateProfile = async (updates) => {
        try {
            const { data, error } = await supabase
                .from('user_profiles')
                .update(updates)
                .eq('id', user.id)
                .select()
                .single();

            if (error) throw error;

            setProfile(data);
            return { data, error: null };
        } catch (error) {
            return { data: null, error };
        }
    };

    // ── ROLE CHECKS ──────────────────────────────────────────────────────────

    const isCustomer    = role === 'customer';
    const isWholesaler  = role === 'wholesaler';
    const isAdmin       = ['admin', 'superadmin'].includes(role);
    const isSuperAdmin  = role === 'superadmin';

    const value = {
        // General states
        user,
        profile,
        role,
        loading,
        // Role checks
        isCustomer,
        isWholesaler,
        isAdmin,
        isSuperAdmin,
        // Actions
        signUp,
        signIn,
        signInWithGoogle,
        signOut,
        updateProfile
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };