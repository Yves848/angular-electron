export async function asyncForEach (anArray: any[], callbak: any)  {
  console.log('for');
  for (var i = 0; i <= anArray.length - 1; i++) {
    await callbak(anArray[i]);
  }
};
