const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export const money = (amount) => usd.format(amount);

export const toCents = (amount) => Math.round(amount * 100);
