module.exports = {
  getIndex: (req, res) => {
    const title = "Your Page Title"; // Define the title variable
    res.render("index", { title: title }); // Render the EJS template and pass the title variable
  },
};
