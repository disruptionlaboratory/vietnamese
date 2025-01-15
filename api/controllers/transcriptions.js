const { post } = require("axios");

const { generateTranslation } = require("./../bin/prompts");

const transcribe = async (req, res) => {
  try {
    const transcriptionResponse = await post(
      "http://host.docker.internal:8383/api/transcribe",
      {
        audio: req.body.audio,
      },
    );

    const { transcript } = transcriptionResponse.data;

    const prompt = generateTranslation({
      phrase: transcript,
      from: "Vietnamese (vi)",
      to: "English (en)",
    });

    const contentsResponse = await post(
      "http://host.docker.internal:8282/api/generate",
      {
        system:
          "You are a helpful bot providing simple translations without any preamble, postamble or summary, just the translation only",
        prompt,
      },
    );

    const translation = contentsResponse.data.message;

    res.status(200);
    res.json({
      transcript,
      translation,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e });
  }
};

module.exports = {
  transcribe,
};
