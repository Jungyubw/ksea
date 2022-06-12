const APS = require("../../models/apsdef");

exports.apsCreate = async (req, res) => {
  const aps = new APS(req.body);

  try {
    await aps.save();

    res.status(204).send();
  } catch (e) {
    res.status(500).json({
      message: "aps 저장 실패",
    });
  }
};

exports.apsList = async (req, res) => {
  try {
    const apss = await APS.find({});

    res.status(200).send(apss);
  } catch (e) {
    res.status(500).json({
      message: "aps 조회 실패",
    });
  }
};

exports.apsRead = async (req, res) => {
  const id = req.params.id;

  try {
    const aps = await APS.findById(id);

    if (!aps) {
      return res.status(404).send();
    }

    res.status(200).send(aps);
  } catch (e) {
    res.status(500).json({
      message: "aps 조회 실패",
    });
  }
};

exports.apsUpdate = async (req, res) => {
  const id = req.params.id;

  try {
    // new가 true이면 수정된 문서를 반환
    // runValidators가 true인 경우 업데이트 유효성 검사기를 실행
    const aps = await APS.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!aps) {
      return res.status(404).send();
    }

    res.status(200).send(aps);
  } catch (e) {
    res.status(500).json({
      message: "aps 변경 실패",
    });
  }
};

exports.apsDelete = async (req, res) => {
  const id = req.params.id;

  try {
    const aps = await APS.findByIdAndDelete(id);

    if (!aps) {
      return res.status(404).send();
    }

    res.status(200).send(aps);
  } catch (e) {
    res.status(500).json({
      message: "aps 삭제 실패",
    });
  }
};