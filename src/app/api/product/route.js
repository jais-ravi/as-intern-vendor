import dbConnect from "@/lib/dbConnect"; // Adjust the import according to your folder structure
import productModel from "@/model/product-model";

export async function GET(request) {
  await dbConnect();

  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page')) || 1;
  const limit = parseInt(url.searchParams.get('limit')) || 10;
  const skip = (page - 1) * limit;

  try {
    // Fetch paginated products and count the total number of products
    const [products, totalProducts] = await Promise.all([
      productModel.find().skip(skip).limit(limit),
      productModel.countDocuments()
    ]);

    // Format the products, converting image buffers to base64 strings
    const formattedProducts = products.map(product => ({
      ...product.toObject(),
      productImages: product.productImages.map(image => {
        if (image && image.data) {
          return {
            ...image,
            data: image.data.toString('base64'), // Convert buffer to base64 string
          };
        }
        return image;
      }),
    }));

    // Send paginated response
    return new Response(JSON.stringify({
      success: true,
      products: formattedProducts,
      totalProducts, // Total number of products for pagination
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return new Response(JSON.stringify({
      success: false,
      message: "Error fetching products",
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
