export const getAllCoins = async () => {
  try {
    const response = await fetch(`https://api.coincap.io/v2/assets`);
    let data = await response.json();
    return data.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
