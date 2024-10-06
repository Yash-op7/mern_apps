import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const writeLogsStream= fs.createWriteStream(path.join(__dirname, 'httpLogs.log'), { flags: 'a' });
export {writeLogsStream};

