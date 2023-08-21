export default function endsWithNumber(str:string) {
    // Vérifie si le dernier caractère de la chaîne est un chiffre (0-9)
    return /\d$/.test(str);
  }