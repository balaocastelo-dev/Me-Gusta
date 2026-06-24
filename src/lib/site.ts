export const site = {
  name: "Me Gusta Sorvete Americano",
  tagline:
    "Aluguel de máquina de sorvete americano para eventos em Campinas e região",
  city: "Campinas",
  region: "SP",
  country: "BR",
  phone: "+55 19 97126-5833",
  whatsappNumberE164: "5519971265833",
  instagramHandle: "@megustasorveteamericano",
  instagramUrl: "https://www.instagram.com/megustasorveteamericano/",
  facebookUrl: "https://www.facebook.com/megustafazfesta/",
  googleRatingValue: 5,
  googleReviewCount: 77,
} as const;

export function buildWhatsappUrl(message: string) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${site.whatsappNumberE164}?text=${text}`;
}

