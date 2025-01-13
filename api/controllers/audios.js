const { post } = require("axios");

const generate = async (req, res) => {
  try {
    const response = await post(
      "http://host.docker.internal:8484/api/generate",
      {
        prompt: req.body.prompt,
      },
    );
    res.status(200);
    res.json(response.data);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e });
  }
};

module.exports = {
  generate,
};
