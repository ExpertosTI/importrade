#!/usr/bin/env node
/**
 * Script de migración de Prisma para ejecutar en producción
 * Usa el cliente de Prisma instalado en node_modules
 */

const { execSync } = require('child_process');
const path = require('path');

console.log('🔄 Iniciando migraciones de Prisma...');

try {
  // Ejecutar db push usando el Prisma instalado localmente
  const schemaPath = path.join(__dirname, '..', 'prisma', 'schema.prisma');
  
  execSync(
    `node_modules/.bin/prisma db push --accept-data-loss --schema=${schemaPath}`,
    { 
      stdio: 'inherit',
      cwd: path.join(__dirname, '..')
    }
  );
  
  console.log('✅ Migraciones completadas exitosamente');
  process.exit(0);
} catch (error) {
  console.error('❌ Error ejecutando migraciones:', error.message);
  process.exit(1);
}
