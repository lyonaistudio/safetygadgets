// Frais de port et total du panier : source unique utilisée à la fois par
// l'affichage panier et par la création de la session Stripe, pour que le
// total facturé corresponde toujours exactement à ce qui est montré.
export const FREE_SHIPPING_THRESHOLD = 49;
export const SHIPPING_FEE = 7.99;
