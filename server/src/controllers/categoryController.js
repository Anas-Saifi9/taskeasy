import Category from "../models/category.models.js";

const DEFAULT_CATEGORIES = [
    { name: "Work", color: "#3b82f6" },
    { name: "Personal", color: "#a21caf" },
    { name: "Shopping", color: "#22c55e" },
    { name: "Health", color: "#f97316" }
];

export const createCategory = async (req, res) => {
    try {
        const { name, color } = req.body;
        const userId = req.user?.id;
        if (!name) return res.status(400).json({ message: "Category name is required" });
        if (!userId) return res.status(401).json({ message: "Authentication required" });
        const existingCategory = await Category.findOne({ userId, name: name.trim() });
        if (existingCategory) return res.status(400).json({ message: "Category with this name already exists" });
        const category = new Category({ name: name.trim(), color: color || "#3b82f6", userId });
        await category.save();
        res.status(201).json({ success: true, data: { category } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCategories = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) return res.status(401).json({ message: "Authentication required" });
        const userCategories = await Category.find({ userId });
        const allCategories = [
            ...DEFAULT_CATEGORIES.map((cat, index) => ({
                _id: `default-${index}`, name: cat.name, color: cat.color,
                userId: "default", isDefault: true, createdAt: new Date(), updatedAt: new Date()
            })),
            ...userCategories
        ];
        res.json({ success: true, data: { categories: allCategories } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, color } = req.body;
        const userId = req.user?.id;
        if (!userId) return res.status(401).json({ message: "Authentication required" });
        if (id.startsWith("default-")) return res.status(403).json({ message: "Cannot modify default categories" });
        const category = await Category.findOne({ _id: id, userId });
        if (!category) return res.status(404).json({ message: "Category not found or access denied" });
        if (name && name !== category.name) {
            const existingCategory = await Category.findOne({ userId, name: name.trim(), _id: { $ne: id } });
            if (existingCategory) return res.status(400).json({ message: "Category with this name already exists" });
        }
        const updatedCategory = await Category.findByIdAndUpdate(id, { name: name?.trim(), color }, { new: true });
        res.json({ success: true, data: { category: updatedCategory } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user?.id;
        if (!userId) return res.status(401).json({ message: "Authentication required" });
        if (id.startsWith("default-")) return res.status(403).json({ message: "Cannot delete default categories" });
        const category = await Category.findOne({ _id: id, userId });
        if (!category) return res.status(404).json({ message: "Category not found or access denied" });
        await Category.findByIdAndDelete(id);
        res.json({ success: true, message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
