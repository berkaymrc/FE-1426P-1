import { Button, Form, Table } from "react-bootstrap";
import "./App.css";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { FaTrash } from "react-icons/fa";
import Confetti from "confetti-react";

const shops = [
  { id: 1, name: "Migros" },
  { id: 2, name: "Teknosa" },
  { id: 3, name: "Bim" },
];

const categories = [
  { id: 1, name: "Elektronik" },
  { id: 2, name: "Şarküteri" },
  { id: 3, name: "Oyuncak" },
  { id: 4, name: "Bakliyat" },
  { id: 5, name: "Fırın" },
];

function App() {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [productShop, setProductShop] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [alertShown, setAlertShown] = useState(false);

  useEffect(() => {
    if (alertShown) {
      alert("Tüm ürünler alındı, Alışveriş Tamamlandı");
      setTimeout(() => setAlertShown(false), 5000);
    }
  }, [alertShown]);

  const handleToggleBought = (productId) => {
    const updatedProducts = products.map((product) =>
      product.id === productId
        ? { ...product, isBought: !product.isBought }
        : product
    );
    setProducts(updatedProducts);

    if (!alertShown && updatedProducts.every((uP) => Boolean(uP.isBought))) {
      setAlertShown(true);
    }
  };

  const handleAddProduct = () => {
    if (!productName || !productShop || !productCategory) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }

    const newProduct = {
      id: nanoid(),
      name: productName,
      category:
        categories.find((cat) => cat.id === Number(productCategory))?.name ||
        "",
      shop: shops.find((shop) => shop.id === Number(productShop))?.name || "",
      isBought: false,
    };
    setProducts([...products, newProduct]);
    setProductName("");
    setProductShop("");
    setProductCategory("");
  };

  const handleDeleteProduct = (productId) => {
    const updatedProducts = products.filter(
      (product) => product.id !== productId
    );
    setProducts(updatedProducts);
  };

  return (
    <>
      {alertShown && <Confetti />}

      <div className="container d-flex gap-5 justify-content-center">
        <Form>
          <div className="container d-flex gap-3 justify-content-center">
            <Form.Group controlId="productName">
              <Form.Control
                type="text"
                placeholder="Enter product name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="productShop">
              <Form.Control
                as="select"
                value={productShop}
                onChange={(e) => setProductShop(e.target.value)}
              >
                <option>Select Shop</option>
                {shops.map((shop) => (
                  <option key={shop.id} value={shop.id}>
                    {shop.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="productCategory">
              <Form.Control
                as="select"
                value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
              >
                <option>Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button
              className="mt-2"
              variant="primary"
              onClick={handleAddProduct}
            >
              Add Product
            </Button>
          </div>
        </Form>
      </div>

      <div className="container">
        <div className="table-container">
          <Table striped bordered hover className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Shop</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className={product.isBought ? "bought" : ""}
                >
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.shop}</td>
                  <td>{product.category}</td>
                  <td>
                    <Button
                      className="action-btn toggle"
                      onClick={() => handleToggleBought(product.id)}
                    >
                      {product.isBought
                        ? "Mark as Not Bought"
                        : "Mark as Bought"}
                    </Button>
                    <Button
                      className="action-btn delete"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default App;
