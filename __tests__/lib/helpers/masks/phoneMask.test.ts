import { phoneMask } from "@/lib/helpers/masks";

describe("phoneMask()", () => {
  it('should format the value "4299998888" to "(42) 9999-8888"', () => {
    const value = "4299998888";

    const formattedValue = phoneMask(value);

    expect(formattedValue).toBe("(42) 9999-8888");
  });

  it('should format the value "42999998888" to "(42) 99999-8888"', () => {
    const value = "42999998888";

    const formattedValue = phoneMask(value);

    expect(formattedValue).toBe("(42) 99999-8888");
  });

  it("should not allow values with more than 14 digits", () => {
    const value = "429999988888";

    const formattedValue = phoneMask(value);

    expect(formattedValue).toBe("(42) 99999-8888");
  });

  it("should not allow non-numeric characters", () => {
    const value = "12ab34";

    const formattedValue = phoneMask(value);

    expect(formattedValue).toBe("(12) 34");
  });
});
