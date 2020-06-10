import Category from './../models/categoryModel';

const categoryCtrl = {
  addCategory: async (args, req) => {
    return await Category.create(args);
  },

  getAllCategory: async () => {
    const allCategory = await Category.find({}).sort({ createdAt: -1 });

    return {
      items: allCategory,
    };
  },

  deleteCategory: async (id, req) => {
    const doc = await Category.findByIdAndDelete(id);

    if (!doc) {
      throw new Error('No Category found with this ID');
    }
    return {
      status: 'success',
      message: `Category related to ${id} has been deleted`,
      id: doc.id,
    };
  },

  updateCategory: async (id, name) => {
    const doc = await Category.findByIdAndUpdate(id, { name }, { new: true, runValidators: true });
    await doc.save();
    if (!doc) {
      throw new Error('No Category found with this ID');
    }
    return doc;
  },
};

export default categoryCtrl;
