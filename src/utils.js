import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'
import csv from 'fast-csv'

export function saveResultFile(name, format, content) {
    return new Promise((resolve, reject) => {
        const folder = path.join(fileURLToPath(import.meta.url), '../../output')
        const fileName = name.toLowerCase().replace('.json', '').replace('.csv', '')
        const fileLocation = folder + '/' + fileName + '.' + format

        if (format === 'json') {
            fs.writeFile(fileLocation, JSON.stringify(content, null, 4), {}, error => {
                if (error) {
                    reject(error)
                } else {
                    console.log('  📂\x1b[1m', fileName + '.' + format, '\x1b[0msaved.\n')
                    resolve()
                }
            })
        } else {
            const fileStream = fs.createWriteStream(fileLocation)
            csv.write(content, { headers: true })
                .pipe(fileStream)
                .on('finish', () => {
                    console.log('  📂\x1b[1m', fileName + '.' + format, '\x1b[0msaved.\n')
                    resolve()
                }).on('error', error => {
                    reject(error)
                })
        }
    })
}
