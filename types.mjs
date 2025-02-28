import fs from 'node:fs';
import readline from 'node:readline';

// const path = require('node:path');

const FILE_PATH = '/home/doc/Software/Projects/C3/zeek-docs/scripts/base/protocols/dhcp/main.zeek.rst';
const HINT = 'DHCP::Info'

/**
 * @typedef {object} Datum
 * @property {string} name - The person's name.
 * @property {string} type - The person's name.
 * @property {string} description - The person's age.
 */

/**
 * 
 * @param {*} filePath
 * @returns {Array<Datum>} data
 */
async function processLineByLine(filePath) {
  const data = [];
  try {
    const fileStream = fs.createReadStream(filePath);

    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity, // To handle different line endings (CRLF or LF)
    });

    let inPosition = false;
    let datum = {
      name: "",
      type: "",
      description: ""
    };

    rl.on('line', (line) => {
      // Process each line here
      if (!inPosition && line === `.. zeek:type:: ${HINT}`) {
        inPosition = true
      }
      if (inPosition) {
        const l = line.trim();
        if (line.trim().startsWith("The record type which contains the column fields of the")) {
          inPosition = false
        } else {
          if (l.includes(":zeek:type:")) {
            datum.name = l.split(':')[0];
            datum.type = l.split('`')[1];
          } else if (datum.name && datum.type && l.length > 0) {
            datum.description += l
          } else if (l.length === 0) {
            if (datum.name.length > 0 && datum.type.length > 0) {
              data.push(datum);
            }
            datum = {
              name: "",
              type: "",
              description: ""
            };

          }
        }
      }
    });

    await new Promise((resolve) => {
      rl.once('close', resolve);
    });

    console.log('File processing complete.');
  } catch (err) {
    console.error('Error reading or processing the file:', err);
  }
  return data
}

try {
  // const d = processLineByLine(FILE_PATH).then((data) => {
  //   console.log({ data });
  //   return data
  // })
  const columns = await processLineByLine(FILE_PATH);
  console.log({ columns });
} catch (err) {
  console.error(err);
}