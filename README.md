# Just-Pay

<img width="1919" height="915" alt="Captura de pantalla 2025-11-09 211033" src="https://github.com/user-attachments/assets/e87d05c3-786a-4d35-a369-4fdd50cc8381" />
<img width="1919" height="916" alt="Captura de pantalla 2025-11-09 211043" src="https://github.com/user-attachments/assets/fc211667-20c7-4011-bc5b-01fd34952541" />
<img width="1918" height="915" alt="Captura de pantalla 2025-11-09 211055" src="https://github.com/user-attachments/assets/6bf01ab0-26d1-420e-b3fd-e94b45d8470f" />
<img width="1919" height="913" alt="Captura de pantalla 2025-11-09 211115" src="https://github.com/user-attachments/assets/00e09c67-2e4e-4270-b856-9d3da6e4fabf" />
<img width="1919" height="915" alt="Captura de pantalla 2025-11-09 211123" src="https://github.com/user-attachments/assets/9d02d096-0f3c-4652-802a-1354854a1d5a" />
<img width="1919" height="916" alt="Captura de pantalla 2025-11-09 211141" src="https://github.com/user-attachments/assets/c68ca1aa-dfa4-4ada-aec1-5cf099490d12" />

## Descripción

JustPay es una aplicación simple para registrar usuarios, iniciar sesión y probar flujos de suscripción. Ideal para prototipos y demostraciones rápidas de modelos de pago recurrente.

## Características

- Registro y autenticación de usuarios (email/password).
- Gestión básica de suscripciones (crear, ver estado, cancelar).
- Entorno de pruebas para simular pasarelas de pago.
- Interfaz limpia y fácil de extender.

## Tecnologías

- Frontend: React / TanStack / Zustand / Shadcn
- Backend: Laravel
- Base de datos: MySQL

## Instalación

### Frontend

Requerimientos:
  - Node >= 23.11.0

```shell
# Clonar repositorio
git clone https://github.com/Tatanstii/Just-Pay.git

# Acceder a la carpeta del frontend
cd just-pay-client

# Configurar variables de entorno (copiar archivo .env.example)
VITE_API_URL=http://127.0.0.1:8000

# Instalar dependencias
npm install

# Iniciar servidor como desarrollo
npm run dev

# Iniciar como productivo
npm run build
npm run preview
```

### Backend

Requerimientos:
 - PHP >= 8.4.0
 - Composer >= 2.8.9
 - Stripe CLI [¿Cómo instalar?](https://docs.stripe.com/stripe-cli/install)

```shell
# Clonar repositorio
git clone https://github.com/Tatanstii/Just-Pay.git

# Acceder a la carpeta del frontend
cd just-pay-backend

# Instalar dependencias
composer install

# Generar APP KEY
php artisan key:generate

# Configurar variables de entorno (copiar archivo .env.example y renombrar .env)
# Es importante configurar las variables de entorno de tu ambiente de prueba en Stripe, incluyendo la del webhook.

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=
DB_USERNAME=root
DB_PASSWORD=

STRIPE_KEY=pk_test_*****
STRIPE_SECRET=sk_test_*****
STRIPE_WEBHOOK_SECRET=whsec_*****

# ⚠️ Es importante crear un producto con costo 0 el cual simulara el producto gratis con el que iniciará el usuario y asignar el id del precio en la variable:
STRIPE_FREE_PLAN_PRICE_ID=price_******

# Correr migraciones y seeders
# ⚠️ Al momento de ejecutar las seeders este sincroniza los productos creados en Stripe
php artisan migrate --seed

# Iniciar servidor
php artisan serve

# Configurar webhook
stripe login
stripe listen --forward-to 127.0.0.1:8000/api/webhook
```



## Uso

- Regístrate con un correo válido.
- Inicialmente verás el plan al cual te encuentras asociado
- Ve al panel de usuario y cambia de plan.
