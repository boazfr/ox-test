import { test, expect } from '@playwright/test'

test('Assert status and title for an API url', async ({ page }) => {
  try {
    const apiUrl = 'https://jsonplaceholder.typicode.com/todos/1'
    const res = await page.evaluate(async (url) => {
      const result = await fetch(url)
      const data = await result.json()
      return { status: result.status, data }
    }, apiUrl)

    expect(res.status).toBe(200)
    expect(res.data.title).toBe('delectus aut autem')
  } catch (error) {
    console.error('Error:', error)
  }
})
