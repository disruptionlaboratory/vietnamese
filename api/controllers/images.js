const { post } = require("axios");

const generate = async (req, res) => {
  try {
    const response = await post(
      "http://host.docker.internal:8585/api/generate",
      {
        prompt: req.body.prompt,
        width: req.body.width,
        height: req.body.height,
        model: req.body.model,
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
