import { test, expect } from '@playwright/test'

test('nav link öffnet die About-Seite', async ({ page }) => {
  await page.goto('/')

  // statt getByRole → CSS-Selector auf die Route
  await page.locator('a[href="/about"]').first().click()

  await expect(page).toHaveURL(/\/about/)
  await expect(page.getByTestId('about-section')).toBeVisible()
})
