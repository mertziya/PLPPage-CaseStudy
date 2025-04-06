const getProductsUrl = 'http://{YOUR_IP_ADDRESS}:3000/api/products'; // USE YOUR OWN IP ADRESS TO MAKE IT WORK

//192.168.1.105 --> ziya 2.4ghz
//172.20.10.4 --> mert iphone

export const GetProducts = async (page = 1, limit = 10) => {
  try {
    const response = await fetch(`${getProductsUrl}?page=${page}&limit=${limit}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error('fetchProducts error:', error);
    throw error;
  }
  
};

export default GetProducts;
