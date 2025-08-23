import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({ name: "", price: "", description: "" });
    const [editingId, setEditingId] = useState(null);
    const navigate = useNavigate();

    const fetchProducts = async () => {
        try {
            const res = await fetch("http://localhost:3000/products", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const data = await res.json();
            setProducts(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Add or Update Product
    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = editingId ? "PUT" : "POST";
        const url = editingId
            ? `http://localhost:3000/products/${editingId}`
            : "http://localhost:3000/products";

        try {
            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                alert(editingId ? "Product updated!" : "Product added!");
                setForm({ name: "", price: "", description: "" });
                setEditingId(null);
                fetchProducts();
            } else {
                alert("Failed to save product");
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;
        try {
            const res = await fetch(`http://localhost:3000/products/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (res.ok) {
                alert("Product deleted!");
                fetchProducts();
            } else {
                alert("Failed to delete product");
            }
        } catch (err) {
            console.error(err);
        }
    };
    const handleEdit = (product) => {
        setForm({
            name: product.name,
            price: product.price,
            description: product.description,
        });
        setEditingId(product.id);
    };

    return (
        <div className="admin-container">
            <h2>Admin Panel - Manage Products</h2>

            <form onSubmit={handleSubmit} className="admin-form">
                <input
                    type="text"
                    placeholder="Product Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
                <button type="submit">{editingId ? "Update" : "Add"} Product</button>
            </form>

            <h3>Product List</h3>
            <ul>
                {products.map((p) => (
                    <li key={p.id}>
                        <b>{p.name}</b> - ${p.price} <br />
                        {p.description}
                        <br />
                        <button onClick={() => handleEdit(p)}>Edit</button>
                        <button onClick={() => handleDelete(p.id)}>Delete</button>
                    </li>
                ))}
            </ul>

            <button onClick={() => navigate("/home")}>Back to Home</button>
        </div>
    );
};

export default Admin;
