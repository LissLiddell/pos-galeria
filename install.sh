#!/bin/bash

echo "🚀 Instalando POS Galería de Arte - Monorepo"
echo "============================================="

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para imprimir mensajes
print_status() {
    echo -e "${YELLOW}📦 $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Verificar que Node.js está instalado
if ! command -v node &> /dev/null; then
    print_error "Node.js no está instalado. Por favor instálalo primero."
    exit 1
fi

print_status "Versión de Node.js: $(node --version)"

# Instalar dependencias del root
print_status "Instalando dependencias del root..."
if npm install; then
    print_success "Dependencias root instaladas"
else
    print_error "Error instalando dependencias root"
    exit 1
fi

# Instalar backend
print_status "Instalando backend..."
cd backend
if npm install; then
    print_success "Backend instalado correctamente"
else
    print_error "Error instalando backend"
    exit 1
fi
cd ..

# Instalar frontend
print_status "Instalando frontend..."
cd frontend
if npm install; then
    print_success "Frontend instalado correctamente"
else
    print_error "Error instalando frontend"
    exit 1
fi
cd ..

print_success "¡Instalación completada! 🎉"
echo ""
echo "👉 Próximos pasos:"
echo "   1. Configura las variables de entorno en backend/.env"
echo "   2. Ejecuta: ${GREEN}npm run dev${NC} para iniciar ambos servidores"
echo "   3. Abre tu navegador en: ${GREEN}http://localhost:3000${NC}"
echo ""
echo "📝 No olvides configurar tu Supabase:"
echo "   - Crea un proyecto en supabase.com"
echo "   - Ejecuta el schema SQL proporcionado"
echo "   - Actualiza backend/.env con tus credenciales"