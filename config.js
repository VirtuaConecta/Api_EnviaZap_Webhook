const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, 'config.json');
 
console.log('Caminho do arquivo de configuração:', configPath);
try {
  const data = fs.readFileSync(configPath);
  const config = JSON.parse(data);
  module.exports = config;
} catch (err) {
  console.error('Erro ao ler o arquivo de configuração:', err);
}
