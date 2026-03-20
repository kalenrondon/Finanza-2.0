// ═══════════════════════════════════════════════════════════════
//  LUCAS & AMOR — Google Apps Script Backend
//  Pega este código en script.google.com (nuevo proyecto)
//  y despliégalo como "Web App" → Ejecutar como: Yo → Acceso: Cualquiera
// ═══════════════════════════════════════════════════════════════

const SHEET_ID = SpreadsheetApp.getActiveSpreadsheet().getId();

// Nombres de las hojas
const HOJAS = {
  movimientos: 'Movimientos',
  deudas: 'Deudas',
  ahorros: 'Ahorros',
  metas: 'Metas',
};

// ──────────────────────────────────────
//  CORS + Entry point POST
// ──────────────────────────────────────
function doPost(e) {
  const callback = e.parameter.callback;
  let resultado;
  try {
    const body = JSON.parse(e.postData.contents);
    const { accion, datos } = body;

    if (accion === 'movimiento') resultado = guardarMovimiento(datos);
    else if (accion === 'deuda')  resultado = guardarDeuda(datos);
    else if (accion === 'ahorro') resultado = guardarAhorro(datos);
    else if (accion === 'meta')   resultado = guardarMeta(datos);
    else if (accion === 'getAll') resultado = obtenerTodo();
    else resultado = { ok: false, error: 'Acción desconocida' };
  } catch (err) {
    resultado = { ok: false, error: err.toString() };
  }

  const output = ContentService.createTextOutput(JSON.stringify(resultado));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}

function doGet(e) {
  const resultado = obtenerTodo();
  const output = ContentService.createTextOutput(JSON.stringify(resultado));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}

// ──────────────────────────────────────
//  OBTENER TODAS LAS HOJAS
// ──────────────────────────────────────
function obtenerTodo() {
  return {
    ok: true,
    movimientos: leerHoja(HOJAS.movimientos),
    deudas: leerHoja(HOJAS.deudas),
    ahorros: leerHoja(HOJAS.ahorros),
    metas: leerHoja(HOJAS.metas),
  };
}

// ──────────────────────────────────────
//  LEER UNA HOJA
// ──────────────────────────────────────
function leerHoja(nombreHoja) {
  const hoja = obtenerOCrearHoja(nombreHoja);
  const data = hoja.getDataRange().getValues();
  if (data.length < 2) return [];

  const headers = data[0];
  return data.slice(1).map(fila => {
    const obj = {};
    headers.forEach((h, i) => obj[h] = fila[i]);
    return obj;
  });
}

// ──────────────────────────────────────
//  OBTENER O CREAR HOJA
// ──────────────────────────────────────
function obtenerOCrearHoja(nombre) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let hoja = ss.getSheetByName(nombre);
  if (!hoja) {
    hoja = ss.insertSheet(nombre);
    // Crear encabezados según el tipo
    if (nombre === HOJAS.movimientos) {
      hoja.appendRow(['id','tipo','cat','monto','persona','desc','fecha','timestamp']);
    } else if (nombre === HOJAS.deudas) {
      hoja.appendRow(['id','persona','acreedor','monto','cuota','desc','vence','pagado','timestamp']);
    } else if (nombre === HOJAS.ahorros) {
      hoja.appendRow(['id','persona','monto','tipo','desc','fecha','timestamp']);
    } else if (nombre === HOJAS.metas) {
      hoja.appendRow(['id','nombre','objetivo','actual','persona','fecha','emoji','timestamp']);
    }
    // Formato encabezados
    const rango = hoja.getRange(1, 1, 1, hoja.getLastColumn());
    rango.setBackground('#0D1B2A').setFontColor('#FFD600').setFontWeight('bold');
  }
  return hoja;
}

// ──────────────────────────────────────
//  GUARDAR MOVIMIENTO
// ──────────────────────────────────────
function guardarMovimiento(d) {
  const hoja = obtenerOCrearHoja(HOJAS.movimientos);
  hoja.appendRow([
    d.id, d.tipo, d.cat, d.monto, d.persona, d.desc, d.fecha,
    new Date().toISOString()
  ]);
  return { ok: true };
}

// ──────────────────────────────────────
//  GUARDAR DEUDA
// ──────────────────────────────────────
function guardarDeuda(d) {
  const hoja = obtenerOCrearHoja(HOJAS.deudas);
  hoja.appendRow([
    d.id, d.persona, d.acreedor, d.monto, d.cuota, d.desc, d.vence, d.pagado || 0,
    new Date().toISOString()
  ]);
  return { ok: true };
}

// ──────────────────────────────────────
//  GUARDAR AHORRO
// ──────────────────────────────────────
function guardarAhorro(d) {
  const hoja = obtenerOCrearHoja(HOJAS.ahorros);
  hoja.appendRow([
    d.id, d.persona, d.monto, d.tipo, d.desc, d.fecha,
    new Date().toISOString()
  ]);
  return { ok: true };
}

// ──────────────────────────────────────
//  GUARDAR META
// ──────────────────────────────────────
function guardarMeta(d) {
  const hoja = obtenerOCrearHoja(HOJAS.metas);
  hoja.appendRow([
    d.id, d.nombre, d.objetivo, d.actual, d.persona, d.fecha, d.emoji,
    new Date().toISOString()
  ]);
  return { ok: true };
}
