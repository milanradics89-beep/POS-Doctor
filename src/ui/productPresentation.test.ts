import { describe, expect, it } from "vitest";
import { productPriceDisplay } from "./productPresentation";

describe("product price presentation", () => {
  it("keeps a HUF amount when the currency field is missing", () => {
    expect(productPriceDisplay({ priceHuf: 24_990 })).toEqual({ price: 24_990, currency: "HUF" });
  });

  it("uses the source price and currency for foreign listings", () => {
    expect(productPriceDisplay({ price: 99.99, currency: "eur", priceHuf: null })).toEqual({ price: 99.99, currency: "EUR" });
  });

  it("does not label an unknown-currency price as HUF", () => {
    expect(productPriceDisplay({ price: 5_000, currency: null, priceHuf: null })).toEqual({ price: 5_000, currency: "" });
  });

  it("preserves a zero HUF price", () => {
    expect(productPriceDisplay({ priceHuf: 0 })).toEqual({ price: 0, currency: "HUF" });
  });
});
