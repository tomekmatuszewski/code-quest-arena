import { test, expect } from '@playwright/test';

test.describe('Code Quest Arena E2E', () => {
    // Generate unique user for each run
    const timestamp = Date.now();
    const username = `user_${timestamp}`;
    const email = `user_${timestamp}@example.com`;
    const password = 'password123';

    test('Full User Journey: Register -> Login -> Play -> Leaderboard', async ({ page }) => {
        // 1. Registration
        await page.goto('/register');
        await page.fill('input[placeholder="CodeMaster"]', username);
        await page.fill('input[placeholder="your@email.com"]', email);

        // Password and Confirm Password both have type="password"
        const passwordInputs = page.locator('input[type="password"]');
        await passwordInputs.nth(0).fill(password);
        await passwordInputs.nth(1).fill(password);

        // Wait for potential toast or redirect. Assuming redirect to login.
        await page.click('button:has-text("Create Account")');

        // Expect redirect to login page
        await expect(page).toHaveURL('/login');

        // 2. Login
        await page.fill('input[placeholder="your@email.com"]', email);
        await page.fill('input[type="password"]', password);
        await page.click('button:has-text("Sign In")');

        // Expect redirect to home/play page and success message/UI
        await expect(page).toHaveURL('/');
        await expect(page.locator('nav')).toContainText(username);

        // 3. Play Game
        await page.click('a:has-text("Start Playing")');
        await expect(page).toHaveURL('/play');

        // Answer questions (just answering a few to finish quickly if possible, or complete the set)
        // Since we don't know exact questions, we just click options.
        // The game has 10 questions by default.
        for (let i = 0; i < 10; i++) {
            // Wait for card to be ready (Draw Card state)
            const drawCard = page.locator('text=Draw Card');
            await expect(drawCard).toBeVisible({ timeout: 5000 });

            // Click to flip
            await page.click('.card-front', { force: true });

            // Wait for options to appear
            // Options are usually 4 buttons in a grid. We can target them by class or hierarchy if needed.
            // Or just pick the first option button that contains "A" and some text.
            // Using nth(0) of the options grid buttons would be safest if we can identify the grid.
            const options = page.locator('button.w-full.justify-start'); // Assuming styling class or structure
            await expect(options.first()).toBeVisible();
            await options.first().click();

            // Wait for result feedback
            await page.waitForTimeout(1000); // 1s delay
        }

        // 4. Check Score Submission / Leaderboard
        // After 10 questions, Play page should show "Game Over!" 
        await expect(page.locator('h2')).toContainText('Game Over!');

        await page.click('a:has-text("Leaderboard")');
        await expect(page).toHaveURL('/leaderboard');

        // Verify our user is on leaderboard
        await expect(page.locator('table')).toContainText(username);
    });
});
