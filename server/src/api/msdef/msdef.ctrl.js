const MSDEF = require("../../models/msdef");

exports.msdefCreate = async (req, res) => {
  const msdef = new MSDEF(req.body);

  try {
    await msdef.save();

    res.status(204).send();
  } catch (e) {
    res.status(500).json({
      message: "msdef 저장 실패",
    });
  }
};

exports.msdefList = async (req, res) => {
  try {
    const msdefs = await MSDEF.find({});

    res.status(200).send(msdefs);
  } catch (e) {
    res.status(500).json({
      message: "msdef 조회 실패",
    });
  }
};

exports.msdefRead = async (req, res) => {
  const id = req.params.id;

  try {
    const msdef = await MSDEF.findById(id);

    if (!msdef) {
      return res.status(404).send();
    }

    res.status(200).send(msdef);
  } catch (e) {
    res.status(500).json({
      message: "msdef 조회 실패",
    });
  }
};

exports.msdefUpdate = async (req, res) => {
  const id = req.params.id;

  try {
    // new가 true이면 수정된 문서를 반환
    // runValidators가 true인 경우 업데이트 유효성 검사기를 실행
    const msdef = await MSDEF.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!msdef) {
      return res.status(404).send();
    }

    res.status(200).send(msdef);
  } catch (e) {
    res.status(500).json({
      message: "msdef 변경 실패",
    });
  }
};

exports.msdefDelete = async (req, res) => {
  const id = req.params.id;

  try {
    const msdef = await MSDEF.findByIdAndDelete(id);

    if (!msdef) {
      return res.status(404).send();
    }

    res.status(200).send(msdef);
  } catch (e) {
    res.status(500).json({
      message: "msdef 삭제 실패",
    });
  }
};