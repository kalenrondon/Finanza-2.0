# 💰 Lucas & Amor — Finanzas Costeñas

> App web de finanzas personales para parejas, con sabor barranquillero 🌴

---

## ✨ Qué tiene esta vaina

- 💸 **Movimientos** — Ingresos y gastos con categoría y persona
- 🔶 **Deudas** — Registro de deudas con seguimiento de pagos y barra de progreso
- 💙 **Ahorros** — Log de ahorros por tipo (efectivo, banco, CDT, alcancía)
- 🎯 **Metas** — Metas financieras con barra de progreso y abonos
- 📋 **Historial** — Tabla completa con filtro por texto y persona
- 📊 **Estadísticas** — Gráficas de categorías, balance mensual y comparativo por persona
- 👫 **Multi-persona** — Filtra por ti, por tu pareja o por los dos
- 🌴 **Consejos costeños** — Consejos sarcásticos y motivadores estilo barranquillero
- 🔊 **Sonidos** — Feedback auditivo en cada acción
- ☁️ **Google Sheets** — Sincronización en la nube para usar desde cualquier dispositivo

---

## 🚀 Cómo usarlo (sin Google Sheets)

1. Descarga o clona este repositorio
2. Abre `index.html` en tu navegador
3. ¡Listo! Los datos se guardan en `localStorage` del navegador

---

## ☁️ Conectar con Google Sheets (para usarlo en pareja)

### Paso 1: Crear el Spreadsheet

1. Ve a [sheets.google.com](https://sheets.google.com)
2. Crea un nuevo spreadsheet
3. Copia el **ID** de la URL:  
   `https://docs.google.com/spreadsheets/d/`**`ESTE_ES_EL_ID`**`/edit`

### Paso 2: Crear el Apps Script

1. En el spreadsheet, ve a **Extensiones → Apps Script**
2. Borra el código que hay y pega todo el contenido de `google-apps-script.js`
3. Guarda el proyecto (Ctrl+S) con cualquier nombre, ej: "Finanzas API"

### Paso 3: Desplegar como Web App

1. Clic en **Implementar → Nueva implementación**
2. Tipo: **Aplicación web**
3. Ejecutar como: **Yo (tu cuenta)**
4. Quién tiene acceso: **Cualquier usuario**
5. Clic en **Implementar**
6. Copia la **URL de la Web App** — la necesitas para el paso siguiente

### Paso 4: Configurar la app

1. Abre `index.html`
2. Clic en **⚙️ Configurar**
3. Llena:
   - Tu nombre
   - Nombre de tu pareja
   - El ID del Spreadsheet (Paso 1)
   - La URL de la Web App (Paso 3)
4. Clic en **💾 Guardar y Conectar**

### Paso 5: Subir a GitHub Pages (para acceso desde el celular)

```bash
git init
git add .
git commit -m "🌴 Finanzas costeñas iniciales"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/finanzas-coste.git
git push -u origin main
```

Luego en GitHub: **Settings → Pages → Source: main / root**

¡Tu app estará en `https://TU_USUARIO.github.io/finanzas-coste/`! 🎉

---

## 📁 Estructura del proyecto

```
finanzas-coste/
├── index.html              # App completa (HTML + CSS + JS)
├── google-apps-script.js   # Código para Google Apps Script
└── README.md               # Este archivo
```

---

## 🛠️ Stack técnico

- HTML5 + CSS3 + JavaScript vanilla (sin dependencias)
- Google Apps Script (backend serverless)
- Google Sheets (base de datos)
- Web Audio API (sonidos)
- LocalStorage (caché local)
- GitHub Pages (hosting gratis)

---

## 🌴 Consejos de uso

- Todo se guarda **localmente** en el navegador, aunque no tengas internet
- La sincronización con Google Sheets es **adicional** — si no la configuras, sigue funcionando
- Usa el filtro de personas para ver solo tus gastos o los de tu pareja
- Toca el consejo costeño pa' que te dé otro 😄

---

Hecho con 💛 desde Barranquilla 🌊
