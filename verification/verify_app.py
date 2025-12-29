from playwright.sync_api import Page, expect, sync_playwright
import time

def verify_alphabet_images(page: Page):
    # Navigate to the local server
    page.goto("http://localhost:8080/index.html")

    # List of words to test (a subset to verify functionality)
    words_to_test = ["ant", "bear", "zebra", "ice cream", "queen"]

    # We will take a screenshot of the last one, but verify all work
    for word in words_to_test:
        # Find the input box
        input_box = page.locator("#word-input")
        input_box.fill(word)

        # Click the show button
        show_btn = page.locator("#show-button")
        show_btn.click()

        # Verify the image appears and has the correct alt text
        # The app uses normalize logic, so 'Ice Cream' maps to 'ice-cream' key or vice versa,
        # but the alt text comes from the 'label' in imageMap.
        # e.g., ant -> "Ant 螞蟻"
        # We just check that an image is present in the frame
        img = page.locator("#image-frame img")
        expect(img).to_be_visible()

        # Check status text
        status = page.locator("#status")
        expect(status).to_have_text(f"你輸入了：{word}")

        # Brief pause to ensure rendering
        time.sleep(0.5)

    # Take a screenshot of the final state (Queen or Zebra depending on list)
    # Let's do one more specific one to capture: Zebra
    input_box = page.locator("#word-input")
    input_box.fill("zebra")
    page.locator("#show-button").click()
    time.sleep(1) # Wait for render

    page.screenshot(path="verification/verification.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_alphabet_images(page)
            print("Verification script ran successfully.")
        except Exception as e:
            print(f"Verification failed: {e}")
        finally:
            browser.close()
