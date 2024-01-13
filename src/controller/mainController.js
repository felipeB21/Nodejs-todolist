const db = require("../database/models/index");
const jwt = require("jsonwebtoken");
module.exports = {
  index: async (req, res) => {
    const newPost = req.session.newPost;
    const name = req.session.userName;
    const email = req.session.userEmail;
    const id = req.session.userId;

    try {
      const getAllTodo = await db.Post.findAll();

      res.render("index", {
        name: name ? name : null,
        email: email ? email : null,
        getAllTodo: getAllTodo ? getAllTodo : null,
        id: id ? id : null,
      });
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.render("index", {
        name: name ? name : null,
        email: email ? email : null,
        newPost: newPost ? newPost : null,
        getAllTodo: null,
        id: id ? id : null,
      });
    }
  },
  register: (req, res) => {
    const name = req.session.userName;
    const errors = req.session.errors;
    const oldData = req.session.oldData;
    req.session.errors = null;
    req.session.oldData = null;
    res.render("register", {
      errors: errors ? errors : null,
      oldData: oldData ? oldData : null,
      name: name ? name : null,
    });
  },
  login: (req, res) => {
    const name = req.session.userName;
    const errors = req.session.loginErrors;
    const oldData = req.session.loginOldData;
    req.session.loginErrors = null;
    req.session.oldData = null;
    res.render("login", {
      errors: errors ? errors : null,
      oldData: oldData ? oldData : null,
      name: name ? name : null,
    });
  },
  postRegister: async (req, res) => {
    const newUser = await db.User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    if (newUser) {
      req.session.userName = newUser.name;
      req.session.userEmail = newUser.email;
    }
    res.redirect("/");
  },
  postLogin: async (req, res) => {
    const { email, password } = req.body;
    const getUser = await db.User.findOne({
      where: {
        email: email,
        password: password,
      },
    });

    if (getUser) {
      req.session.userId = getUser.id;
      req.session.userName = getUser.name;
      req.session.userEmail = getUser.email;
    }
    const jwtToken = jwt.sign(
      { id: getUser.id, email: getUser.email },
      process.env.JWT_SECRET
    );

    res.cookie("jwtToken", jwtToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    req.body.isLogged = jwtToken;
    res.redirect("/");
  },
  getTodo: (req, res) => {
    const name = req.session.userName;
    const email = req.session.userEmail;
    const errors = req.session.todoErrors;
    const oldData = req.session.todoOldData;
    const id = req.session.userId;
    res.render("todo", {
      name: name ? name : null,
      email: email ? email : null,
      errors: errors ? errors : null,
      oldData: oldData ? oldData : null,
      id: id ? id : null,
    });
  },
  postTodo: (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      return res.redirect("/login");
    }
    const newPost = db.Post.create({
      title: req.body.title,
      text: req.body.text,
      user_id: userId,
    });
    if (newPost) {
      req.session.newPost = newPost;
      req.session.title = newPost.title;
      req.session.text = newPost.text;
    }
    res.redirect("/");
  },
  getTodoById: async (req, res) => {
    const postId = req.params.id;
    const name = req.session.userName;
    const email = req.session.userEmail;
    const id = req.session.userId;
    try {
      const todoById = await db.Post.findByPk(postId);

      if (todoById) {
        res.render("todoById", {
          todoById,
          name: name ? name : null,
          email: email ? email : null,
          id: id ? id : null,
        });
      } else {
        res.render("postNotFound", { postId });
      }
    } catch (error) {
      console.error("Error fetching post by ID:", error);
      res.render("errorPage");
    }
  },
  deleteToDo: async (req, res) => {
    const postId = req.params.id;
    try {
      const todoById = await db.Post.findByPk(postId);

      if (todoById) {
        await todoById.destroy();
        res.redirect("/");
      } else {
        res.render("postNotFound", { postId });
      }
    } catch (error) {
      console.error("Error deleting post by ID:", error);
      res.render("errorPage");
    }
  },
  editToDo: async (req, res) => {
    const postId = req.params.id;
    const name = req.session.userName;
    const email = req.session.userEmail;
    const id = req.session.userId;

    try {
      const todoById = await db.Post.findByPk(postId);

      if (todoById) {
        res.render("editTodo", {
          todoById,
          name: name ? name : null,
          email: email ? email : null,
          id: id ? id : null,
        });
      } else {
        res.render("postNotFound", { postId });
      }
    } catch (error) {
      console.error("Error fetching post by ID:", error);
      res.render("errorPage");
    }
  },
  postEditToDo: async (req, res) => {
    const postId = req.params.id;
    const { title, text } = req.body;

    try {
      const todoToUpdate = await db.Post.findByPk(postId);

      if (todoToUpdate) {
        // Actualiza los campos del ToDo con la información del formulario
        await todoToUpdate.update({
          title: title,
          text: text,
        });

        res.redirect("/");
      } else {
        res.render("postNotFound", { postId });
      }
    } catch (error) {
      console.error("Error updating post by ID:", error);
      res.render("errorPage");
    }
  },
  profile: async (req, res) => {
    const name = req.session.userName;
    const email = req.session.userEmail;
    const id = req.session.userId;

    try {
      const allPosts = await db.Post.findAll();

      req.session.length = allPosts.length;

      res.render("profile", {
        allPosts: allPosts ? allPosts : null,
        name: name ? name : null,
        email: email ? email : null,
        id: id ? id : null,
      });
    } catch (error) {
      console.error("Error fetching all posts:", error);
      res.render("errorPage");
    }
  },
};
