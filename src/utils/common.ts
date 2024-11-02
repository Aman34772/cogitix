export const getAllCharactersId = (characters: string[]) => {
  return characters
    .map((character) => {
      const characterUrl = character.split("/");
      return characterUrl[characterUrl.length - 1];
    })
    .join();
};
