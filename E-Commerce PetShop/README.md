# E-Commerce Pet Shop 🐾

Una aplicación moderna de comercio electrónico diseñada exclusivamente para dueños de mascotas, construida con React y Firebase.

## 🚀 Características

- **Catálogo de Productos**: Navegación fluida por categorías (perros, gatos, accesorios, etc.).
- **Detalle de Producto**: Información completa sobre cada artículo.
- **Carrito de Compras**: Gestión de pedidos de forma intuitiva.
- **Panel de Administración**: Acceso protegido para gestionar el inventario.
- **Autenticación**: Inicio de sesión seguro para administradores.
- **Multi-idioma**: Soporte para diferentes idiomas mediante Context API.
- **Diseño Responsivo**: Optimizado para dispositivos móviles y escritorio.

## 🛠️ Tecnologías Utilizadas

- **Frontend**: [React.js](https://reactjs.org/) (v19)
- **Bundler**: [Vite](https://vitejs.dev/)
- **Routing**: [React Router](https://reactrouter.com/) (v7)
- **Backend / Database**: [Firebase](https://firebase.google.com/) (Firestore & Auth)
- **Estilos**: CSS3 moderno (Vanilla CSS)
- **Despliegue**: GitHub Pages con Automatización mediante GitHub Actions.

## 📦 Instalación y Uso

1. **Clonar el repositorio**:

   ```bash
   git clone https://github.com/lorbeafus/E-Commerce-Pet-Shop.git
   ```

2. **Entrar en la carpeta del proyecto**:

   ```bash
   cd "E-Commerce PetShop"
   ```

3. **Instalar dependencias**:

   ```bash
   npm install
   ```

4. **Iniciar en modo desarrollo**:
   ```bash
   npm run dev
   ```

## 🏗️ Estructura del Proyecto

```text
src/
├── components/        # Componentes reutilizables (NavBar, Admin, Cart, etc.)
├── context/           # Contextos para estado global (Auth, Language)
├── firebase/          # Configuración y servicios de Firebase
├── assets/            # Imágenes y recursos estáticos
├── App.jsx            # Configuración de rutas principales
└── main.jsx           # Punto de entrada de la aplicación
```

## 🤖 Despliegue Automático

Este proyecto utiliza el método nativo de **GitHub Actions** para el despliegue. Cada vez que se suben cambios a la rama `main`, un flujo de trabajo automático construye el proyecto y lo publica directamente en GitHub Pages, eliminando la necesidad de ramas adicionales como `gh-pages`.

Para que esto funcione, asegúrate de que en la configuración de GitHub Pages de tu repositorio el **Source** esté configurado como **"GitHub Actions"**.

---

_Desarrollado por [Lorena Fusillo - Nilo Tech](https://github.com/lorbeafus)_
