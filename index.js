const axios = require("axios");

exports.serverlessFunction = async (req, res) => {
  try {
    const { year, modulePrefix } = req.query;
    const nextYear = parseFloat(year) + 1;
    const resp = await axios.get(
      `https://api.nusmods.com/v2/${year}-${nextYear}/moduleList.json`
    );
    let modules = [];
    resp.data.map((module) => {
      if (module.moduleCode.includes(modulePrefix)) {
        modules.push(module.moduleCode);
      }
    });
    modules = modules.slice(0, 10);
    if (modules.length) {
      return res.status(200).send({ modules: modules });
    } else {
      return res.status(201).send("No modules found");
    }
  } catch (err) {
    console.log(err.message);
    return res.status(404).send("Bad Request");
  }
};
