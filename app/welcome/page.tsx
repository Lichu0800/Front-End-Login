"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function WelcomePage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true); // Estado para manejar la carga

    useEffect(() => {
        // Verificar si el token JWT está presente (solo en el cliente)
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            // Redirigir al usuario a la página de login si no hay token
            router.push('/login');
        } else {
            // Si hay token, permitir que se muestre el contenido
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
                <p onClick={handleLogout} className="text-blue-500 hover:underline">
                    Logout
                </p>
            </div>
        </div>
    );
}