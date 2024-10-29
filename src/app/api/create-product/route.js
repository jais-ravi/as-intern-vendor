import dbConnect from "@/lib/dbConnect";
import productModel from "@/model/product-model";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

export async function POST(request) {

  const formData = await request.formData();


  const productName = formData.get("productName");
  const productDes = formData.get("productDes");
  const productPrice = parseFloat(formData.get("productPrice"));
  const sellingPrice = parseFloat(formData.get("sellingPrice"));
  const discount = parseFloat(formData.get("discount"));
  const productBrand = formData.get("productBrand");
  const freeDelivery = formData.get("freeDelivery") === 'true';
  const deliveryCharge = parseFloat(formData.get("deliveryCharge"));
  const category = formData.get("category");
  const tags = formData.get("tags") ? formData.get("tags").split(",") : [];
  const images = formData.getAll("productImages");

  await dbConnect();

  try {

    const session = await getServerSession({ req: request, ...authOptions });
    const vendorId = session?.user?._id;
    if (!vendorId) {
      return new Response(
        JSON.stringify({ success: false, message: "Unauthorized" }),
        { status: 401 }
      );
    }


    const imageBuffers = await Promise.all(images.map(async (file) => {
      return {
        data: Buffer.from(await file.arrayBuffer()),
        contentType: file.type,
      };
    }));


    const newProduct = new productModel({
      productName,
      productDes,
      productPrice,
      sellingPrice,
      discount,
      productBrand,
      freeDelivery,
      deliveryCharge,
      category,
      tags,
      productImages: imageBuffers,
      vendorId, 
    });


    await newProduct.save();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Product created successfully",
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating product", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Error creating product",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
