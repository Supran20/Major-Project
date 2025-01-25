import { useParams } from "react-router-dom";
import { useAuth } from "../store/auth";

export const ProductDetail = () => {
  const { name } = useParams(); // Get the product name from the URL
  const { cards } = useAuth();

  // Find the product matching the name from the cards array
  const product = cards.find((curElem) => curElem.Name === name);

  if (!product) {
    return <p>Product not found.</p>; // If the product is not found
  }

  return (
    <section className="product-detail-section py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Product Image */}
          <div>
            <img
              src={product.imageURL || "/images/cat-eye-sunglasses.jpg"}
              alt={product.Name}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>

          {/* Product Details */}
          <div className="product-info space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">{product.Name}</h1>
            <p className="text-xl font-semibold text-red-500">
              Rs {product.Market_Price}{" "}
              <span className="text-gray-500 line-through text-lg">
                Rs {product.Original_Price}
              </span>
            </p>

            {/* Technical Information */}
            <div>
              <h2 className="text-lg font-semibold text-gray-700">
                Technical Information:
              </h2>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Frame Material: PC</li>
                <li>Temple Material: PC</li>
                <li>Frame Shape: Wraparound</li>
                <li>Lens: Polarized</li>
                <li>Model No.: NS-20232</li>
                <li>Frame Size: 68-13-132</li>
                <li>Color: Matte Black</li>
              </ul>
            </div>

            {/* SKU, Categories, and Tags */}
            <div>
              <p>
                <strong className="font-medium text-gray-700">SKU:</strong>{" "}
                {product.SKU || "NS-20232-C2"}
              </p>
              <p>
                <strong className="font-medium text-gray-700">Categories:</strong>{" "}
                Material, Men's Sunglasses, Polarized Sunglasses, PC Frame
              </p>
              <p>
                <strong className="font-medium text-gray-700">Tags:</strong>{" "}
                best matte black sunglasses, UV protection, outdoor sports eyewear
              </p>
            </div>

            {/* Stock Availability */}
            <p className="text-green-600 font-medium">
              {product.stock || 3} in stock
            </p>

            {/* Add to Cart Section */}
            <div className="flex items-center space-x-4">
              <input
                type="number"
                min="1"
                defaultValue="1"
                className="w-16 border rounded-lg text-center"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Additional Thumbnails */}
        <div className="mt-10 grid grid-cols-4 gap-4">
          {product.additionalImages?.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Thumbnail ${idx + 1}`}
              className="w-full h-auto rounded-lg shadow-md cursor-pointer"
            />
          )) || (
            <>
              {/* <img
                src="/images/cat-eye-sunglasses.jpg"
                alt="Default Image 1"
                className="w-full h-auto rounded-lg shadow-md"
              />
              <img
                src="/images/cat-eye-sunglasses.jpg"
                alt="Default Image 2"
                className="w-full h-auto rounded-lg shadow-md"
              /> */}
            </>
          )}
        </div>
      </div>
    </section>
  );
};
