import inquirer from 'inquirer'
import { chromium } from 'playwright-chromium'
import { scrapProducts } from './scrap.js'
import { saveResultFile } from './utils.js'
import { Loading } from './loading.js'

async function start() {
    console.log('🚀 \x1b[1mApp started!\x1b[0m\n')
    const loading = new Loading()
    let scrapAnotherProduct = false

    do {
        try {
            const questions = [
                {
                    type: 'input',
                    name: 'keyword',
                    message: 'Product keyword to scrap:',
                    default: 'samsung'
                },
                {
                    type: 'list',
                    name: 'fileFormat',
                    message: 'File type for saving result:',
                    choices: [
                        { name: 'JSON', value: 'json' },
                        { name: 'CSV', value: 'csv' }
                    ]
                },
                {
                    type: 'input',
                    name: 'fileName',
                    message: 'Filename for result:',
                    default: 'products'
                }
            ]
            const answer = await inquirer.prompt(questions)

            loading.show()
            const browser = await chromium.launch({ headless: false })
            const products = await scrapProducts(browser, answer.keyword)
            browser.close()
            console.log('\n\n  ✅', products.length, 'product scapped.')
            loading.hide()

            await saveResultFile(answer.fileName, answer.fileFormat, products)

            const { getAnother } = await inquirer.prompt([{
                type: 'list',
                name: 'getAnother',
                message: 'Scrap another product?',
                choices: [
                    { name: 'Yes', value: true },
                    { name: 'No', value: false }
                ]
            }])

            if (getAnother) {
                scrapAnotherProduct = true
            } else {
                console.log('  🚫 App closed.')
                process.exit()
            }
        } catch (error) {
            console.log('Opps,', error)
        }
    } while (scrapAnotherProduct)
}

start()
