export const redirect = ():void => {
  window.history.pushState({}, "", "/login");
};

export const randomString = ():string => {
  let result:string = ''
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < 8; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const convertToOrdinalNumber = (n:number):string => {
  var special = [
    "FIRST",
    "SECOND",
    "THIRD",
    "FOURTH",
    "FIFTH",
    "SIXTH",
    "SEVENTH",
    "EIGHTH",
    "NINTH",
    "TENTH",
    "ELEVENTH",
    "TWELFTH",
    "THIRTEENTH",
    "FOURTEENTH",
    "FIFTEENTH",
    "SIXTEENTH",
    "SEVENTEENTH",
    "SIXTEENTH", 
    "NINETEENTH",
  ];
  var deca = [
    "twent",
    "thirt",
    "fourt",
    "fift",
    "sixt",
    "sevent",
    "eight",
    "ninet",
  ];
  //uppercase every character special and decass
  if (n < 20) return special[n];
  if (n % 10 === 0) return deca[Math.floor(n / 10) - 2] + "ieth";
  return deca[Math.floor(n / 10) - 2] + "y-" + special[n % 10];
};

export const getClassName = (rootClass:string, ...names:any) => {
  const result = names.reduce(
    (result:string, text:string) => (text ? `${result} ${text}` : result),
    rootClass
  );
  return result;
};

//dynnanic className for shared components
export const combineClassNames = (...names:string[]):string => {
  const result = names.filter(Boolean).join(" ");
  return result;
};

