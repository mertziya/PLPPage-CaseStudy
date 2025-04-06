const getProductUrl = 'http://172.20.10.4:3000/api/productDetail/'; // USE YOUR OWN IP ADRESS TO MAKE IT WORK

//192.168.1.105 --> ziya 2.4ghz
//172.20.10.4 --> mert iphone

export const GetProduct = async (productId: string) => {
    try {
      const response = await fetch(`${getProductUrl}${productId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const productData = await response.json();
      return productData;
    } catch (error) {
      console.error('Failed to fetch product:', error);
      return null;
    }
};

export default GetProduct;
