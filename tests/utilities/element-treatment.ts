import {browser, by, promise as wdpromise, WebElement} from 'protractor';
import {timeouts} from './timeouts';


export async function getElement(locator: string): Promise<WebElement> {
  let elements = await getElements(locator);
  return elements.shift();
}

export function getElements(locator: string): wdpromise.Promise<WebElement[]> {
  return browser.findElements(by.css(locator));
}

export async function waitForElement(locator: string, timeout: timeouts = timeouts.xs): Promise<WebElement> {
  return browser.wait(
      async () => getElement(locator),
      timeout,
      `Element with locator '${locator}' was not found after '${timeout}'.`
  );
}

export async function waitForElementDisplayed(locator: string, timeout: timeouts = timeouts.xs): Promise<WebElement> {
  const element = await waitForElement(locator, timeout);
  await browser.wait(
      async () => await element.isDisplayed(),
      timeout,
      `Element with locator '${locator}' was not displayed after '${timeout}'.`
  );
  return element;
}

export async function clickElement(locator: string, timeout: timeouts = timeouts.xs): Promise<void> {
  const element = await waitForElementDisplayed(locator, timeout);
  await element.click();
}

export async function fillElement(locator: string, value: string | number, timeout: timeouts = timeouts.xs): Promise<void> {
  const element = await waitForElementDisplayed(locator, timeout);
  await element.sendKeys(value);
}
