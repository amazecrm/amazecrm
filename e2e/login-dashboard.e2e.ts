import { expect, test } from "@playwright/test"

test("demo access opens the dashboard without credentials", async ({ page }) => {
  await page.goto("/login")

  await expect(page.getByRole("heading", { name: "Explore the demo" })).toBeVisible()
  await expect(page.getByText("No account or password required.")).toBeVisible()
  await expect(page.getByLabel("Password")).toHaveCount(0)

  const demoButton = page.getByRole("button", { name: "Open demo workspace" })
  await expect(demoButton).toBeVisible()
  await demoButton.click()

  await expect(page).toHaveURL(/\/dashboard$/)
  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible()
  await expect(page.getByText("Amaze! Here's your CRM overview.")).toBeVisible()
})
