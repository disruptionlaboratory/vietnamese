const { post } = require("axios");

const transcribe = async (req, res) => {
  try {
    const response = await post(
      "http://host.docker.internal:8383/api/transcribe",
      {
        audio: req.body.audio,
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
  transcribe,
};
