# Scrapster

Scrapster is a web scraping tool designed to extract product information from Tokopedia, a popular e-commerce platform in Indonesia. It offers an interactive command line interface (CLI) using Inquirer, allowing users to specify the keyword for product search, choose the export file format (JSON or CSV), and determine the export file name.

## Features

- Search products based on user-defined keywords.
- Choose export file format for the scraping results.
- Determine the export file name.

## Libraries Used

- **[fast-csv](https://www.npmjs.com/package/fast-csv)**: A high-performance library for reading and writing CSV files.
- **[inquirer](https://www.npmjs.com/package/inquirer)**: A library for creating interactive prompts in the command line interface.
- **[playwright-chromium](https://www.npmjs.com/package/playwright-chromium)**: A powerful cross-platform browser automation framework with Chromium adapter.

## Usage

Before using Scrapster, ensure that you have Node.js installed on your system. If not, you can download and install it from [Node.js](https://nodejs.org/).

### 1. Clone the repository

```bash
git clone https://github.com/kswnd/scrapster.git
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the app

```bash
npm start
```

Follow the prompts displayed in the command line interface to enter the product keyword, choose the export file format and specify the file name for the scraping results.

Once the process is complete, Scrapster will scrape the product information from Tokopedia based on your inputs and save the results in the **output** directory, with the specified file format and name.

## Example Results

Below is an example of the exported data in JSON format:

```json
[
    {
        "basePrice": "Rp20.000.000",
        "discount": "10%",
        "imageUrl": "https://images.tokopedia.net/img/samsung-s23.jpg",
        "name": "Samsung S23",
        "price": "Rp18.000.000",
        "rating": 4.9,
        "shopLocation": "Jakarta",
        "shopName": "Best Shop",
        "soldCount": "100",
        "url": "https://tokopedia.com/bestshop/samsung-s23..."
    }
]
```
