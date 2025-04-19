import { currencyMask } from "@/lib/helpers/masks";

describe("currencyMask()", () => {
  it('should format the value "123" to "1,23"', () => {
    const value = "123";

    const formattedValue = currencyMask(value);

    expect(formattedValue).toBe("1,23");
  });

  it('should format the value "12300" to "123,00"', () => {
    const value = "12300";

    const formattedValue = currencyMask(value);

    expect(formattedValue).toBe("123,00");
  });

  it("should now allow non-numeric characters", () => {
    const value = "123a00b";

    const formattedValue = currencyMask(value);

    expect(formattedValue).toBe("123,00");
  });
});
