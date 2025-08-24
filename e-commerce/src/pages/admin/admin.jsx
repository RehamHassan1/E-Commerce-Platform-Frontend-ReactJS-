import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

const Admin = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [activeTab, setActiveTab] = useState("categories");
    const [categoryForm, setCategoryForm] = useState({ name: "", description: "" });
    const [productForm, setProductForm] = useState({
        name: "",
        price: "",
        description: "",
        categoryId: "",
        stock: "",
        image: ""
    });
    const [editingCategoryId, setEditingCategoryId] = useState(null);
    const [editingProductId, setEditingProductId] = useState(null);
    const navigate = useNavigate();

    const API_BASE = "http://localhost:5001";

    const getAuthHeaders = () => ({
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    });

    const fetchCategories = async () => {
        try {
            const res = await fetch(`${API_BASE}/categories`, {
                headers: getAuthHeaders(),
            });
            if (res.ok) {
                const data = await res.json();
                setCategories(data);
            }
        } catch (err) {
            console.error("Error fetching categories:", err);
        }
    };

    const fetchProducts = async () => {
        try {
            const res = await fetch(`${API_BASE}/products`, {
                headers: getAuthHeaders(),
            });
            if (res.ok) {
                const data = await res.json();
                setProducts(data);
            }
        } catch (err) {
            console.error("Error fetching products:", err);
        }
    };

    useEffect(() => {
        fetchCategories();
        fetchProducts();
    }, []);

    const handleCategorySubmit = async (e) => {
        e.preventDefault();
        const method = editingCategoryId ? "PUT" : "POST";
        const url = editingCategoryId
            ? `${API_BASE}/categories/${editingCategoryId}`
            : `${API_BASE}/categories`;

        try {
            const res = await fetch(url, {
                method,
                headers: getAuthHeaders(),
                body: JSON.stringify(categoryForm),
            });

            if (res.ok) {
                alert(editingCategoryId ? "Category updated!" : "Category added!");
                setCategoryForm({ name: "", description: "" });
                setEditingCategoryId(null);
                fetchCategories();
            } else {
                alert("Failed to save category");
            }
        } catch (err) {
            console.error("Error saving category:", err);
            alert("Error occurred while saving category");
        }
    };

    const handleCategoryEdit = (category) => {
        setCategoryForm({
            name: category.name,
            description: category.description || "",
        });
        setEditingCategoryId(category.id);
    };

    const handleCategoryDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this category?")) return;

        try {
            const res = await fetch(`${API_BASE}/categories/${id}`, {
                method: "DELETE",
                headers: getAuthHeaders(),
            });

            if (res.ok) {
                alert("Category deleted!");
                fetchCategories();
                fetchProducts(); 
            } else {
                alert("Failed to delete category");
            }
        } catch (err) {
            console.error("Error deleting category:", err);
            alert("Error occurred while deleting category");
        }
    };

    const handleProductSubmit = async (e) => {
        e.preventDefault();
        const method = editingProductId ? "PUT" : "POST";
        const url = editingProductId
            ? `${API_BASE}/products/${editingProductId}`
            : `${API_BASE}/products`;

        const productData = {
            ...productForm,
            price: parseFloat(productForm.price),
            categoryId: parseInt(productForm.categoryId),
            stock: parseInt(productForm.stock || 0),
        };

        try {
            const res = await fetch(url, {
                method,
                headers: getAuthHeaders(),
                body: JSON.stringify(productData),
            });

            if (res.ok) {
                alert(editingProductId ? "Product updated!" : "Product added!");
                setProductForm({
                    name: "",
                    price: "",
                    description: "",
                    categoryId: "",
                    stock: "",
                    image: ""
                });
                setEditingProductId(null);
                fetchProducts();
            } else {
                alert("Failed to save product");
            }
        } catch (err) {
            console.error("Error saving product:", err);
            alert("Error occurred while saving product");
        }
    };

    const handleProductEdit = (product) => {
        setProductForm({
            name: product.name,
            price: product.price.toString(),
            description: product.description || "",
            categoryId: product.categoryId?.toString() || "",
            stock: product.stock?.toString() || "0",
            image: product.image || "",
        });
        setEditingProductId(product.id);
    };

    const handleProductDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        try {
            const res = await fetch(`${API_BASE}/products/${id}`, {
                method: "DELETE",
                headers: getAuthHeaders(),
            });

            if (res.ok) {
                alert("Product deleted!");
                fetchProducts();
            } else {
                alert("Failed to delete product");
            }
        } catch (err) {
            console.error("Error deleting product:", err);
            alert("Error occurred while deleting product");
        }
    };

    const getCategoryName = (categoryId) => {
        const category = categories.find(cat => cat.id === categoryId);
        return category ? category.name : "No Category";
    };

    return (
        <div className="admin-container">
            <div className="admin-header">
                <h1>Admin Panel</h1>
                <button className="back-btn" onClick={() => navigate("/home")}>
                    Back to Home
                </button>
            </div>

            <div className="admin-tabs">
                <button
                    className={`tab-btn ${activeTab === "categories" ? "active" : ""}`}
                    onClick={() => setActiveTab("categories")}
                >
                    Manage Categories
                </button>
                <button
                    className={`tab-btn ${activeTab === "products" ? "active" : ""}`}
                    onClick={() => setActiveTab("products")}
                >
                    Manage Products
                </button>
            </div>

            {activeTab === "categories" && (
                <div className="tab-content">
                    <h2>Category Management</h2>

                    <form onSubmit={handleCategorySubmit} className="admin-form">
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Category Name"
                                value={categoryForm.name}
                                onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <textarea
                                placeholder="Category Description"
                                value={categoryForm.description}
                                onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                                rows="3"
                            />
                        </div>
                        <button type="submit" className="submit-btn">
                            {editingCategoryId ? "Update" : "Add"} Category
                        </button>
                        {editingCategoryId && (
                            <button
                                type="button"
                                className="cancel-btn"
                                onClick={() => {
                                    setEditingCategoryId(null);
                                    setCategoryForm({ name: "", description: "" });
                                }}
                            >
                                Cancel
                            </button>
                        )}
                    </form>

                    <div className="data-list">
                        <h3>Categories ({categories.length})</h3>
                        {categories.length === 0 ? (
                            <p className="no-data">No categories found. Add your first category!</p>
                        ) : (
                            <div className="categories-grid">
                                {categories.map((category) => (
                                    <div key={category.id} className="category-card">
                                        <h4>{category.name}</h4>
                                        <p>{category.description || "No description"}</p>
                                        <p className="product-count">
                                            Products: {category.products?.length || 0}
                                        </p>
                                        <div className="card-actions">
                                            <button
                                                className="edit-btn"
                                                onClick={() => handleCategoryEdit(category)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="delete-btn"
                                                onClick={() => handleCategoryDelete(category.id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {activeTab === "products" && (
                <div className="tab-content">
                    <h2>Product Management</h2>

                    <form onSubmit={handleProductSubmit} className="admin-form">
                        <div className="form-row">
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="Product Name"
                                    value={productForm.name}
                                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="number"
                                    step="0.01"
                                    placeholder="Price"
                                    value={productForm.price}
                                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <select
                                    value={productForm.categoryId}
                                    onChange={(e) => setProductForm({ ...productForm, categoryId: e.target.value })}
                                    required
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <input
                                    type="number"
                                    placeholder="Stock Quantity"
                                    value={productForm.stock}
                                    onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <input
                                type="url"
                                placeholder="Image URL (optional)"
                                value={productForm.image}
                                onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <textarea
                                placeholder="Product Description"
                                value={productForm.description}
                                onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                                rows="3"
                            />
                        </div>

                        <button type="submit" className="submit-btn">
                            {editingProductId ? "Update" : "Add"} Product
                        </button>
                        {editingProductId && (
                            <button
                                type="button"
                                className="cancel-btn"
                                onClick={() => {
                                    setEditingProductId(null);
                                    setProductForm({
                                        name: "",
                                        price: "",
                                        description: "",
                                        categoryId: "",
                                        stock: "",
                                        image: ""
                                    });
                                }}
                            >
                                Cancel
                            </button>
                        )}
                    </form>

                    <div className="data-list">
                        <h3>Products ({products.length})</h3>
                        {products.length === 0 ? (
                            <p className="no-data">No products found. Add your first product!</p>
                        ) : (
                            <div className="products-grid">
                                {products.map((product) => (
                                    <div key={product.id} className="product-card">
                                        {product.image && (
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="product-image"
                                            />
                                        )}
                                        <h4>{product.name}</h4>
                                        <p className="product-price">${product.price}</p>
                                        <p className="product-category">
                                            Category: {getCategoryName(product.categoryId)}
                                        </p>
                                        <p className="product-stock">Stock: {product.stock || 0}</p>
                                        <p className="product-description">
                                            {product.description || "No description"}
                                        </p>
                                        <div className="card-actions">
                                            <button
                                                className="edit-btn"
                                                onClick={() => handleProductEdit(product)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="delete-btn"
                                                onClick={() => handleProductDelete(product.id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Admin;