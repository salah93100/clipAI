"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function AuthDebugPage() {
  const [sessionData, setSessionData] = useState<any>(null);
  const [cookiesData, setCookiesData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  
  const checkAuth = async () => {
    setLoading(true);
    try {
      // Vérifier la session Supabase
      const { data, error } = await supabase.auth.getSession();
      
      setSessionData({
        session: data.session ? {
          accessToken: data.session.access_token ? `${data.session.access_token.substring(0, 10)}...` : null,
          refreshToken: data.session.refresh_token ? `${data.session.refresh_token.substring(0, 10)}...` : null,
          expiresAt: data.session.expires_at,
          user: data.session.user ? {
            id: data.session.user.id,
            email: data.session.user.email,
          } : null,
        } : null,
        error: error ? error.message : null
      });
      
      // Analyser les cookies
      const cookies: Record<string, string> = {};
      document.cookie.split(';').forEach(cookie => {
        const [name, value] = cookie.trim().split('=');
        if (name.startsWith('sb-')) {
          cookies[name] = value ? `${value.substring(0, 10)}...` : '';
        }
      });
      
      setCookiesData(cookies);
    } catch (error: any) {
      console.error("Erreur lors de la vérification:", error);
      setSessionData({ error: error.message });
    } finally {
      setLoading(false);
    }
  };
  
  const handleRefreshSession = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.refreshSession();
      if (error) {
        console.error("Erreur lors du rafraîchissement:", error);
      } else {
        console.log("Session rafraîchie avec succès");
      }
      checkAuth();
    } catch (error) {
      console.error("Exception lors du rafraîchissement:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleForceRedirect = () => {
    window.location.href = '/dashboard';
  };

  useEffect(() => {
    checkAuth();
  }, []);
  
  return (
    <div className="container mx-auto py-10 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Diagnostic d'authentification</CardTitle>
          <CardDescription>Vérifiez l'état actuel de l'authentification</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">État de la session</h3>
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-500"></div>
                <p>Chargement...</p>
              </div>
            ) : (
              <pre className="bg-slate-100 p-4 rounded-md overflow-auto max-h-64">
                {JSON.stringify(sessionData, null, 2)}
              </pre>
            )}
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Cookies Supabase</h3>
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-500"></div>
                <p>Chargement...</p>
              </div>
            ) : (
              <pre className="bg-slate-100 p-4 rounded-md overflow-auto max-h-64">
                {JSON.stringify(cookiesData, null, 2)}
              </pre>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={checkAuth} disabled={loading}>
            {loading ? "Vérification..." : "Vérifier l'authentification"}  
          </Button>
          <Button onClick={handleRefreshSession} disabled={loading} variant="outline">
            Rafraîchir la session
          </Button>
          <Button onClick={handleForceRedirect} variant="secondary">
            Forcer la redirection Dashboard
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
} 