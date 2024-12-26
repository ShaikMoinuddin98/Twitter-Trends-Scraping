require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const { Builder, By, until } = require("selenium-webdriver")
const chrome = require("selenium-webdriver/chrome")
const cors=require("cors")
const app = express()
app.use(cors())
mongoose.connect("mongodb://localhost:27017/x_trends")

const trendSchema = new mongoose.Schema({
  uniqueId: String,
  trends: [String],
  timestamp: Date,
  ipAddress: String,
})

const Trend = mongoose.model("Trend", trendSchema)

const SCRAPER_API_URL = `http://api.scraperapi.com?api_key=${process.env.SCRAPER_API_KEY}&url=`


async function scrapeXTrends() {
  const options = new chrome.Options()
  const proxyUrl = `--proxy-server=${SCRAPER_API_URL}`
  options.addArguments(proxyUrl)
  options.addArguments('headless') 



  const driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build()

  try {
    await driver.get(`${SCRAPER_API_URL}https://x.com/i/flow/login`)

    await driver.wait(until.elementLocated(By.xpath("//span[text()='Sign in']")), 10000).click()

    await driver.wait(until.elementLocated(By.name("text")), 10000).sendKeys(process.env.TWITTER_EMAIL)
    await driver.wait(until.elementLocated(By.xpath("//span[text()='Next']")), 10000).click()

    try{
      let extrainput=await driver.wait(until.elementLocated(By.name("text")),5000)
      await extrainput.sendKeys(process.env.TWITTER_USERNAME)
      console.log("filled extra input field")
      await driver.wait(until.elementLocated(By.xpath("//span[text()='Next']")), 10000).click()

    }catch(error){
      console.log("not found extra input field")

    }

    await driver.wait(until.elementLocated(By.name("password")), 10000).sendKeys(process.env.TWITTER_PASSWORD)
    await driver.wait(until.elementLocated(By.xpath("//span[text()='Log in']")), 10000).click()

    const trends =await driver.wait(until.elementsLocated(By.css("[data-testid='trend'] div.r-a023e6")), 10000)
    const topTrends = []
    for (let i = 0 ;i < trends.length ;i++) {
        const htmlContent = await driver.executeScript('return arguments[0].innerText', trends[i])
      htmlContent!=''?topTrends.push(htmlContent):""
    }
    console.log(topTrends)

    await driver.get(`${SCRAPER_API_URL}https://www.iplocation.net/find-ip-address`)

    const ipAddress = await driver.findElement(
        By.xpath('//p[contains(text(), "Your IP Address is")]/span')
      ).getText()
      console.log(ipAddress)
    const uniqueId = `trend_${Date.now()}`
    const timestamp = new Date()

    const trend = new Trend({ uniqueId, trends: topTrends, timestamp, ipAddress })
    await trend.save()

    return { topTrends, ipAddress, timestamp }
  } catch (error) {
    console.error("Error scraping X trends:", error)
    throw error
  } finally {
    await driver.quit()
  }
}



app.get("/trends", async (req, res) => {
  await scrapeXTrends()
  const trends = await Trend.find().sort({ timestamp: -1 })
  res.json(trends)
})

const PORT = 7000
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
