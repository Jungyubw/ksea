const Group = require("../../models/group");

exports.groupCreate = async (req, res) => {
  const group = new Group(req.body);

  try {
    await group.save();

    res.status(204).send();
  } catch (e) {
    res.status(500).json({
      message: "group 저장 실패",
    });
  }
};

exports.groupList = async (req, res) => {
  try {
    const groups = await Group.find({});

    res.status(200).send(groups);
  } catch (e) {
    res.status(500).json({
      message: "group 조회 실패",
    });
  }
};

exports.groupRead = async (req, res) => {
  const id = req.params.id;

  try {
    const group = await Group.findById(id);

    if (!group) {
      return res.status(404).send();
    }

    res.status(200).send(group);
  } catch (e) {
    res.status(500).json({
      message: "group 조회 실패",
    });
  }
};

exports.groupUpdate = async (req, res) => {
  const id = req.params.id;

  try {
    // new가 true이면 수정된 문서를 반환
    // runValidators가 true인 경우 업데이트 유효성 검사기를 실행
    const group = await Group.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!group) {
      return res.status(404).send();
    }

    res.status(200).send(group);
  } catch (e) {
    res.status(500).json({
      message: "group 변경 실패",
    });
  }
};

exports.groupDelete = async (req, res) => {
  const id = req.params.id;

  try {
    const group = await Group.findByIdAndDelete(id);

    if (!group) {
      return res.status(404).send();
    }

    res.status(200).send(group);
  } catch (e) {
    res.status(500).json({
      message: "group 삭제 실패",
    });
  }
};