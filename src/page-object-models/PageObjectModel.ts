import type { Page } from "@playwright/test";

export default class PageObjectModel {
  protected constructor(protected page: Page) {}
}
