"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';


// Función para verificar si el token ha expirado
interface DecodedToken {
    exp: number;
    [key: string]: any;
}

function decodeJWT(token: string): DecodedToken | null {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        return JSON.parse(jsonPayload);
    } catch (e) {
        return null;
    }
}

function isTokenExpired(token: string): boolean {
    const decodedToken = decodeJWT(token);
    if (!decodedToken || !decodedToken.exp) return true; // Si no se puede decodificar o no tiene exp, se considera expirado

    const currentTime = Date.now() / 1000; // Convertir a segundos
    return decodedToken.exp < currentTime; // Comparar la fecha de expiración con el tiempo actual
}

export default function WelcomePage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true); // Estado para manejar la carga

    useEffect(() => {
        // Verificar si el token JWT está presente (solo en el cliente)
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            // Redirigir al usuario a la página de login si no hay token
            router.push('/login');
        } else if (isTokenExpired(token)) {
            // Si el token ha expirado, eliminarlo y redirigir al login
            localStorage.removeItem('jwtToken');
            router.push('/login');
        } else {
            // Si hay token y no ha expirado, permitir que se muestre el contenido
            setIsLoading(false);
        }
    }, [router]);

    // Si está cargando, no renderizar nada
    if (isLoading) {
        return null; // O puedes mostrar un spinner de carga
    }

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        router.push('/login');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <h1 className="text-3xl font-bold mb-4 text-gray-800">Welcome!</h1>
                <p className="text-gray-600 mb-4">You have successfully logged in.</p>
                <p onClick={handleLogout} className="text-blue-500 hover:underline cursor-pointer">
                    Logout
                </p>
            </div>
        </div>
    );
}