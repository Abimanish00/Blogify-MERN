const Blog = require("../models/Blog");
const User = require("../models/User");

// 🔹 Create blog (POST /api/blogs)
exports.createBlog = async (req, res) => {
  try {
    const { title, shortDescription, content, blogImage } = req.body;

    if (!title || !shortDescription || !content || !blogImage) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const newBlog = new Blog({
      title,
      shortDescription,
      content,
      blogImage,
      author: req.user, // Comes from auth middleware
    });

    await newBlog.save();

    res.status(201).json({
      msg: "Blog created successfully",
      blog: newBlog,
    });
  } catch (error) {
    console.error("Create Blog Error:", error);
    res.status(500).json({ msg: "Server error while creating blog" });
  }
};

// 🔹 Get all blogs (GET /api/blogs)
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "username profileImg profession")
      .sort({ createdAt: -1 });

    res.status(200).json(blogs);
  } catch (error) {
    console.error("Get All Blogs Error:", error);
    res.status(500).json({ msg: "Server error while fetching blogs" });
  }
};

// 🔹 Get single blog (GET /api/blogs/:id)
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      "author",
      "username profileImg profession"
    );

    if (!blog) return res.status(404).json({ msg: "Blog not found" });

    res.status(200).json(blog);
  } catch (error) {
    console.error("Get Blog By ID Error:", error);
    res.status(500).json({ msg: "Server error while fetching blog" });
  }
};

// 🔹 Get logged-in user's blogs (GET /api/blogs/user/me)
exports.getMyBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user })
      .sort({ createdAt: -1 })
      .populate("author", "username profileImg profession");

    res.status(200).json(blogs);
  } catch (error) {
    console.error("Get My Blogs Error:", error);
    res.status(500).json({ msg: "Server error while fetching your blogs" });
  }
};

// 🔹 Update blog (PUT /api/blogs/:id)
// ✅ Update blog (only by owner)
exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ msg: "Blog not found" });

    // Check blog ownership
    if (blog.author.toString() !== req.user)
      return res.status(403).json({ msg: "Not authorized to edit this blog" });

    const { title, shortDescription, content, blogImage } = req.body;

    blog.title = title || blog.title;
    blog.shortDescription = shortDescription || blog.shortDescription;
    blog.content = content || blog.content;
    blog.blogImage = blogImage || blog.blogImage;

    await blog.save();

    res.status(200).json({ msg: "Blog updated successfully", blog });
  } catch (err) {
    console.error("Update blog error:", err);
    res.status(500).json({ msg: "Server error during blog update" });
  }
};

// ✅ Delete blog (only by owner)
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ msg: "Blog not found" });

    if (blog.author.toString() !== req.user)
      return res.status(403).json({ msg: "Not authorized to delete this blog" });

    await blog.deleteOne();

    res.status(200).json({ msg: "Blog deleted successfully" });
  } catch (err) {
    console.error("Delete blog error:", err);
    res.status(500).json({ msg: "Server error during blog delete" });
  }
};

