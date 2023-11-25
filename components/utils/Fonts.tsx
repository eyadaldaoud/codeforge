import {
  Amiri_Quran,
  Anton,
  Bebas_Neue,
  Roboto_Condensed,
  Rubik,
} from "next/font/google";

export const Roboto_condensed = Roboto_Condensed({
  weight: "400",
  subsets: ["latin"],
});

export const rubik = Rubik({ weight: "500", subsets: ["latin"] });
export const Arabic = Amiri_Quran({ weight: "400", subsets: ["arabic"] });
export const anton = Anton({ weight: "400", subsets: ["latin"] });
