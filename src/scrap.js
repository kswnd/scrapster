export async function scrapProducts(browser, keyword) {
    try {
        const page = await browser.newPage()
        await page.goto(`https://tokopedia.com/search?q=${keyword}`, { timeout: 0 })
        await page.waitForSelector('[data-testid="divSRPContentProducts"]')
        page.evaluate(() => {
            const interval = setInterval(() => {
                const lazyLoading = document.querySelector('.IOLazyloading')
                if (lazyLoading) {
                    lazyLoading.scrollIntoView()
                } else {
                    clearInterval(interval)
                }
            })
        })
        await page.waitForSelector('.IOLazyloading', { state: 'hidden' })
        const data = page.evaluate(() => {
            const productCards = Array.from(document.querySelectorAll('[data-testid="divSRPContentProducts"] [data-testid="master-product-card"]')).slice(0, 100)
            console.log(productCards)
            const products = productCards.map(card => {
                function flattenHTMLTree(node, result = []) {
                    result.push(node)
                    let childNode = node.firstElementChild

                    while (childNode) {
                        flattenHTMLTree(childNode, result)
                        childNode = childNode.nextElementSibling
                    }
                    return result
                }
                const children = flattenHTMLTree(card)

                const basePrice = children.find(e => e.getAttribute('data-testid') === 'lblProductSlashPrice')?.textContent
                const discount = children.find(e => e.getAttribute('data-testid') === 'spnSRPProdDisc')?.textContent
                const imageUrl = children.find(e => e.getAttribute('data-testid') === 'imgSRPProdMain').getAttribute('src')
                const name = children.find(e => e.getAttribute('data-testid') === 'spnSRPProdName').textContent
                const price = children.find(e => e.getAttribute('data-testid') === 'spnSRPProdPrice').textContent
                const rating = parseFloat(children.find(e => e.getAttribute('class')?.includes('prd_rating-average-text'))?.textContent)
                const shopLocation = children.find(e => e.getAttribute('data-testid') === 'spnSRPProdTabShopLoc').textContent
                const shopName = children.find(e => e.getAttribute('data-testid') === 'spnSRPProdTabShopLoc').parentElement.children[1].textContent
                const soldCount = children.find(e => e.getAttribute('class')?.includes('prd_label-integrity'))?.textContent.split(' ')[0]
                const url = decodeURIComponent(children.find(e => e.tagName === 'A').getAttribute('href')).replace(/.*?www./, 'https://').split('?')[0]

                return {
                    basePrice,
                    discount,
                    imageUrl,
                    name,
                    price,
                    rating,
                    shopLocation,
                    shopName,
                    soldCount,
                    url
                }
            })
            return products
        })
        return data
    } catch (error) {
        console.log(error)
    }
}
