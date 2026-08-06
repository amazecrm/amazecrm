import { expect, test } from "@playwright/test"

test("email login opens the dashboard", async ({ page }) => {
  await page.goto("/login")

  const signInButton = page.getByRole("button", { name: "Sign in", exact: true })
  await expect(signInButton).toBeVisible()
  await signInButton.click()

  await expect(page).toHaveURL(/\/dashboard$/)
  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible()
  await expect(page.getByText("Amaze! Here's your CRM overview.")).toBeVisible()
})
