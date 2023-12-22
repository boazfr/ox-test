import { test, expect } from '@playwright/test'

test('Login to OX Security system and return number of issues with high severity', async ({
  page,
}) => {
  // go to login page and click on login button
  await page.goto('https://dev.app.ox.security')
  expect(page.url()).toContain('https://dev.app.ox.security')

  await page.click('button:has-text("LOGIN")')
  await page.waitForURL('https://auth.dev.app.ox.security/u/login/**')
  expect(page.url()).toContain('https://auth.dev.app.ox.security/u/login')

  const config = require('../config.js')
  const username = config.username
  const password = config.password

  // enter username and password and click submit
  await page.click('#username')
  await page.fill('#username', username)
  await page.click('button:has-text("Continue")')
  await page.fill('#password', password)
  await page.click('._button-login-password')

  // enter the dashboard, filter by high severity issues and return counter
  await page.waitForURL('https://dev.app.ox.security/dashboard')
  expect(page.url()).toContain('https://dev.app.ox.security/dashboard')

  await page.click('a[href*="/issues"] button')
  await page.click('//div[h6[contains(text(), "Severity")]]')
  await page.click('input[value="High"]')

  const counter = Number(await page.textContent('span:is([class*="count"])'))
  expect(counter).toBeGreaterThanOrEqual(0)
  const msg = `The number of high severity issues is ${counter}`
  console.log(msg)
})
